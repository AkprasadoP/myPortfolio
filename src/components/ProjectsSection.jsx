import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
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
    title: "AI-Based Non-Invasive Blood Sugar Detection",
    description:
      "A Next.js-powered system that estimates blood sugar levels using acetone (MQ-138) and NIR sensor readings, eliminating the need for invasive methods.",
    image: "/projects/glucosense.png",
    tags: ["Next.js", "TailwindCSS", "MQ-138", "NIR Sensor"],
    demoUrl: "https://glucosense-eight.vercel.app/",
    githubUrl: "https://github.com/AkprasadoP/Glucosense",
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    title: "ExplorExperts – Travel Agency",
    description:
      "My first ever project built to strengthen my front-end fundamentals. Developed using pure HTML and CSS, with a touch of JavaScript for interactive features, despite having limited JS knowledge at the time.",
    image: "/projects/firstProject.png",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/AkprasadoP/ExplorExperts",
  },
  {
    id: 4,
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
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/AkprasadoP"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
