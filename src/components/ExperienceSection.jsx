import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/data/site";
import { ComicReveal } from "@/components/ui/ComicReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const ExperienceSection = () => {
  const [openId, setOpenId] = useState(experiences[0]?.id ?? null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="scroll-mt-4">
      <SectionHeading ordinal="03" title="Patrol log" sub={`${experiences.length} entries · verified`} />
      <ComicReveal className="panel comic-frame accent-blue">
        <div className="panel-header">
          <span>PATROL LOG</span>
          <span>{experiences.length} entries · verified</span>
        </div>

        <div className="divide-y divide-line">
          {experiences.map((exp) => {
            const open = openId === exp.id;
            return (
              <article key={exp.id} className="text-left">
                <button
                  type="button"
                  onClick={() => toggle(exp.id)}
                  aria-expanded={open}
                  className={`spidey-sense flex w-full items-center gap-3 border border-transparent px-4 py-3 text-left transition-colors sm:px-5 ${
                    open
                      ? "bg-inset text-cream"
                      : "text-muted hover:bg-inset/60 hover:text-fg"
                  }`}
                >
                  <span className="shrink-0 font-mono text-[10px] text-spidey-red">
                    [FILE]
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-[11px] tracking-[0.04em] sm:text-sm sm:tracking-[0.06em]">
                    <span className="text-cream">
                      {exp.company.toUpperCase()}
                    </span>
                    <span className="text-dim"> — </span>
                    <span className="uppercase">{exp.title}</span>
                    {!exp.current && (
                      <span className="hidden text-dim sm:inline">
                        {" "}
                        — {exp.duration}
                      </span>
                    )}
                  </span>
                  {exp.current && (
                    <span className="shrink-0 border border-crt-dim bg-[#1e2a1c] px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-crt">
                      CURRENT
                    </span>
                  )}
                  <ChevronDown
                    size={14}
                    className={`shrink-0 text-dim transition-transform duration-200 ${
                      open ? "rotate-180 text-cream" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key={`${exp.id}-body`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-line px-5 pb-5 pt-4 sm:px-7 sm:pb-7"
                    >
                      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-mono text-[11px] tracking-[0.16em] text-dim">
                              [{exp.id}]
                            </p>
                            {exp.current && (
                              <span className="border border-crt-dim bg-[#1e2a1c] px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-crt">
                                CURRENT
                              </span>
                            )}
                          </div>
                          <h3 className="mt-1 font-ui text-lg tracking-wide text-cream">
                            {exp.company.toUpperCase()}
                          </h3>
                          <p className="mt-1 font-mono text-xs text-muted">
                            {exp.title}
                          </p>
                        </div>
                        <div className="font-mono text-[11px] text-dim sm:text-right">
                          <p>{exp.location}</p>
                          <p
                            className={
                              exp.current ? "text-crt" : "text-spidey-blue"
                            }
                          >
                            {exp.duration}
                          </p>
                        </div>
                      </div>

                      {exp.summary && (
                        <p className="mb-4 max-w-3xl font-body text-sm leading-relaxed text-fg">
                          {exp.summary}
                        </p>
                      )}

                      {exp.annotations?.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {exp.annotations.map((ann) => (
                            <span
                              key={`${exp.id}-${ann.label}`}
                              className="border border-line bg-inset px-2 py-1 font-mono text-[11px] text-muted"
                            >
                              <span className="text-dim">{ann.label}:</span>{" "}
                              <span className="text-cream">{ann.value}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {exp.achievements?.length > 0 && (
                        <ul className="mb-4 space-y-2">
                          {exp.achievements.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 font-body text-sm leading-relaxed text-muted"
                            >
                              <span className="mt-0.5 font-mono text-spidey-red">
                                *
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {exp.technologies?.length > 0 && (
                        <p className="font-mono text-[11px] text-dim">
                          {exp.technologies.join(" · ")}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </ComicReveal>
    </section>
  );
};
