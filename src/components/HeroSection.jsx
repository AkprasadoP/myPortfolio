import { motion } from "framer-motion";
import { site, leetcode, projects } from "@/data/site";
import { DailyBugleBanner } from "@/components/ui/DailyBugleBanner";
import { webSwingTo } from "@/lib/swing";
import { useComicBurst, ComicBursts } from "@/components/ui/ComicBurst";

const scrollTo = (id) => {
  const element = document.getElementById(id);
  const main = document.getElementById("main-scroll-area");
  if (element && main) {
    main.scrollTo({ top: element.offsetTop - 8, behavior: "smooth" });
  }
};

export const HeroSection = () => {
  const [bursts, fireBurst] = useComicBurst();

  const scrollToAndSwing = (id) => {
    webSwingTo(id);
    scrollTo(id);
  };

  return (
    <section id="home" className="hero-glow relative scroll-mt-4 pt-3 sm:pt-8">
      <ComicBursts bursts={bursts} />

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5 sm:mb-7"
      >
        <DailyBugleBanner />
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="panel accent-red"
        >
          <div className="panel-header">
            <span>dossier.txt</span>
            <span>read-only</span>
          </div>

          <div className="space-y-5 p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.08em] text-dim">
              <span>
                STATUS <span className="text-crt">● {site.status}</span>
              </span>
              <span className="text-line-strong">/</span>
              <span>{site.lastUpdated}</span>
              <span className="text-line-strong">/</span>
              <span>{site.build}</span>
            </div>

            <div>
              <h2 className="hero-name text-fg">
                {site.name}
              </h2>
              <p className="mt-3 text-[15px] font-semibold tracking-tight text-spidey-red">
                {site.role} — {site.focus}
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                {site.currentRole}
              </p>
            </div>

            <p className="max-w-xl border-l-2 border-spidey-red pl-3 text-[15px] leading-relaxed text-muted">
              {site.tagline}
            </p>

            <p className="font-mono text-xs text-dim">{site.location}</p>
            <p className="mt-1 font-mono text-xs text-crt">
              ◉ {site.availability.label} — replies within ~48h
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => { scrollToAndSwing("projects"); fireBurst(); }}
                className="btn-system btn-system-primary"
              >
                projects
              </button>
              <button
                type="button"
                onClick={() => { scrollToAndSwing("notes"); fireBurst(); }}
                className="btn-system"
              >
                about
              </button>
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="panel accent-blue"
        >
          <div className="panel-header">
            <span>id.jpg</span>
            <span>local</span>
          </div>

          <div className="p-4">
            <div className="mx-auto max-w-[200px] border border-line bg-inset p-2">
              <div className="aspect-[4/5] overflow-hidden bg-inset">
                <img
                  src={site.profileImage}
                  alt={site.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 text-center font-mono text-[11px] text-muted">
                ashish · 2026
              </p>
            </div>

            <div className="mt-4 space-y-1 border-t border-line pt-3 font-mono text-[11px] text-muted">
              <p className="text-fg">{site.currentRole}</p>
              <p>{site.location}</p>
              <p className="text-dim">IIIT Jabalpur · class of 2026</p>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Proof strip — the numbers are the hero (Tinybird/Ferrite move) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.26 }}
        className="mt-5"
      >
        <div className="proof-strip">
          <div className="proof-cell">
            <p className="proof-value">{leetcode.solved}<sup>¹</sup></p>
            <p className="proof-label">problems solved</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value">{leetcode.contest.rating}<sup>²</sup></p>
            <p className="proof-label">contest rating</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value">{projects.length}<sup>³</sup></p>
            <p className="proof-label">case files</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value">3<sup>⁴</sup></p>
            <p className="proof-label">internships</p>
          </div>
        </div>
        <p className="proof-footnotes">
          ¹ leetcode.com/u/{leetcode.handle} · ² top {leetcode.contest.topPct} globally ·
          ³ full readouts below · ⁴ classplus / ai talent force / bluestack
        </p>
      </motion.div>
    </section>
  );
};
