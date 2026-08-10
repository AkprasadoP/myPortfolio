import { motion } from "framer-motion";
import { site } from "@/data/site";

const scrollTo = (id) => {
  const element = document.getElementById(id);
  const main = document.getElementById("main-scroll-area");
  if (element && main) {
    main.scrollTo({ top: element.offsetTop - 8, behavior: "smooth" });
  }
};

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="hero-web-bg relative scroll-mt-4 pt-4 sm:pt-8 lg:pb-28"
    >
      {/* Asymmetric desk layout — objects, not a balanced card pair */}
      <div className="relative flex flex-col gap-6 lg:block lg:min-h-[28rem]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="panel accent-red lg:absolute lg:left-0 lg:top-0 lg:z-10 lg:w-[58%]"
        >
          <div className="panel-header">
            <span>dossier.txt</span>
            <span>read-only</span>
          </div>

          <div className="space-y-5 p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-[0.12em] text-dim">
              <span>
                SYSTEM STATUS: <span className="text-crt">{site.status}</span>
              </span>
              <span className="text-line-strong">/</span>
              <span>LAST UPDATED: {site.lastUpdated}</span>
              <span className="text-line-strong">/</span>
              <span>BUILD: {site.build}</span>
            </div>

            <div>
              <p className="eyebrow">PERSONAL SYSTEM</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide text-cream sm:text-5xl">
                {site.name.toUpperCase()}
              </h2>
              <p className="mt-3 font-mono text-sm text-spidey-red">
                {site.role}
              </p>
              <p className="mt-1 font-mono text-xs tracking-[0.08em] text-muted">
                {site.focus}
              </p>
              <p className="mt-2 font-mono text-xs text-spidey-blue">
                {site.currentRole}
              </p>
            </div>

            <p className="max-w-xl border-l-2 border-spidey-red/50 pl-3 font-body text-[15px] leading-relaxed text-fg italic">
              &ldquo;{site.tagline}&rdquo;
            </p>

            <p className="font-mono text-xs text-dim">{site.location}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="btn-system btn-system-primary"
              >
                [ projects ]
              </button>
              <button
                type="button"
                onClick={() => scrollTo("notes")}
                className="btn-system"
              >
                [ notes ]
              </button>
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="panel accent-blue relative mx-auto w-full max-w-sm lg:absolute lg:right-0 lg:top-14 lg:z-[5] lg:mx-0 lg:w-[38%]"
        >
          <div className="panel-header">
            <span>id_card.jpg</span>
            <span>local</span>
          </div>

          <div className="relative p-4 sm:px-4 sm:pb-4 sm:pt-5">
            <div className="mx-auto max-w-[180px] rotate-[-2deg] border border-line-strong bg-[#d9d0bc] p-2 shadow-[3px_4px_0_rgba(0,0,0,0.35)] sm:max-w-[190px]">
              <div className="aspect-[4/5] overflow-hidden border border-[#b8ae98] bg-[#cfc5b0]">
                <img
                  src={site.profileImage}
                  alt={site.name}
                  className="h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
                />
              </div>
              <p className="mt-2 text-center font-mono text-[11px] text-[#3f382c]">
                ashish / 2026
              </p>
            </div>

            <div className="hand-note absolute -right-1 top-10 hidden max-w-[120px] space-y-1 lg:block">
              <p>← that&apos;s me, unfortunately</p>
              <p className="text-[10px]">[status: friendly neighborhood dev]</p>
            </div>

            <div className="mt-4 space-y-1 border-t border-dotted border-line-strong pt-3 font-mono text-[11px] text-muted">
              <p className="text-cream">{site.currentRole}</p>
              <p>{site.location}</p>
              <p className="text-dim">IIIT Jabalpur · class of 2026</p>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};
