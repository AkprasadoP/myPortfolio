import { site } from "@/data/site";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-4 border-t border-line bg-panel/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-3 py-5 font-mono text-[11px] text-dim sm:px-5 md:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {site.name}
            <span className="mx-2 text-line-strong">·</span>
            personal system / workbench
          </p>
          <p>
            visitors: 001337
            <span className="mx-2 text-line-strong">·</span>
            build {site.build}
          </p>
        </div>
        <p>
          alter ego
          <span className="mx-2 text-line-strong">—</span>
          <span className="text-spidey-blue">full-stack</span>
        </p>
      </div>
    </footer>
  );
};
