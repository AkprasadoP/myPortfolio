import { motion } from "framer-motion";
import { experiments } from "@/data/site";
import { ScannerFeed } from "@/components/ScannerFeed";

export const ExperimentsSection = () => {
  return (
    <section id="experiments" className="scroll-mt-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="panel accent-blue"
      >
        <div className="panel-header">
          <span>FIELD TESTS</span>
          <span>lab notebook</span>
        </div>

        <div className="p-5 sm:p-7">
          <p className="mb-5 max-w-xl font-mono text-xs leading-relaxed text-dim">
            Things I&apos;m actively learning and building toward — not a list of
            achievements.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            {experiments.map((exp) => (
              <article
                key={exp.id}
                className="border border-line bg-inset p-4 text-left"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-[0.12em] text-spidey-blue">
                    {exp.id}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-crt">
                    STATUS: {exp.status}
                  </span>
                </div>
                <h3 className="font-ui text-sm tracking-wide text-cream">
                  {exp.title}
                </h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted">
                  {exp.note}
                </p>
              </article>
            ))}
          </div>

          <ScannerFeed />
        </div>
      </motion.div>
    </section>
  );
};
