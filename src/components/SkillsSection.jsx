import { stack } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComicReveal } from "@/components/ui/ComicReveal";

const groups = [
  { key: "languages", label: "LANGUAGES", items: stack.languages },
  { key: "frontend", label: "FRONTEND", items: stack.frontend },
  { key: "backend", label: "BACKEND", items: stack.backend },
  { key: "data", label: "DATA", items: stack.data },
  { key: "infra", label: "INFRA", items: stack.infra },
];

export const SkillsSection = () => {
  return (
    <section id="stack" className="scroll-mt-24">
      <SectionHeading ordinal="05" kicker="Gadgets" title="Stack" sub="What I reach for when building. No skill meters." />
      <ComicReveal className="panel accent-blue">

        <div className="py-2">
          <div>
            {groups.map((group, index) => (
              <div
                key={group.key}
                className={
                  index === 0 ? "" : "border-t border-line"
                }
              >
                <div className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr] sm:items-baseline sm:px-7">
                  <p className="font-mono text-[10.5px] tracking-[0.16em] text-dim">
                    {group.label}
                  </p>
                  <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-fg">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComicReveal>
    </section>
  );
};
