import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaDatabase, FaCloud, FaChartLine, FaBuilding, FaGlobe, FaShieldAlt } from "react-icons/fa";
import { SiGooglechrome, SiGmail, SiGraphql, SiPostgresql, SiNodedotjs, SiPython, SiFastapi } from "react-icons/si";

const experiences = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "AI Talent Force",
    location: "Japan (Remote)",
    duration: "Oct 2025 - Dec 2025",
    type: "Internship",
    description: "Worked on ATF CyberX, an AI-powered cybersecurity platform focused on email phishing detection and enterprise security automation with production-ready deployment.",
    achievements: [
      "Built hybrid phishing detection pipeline (heuristics + embeddings + LLM) achieving 89% F1 score",
      "Developed production-grade Chrome Extension (Manifest V3) with Gmail integration and real-time threat analysis",
      "Implemented cost-aware LLM routing system reducing inference usage by 60% without accuracy loss",
      "Deployed secure backend APIs with FastAPI supporting live HTTPS domain and Chrome Web Store compliance",
      "Created AI-powered explanations with context-aware analysis eliminating false brand hallucinations"
    ],
    technologies: ["Python", "FastAPI", "Gemini LLM", "Chrome Extension", "Gmail API", "AI/ML", "Manifest V3", "Security Heuristics"],
    icon: FaShieldAlt,
    companyIcon: FaGlobe,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "BlueStack",
    location: "Remote",
    duration: "May 2025 - Jul 2025",
    type: "Internship",
    description: "Focused on backend development and API optimization with modern technologies.",
    achievements: [
      "Developed REST and GraphQL APIs with 45% improved geospatial query response times",
      "Built modular microservices using Node.js and PostgreSQL with fault-tolerant design",
      "Collaborated with frontend and DevOps teams to optimize performance and deployment workflows"
    ],
    technologies: ["Node.js", "GraphQL", "PostgreSQL", "REST APIs", "Microservices"],
    icon: FaDatabase,
    companyIcon: FaBuilding,
    color: "from-blue-500 to-cyan-500"
  }
];

const techIcons = {
  "Node.js": SiNodedotjs,
  "GraphQL": SiGraphql,
  "PostgreSQL": SiPostgresql,
  "Chrome Extension": SiGooglechrome,
  "Gmail API": SiGmail,
  "REST APIs": FaDatabase,
  "Microservices": FaCloud,
  "Python": SiPython,
  "FastAPI": SiFastapi,
  "Gemini LLM": FaChartLine,
  "AI/ML": FaChartLine,
  "Manifest V3": SiGooglechrome,
  "Security Heuristics": FaShieldAlt
};

export const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] = useState(experiences[0]);

  return (
    <section id="experience" className="py-32 px-4 bg-gradient-to-br from-secondary/20 via-background to-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="title-decoration"></div>
            <h2 className="enhanced-section-title title-glow">
              Professional <span className="text-primary">Experience</span>
            </h2>
            {/* Floating decorative elements */}
            <div className="floating-icon -top-8 -left-12">
              <FaBuilding className="w-6 h-6 text-primary/30" />
            </div>
            <div className="floating-icon -top-6 -right-10" style={{ animationDelay: '1s' }}>
              <FaChartLine className="w-5 h-5 text-primary/40" />
            </div>
            <div className="floating-icon -bottom-4 left-6" style={{ animationDelay: '2s' }}>
              <FaCalendarAlt className="w-4 h-4 text-primary/25" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 border-l-4 group ${
                    selectedExperience.id === exp.id
                      ? "bg-primary/10 border-primary shadow-2xl scale-105"
                      : "modern-card border-transparent hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${exp.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <exp.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base md:text-lg text-foreground truncate mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-semibold text-sm mb-2">{exp.company}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-2">
            <div className="modern-card p-10 md:p-12 min-h-[600px]">
              {/* Header */}
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedExperience.color} text-white shadow-xl floating-element`}>
                    <selectedExperience.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {selectedExperience.title}
                    </h3>
                    <div className="flex items-center gap-3 text-primary font-bold mb-4 text-lg">
                      <selectedExperience.companyIcon className="w-5 h-5" />
                      <span>{selectedExperience.company}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span className="font-medium">{selectedExperience.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        <span className="font-medium">{selectedExperience.location}</span>
                      </div>
                      <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                        {selectedExperience.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10 p-6 bg-secondary/30 rounded-2xl border border-border/50">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {selectedExperience.description}
                </p>
              </div>

              {/* Key Achievements */}
              <div className="mb-10">
                <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Key Achievements
                </h4>
                <ul className="space-y-5">
                  {selectedExperience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-5 p-4 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-colors duration-300">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                      <span className="text-muted-foreground leading-relaxed text-base">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedExperience.technologies.map((tech, index) => {
                    const TechIcon = techIcons[tech];
                    return (
                      <div
                        key={index}
                        className="modern-tag flex items-center gap-3 px-5 py-3 text-sm font-semibold"
                      >
                        {TechIcon && <TechIcon className="w-5 h-5 text-primary" />}
                        <span>{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};