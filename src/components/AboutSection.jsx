import { about, site } from "@/data/site";
import Clipping from "@/components/Clipping";
import { ComicReveal } from "@/components/ui/ComicReveal";

export const AboutSection = () => {
  return (
    <section id="notes" className="scroll-mt-4">
      <ComicReveal className="panel accent-blue">
        <div className="panel-header">
          <span>CIVILIAN FILE / ABOUT</span>
          <span>entry #001 · daily bugle</span>
        </div>

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-5 text-left">
            <p className="font-mono text-xs tracking-[0.14em] text-dim">
              Dear Internet,
            </p>

            <div className="space-y-4 font-body text-[15px] leading-relaxed text-fg">
              <p>
                I&apos;m Ashish.
              </p>
              <p>
                I like taking complicated systems apart just to understand why
                they work. Then I usually end up rebuilding them.
              </p>
              <p>
                I graduated from IIIT Jabalpur in 2026 with a B.Tech in Computer
                Science — foundation in {about.foundations.join(", ")}. I&apos;m
                currently an{" "}
                <span className="text-spidey-red">SDE Intern at Classplus</span>{" "}
                in Noida. Earlier roles at{" "}
                <span className="text-spidey-blue">AI Talent Force (Japan)</span>{" "}
                and{" "}
                <span className="text-spidey-blue">BlueStack</span> put that
                curiosity into production — AI cybersecurity, APIs, and systems
                that have to keep working after you ship them.
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
                [ download resume ]
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
                [ open channel ]
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

            <p className="hand-note ml-2">
              TODO: sleep
            </p>
            <p className="font-mono text-[10px] tracking-[0.1em] text-dim">
              works on localhost
            </p>
          </aside>
        </div>
      </ComicReveal>
    </section>
  );
};
