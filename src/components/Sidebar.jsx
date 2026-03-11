import { cn } from "@/lib/utils";
import { Menu, X, Home, User, Sparkles, Briefcase, FolderKanban, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Sparkles },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Contact", href: "#contact", icon: Mail },
];

export const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerOptions = {
      root: document.getElementById("main-scroll-area"),
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const id = item.href.substring(1);
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    const mainScrollArea = document.getElementById("main-scroll-area");
    if (element && mainScrollArea) {
      mainScrollArea.scrollTo({
        top: element.offsetTop - 40,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all md:hidden backdrop-blur-md"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-72 bg-[#09090b]/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Profile Header */}
        <div className="p-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-4 px-2 py-3">
            {/* Small Profile Photo */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 shadow-lg">
                <img
                  src="/projects/profile.jpeg"
                  alt="Ashish Prasad"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#09090b]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
                Ashish Prasad
              </h2>
              <div className="text-xs text-zinc-500 mt-0.5">
                Full-Stack Developer
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <div className="text-[10px] font-semibold text-zinc-600 px-3 mb-3 uppercase tracking-[0.15em]">
            Navigation
          </div>
          <div className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
                    isActive
                      ? "text-zinc-100 bg-white/[0.08]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-md" />
                  )}
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isActive
                        ? "scale-110 text-zinc-300"
                        : "group-hover:text-zinc-300"
                    )}
                  />
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Footer with Social Links */}
        <div className="p-4 border-t border-white/5 mt-auto">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex gap-3">
              <a
                href="https://github.com/AkprasadoP"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/akprasad14/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
            <span className="text-[10px] text-zinc-700 font-mono">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};
