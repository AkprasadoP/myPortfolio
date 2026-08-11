import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, site } from "@/data/site";
import { SpideyEmblem } from "@/components/ui/SpideyEmblem";
import { WebFluidMeter } from "@/components/ui/WebFluidMeter";
import { webSwingTo } from "@/lib/swing";
import { onSystem, emitSystem, EV } from "@/lib/system-bus";

const PATROL_KEY = "patrol-mode";

export const SystemChrome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [patrol, setPatrol] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(PATROL_KEY) === "on";
    setPatrol(stored);
    document.documentElement.setAttribute(
      "data-mode",
      stored ? "patrol" : "standard"
    );
  }, []);

  const togglePatrol = () => {
    setPatrol((prev) => {
      const next = !prev;
      document.documentElement.setAttribute(
        "data-mode",
        next ? "patrol" : "standard"
      );
      window.localStorage.setItem(PATROL_KEY, next ? "on" : "off");
      return next;
    });
  };

  useEffect(() => onSystem(EV.PATROL_TOGGLE, () => togglePatrol()), []);

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
    webSwingTo(id);
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
    <header
      id="system-chrome"
      className="sticky top-0 z-40 border-b border-line bg-panel/95 backdrop-blur-[2px]"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 sm:px-4">
        <div
          id="chrome-title-cluster"
          className="flex min-w-0 items-center gap-2"
        >
          <span
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center border border-spidey-red/70 bg-[#1a1012]"
            aria-hidden="true"
          >
            <SpideyEmblem size={14} fill="#e62429" />
          </span>
          <h1 className="truncate font-mono text-[11px] tracking-[0.12em] text-cream sm:text-xs">
            {site.systemTitle}
          </h1>
        </div>

        <div
          id="chrome-status-cluster"
          className="flex shrink-0 items-center gap-3 font-mono text-[10px] tracking-[0.1em] text-dim sm:text-[11px]"
        >
          <span className="hidden lg:inline-flex">
            <WebFluidMeter />
          </span>
          <button
            type="button"
            onClick={togglePatrol}
            title="Toggle patrol mode"
            className={cn(
              "hidden border px-2 py-1 transition-colors sm:inline-flex sm:items-center sm:gap-1.5",
              patrol
                ? "border-spidey-blue text-spidey-blue"
                : "border-line-strong text-muted hover:border-spidey-red hover:text-spidey-red"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                patrol ? "bg-spidey-blue" : "bg-spidey-red"
              )}
            />
            PATROL: {patrol ? "INVERTED" : "NIGHT"}
          </button>
          <span className="inline-flex items-center gap-1.5 text-crt">
            <span className="h-1.5 w-1.5 animate-blink bg-crt" />
            {site.status}
          </span>
          <span className="hidden text-dim sm:inline">{site.lastUpdated}</span>
          <button
            type="button"
            title="Open command palette"
            onClick={() => emitSystem(EV.PALETTE_OPEN)}
            className="border border-line-strong bg-inset px-1.5 py-1 font-mono text-[9px] tracking-[0.1em] text-muted hover:text-cream md:hidden"
          >
            ⌘K
          </button>
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
      <div className="hidden items-stretch md:flex">
        <nav className="flex min-w-0 flex-1 items-stretch gap-0 overflow-x-auto">
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
        <button
          type="button"
          title="Open command palette"
          onClick={() => emitSystem(EV.PALETTE_OPEN)}
          className="shrink-0 border-l border-line px-2.5 font-mono text-[10px] tracking-[0.12em] text-dim hover:bg-inset hover:text-cream"
        >
          <span className="border border-line-strong bg-bg px-1.5 py-0.5 text-muted">
            ⌘K
          </span>
        </button>
      </div>

      {/* Menu — mobile drawer */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/55 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="absolute left-0 right-0 top-full z-40 border-b border-line bg-panel md:hidden">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-inset/60 px-4 py-2.5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted">
                <SpideyEmblem size={14} fill="#e62429" />
                MOBILE PATROL MENU
              </span>
              <button
                type="button"
                onClick={togglePatrol}
                className={cn(
                  "border px-2 py-1 font-mono text-[10px] tracking-[0.12em]",
                  patrol
                    ? "border-spidey-blue text-spidey-blue"
                    : "border-line-strong text-muted"
                )}
              >
                PATROL: {patrol ? "ON" : "OFF"}
              </button>
            </div>
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
