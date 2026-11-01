import { about, site } from "@/data/site";
import { ComicReveal } from "@/components/ui/ComicReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const AboutSection = () => {
  return (
    <section id="notes" className="scroll-mt-24">
      <SectionHeading ordinal="01" kicker="Civilian file" title="About" />
      <ComicReveal className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div className="space-y-5 text-left text-[15px] leading-relaxed sm:text-base">
          <p className="text-lg font-medium leading-snug tracking-tight text-fg sm:text-xl">
            I&apos;m Ashish — I build backend systems and AI tooling, and
            I like taking complicated systems apart to see why they work.
          </p>
          <p className="text-muted">
            B.Tech Computer Science, IIIT Jabalpur (2026) —{" "}
            {about.foundations.join(", ")}. Currently{" "}
            <span className="text-fg">SDE Intern at Classplus</span> in
            Noida, working on production application security. Previously{" "}
            <span className="text-fg">AI Talent Force (Japan)</span> and{" "}
            <span className="text-fg">BlueStack</span> — AI security
            pipelines, APIs, and systems that hold up after deploy.
          </p>

          <div className="pt-2">
            <p className="meta-label mb-3">Currently interested in</p>
            <ul className="flex flex-wrap gap-2">
              {about.interests.map((item) => (
                <li
                  key={item}
                  className="border border-line px-2.5 py-1 font-mono text-[11px] tracking-[0.04em] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <dl className="grid grid-cols-2 border-t border-line-strong">
            {about.stats.map((stat, i) => (
              <div
                key={stat.key}
                className={`flex flex-col border-b border-line py-4 ${i % 2 ? "pl-5 border-l" : "pr-5"}`}
              >
                <dt className="order-2 mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-4xl leading-none text-fg">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <blockquote className="border-l border-spidey-red pl-4">
            <p className="text-[15px] italic leading-relaxed text-muted">
              “{site.tagline}”
            </p>
            <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              — working motto
            </footer>
          </blockquote>
        </aside>
      </ComicReveal>
    </section>
  );
};
