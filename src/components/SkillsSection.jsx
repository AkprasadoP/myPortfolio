import { motion } from "framer-motion";
import { stack } from "@/data/site";
import { WebShooterGame } from "@/components/WebShooterGame";

const groups = [
  { key: "languages", label: "LANGUAGES", items: stack.languages },
  { key: "frontend", label: "FRONTEND", items: stack.frontend },
  { key: "backend", label: "BACKEND", items: stack.backend },
  { key: "data", label: "DATA", items: stack.data },
  { key: "infra", label: "INFRA", items: stack.infra },
];

export const SkillsSection = () => {
  return (
    <section id="stack" className="scroll-mt-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="panel accent-red"
      >
        <div className="panel-header">
          <span>GADGETS / STACK</span>
          <span>system inventory</span>
        </div>

        <div className="p-5 sm:p-7">
          <p className="mb-6 max-w-2xl font-mono text-xs leading-relaxed text-dim">
            Configuration readout — what I reach for when building. No skill
            meters. No progress bars.
          </p>

          <div className="space-y-0 border border-line bg-inset">
            {groups.map((group, index) => (
              <div
                key={group.key}
                className={
                  index === 0 ? "" : "border-t border-dotted border-line-strong"
                }
              >
                <div className="grid gap-3 px-4 py-4 sm:grid-cols-[140px_1fr] sm:items-start">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-spidey-red">
                    {group.label}
                  </p>
                  <p className="font-mono text-sm leading-7 text-fg">
                    {group.items.join("   ")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <WebShooterGame />
        </div>
      </motion.div>
    </section>
  );
};
