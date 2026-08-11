export const site = {
  name: "Ashish Prasad",
  handle: "AkPrasad",
  systemTitle: "ASHISH PRASAD // PERSONAL SYSTEM",
  role: "SOFTWARE ENGINEER",
  focus: "AI / BACKEND / SYSTEMS",
  tagline:
    "I build things. Then I figure out why they broke — before anyone else notices.",
  location: "Noida, India",
  currentRole: "SDE Intern @ Classplus",
  status: "ONLINE",
  lastUpdated: "10.08.2026",
  build: "2026.08",
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
  { id: "home", label: "HOME", href: "#home", code: "01" },
  { id: "notes", label: "CIVILIAN FILE", href: "#notes", code: "02" },
  { id: "experience", label: "PATROL LOG", href: "#experience", code: "03" },
  { id: "stack", label: "GADGETS", href: "#stack", code: "04" },
  { id: "projects", label: "CASE FILES", href: "#projects", code: "05" },
  { id: "experiments", label: "LAB NOTES", href: "#experiments", code: "06" },
  { id: "judge", label: "JUDGE FILE", href: "#judge", code: "07" },
  { id: "contact", label: "OPEN CHANNEL", href: "#contact", code: "08" },
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
  stats: [
    { key: "years", value: "3+", label: "years coding" },
    { key: "projects", value: "15+", label: "projects built" },
    { key: "tech", value: "10+", label: "technologies" },
    { key: "internships", value: "3", label: "internships" },
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
    duration: "CURRENT",
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

export const leetcode = {
  handle: "akprasad14",
  profileUrl: "https://leetcode.com/u/akprasad14/",
  rank: "238,574",
  location: "India · IIIT Jabalpur · Web Developer",
  solved: 462,
  acceptance: 62.73,
  submissions: 872,
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
    { level: "EASY", solved: 139, total: 958, color: "#00c2a8" },
    { level: "MED", solved: 263, total: 2098, color: "#ffc01e" },
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
    globalRank: "121,200 / 877,640",
    attended: 3,
    topPct: "14.06%",
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

export const projects = [
  {
    id: "atf-weather",
    dirname: "atf-weather/",
    title: "ATF 天気アシスタント",
    description:
      "AI weather companion blending forecasts, fashion, and travel advice. Bilingual (JP/EN) with voice recognition and AI-powered generation.",
    tags: ["React", "TypeScript", "Node.js", "Gemini AI"],
    demoUrl: "https://my-aitf.vercel.app/",
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
    demoUrl: "https://cyberx-atf.duckdns.org/",
    githubUrl: "https://github.com/AkprasadoP/atf-cyberx",
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
    demoUrl: "https://alphaio.onrender.com/",
    githubUrl: "https://github.com/AkprasadoP/alphaio",
  },
];
