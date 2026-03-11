import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaDocker,
  FaSass,
  FaAws,
  FaGoogle,
  FaDatabase,
  FaCode,
  FaTools,
  FaPalette,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDjango,
  SiFirebase,
  SiCloudinary,
  SiTypescript,
  SiNextdotjs,
  SiGraphql,
  SiExpress,
  SiVuedotjs,
  SiRedux,
  SiPython,
  SiFastapi,
} from "react-icons/si";

const skills = [
  // Frontend
  { name: "HTML", category: "frontend", level: 95, color: "from-orange-500 to-red-500" },
  { name: "CSS", category: "frontend", level: 90, color: "from-blue-500 to-cyan-500" },
  { name: "JavaScript", category: "frontend", level: 92, color: "from-yellow-400 to-orange-500" },
  { name: "TypeScript", category: "frontend", level: 88, color: "from-blue-600 to-blue-800" },
  { name: "React", category: "frontend", level: 95, color: "from-cyan-400 to-blue-500" },
  { name: "Next.js", category: "frontend", level: 85, color: "from-gray-800 to-black" },
  { name: "Tailwind CSS", category: "frontend", level: 93, color: "from-teal-400 to-cyan-500" },
  { name: "SASS", category: "frontend", level: 80, color: "from-pink-500 to-rose-500" },

  // Backend
  { name: "Node.js", category: "backend", level: 90, color: "from-green-500 to-emerald-600" },
  { name: "Express", category: "backend", level: 88, color: "from-gray-600 to-gray-800" },
  { name: "Python", category: "backend", level: 85, color: "from-blue-500 to-yellow-500" },
  { name: "FastAPI", category: "backend", level: 82, color: "from-teal-500 to-green-500" },
  { name: "MongoDB", category: "backend", level: 87, color: "from-green-600 to-green-800" },
  { name: "PostgreSQL", category: "backend", level: 85, color: "from-blue-600 to-indigo-700" },
  { name: "GraphQL", category: "backend", level: 80, color: "from-pink-500 to-purple-600" },
  { name: "Django", category: "backend", level: 75, color: "from-green-700 to-green-900" },

  // Tools
  { name: "Git/GitHub", category: "tools", level: 92, color: "from-gray-700 to-black" },
  { name: "Docker", category: "tools", level: 80, color: "from-blue-500 to-blue-700" },
  { name: "AWS", category: "tools", level: 78, color: "from-orange-400 to-yellow-500" },
  { name: "Google Cloud", category: "tools", level: 75, color: "from-blue-500 to-red-500" },
  { name: "Firebase", category: "tools", level: 85, color: "from-yellow-400 to-orange-500" },
  { name: "Cloudinary", category: "tools", level: 82, color: "from-blue-400 to-purple-500" },
];

const iconMap = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  TypeScript: SiTypescript,
  React: FaReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  SASS: FaSass,
  "Node.js": FaNodeJs,
  Express: SiExpress,
  Python: SiPython,
  FastAPI: SiFastapi,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  GraphQL: SiGraphql,
  Django: SiDjango,
  "Git/GitHub": FaGithub,
  Docker: FaDocker,
  AWS: FaAws,
  "Google Cloud": FaGoogle,
  Firebase: SiFirebase,
  Cloudinary: SiCloudinary,
};

const categories = [
  { name: "all", label: "All Skills", icon: FaCode, color: "from-primary to-primary/80" },
  { name: "frontend", label: "Frontend", icon: FaPalette, color: "from-blue-500 to-cyan-500" },
  { name: "backend", label: "Backend", icon: FaDatabase, color: "from-green-500 to-emerald-600" },
  { name: "tools", label: "Tools", icon: FaTools, color: "from-purple-500 to-pink-500" },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Skills
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            A comprehensive overview of my expertise across frontend, backend,
            and development tools.
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-purple-500/50 via-pink-500/30 to-transparent" />
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group relative px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 border ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r " + category.color + " text-white border-transparent shadow-lg"
                    : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    activeCategory === category.name ? "text-white" : "text-primary"
                  }`} />
                  <span className="font-semibold">{category.label}</span>
                </div>
                
                {activeCategory === category.name && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredSkills.map((skill, index) => {
            const Icon = iconMap[skill.name];
            return (
              <div
                key={skill.name}
                className="group p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 hover:bg-white/[0.04]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className={`p-4 rounded-2xl bg-[#09090b] shadow-inner text-white group-hover:scale-110 transition-transform duration-300 relative overflow-hidden flex items-center justify-center`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-20`}></div>
                    {Icon && <Icon className="w-8 h-8 relative z-10 drop-shadow-md" />}
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-zinc-200 group-hover:text-white transition-colors duration-300 text-sm">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Summary */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-8 rounded-2xl bg-[#09090b] border border-white/10 hover:border-white/20 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
              <FaPalette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-cyan-400 transition-colors">Frontend</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Modern UI/UX development with React, TypeScript, and cutting-edge styling frameworks.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-[#09090b] border border-white/10 hover:border-white/20 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
              <FaDatabase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors">Backend</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Scalable server-side solutions with Node.js, Python, and robust database management.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-[#09090b] border border-white/10 hover:border-white/20 transition-all group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
              <FaTools className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-pink-400 transition-colors">DevOps & Tools</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Cloud deployment, containerization, and modern development workflow optimization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
