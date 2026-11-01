import { site } from "@/data/site";
import { SpideyEmblem } from "@/components/ui/SpideyEmblem";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 font-mono text-[11px] tracking-[0.06em] text-dim sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-10">
        <p className="inline-flex items-center gap-2.5">
          <SpideyEmblem size={14} fill="var(--spidey-red)" />
          © {currentYear} {site.name}
          <span className="text-line-strong">·</span>
          {site.location}
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={site.social.github} target="_blank" rel="noreferrer" className="hover:text-fg">
            GitHub
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">
            LinkedIn
          </a>
          <a href={site.social.x} target="_blank" rel="noreferrer" className="hover:text-fg">
            X
          </a>
          <span className="hidden text-line-strong sm:inline">·</span>
          <span>with great power, comes great uptime</span>
        </p>
      </div>
    </footer>
  );
};
