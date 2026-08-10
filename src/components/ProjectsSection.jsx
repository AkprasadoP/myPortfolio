import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, site } from "@/data/site";

export const ProjectsSection = () => {
  const [openId, setOpenId] = useState(projects[0]?.id ?? null);
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="scroll-mt-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="panel accent-red"
      >
        <div className="panel-header">
          <span>PROJECT DIRECTORY</span>
          <span>/home/ashish/projects</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          <div className="border-b border-line lg:border-b-0 lg:border-r">
            <div className="border-b border-line px-4 py-3 font-mono text-[10px] tracking-[0.12em] text-dim">
              ls -la
            </div>
            <ul className="divide-y divide-line">
              {projects.map((project) => {
                const active = openId === project.id;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(project.id)}
                      className={`spidey-sense flex w-full items-start gap-3 border border-transparent px-4 py-3 text-left transition-colors ${
                        active
                          ? "bg-inset text-cream"
                          : "text-muted hover:bg-inset/60 hover:text-fg"
                      }`}
                    >
                      <span className="mt-0.5 font-mono text-[10px] text-spidey-red">
                        [DIR]
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
                        {active ? "OPEN" : "VIEW"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-h-[280px] bg-inset/40 p-5 sm:p-6">
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
                  <p className="font-mono text-[10px] tracking-[0.14em] text-dim">
                    FILE READOUT
                  </p>
                  <h3 className="mt-2 font-ui text-xl tracking-wide text-cream">
                    {openProject.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-spidey-blue">
                    ./{openProject.dirname}
                  </p>

                  <hr className="dotted-rule" />

                  <p className="font-body text-sm leading-relaxed text-fg">
                    {openProject.description}
                  </p>

                  {openProject.note && (
                    <p className="mt-3 font-mono text-[11px] text-signal">
                      note: {openProject.note}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {openProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line bg-panel px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {openProject.demoUrl && (
                      <a
                        href={openProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-system btn-system-primary"
                      >
                        [ open demo ]
                      </a>
                    )}
                    {openProject.githubUrl && (
                      <a
                        href={openProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-system"
                      >
                        [ source ]
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
            className="font-mono text-xs text-muted hover:text-spidey-red"
          >
            cd ../.. &amp;&amp; open github.com/AkprasadoP →
          </a>
        </div>
      </motion.div>
    </section>
  );
};
