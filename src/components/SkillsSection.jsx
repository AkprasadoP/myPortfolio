import { useState } from "react";
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
    <section id="skills" className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5 pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="title-decoration"></div>
            <h2 className="enhanced-section-title title-glow">
              My <span className="text-primary">Skills</span>
            </h2>
            {/* Floating decorative elements */}
            <div className="floating-icon -top-8 -left-10">
              <FaCode className="w-6 h-6 text-primary/30" />
            </div>
            <div className="floating-icon -top-6 -right-8" style={{ animationDelay: '1.5s' }}>
              <FaTools className="w-5 h-5 text-primary/40" />
            </div>
            <div className="floating-icon -bottom-4 left-4" style={{ animationDelay: '0.5s' }}>
              <FaPalette className="w-4 h-4 text-primary/25" />
            </div>
          </div>
          <p className="section-subtitle">
            A comprehensive overview of my technical expertise across frontend, backend, 
            and development tools. Each skill represents hands-on experience in real-world projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group relative px-8 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r " + category.color + " text-white shadow-2xl scale-105"
                    : "modern-card text-foreground hover:shadow-xl"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = iconMap[skill.name];
            return (
              <div
                key={skill.name}
                className="group modern-card p-6 hover:shadow-2xl transition-all duration-500 stagger-animation"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {skill.category}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Summary */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center modern-card p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaPalette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Frontend</h3>
            <p className="text-muted-foreground text-sm">
              Modern UI/UX development with React, TypeScript, and cutting-edge styling frameworks
            </p>
          </div>
          
          <div className="text-center modern-card p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaDatabase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Backend</h3>
            <p className="text-muted-foreground text-sm">
              Scalable server-side solutions with Node.js, Python, and robust database management
            </p>
          </div>
          
          <div className="text-center modern-card p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaTools className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">DevOps & Tools</h3>
            <p className="text-muted-foreground text-sm">
              Cloud deployment, containerization, and modern development workflow optimization
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
