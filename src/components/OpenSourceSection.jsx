import { openSource } from "@/data/site";
import { ComicReveal } from "@/components/ui/ComicReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const OpenSourceSection = () => {
  return (
    <section id="oss" className="scroll-mt-24">
      <SectionHeading
        ordinal="04"
        kicker="Team-ups"
        title="Open source"
        sub="Fixes merged upstream — real bugs in projects other teams depend on."
      />
      <ComicReveal className="grid gap-px border border-line bg-line lg:grid-cols-2">
        {openSource.map((c) => (
          <article key={c.url} className="flex flex-col bg-bg p-5 text-left sm:p-7">
            <p className="font-mono text-[11px] tracking-[0.06em] text-dim">
              {c.repo} · ★ {c.stars}
            </p>
            <h3 className="mt-1 font-display text-4xl uppercase leading-none text-fg">
              {c.project}
            </h3>
            <p className="mt-1.5 text-[13px] text-muted">{c.blurb}</p>

            <p className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px]">
              <span className="text-spidey-red">PR #{c.pr}</span>
              <span className="inline-flex items-center gap-1.5 border border-crt-dim px-2 py-0.5 text-[10px] tracking-[0.14em] text-crt">
                <span className="h-1.5 w-1.5 rounded-full bg-crt" aria-hidden="true" />
                MERGED · {c.merged.toUpperCase()}
              </span>
            </p>
            <p className="mt-1 text-[15px] font-semibold leading-snug tracking-tight text-fg">
              {c.title}
            </p>

            <dl className="mt-4 space-y-3 text-sm leading-relaxed">
              <div>
                <dt className="meta-label">Bug</dt>
                <dd className="mt-1 text-muted">{c.problem}</dd>
              </div>
              <div>
                <dt className="meta-label">Fix</dt>
                <dd className="mt-1 text-muted">{c.fix}</dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
              <p className="font-mono text-[11px] text-dim">{c.tags.join(" · ")}</p>
              <a href={c.url} target="_blank" rel="noreferrer" className="btn-system">
                View PR ↗
              </a>
            </div>
          </article>
        ))}
      </ComicReveal>
    </section>
  );
};
