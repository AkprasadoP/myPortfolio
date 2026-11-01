import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, site } from "@/data/site";
import { SpideyEmblem } from "@/components/ui/SpideyEmblem";
import { emitSystem, EV } from "@/lib/system-bus";
import { scrollToSection } from "@/lib/scroll";

export const SystemChrome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
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

  const onNavClick = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    scrollToSection(id);
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header
      id="system-chrome"
      className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:px-10">
        <a
          href="#home"
          onClick={(e) => onNavClick(e, "#home")}
          className="flex min-w-0 items-center gap-2.5"
        >
          <SpideyEmblem size={18} fill="var(--spidey-red)" />
          <span className="truncate font-mono text-[11px] tracking-[0.2em] text-fg">
            {site.systemTitle}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.slice(1).map((item) => {
            const active = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative px-2.5 py-2 font-mono text-[10.5px] tracking-[0.16em] transition-colors",
                  active ? "text-fg" : "text-dim hover:text-fg"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-2.5 -bottom-[9px] h-px bg-spidey-red" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-crt" />
            AVAILABLE
          </span>
          <button
            type="button"
            title="Open command palette"
            onClick={() => emitSystem(EV.PALETTE_OPEN)}
            className="border border-line-strong px-1.5 py-1 font-mono text-[10px] tracking-[0.1em] text-dim transition-colors hover:border-dim hover:text-fg"
          >
            ⌘K
          </button>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="border border-line-strong p-1.5 text-muted hover:text-fg lg:hidden"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="absolute left-0 right-0 top-full z-40 border-b border-line bg-panel lg:hidden">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-4 border-b border-line px-5 py-3.5 font-mono text-xs tracking-[0.16em]",
                    active ? "text-fg" : "text-muted"
                  )}
                >
                  <span className={active ? "text-spidey-red" : "text-dim"}>
                    {item.code}
                  </span>
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
