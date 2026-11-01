export const site = {
  name: "Ashish Prasad",
  handle: "AkPrasad",
  systemTitle: "ASHISH PRASAD",
  role: "SOFTWARE ENGINEER",
  focus: "AI / BACKEND / SYSTEMS",
  tagline:
    "I build things. Then I figure out why they broke — before anyone else notices.",
  location: "Noida, India",
  currentRole: "SDE Intern @ Classplus",
  availability: {
    label: "OPEN TO FULL-TIME ROLES",
    note: "Backend / full-stack SDE · available now · typically replies within 48 hours",
  },
  lookingFor: {
    roles: ["Backend SDE", "Full-stack SDE (backend-leaning)"],
    start: "Available now",
    location: "Open to relocation — India or abroad · remote works too",
    strengths: [
      "APIs and data models that survive production traffic",
      "Concurrency, real-time systems, and failure handling",
      "Security-minded engineering — auth, access control, hardening",
    ],
  },
  email: "akprasad07mm@gmail.com",
  resumeUrl: "/projects/AshishPrasad.pdf",
  profileImage: "/projects/profile.jpeg",
  social: {
    github: "https://github.com/AkprasadoP",
    linkedin: "https://www.linkedin.com/in/akprasad14/",
    x: "https://x.com/AshishKrPrasad3",
  },
};

export const navItems = [
  { id: "home", label: "INDEX", href: "#home", code: "00" },
  { id: "notes", label: "ABOUT", href: "#notes", code: "01" },
  { id: "experience", label: "EXPERIENCE", href: "#experience", code: "02" },
  { id: "projects", label: "WORK", href: "#projects", code: "03" },
  { id: "oss", label: "OPEN SOURCE", href: "#oss", code: "04" },
  { id: "stack", label: "STACK", href: "#stack", code: "05" },
  { id: "judge", label: "LEETCODE", href: "#judge", code: "06" },
  { id: "experiments", label: "LAB", href: "#experiments", code: "07" },
  { id: "contact", label: "CONTACT", href: "#contact", code: "08" },
];

export const about = {
  education: "B.Tech Computer Science, IIIT Jabalpur (graduated 2026)",
  foundations: ["Algorithms", "Data Structures", "Operating Systems", "DBMS"],
  interests: [
    "backend architecture",
    "AI systems",
    "security",
    "distributed systems",
  ],
  // Every number here traces back to a project or role below.
  stats: [
    { key: "tests", value: "250+", label: "tests · LivePulse" },
    { key: "f1", value: "89%", label: "F1 · phishing detection" },
    { key: "llm", value: "−60%", label: "LLM inference cost" },
    { key: "geo", value: "+45%", label: "faster geo queries" },
  ],
};

export const stack = {
  languages: ["C++", "JavaScript", "TypeScript", "Python"],
  frontend: ["React", "Next.js", "Tailwind CSS", "SASS", "HTML", "CSS"],
  backend: ["Node.js", "Express", "FastAPI", "Django", "GraphQL"],
  data: ["PostgreSQL", "MongoDB", "Redis"],
  infra: ["Docker", "AWS", "Google Cloud", "Firebase", "Cloudinary", "Git"],
};

export const experiments = [
  {
    id: "EXP-014",
    title: "Production AI Systems",
    status: "ACTIVE",
    note: "Routing, evaluation, and cost-aware inference in real products.",
  },
  {
    id: "EXP-013",
    title: "Backend Architecture",
    status: "ACTIVE",
    note: "APIs, data models, and failure modes that show up after deploy.",
  },
  {
    id: "EXP-012",
    title: "Security Engineering",
    status: "ACTIVE",
    note: "Phishing detection, threat signals, and practical defenses.",
  },
  {
    id: "EXP-011",
    title: "Distributed Systems",
    status: "ACTIVE",
    note: "Consistency, latency, and the parts that break under load.",
  },
];

export const experiences = [
  {
    id: "01",
    title: "SDE Intern",
    company: "Classplus",
    location: "Noida, India",
    duration: "May 2026 — Present",
    current: true,
    summary:
      "Working on production application security — auditing and hardening authentication, session handling, API access control, and media delivery paths on live systems.",
    annotations: [
      { label: "Focus", value: "appsec" },
      { label: "Video", value: "HLS investigation" },
      { label: "Auth", value: "sessions / CSRF" },
      { label: "Scope", value: "production" },
    ],
    achievements: [
      "Investigated Classplus web video / HLS delivery security and authored remediation guidance covering session controls, CDN token scoping, and abuse detection",
      "Audited and hardened authentication, session/cookie security, and CSRF protections on production applications",
      "Tightened API authorization and ownership enforcement to close IDOR-class access-control gaps",
      "Drove production-readiness work: security headers, deployment/infrastructure hardening, and secure startup validation",
      "Improved reliability and operability with readiness/health checks and safer failure handling for production services",
    ],
    technologies: [
      "Application Security",
      "AuthN / AuthZ",
      "HLS",
      "Backend",
    ],
  },
  {
    id: "02",
    title: "Software Engineering Intern",
    company: "AI Talent Force",
    location: "Japan · Remote",
    duration: "Oct — Dec 2025",
    summary:
      "Worked on ATF CyberX, an AI-powered cybersecurity platform focused on email phishing detection and enterprise security automation.",
    annotations: [
      { label: "CyberX", value: "phishing detection" },
      { label: "F1", value: "89%" },
      { label: "Chrome", value: "MV3" },
      { label: "LLM inference", value: "−60%" },
    ],
    achievements: [
      "Built hybrid phishing detection pipeline (heuristics + embeddings + LLM) achieving 89% F1 score",
      "Developed production-grade Chrome Extension (Manifest V3) with Gmail integration and real-time threat analysis",
      "Implemented cost-aware LLM routing system reducing inference usage by 60% without accuracy loss",
    ],
    technologies: ["Python", "FastAPI", "Gemini LLM", "Chrome Extension"],
  },
  {
    id: "03",
    title: "Backend Developer Intern",
    company: "BlueStack",
    location: "Remote",
    duration: "May — Jul 2025",
    summary:
      "Focused on backend development and API optimization with modern technologies.",
    annotations: [
      { label: "APIs", value: "REST / GraphQL" },
      { label: "DB", value: "PostgreSQL" },
      { label: "Geospatial", value: "+45%" },
    ],
    achievements: [
      "Developed REST and GraphQL APIs with 45% improved geospatial query response times",
      "Built modular microservices using Node.js and PostgreSQL with fault-tolerant design",
    ],
    technologies: ["Node.js", "GraphQL", "PostgreSQL", "Microservices"],
  },
];

/**
 * Merged upstream contributions only — open or closed-unmerged PRs stay off
 * the page until they land. Star counts checked 2026-11-01.
 */
export const openSource = [
  {
    project: "Etherpad",
    repo: "ether/etherpad",
    stars: "18.6k",
    blurb: "Real-time collaborative document editor",
    pr: 8112,
    url: "https://github.com/ether/etherpad/pull/8112",
    merged: "Aug 2026",
    title: "Fix home and post-delete redirects behind a proxy URL prefix",
    problem:
      "Served under a prefix like /etherpad, the Home command resolved to the domain root and post-delete redirects hardcoded “/”.",
    fix: "One resolver for Home and every post-delete redirect, relative to the current pad URL — with regression tests for root, single- and nested-prefix deployments.",
    tags: ["TypeScript", "Vitest", "Playwright"],
  },
  {
    project: "Refine",
    repo: "refinedev/refine",
    stars: "36k",
    blurb: "React framework for internal tools and admin panels",
    pr: 7100,
    url: "https://github.com/refinedev/refine/pull/7100",
    merged: "Nov 2025",
    title: "Fix useModalForm failing to open when switching edit → create",
    problem:
      "handleShow captured a stale action because its useCallback was missing dependencies, so the modal silently stayed closed.",
    fix: "Completed the dependency list (action, setId, show) and added a test that reproduces the exact switch.",
    tags: ["React", "react-hook-form", "Jest"],
  },
];

export const leetcode = {
  handle: "akprasad14",
  profileUrl: "https://leetcode.com/u/akprasad14/",
  // Snapshot refreshed 2026-10-09 against live GraphQL. The section
  // revalidates in the browser via lib/leetcode-live.js; this is the
  // fallback every visitor sees when all live sources fail.
  rank: "244,723",
  location: "India · IIIT Jabalpur · Web Developer",
  solved: 467,
  acceptance: 62.94,
  submissions: 877,
  pastYearSubmissions: 409,
  activeDays: 89,
  maxStreak: 6,
  mostRecentBadge: "200 Days Badge 2025",
  languages: [
    { name: "C++", count: 460 },
    { name: "Python", count: 1 },
    { name: "MySQL", count: 1 },
  ],
  difficulty: [
    { level: "EASY", solved: 142, total: 958, color: "#00c2a8" },
    { level: "MED", solved: 265, total: 2098, color: "#ffc01e" },
    { level: "HARD", solved: 60, total: 962, color: "#ff375f" },
  ],
  skills: [
    {
      tier: "ADVANCED",
      entries: [
        { name: "Dynamic Programming", count: 75 },
        { name: "Backtracking", count: 15 },
        { name: "Union-Find", count: 11 },
      ],
    },
    {
      tier: "INTERMEDIATE",
      entries: [
        { name: "Hash Table", count: 97 },
        { name: "Math", count: 88 },
        { name: "Greedy", count: 53 },
      ],
    },
    {
      tier: "FUNDAMENTAL",
      entries: [
        { name: "Array", count: 296 },
        { name: "String", count: 105 },
        { name: "Sorting", count: 68 },
      ],
    },
  ],
  contest: {
    rating: 1698,
    globalRank: "124,773 / 887,132",
    attended: 3,
    topPct: "14.31%",
    gauge: { min: 1350, max: 2000 },
  },
  beats: [
    { value: 94.25, label: "rating" },
    { value: 96, label: "speed" },
    { value: 93.42, label: "submissions" },
  ],
  badges: [
    "50 Days Badge 2025",
    "100 Days Badge 2025",
    "200 Days Badge 2025",
  ],
};

/**
 * Case files. Optional `screenshot` per project: drop a 1280×720 PNG/JPG in
 * /public/projects/ (e.g. "/projects/atf-weather.png") and set the path here.
 * Without one, the readout renders a styled title card instead.
 */
export const projects = [
  {
    id: "livepulse",
    dirname: "livepulse/",
    title: "LivePulse — Real-Time Classroom Infrastructure",
    description:
      "Production-minded live-classroom backend: concurrent quiz answering with first-correct-winner election enforced by PostgreSQL row locks, idempotent retries, ordered doubt queues, presence, and reconnect recovery across horizontally scaled WebSocket instances — measured under load, covered by 250+ tests.",
    tags: ["TypeScript", "Fastify", "PostgreSQL", "Redis", "WebSockets"],
    demoUrl: "https://livepulse-five.vercel.app/",
    githubUrl: "https://github.com/AkprasadoP/LivePulse",
    deepDive: "livepulse-deep-dive",
    screenshot: "/projects/livepulse.jpg",
    featured: true,
  },
  {
    id: "atf-weather",
    dirname: "atf-weather/",
    title: "ATF 天気アシスタント",
    description:
      "AI weather companion blending forecasts, fashion, and travel advice. Bilingual (JP/EN) with voice recognition and AI-powered generation.",
    tags: ["React", "TypeScript", "Node.js", "Gemini AI"],
    demoUrl: "https://my-aitf.vercel.app/",
    screenshot: "/projects/atf-weather.jpg",
    githubUrl: "https://github.com/AkprasadoP/atf-weather-assistant",
    featured: true,
  },
  {
    id: "cyberx",
    dirname: "cyberx/",
    title: "CyberX — AI Cybersecurity",
    description:
      "AI-assisted platform protecting against phishing emails and deepfake voice attacks with hybrid detection pipeline and Chrome extension.",
    tags: ["Python", "FastAPI", "React", "Gemini LLM"],
    // cyberx-atf.duckdns.org stopped responding (checked 2026-11-01)
    demoUrl: null,
    githubUrl: "https://github.com/AkprasadoP/atf-cyberx",
    note: "Live demo currently offline — source on GitHub.",
    featured: true,
  },
  {
    id: "iiitdmj",
    dirname: "iiitdmj-website/",
    title: "University Website – IIITDMJ",
    description:
      "Full-stack academic system managing workflows built over a scalable architecture with efficient caching layers.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    demoUrl: null,
    githubUrl: "https://github.com/AkprasadoP/IIITDMJ-Website-V2.1",
    note: "Live demo currently offline — source on GitHub.",
  },
  {
    id: "genrag",
    dirname: "genrag/",
    title: "GenRAG - Document Intelligence",
    description:
      "RAG implementation from scratch — semantic search through 1,400+ text chunks, PDF parsing, with sub-millisecond search speeds.",
    tags: ["Python", "Sentence-BERT", "Gemini API", "RAG"],
    githubUrl: "https://github.com/AkprasadoP/GenRAG",
  },
  {
    id: "alphaio",
    dirname: "alphaio/",
    title: "ALPHAIO – Real-Time Social",
    description:
      "Full-featured social platform with real-time chat, post interactions, authentication, and responsive UI.",
    tags: ["MongoDB", "Express", "React", "Socket.io"],
    // alphaio.onrender.com returns 404 (checked 2026-11-01)
    demoUrl: null,
    githubUrl: "https://github.com/AkprasadoP/alphaio",
    note: "Live demo currently offline — source on GitHub.",
  },
];
