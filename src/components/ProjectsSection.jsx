import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "ATF 天気アシスタント",
    description:
      "AI weather companion blending forecasts, fashion, and travel advice. Bilingual (JP/EN) with voice recognition and AI-powered generation.",
    tags: ["React", "TypeScript", "Node.js", "Gemini AI"],
    demoUrl: "https://my-aitf.vercel.app/",
    githubUrl: "https://github.com/AkprasadoP/atf-weather-assistant",
    featured: true,
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "CyberX — AI Cybersecurity",
    description:
      "AI-assisted platform protecting against phishing emails and deepfake voice attacks with hybrid detection pipeline and Chrome extension.",
    tags: ["Python", "FastAPI", "React", "Gemini LLM"],
    demoUrl: "https://cyberx-atf.duckdns.org/",
    githubUrl: "https://github.com/AkprasadoP/atf-cyberx",
    featured: true,
    accent: "from-red-500 to-orange-500",
  },
  {
    id: 4,
    title: "University Website – IIITDMJ",
    description:
      "Full-stack academic system managing workflows built over a scalable architecture with efficient caching layers.",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    demoUrl: "http://13.201.19.145:5000/",
    githubUrl: "https://github.com/AkprasadoP/IIITDMJ-Website-V2.1",
    accent: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    title: "GenRAG - Document Intelligence",
    description:
      "RAG implementation from scratch — semantic search through 1,400+ text chunks, PDF parsing, with sub-millisecond search speeds.",
    tags: ["Python", "Sentence-BERT", "Gemini API", "RAG"],
    githubUrl: "https://github.com/AkprasadoP/GenRAG",
    accent: "from-purple-500 to-violet-500",
  },
  {
    id: 6,
    title: "ALPHAIO – Real-Time Social",
    description:
      "Full-featured social platform with real-time chat, post interactions, authentication, and responsive UI.",
    tags: ["MongoDB", "Express", "React", "Socket.io"],
    demoUrl: "https://alphaio.onrender.com/",
    githubUrl: "https://github.com/AkprasadoP/alphaio",
    accent: "from-amber-500 to-yellow-500",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative w-full">
      <div className="w-full max-w-4xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Projects
            </span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            Selected work showcasing applied solutions in AI, full-stack
            architecture, and security.
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-purple-500/50 via-pink-500/30 to-transparent" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative flex flex-col rounded-2xl bg-[#0a0a0c] border border-white/[0.06] hover:border-white/15 transition-all duration-300 h-full overflow-hidden hover:shadow-lg hover:shadow-black/20 ${
                project.featured ? "md:col-span-1" : ""
              }`}
            >
              {/* Accent Strip */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${project.accent} opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-white/5 border border-white/10 rounded-md text-zinc-400">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        title="Source Code"
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Footer Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-white/[0.04] rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/AkprasadoP"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-zinc-300 font-medium hover:bg-white/5 hover:text-white transition-all group"
          >
            <Github size={16} />
            View All on GitHub
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
