import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "ATF 天気アシスタント 🌤️",
    description:
      "Your personal AI weather companion — blending forecasts, fashion, and travel advice seamlessly. Features bilingual support (Japanese/English), voice recognition, and AI-powered suggestions.",
    image: "/projects/img.png", // TODO: Replace with actual ATF Weather Assistant screenshot
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Google Gemini AI",
      "OpenWeather API",
      "TailwindCSS",
      "Framer Motion"
    ],
    demoUrl: "https://my-aitf.vercel.app/",
    githubUrl: "https://github.com/AkprasadoP/atf-weather-assistant",
  },

  {
    id: 3,
    title: "CyberX — AI-Powered Cybersecurity Platform",
    description:
      "An AI-assisted cybersecurity platform protecting users from phishing emails and deepfake voice attacks. Features hybrid detection pipeline, Chrome extension with Gmail integration, and explainable AI decisions achieving ~89% F1 score.",
    image: "/projects/img2.png", // TODO: Replace with ATF CyberX screenshot
    tags: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Chrome Extension",
      "Gemini LLM",
      "Cybersecurity",
      "AI/ML"
    ],
    demoUrl: "https://cyberx-atf.duckdns.org/",
    githubUrl: "https://github.com/AkprasadoP/atf-cyberx",
  },
  {
    id: 4,
    title: "University Website – IIITDM Jabalpur",
    description:
      "A full-stack system for managing academic and administrative workflows using React, Node.js, and PostgreSQL.",
    image: "/projects/iiitdmjwebsite.png",
    tags: [
      "React",
      "TailwindCSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Redis",
      "AWS",
      "JWT",
    ],
    demoUrl: "http://13.201.19.145:5000/",
    githubUrl: "https://github.com/AkprasadoP/IIITDMJ-Website-V2.1",
  },
    {
    id: 2,
    title: "GenRAG - AI Document Intelligence System",
    description:
      "An AI-powered document intelligence system implementing Retrieval-Augmented Generation (RAG) from scratch. Features semantic search through 1,400+ text chunks, PDF processing, and AI-powered responses with sub-millisecond search speeds.",
    image: "/projects/image.png", // TODO: Replace with GenRAG screenshot
    tags: [
      "Python",
      "Sentence-BERT",
      "Google Gemini API",
      "PDF Processing",
      "RAG",
      "Semantic Search",
      "GUI",
      "AI/ML"
    ],
    githubUrl: "https://github.com/AkprasadoP/GenRAG",
  },
  {
    id: 5,
    title: "AI-Based Non-Invasive Blood Sugar Detection",
    description:
      "A Next.js-powered system that estimates blood sugar levels using acetone (MQ-138) and NIR sensor readings, eliminating the need for invasive methods.",
    image: "/projects/glucosense.png",
    tags: ["Next.js", "TailwindCSS", "MQ-138", "NIR Sensor"],
    demoUrl: "https://glucosense-eight.vercel.app/",
    githubUrl: "https://github.com/AkprasadoP/Glucosense",
  },
  {
    id: 6,
    title: "ALPHAIO – Real-Time Social Media Platform",
    description:
      "A full-featured social media platform built with the MERN stack, supporting real-time chat, post interactions, authentication, and a responsive UI using Chakra UI.",
    image: "/projects/alphaio.png",
    tags: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Socket.io",
      "JWT",
      "Chakra UI",
    ],
    demoUrl: "https://alphaio.onrender.com/",
    githubUrl: "https://github.com/AkprasadoP/alphaio",
  },
  {
    id: 7,
    title: "Full Stack Realtime Chat Application",
    description:
      "A MERN-based real-time chat app with JWT authentication, user presence tracking, media upload via Cloudinary, and efficient state management using Zustand.",
    image: "/projects/alphasync.png",
    tags: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Socket.io",
      "JWT",
      "Zustand",
      "Cloudinary",
    ],
    demoUrl: "https://alphasync.onrender.com/",
    githubUrl: "https://github.com/your-username/realtime-chat-app",
  },
  {
    id: 8,
    title: "ExplorExperts – Travel Agency",
    description:
      "My first ever project built to strengthen my front-end fundamentals. Developed using pure HTML and CSS, with a touch of JavaScript for interactive features, despite having limited JS knowledge at the time.",
    image: "/projects/firstProject.png",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/AkprasadoP/ExplorExperts",
  },
  
  {
    id: 9,
    title: "Personal Portfolio Website",
    description:
      "And of course, my portfolio itself stands as one of my latest and most polished projects — a modern, responsive website built using React, TailwindCSS, and Vite.",
    image: "/projects/image.png",
    tags: ["React", "Vite", "TailwindCSS", "Lucide Icons", "Radix UI"],
    demoUrl: "https://your-portfolio.vercel.app",
    githubUrl: "https://github.com/yourusername/react-tailwind-portfolio",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="title-decoration"></div>
            <h2 className="enhanced-section-title title-glow">
              Featured <span className="text-primary">Projects</span>
            </h2>
            {/* Floating decorative elements */}
            <div className="floating-icon -top-8 -left-10">
              <Github className="w-6 h-6 text-primary/30" />
            </div>
            <div className="floating-icon -top-6 -right-8" style={{ animationDelay: '1.5s' }}>
              <ExternalLink className="w-5 h-5 text-primary/40" />
            </div>
            <div className="floating-icon -bottom-4 left-4" style={{ animationDelay: '0.8s' }}>
              <ArrowRight className="w-4 h-4 text-primary/25" />
            </div>
          </div>
          <p className="section-subtitle">
            Here are some of my recent projects. Each project was carefully
            crafted with attention to detail, performance, and user experience.
            From AI-powered applications to full-stack platforms, these showcase
            my journey in modern web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group modern-card overflow-hidden stagger-animation"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="modern-tag"
                      style={{ animationDelay: `${(index * 0.1) + (tagIndex * 0.05)}s` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* Expandable description */}
                <div className="mb-6">
                  <p className="text-muted-foreground text-sm leading-relaxed transition-all duration-500 group-hover:text-foreground line-clamp-3 group-hover:line-clamp-none">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex space-x-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                        title="View Live Demo"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                      title="View Source Code"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <ArrowRight size={14} className="text-primary group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <a
            className="cosmic-button inline-flex items-center gap-3 group"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/AkprasadoP"
          >
            <Github size={18} />
            <span>Explore More on GitHub</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
