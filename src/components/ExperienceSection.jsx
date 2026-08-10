import { motion } from "framer-motion";
import { experiences } from "@/data/site";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="scroll-mt-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="panel accent-blue"
      >
        <div className="panel-header">
          <span>FIELD LOG</span>
          <span>{experiences.length} entries</span>
        </div>

        <div className="divide-y divide-line">
          {experiences.map((exp) => (
            <article key={exp.id} className="p-5 text-left sm:p-7">
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
                      <span className="mt-0.5 font-mono text-spidey-red">*</span>
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
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
