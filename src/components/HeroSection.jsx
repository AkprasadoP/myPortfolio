import { motion } from "framer-motion";
import { site, leetcode, projects } from "@/data/site";
import { scrollToSection as scrollTo } from "@/lib/scroll";

const rise = (delay) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export const HeroSection = () => {
  const [first, ...rest] = site.name.split(" ");

  return (
    <section id="home" className="relative scroll-mt-24">
      <motion.div {...rise(0)} className="hero-dateline mb-8 sm:mb-10">
        <span className="text-spidey-red">● {site.location}</span>
        <span>{site.currentRole}</span>
        <span className="hidden sm:inline">B.Tech CSE · IIIT Jabalpur ’26</span>
        <span className="text-fg">Open to full-time SDE roles</span>
      </motion.div>

      <div className="grid items-end gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
        <div>
          <motion.h1 {...rise(0.08)} className="hero-name">
            {first}
            <span className="hero-name__last">{rest.join(" ")}</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="hero-role mt-6">
            Software engineer — <strong>{site.focus}</strong>
          </motion.p>

          <motion.p {...rise(0.22)} className="hero-tagline mt-5">
            I build backend systems and AI tooling, then go looking for how
            they break — <em>before anyone else notices.</em>
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="btn-system btn-system-primary"
            >
              View work →
            </button>
            <a href={site.resumeUrl} download className="btn-system">
              Résumé
            </a>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-system"
            >
              Get in touch
            </button>
          </motion.div>
        </div>

        <motion.figure
          {...rise(0.2)}
          className="hero-portrait reg-marks mx-auto w-full max-w-[260px] lg:max-w-none"
        >
          <div className="hero-portrait__img">
            <img src={site.profileImage} alt={site.name} />
          </div>
          <figcaption className="hero-portrait__caption">
            <span>Subject · A. Prasad</span>
            <span className="text-spidey-red">Active</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Proof strip — the numbers are the hero */}
      <motion.div {...rise(0.34)} className="mt-14 sm:mt-16">
        <div className="proof-strip">
          <div className="proof-cell">
            <p className="proof-value">{leetcode.solved}<sup>01</sup></p>
            <p className="proof-label">problems solved</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value">{leetcode.contest.rating}<sup>02</sup></p>
            <p className="proof-label">contest rating</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value">{projects.length}<sup>03</sup></p>
            <p className="proof-label">shipped projects</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value">3<sup>04</sup></p>
            <p className="proof-label">internships</p>
          </div>
        </div>
        <p className="proof-footnotes">
          01 leetcode.com/u/{leetcode.handle} · 02 top {leetcode.contest.topPct} globally ·
          03 detailed below · 04 classplus / ai talent force / bluestack
        </p>
      </motion.div>
    </section>
  );
};
