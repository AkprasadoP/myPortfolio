import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, site } from "@/data/site";
import { ComicReveal } from "@/components/ui/ComicReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LivePulseDeepDive } from "@/components/LivePulseDeepDive";
import { scrollToSection } from "@/lib/scroll";

export const ProjectsSection = () => {
  const [openId, setOpenId] = useState(projects[0]?.id ?? null);
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="scroll-mt-24">
      <SectionHeading ordinal="03" kicker="Case files" title="Selected work" sub={`${projects.length} projects · ${projects.filter((p) => p.featured).length} featured`} />
      <ComicReveal className="panel accent-red">

        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          <div className="border-b border-line lg:border-b-0 lg:border-r">
            <ul className="divide-y divide-line">
              {projects.map((project) => {
                const active = openId === project.id;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(project.id)}
                      aria-current={active ? "true" : undefined}
                      className={`spidey-sense flex w-full items-start gap-3 border border-transparent px-4 py-3 text-left transition-colors ${
                        active
                          ? "bg-inset/60 text-fg"
                          : "text-muted hover:bg-inset/40 hover:text-fg"
                      }`}
                    >
                      <span className="mt-0.5 font-mono text-[10px] text-dim">
                        {String(projects.indexOf(project) + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-sm">
                          {project.dirname}
                        </span>
                        <span className="mt-1 block truncate font-body text-xs text-dim">
                          {project.title}
                        </span>
                      </span>
                      <span className="mt-0.5 font-mono text-[10px] tracking-[0.1em] text-dim">
                        {project.featured ? "★" : ""}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-h-[280px] p-5 sm:p-7">
            <AnimatePresence mode="wait">
              {openProject && (
                <motion.div
                  key={openProject.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-left"
                >
                  <div className="overflow-hidden border border-line bg-bg">
                    <div className="flex items-center gap-1.5 border-b border-line bg-inset px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-line-strong" aria-hidden="true" />
                      <span className="h-2 w-2 rounded-full bg-line-strong" aria-hidden="true" />
                      <span className="h-2 w-2 rounded-full bg-spidey-red/70" aria-hidden="true" />
                      <span className="ml-2 truncate font-mono text-[10px] tracking-[0.08em] text-dim">
                        {openProject.demoUrl
                          ? openProject.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                          : `./${openProject.dirname}`}
                      </span>
                    </div>
                    {openProject.screenshot ? (
                      <img
                        src={openProject.screenshot}
                        alt={`${openProject.title} preview`}
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex aspect-[16/9] flex-col justify-between p-4 sm:p-5">
                        <p className="font-mono text-[11px] tracking-[0.1em] text-spidey-red">
                          ./{openProject.dirname}
                        </p>
                        <p className="font-display text-2xl uppercase leading-none text-fg sm:text-4xl">
                          {openProject.title}
                        </p>
                        <p className="truncate font-mono text-[11px] text-dim">
                          {openProject.tags.join(" · ")}
                        </p>
                      </div>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg">
                    {openProject.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-dim">
                    ./{openProject.dirname}
                  </p>

                  <hr className="dotted-rule" />

                  <p className="font-body text-sm leading-relaxed text-fg">
                    {openProject.description}
                  </p>

                  {openProject.note && (
                    <p className="mt-3 font-mono text-[11px] text-muted">
                      <span className="text-spidey-red">note</span> · {openProject.note}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {openProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {openProject.deepDive && (
                      <button
                        type="button"
                        onClick={() => scrollToSection(openProject.deepDive)}
                        className="btn-system"
                      >
                        Architecture deep dive ↓
                      </button>
                    )}
                    {openProject.demoUrl && (
                      <a
                        href={openProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-system btn-system-primary"
                      >
                        Live demo ↗
                      </a>
                    )}
                    {openProject.githubUrl && (
                      <a
                        href={openProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-system"
                      >
                        Source ↗
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-line px-4 py-3 text-left">
          <a
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-fg"
          >
            github.com/AkprasadoP →
          </a>
        </div>
      </ComicReveal>

      <LivePulseDeepDive />
    </section>
  );
};
