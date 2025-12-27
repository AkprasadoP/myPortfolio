import { cn } from "@/lib/utils";
import { Menu, X, Code2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-40 transition-all duration-500",
          isScrolled 
            ? "bg-background/90 backdrop-blur-xl shadow-lg border-b border-border/20" 
            : "bg-transparent",
          scrollDirection === "down"
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100",
          "py-4"
        )}
      >
        <div className="container flex items-center justify-between relative">
          {/* Clean Logo */}
          <a
            className="text-xl font-bold flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            href="#hero"
            onClick={() => setActiveSection("hero")}
          >
            <div className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
              <Code2 className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-none">
              AkPrasad
            </span>
          </a>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-card/50 backdrop-blur-sm rounded-full px-6 py-2 border border-border/30">
            {navItems.map((item, key) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={key}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-primary-foreground bg-primary shadow-lg"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                  )}
                  onClick={() => setActiveSection(item.href.substring(1))}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-20" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Enhanced Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={cn(
              "relative p-3 rounded-full transition-all duration-300 md:hidden z-50",
              isScrolled 
                ? "bg-card/80 backdrop-blur-sm border border-border/30 shadow-lg" 
                : "bg-card/60 backdrop-blur-sm",
              "hover:scale-110 hover:bg-primary/10"
            )}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <div className="relative w-5 h-5">
              <Menu 
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )} 
                size={20} 
              />
              <X 
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )} 
                size={20} 
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500 md:hidden",
          "bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Mobile Menu Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/60 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 flex flex-col space-y-6">
          {navItems.map((item, key) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={key}
                href={item.href}
                className={cn(
                  "relative text-2xl font-semibold transition-all duration-300 px-8 py-3 rounded-full",
                  "opacity-0 animate-fade-in-delay-1",
                  isActive
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
                style={{ animationDelay: `${key * 100}ms` }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveSection(item.href.substring(1));
                }}
              >
                {item.name}
                {isActive && (
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-8 text-center">
          <p className="text-sm text-muted-foreground opacity-0 animate-fade-in-delay-4">
            Crafted with ❤️ by Ashish
          </p>
        </div>
      </div>
    </>
  );
};
