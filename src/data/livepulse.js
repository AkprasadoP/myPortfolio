/**
 * LivePulse architecture deep dive. Describes what is implemented — no
 * outbox, no Kafka, no guaranteed replay. The failure window is shown on
 * purpose: Redis Pub/Sub is at-most-once and recovery is snapshot-on-rejoin.
 */

// —— System architecture diagram (viewBox 960×440) ——
export const archNodes = {
  studentA: { x: 20, y: 60, w: 160, h: 56, title: "Student A", sub: "browser" },
  teacher: { x: 20, y: 190, w: 160, h: 56, title: "Teacher", sub: "browser" },
  studentB: { x: 20, y: 320, w: 160, h: 56, title: "Student B", sub: "browser" },
  instA: { x: 330, y: 70, w: 210, h: 120, title: "WS Instance A", sub: "Fastify + ws", note: "local connection registry" },
  instB: { x: 330, y: 270, w: 210, h: 120, title: "WS Instance B", sub: "Fastify + ws", note: "local connection registry" },
  redis: { x: 700, y: 55, w: 240, h: 100, title: "Redis Pub/Sub", sub: "livepulse:events", note: "fan-out · not the truth", tone: "blue" },
  pg: { x: 700, y: 275, w: 240, h: 110, title: "PostgreSQL", sub: "source of truth", note: "row locks · recovery snapshots", tone: "red" },
};

export const archEdges = [
  { id: "a-ia", from: [180, 88], to: [330, 105], label: "WebSocket" },
  { id: "t-ia", from: [180, 218], to: [330, 160] },
  { id: "b-ib", from: [180, 348], to: [330, 340], label: "WebSocket" },
  { id: "ia-r", from: [540, 100], to: [700, 90], label: "publish / subscribe", tone: "blue" },
  { id: "ib-r", from: [540, 295], to: [700, 130], tone: "blue" },
  { id: "ia-pg", from: [540, 165], to: [700, 300], label: "transactions", tone: "red" },
  { id: "ib-pg", from: [540, 365], to: [700, 360], label: "recovery snapshots", tone: "red" },
];

// One committed answer travelling through the system. `path` drives the
// 3D scene; `from`/`to` are the 2D fallback diagram coordinates.
export const archTrace = [
  { path: ["studentA", "instA"], from: [180, 88], to: [330, 105], node: "instA", text: "Student A submits an answer over its WebSocket to instance A." },
  { path: ["instA", "pg"], from: [540, 165], to: [700, 300], node: "pg", text: "Instance A runs the transaction: lock rows, judge server-side, insert, COMMIT." },
  { path: ["pg", "instA"], from: [700, 300], to: [540, 165], node: "instA", text: "Commit succeeds — only now is the event real." },
  { path: ["instA", "teacher"], from: [330, 160], to: [180, 218], node: "teacher", text: "Instance A broadcasts to its own sockets (teacher, Student A's private verdict)." },
  { path: ["instA", "redis"], from: [540, 100], to: [700, 90], node: "redis", text: "Instance A publishes the committed event to livepulse:events." },
  { path: ["redis", "instB"], from: [700, 130], to: [540, 295], node: "instB", text: "Instance B is subscribed and receives it." },
  { path: ["instB", "studentB"], from: [330, 340], to: [180, 348], node: "studentB", text: "Instance B fans the event out to the clients it holds — Student B sees the update." },
];

// —— Winner election (sequence) ——
export const raceLanes = [
  { id: "A", label: "Student A" },
  { id: "DB", label: "PostgreSQL" },
  { id: "B", label: "Student B" },
];

/** `first` is whoever acquires the question-row lock first. */
export const raceSteps = (first) => {
  const second = first === "A" ? "B" : "A";
  return [
    { lane: "A", text: "submit correct answer" },
    { lane: "B", text: "submit correct answer" },
    { lane: "DB", text: `BEGIN — tx ${first} and tx ${second} open concurrently` },
    { lane: first, text: "lock session row, lock question row FOR NO KEY UPDATE", tone: "hot" },
    { lane: second, text: "blocks on the question-row lock…", tone: "wait" },
    { lane: first, text: "re-check session + question state · check existing attempt" },
    { lane: first, text: "compare answer server-side → correct, no winner yet" },
    { lane: first, text: "INSERT answer isWinner = true · COMMIT", tone: "win" },
    { lane: second, text: "lock acquired — re-check state: winner already exists" },
    { lane: second, text: "INSERT answer isWinner = false · COMMIT" },
    { lane: "DB", text: "partial unique index: at most one isWinner = true per question", tone: "guard" },
    { lane: "DB", text: "answer.accepted (private verdicts) → local broadcast → publish to Redis" },
  ];
};

// —— Failure window (sequence) ——
export const failLanes = [
  { id: "IA", label: "Instance A" },
  { id: "INFRA", label: "Postgres · Redis" },
  { id: "IB", label: "Instance B / client" },
];

export const failSteps = [
  { lane: "IA", text: "COMMIT answer + winner" },
  { lane: "INFRA", text: "commit durable in PostgreSQL", tone: "win" },
  { lane: "IA", text: "send events to local sockets" },
  { lane: "IA", text: "publish to Redis — process crashes mid-publish", tone: "crash" },
  { lane: "IB", text: "event never arrives · connected client is stale", tone: "wait" },
  { lane: "IB", text: "client reconnects / rejoins the session" },
  { lane: "INFRA", text: "load authoritative snapshot: quiz, answers, standings, doubts" },
  { lane: "IB", text: "state restored from the source of truth", tone: "win" },
];

export const failNote =
  "Redis Pub/Sub is at-most-once and there is no transactional outbox. The answer is never lost — PostgreSQL has it — but a client that stays connected through the missed event stays stale until it rejoins and loads a snapshot.";

export const decisions = [
  { title: "PostgreSQL is the authority", body: "Every state change commits there first. Nothing is broadcast that hasn't committed." },
  { title: "Redis only fans out", body: "Pub/Sub moves committed events between instances; it never holds state that matters." },
  { title: "The database picks the winner", body: "Row locks serialize concurrent correct answers; a partial unique index makes a second winner impossible." },
  { title: "Recovery by snapshot", body: "Reconnecting clients rebuild from PostgreSQL instead of replaying a stream." },
  { title: "Limits written down", body: "At-most-once delivery is documented, not hidden. A transactional outbox is the next step." },
];
