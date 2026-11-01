import { useEffect, useState } from "react";
import { experiments } from "@/data/site";
import { WebShooterGame } from "@/components/WebShooterGame";
import { ComicReveal } from "@/components/ui/ComicReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { onSystem, EV } from "@/lib/system-bus";

export const ExperimentsSection = () => {
  // The game is opt-in: nothing loads until someone asks for it.
  const [gameOpen, setGameOpen] = useState(false);

  useEffect(() => onSystem(EV.WEBSHOOTER_START, () => setGameOpen(true)), []);

  return (
    <section id="experiments" className="scroll-mt-24">
      <SectionHeading
        ordinal="07"
        kicker="Lab notes"
        title="Currently exploring"
        sub="What I’m actively learning and building toward."
      />
      <ComicReveal>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {experiments.map((exp) => (
            <article key={exp.id} className="bg-bg p-5 text-left sm:p-6">
              <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.16em]">
                <span className="text-dim">{exp.id}</span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-spidey-red" />
                  {exp.status}
                </span>
              </div>
              <h3 className="text-base font-semibold tracking-tight text-fg">
                {exp.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {exp.note}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6">
          {gameOpen ? (
            <WebShooterGame autoStart />
          ) : (
            <button
              type="button"
              onClick={() => setGameOpen(true)}
              className="group flex w-full items-center justify-between gap-4 border border-dashed border-line-strong px-5 py-4 text-left transition-colors hover:border-spidey-red"
            >
              <span>
                <span className="block font-mono text-[10px] tracking-[0.16em] text-dim">
                  SIDE PROJECT · CANVAS GAME
                </span>
                <span className="mt-1 block text-sm text-fg">
                  web_shooter.exe — squash bugs before they reach production
                </span>
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted transition-colors group-hover:text-spidey-red">
                PLAY →
              </span>
            </button>
          )}
        </div>
      </ComicReveal>
    </section>
  );
};
