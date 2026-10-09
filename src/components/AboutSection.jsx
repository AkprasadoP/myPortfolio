import { about, site } from "@/data/site";
import Clipping from "@/components/Clipping";
import { ComicReveal } from "@/components/ui/ComicReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const AboutSection = () => {
  return (
    <section id="notes" className="scroll-mt-4">
      <SectionHeading ordinal="02" title="Civilian file" sub="about · entry #001" />
      <ComicReveal className="panel accent-blue">
        <div className="panel-header">
          <span>CIVILIAN FILE / ABOUT</span>
          <span>entry #001 · daily bugle</span>
        </div>

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-5 text-left">
            <div className="space-y-4 text-[15px] leading-relaxed text-fg">
              <p className="font-semibold tracking-tight text-fg">
                I&apos;m Ashish — I build backend systems and AI tooling.
              </p>
              <p className="text-muted">
                I like taking complicated systems apart to understand why
                they work, then rebuilding them simpler.
              </p>
              <p className="text-muted">
                B.Tech Computer Science, IIIT Jabalpur (2026) — {about.foundations.join(", ")}.
                Currently{" "}
                <span className="text-fg">SDE Intern at Classplus</span>{" "}
                in Noida. Previously{" "}
                <span className="text-fg">AI Talent Force (Japan)</span>{" "}
                and{" "}
                <span className="text-fg">BlueStack</span> — production AI
                security, APIs, and systems that hold up after deploy.
              </p>
            </div>

            <div className="border border-line bg-inset p-4">
              <p className="meta-label mb-3">Currently interested in</p>
              <ul className="space-y-1.5 font-mono text-sm text-muted">
                {about.interests.map((item) => (
                  <li key={item}>
                    <span className="text-spidey-red">&gt;</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <a href={site.resumeUrl} download className="btn-system">
                resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  const main = document.getElementById("main-scroll-area");
                  if (el && main) {
                    main.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
                  }
                }}
                className="btn-system btn-system-primary"
              >
                contact
              </a>
            </div>
          </div>

          <aside className="space-y-4 lg:pt-2">
            <div className="border border-line bg-inset p-4">
              <p className="meta-label mb-3">metadata</p>
              <dl className="space-y-3 font-mono text-xs">
                {about.stats.map((stat) => (
                  <div
                    key={stat.key}
                    className="flex items-baseline justify-between gap-3 border-b border-dotted border-line pb-2 last:border-0"
                  >
                    <dt className="text-dim">{stat.label}</dt>
                    <dd className="text-cream">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Clipping date={site.lastUpdated}>
              {site.tagline}
            </Clipping>
          </aside>
        </div>
      </ComicReveal>
    </section>
  );
};
