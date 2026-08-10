import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, site } from "@/data/site";

export const SystemChrome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const root = document.getElementById("main-scroll-area");
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        root,
        rootMargin: "-18% 0px -62% 0px",
        threshold: 0,
      }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);
    const mainScrollArea = document.getElementById("main-scroll-area");
    if (element && mainScrollArea) {
      mainScrollArea.scrollTo({
        top: element.offsetTop - 8,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-panel/95 backdrop-blur-[2px]">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="hidden h-2 w-2 shrink-0 rounded-sm bg-spidey-red sm:inline-block" />
          <h1 className="truncate font-mono text-[11px] tracking-[0.12em] text-cream sm:text-xs">
            {site.systemTitle}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-3 font-mono text-[10px] tracking-[0.1em] text-dim sm:text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-crt">
            <span className="h-1.5 w-1.5 animate-blink bg-crt" />
            {site.status}
          </span>
          <span className="hidden text-dim sm:inline">{site.lastUpdated}</span>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="border border-line-strong bg-inset p-1.5 text-muted hover:text-fg md:hidden"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Menu bar — desktop */}
      <nav className="hidden items-stretch gap-0 overflow-x-auto md:flex">
        {navItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={cn(
                "relative px-3 py-2 font-ui text-[11px] tracking-[0.14em] transition-colors",
                active
                  ? "bg-inset text-cream"
                  : "text-muted hover:bg-inset/70 hover:text-fg"
              )}
            >
              <span className="mr-1.5 text-dim">{item.code}</span>
              {item.label}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-px bg-spidey-red" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Menu — mobile drawer */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/55 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="absolute left-0 right-0 top-full z-40 border-b border-line bg-panel md:hidden">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 border-b border-line px-4 py-3 font-ui text-xs tracking-[0.12em]",
                    active ? "bg-inset text-cream" : "text-muted"
                  )}
                >
                  <span className="text-dim">{item.code}</span>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </>
      )}
    </header>
  );
};
