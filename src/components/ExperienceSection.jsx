import { Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "AI Talent Force",
    location: "Japan (Remote)",
    duration: "Oct 2025 - Dec 2025",
    type: "Internship",
    description:
      "Worked on ATF CyberX, an AI-powered cybersecurity platform focused on email phishing detection and enterprise security automation with production-ready deployment.",
    achievements: [
      "Built hybrid phishing detection pipeline (heuristics + embeddings + LLM) achieving 89% F1 score",
      "Developed production-grade Chrome Extension (Manifest V3) with Gmail integration and real-time threat analysis",
      "Implemented cost-aware LLM routing system reducing inference usage by 60% without accuracy loss",
    ],
    technologies: ["Python", "FastAPI", "Gemini LLM", "Chrome Extension"],
    accent: "from-blue-500 to-cyan-500",
    dotColor: "bg-blue-500",
    dotGlow: "shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "BlueStack",
    location: "Remote",
    duration: "May 2025 - Jul 2025",
    type: "Internship",
    description:
      "Focused on backend development and API optimization with modern technologies.",
    achievements: [
      "Developed REST and GraphQL APIs with 45% improved geospatial query response times",
      "Built modular microservices using Node.js and PostgreSQL with fault-tolerant design",
    ],
    technologies: ["Node.js", "GraphQL", "PostgreSQL", "Microservices"],
    accent: "from-emerald-500 to-green-500",
    dotColor: "bg-emerald-500",
    dotGlow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative w-full">
      <div className="w-full max-w-4xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Experience
            </span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
            Professional experience building production-grade systems and
            AI-powered platforms.
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/30 to-transparent" />
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-[-24px] before:w-px before:bg-white/10 last:before:hidden"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 sm:left-1 top-2 w-6 h-6 rounded-full bg-[#09090b] border-2 border-white/20 flex items-center justify-center">
                <div
                  className={`w-2 h-2 rounded-full ${exp.dotColor} ${exp.dotGlow}`}
                />
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-100">
                      {exp.title}
                    </h3>
                    <div
                      className={`text-transparent bg-clip-text bg-gradient-to-r ${exp.accent} font-semibold mt-1`}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 text-sm text-zinc-500">
                    <span className="font-medium">{exp.duration}</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2.5 mb-5">
                  {exp.achievements.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-1" />
                      <span className="text-zinc-300 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-white/[0.04] rounded-md border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};