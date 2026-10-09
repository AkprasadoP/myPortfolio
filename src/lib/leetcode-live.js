/**
 * Live LeetCode loader.
 *
 * leetcode.com/graphql returns everything but blocks browser CORS, and every
 * community mirror is flaky, so we fan out across three sources in parallel:
 *   1. direct GraphQL (works wherever CORS isn't enforced)
 *   2. alfa-leetcode-api mirror (split across /profile, /solved, /contest —
 *      the root endpoint alone no longer carries solve counts)
 *   3. allorigins raw relay back to the GraphQL endpoint
 * First source to return a valid partial wins. Results are cached in
 * localStorage for TTL_MS so page loads stay instant and the section never
 * hard-fails — if every source is down we fall back to the bundled snapshot
 * in data/site.js.
 */

export const JUDGE_CACHE_KEY = "judge-live:v1";
export const TTL_MS = 6 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 6000;

const HANDLE = "akprasad14";

const QUERY = `query publicProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile { ranking }
    submitStats {
      acSubmissionNum { difficulty count submissions }
      totalSubmissionNum { difficulty count submissions }
    }
  }
  userContestRanking(username: $username) {
    attendedContestsCount rating globalRanking topPercentage
  }
}`;

const GRAPHQL_VARIABLES = { variables: { username: HANDLE } };

const encodeJsonBody = (body) => encodeURIComponent(JSON.stringify(body));

const fetchWithTimeout = (url, options = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
};

const toNumber = (value) =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const pickCount = (rows, difficulty) =>
  toNumber(rows?.find((r) => r.difficulty === difficulty)?.count);

const pickSubmissions = (rows, difficulty) =>
  toNumber(rows?.find((r) => r.difficulty === difficulty)?.submissions);

/** Partial derived from the raw GraphQL payload. */
export const normalizeGraphql = (json) => {
  const matched = json?.data?.matchedUser;
  if (!matched) return null;

  const ac = matched.submitStats?.acSubmissionNum;
  const total = matched.submitStats?.totalSubmissionNum;
  const acAllSubs = pickSubmissions(ac, "All");
  const totalAllSubs = pickSubmissions(total, "All");
  const ranking = toNumber(matched.profile?.ranking);
  const contestRanking = json?.data?.userContestRanking;

  const partial = {
    solved: pickCount(ac, "All"),
    difficulty: [
      { level: "EASY", solved: pickCount(ac, "Easy") },
      { level: "MED", solved: pickCount(ac, "Medium") },
      { level: "HARD", solved: pickCount(ac, "Hard") },
    ],
  };

  if (acAllSubs && totalAllSubs && totalAllSubs > 0) {
    partial.acceptance = (acAllSubs / totalAllSubs) * 100;
    partial.submissions = totalAllSubs;
  }
  if (ranking != null) partial.rank = ranking.toLocaleString("en-US");

  if (contestRanking) {
    const rating = toNumber(contestRanking.rating);
    partial.contest = {
      rating: rating != null ? Math.round(rating) : undefined,
      attended: toNumber(contestRanking.attendedContestsCount),
      topPct:
        toNumber(contestRanking.topPercentage) != null
          ? `${contestRanking.topPercentage.toFixed(2)}%`
          : undefined,
      globalRanking: toNumber(contestRanking.globalRanking),
    };
  }

  return partial;
};

/**
 * Partial derived from an alfa-leetcode-api payload. The mirror has shipped a
 * couple of shapes over time, so we tolerate both the flat v1 style and the
 * nested { solved, contest } v2 schema.
 */
export const normalizeAlfa = (json) => {
  if (!json || typeof json !== "object") return null;

  const flat = json.totalSolved != null || json.ranking != null;
  const nested = json.solved?.solvedProblem != null || json.profile?.ranking != null;
  if (!flat && !nested) return null;

  const solved = toNumber(json.totalSolved ?? json.solved?.solvedProblem);
  const ranking = toNumber(json.ranking ?? json.profile?.ranking);
  const contest = json.contest;
  const rawRating =
    toNumber(json.contestRating) ?? toNumber(contest?.contestRating);
  const contestRating = rawRating != null ? Math.round(rawRating) : undefined;

  const partial = {
    solved,
    rank: ranking != null ? ranking.toLocaleString("en-US") : undefined,
    acceptance: toNumber(json.acceptanceRate),
    submissions: toNumber(json.totalSubmissions),
    difficulty: [
      { level: "EASY", solved: toNumber(json.easySolved ?? json.solved?.easySolved) },
      { level: "MED", solved: toNumber(json.mediumSolved ?? json.solved?.mediumSolved) },
      { level: "HARD", solved: toNumber(json.hardSolved ?? json.solved?.hardSolved) },
    ],
    contest:
      contestRating != null
        ? {
            rating: contestRating,
            attended: toNumber(json.contestAttend ?? contest?.contestAttend),
            topPct:
              toNumber(json.contestTopPercentage ?? contest?.contestTopPercentage) != null
                ? `${(
                    json.contestTopPercentage ?? contest.contestTopPercentage
                  ).toFixed(2)}%`
                : undefined,
            globalRanking: toNumber(
              json.contestGlobalRanking ?? contest?.contestGlobalRanking
            ),
          }
        : undefined,
  };

  return partial.solved != null || partial.rank != null ? partial : null;
};

const relayUrl = () => {
  const target = `https://leetcode.com/graphql?${new URLSearchParams({
    query: QUERY,
    variables: JSON.stringify(GRAPHQL_VARIABLES.variables),
  })}`;
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;
};

const sources = () => [
  {
    name: "graphql",
    run: async () => {
      const res = await fetchWithTimeout("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: QUERY, ...GRAPHQL_VARIABLES }),
      });
      return normalizeGraphql(res.ok ? await res.json() : null);
    },
  },
  {
    name: "alfa",
    run: async () => {
      const get = async (path) => {
        try {
          const res = await fetchWithTimeout(
            `https://alfa-leetcode-api.onrender.com/${HANDLE}${path}`
          );
          return res.ok ? await res.json() : null;
        } catch {
          return null;
        }
      };
      const [profile, solved, contest] = await Promise.all([
        get(""),
        get("/solved"),
        get("/contest"),
      ]);
      if (!profile && !solved && !contest) return null;

      const pickSubs = (rows) =>
        toNumber(rows?.find((r) => r.difficulty === "All")?.submissions);
      const acAll = pickSubs(solved?.acSubmissionNum);
      const totalAll = pickSubs(solved?.totalSubmissionNum);
      return normalizeAlfa({
        ...(profile ?? {}),
        totalSolved: solved?.solvedProblem,
        easySolved: solved?.easySolved,
        mediumSolved: solved?.mediumSolved,
        hardSolved: solved?.hardSolved,
        acceptanceRate:
          acAll != null && totalAll ? (acAll / totalAll) * 100 : undefined,
        totalSubmissions: totalAll,
        contestRating: contest?.contestRating,
        contestAttend: contest?.contestAttend,
        contestTopPercentage: contest?.contestTopPercentage,
        contestGlobalRanking: contest?.contestGlobalRanking,
      });
    },
  },
  {
    name: "relay",
    run: async () => {
      const res = await fetchWithTimeout(relayUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: encodeJsonBody({ query: QUERY, ...GRAPHQL_VARIABLES }),
      });
      return normalizeGraphql(res.ok ? await res.json() : null);
    },
  },
];

/** Build a merged snapshot from the static base + a live partial. */
export const mergePartial = (base, partial) => {
  if (!partial) return base;
  const next = { ...base };

  if (partial.solved != null) next.solved = partial.solved;
  if (partial.acceptance != null) next.acceptance = partial.acceptance;
  if (partial.submissions != null) next.submissions = partial.submissions;
  if (partial.rank != null) next.rank = partial.rank;

  if (Array.isArray(partial.difficulty)) {
    next.difficulty = base.difficulty.map((entry) => {
      const live = partial.difficulty.find((l) => l.level === entry.level);
      return live?.solved != null ? { ...entry, solved: live.solved } : entry;
    });
  }

  if (partial.contest) {
    const live = partial.contest;
    const merged = { ...base.contest };
    if (live.rating != null) merged.rating = live.rating;
    if (live.attended != null) merged.attended = live.attended;
    if (live.topPct != null) merged.topPct = live.topPct;
    if (live.globalRanking != null) {
      const parts = String(base.contest.globalRank).split("/");
      const denominator = parts.length > 1 ? parts[1].trim() : "";
      merged.globalRank = `${live.globalRanking.toLocaleString("en-US")}${denominator ? ` / ${denominator}` : ""}`;
    }
    next.contest = merged;
  }

  return next;
};

const readCache = () => {
  try {
    const raw = window.localStorage.getItem(JUDGE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const age = Date.now() - (parsed.at || 0);
    if (age > TTL_MS || age < 0) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (partial, source) => {
  try {
    window.localStorage.setItem(
      JUDGE_CACHE_KEY,
      JSON.stringify({ at: Date.now(), source, partial })
    );
  } catch {
    /* localStorage unavailable — cache is best-effort */
  }
};

/** Try every source in parallel; return the first valid partial or null. */
const fetchPartial = async () => {
  const attempts = sources().map(async (source) => {
    try {
      return (await source.run()) ?? null;
    } catch {
      return null;
    }
  });
  const settled = await Promise.all(attempts);
  for (const partial of settled) {
    if (partial) return partial;
  }
  return null;
};

/**
 * Network revalidation: returns { data, source }. Falls back to the bundled
 * snapshot when every source is unreachable.
 */
export const refreshJudgeData = async (base) => {
  const partial = await fetchPartial();
  if (partial) writeCache(partial, "live");
  return {
    data: mergePartial(base, partial),
    source: partial ? "live" : "snapshot",
  };
};

/** Instant read of the cache (if fresh), otherwise null. */
export const readCachedJudge = (base) => {
  const cached = readCache();
  if (!cached?.partial) return null;
  return { data: mergePartial(base, cached.partial), source: "cached" };
};