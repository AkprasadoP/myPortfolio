import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { DailyBugleBanner } from "@/components/ui/DailyBugleBanner";
import { SpiderManAvatar } from "@/components/ui/SpiderManAvatar";
import { SpiderFigure } from "@/components/ui/SpiderFigure";
import { spideyColors, rgba } from "@/lib/spidey-colors";
import { webSwingTo } from "@/lib/swing";

const scrollTo = (id) => {
  const element = document.getElementById(id);
  const main = document.getElementById("main-scroll-area");
  if (element && main) {
    main.scrollTo({ top: element.offsetTop - 8, behavior: "smooth" });
  }
};

export const HeroSection = () => {
  const [burst, setBurst] = useState(0);
  const sectionRef = useRef(null);
  const figureRef = useRef(null);
  const shotRef = useRef(null);
  const boltsRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const drawFrame = () => {
    const canvas = shotRef.current;
    const ctx = canvas?.getContext?.("2d");
    if (!canvas || !ctx) {
      rafRef.current = 0;
      return;
    }
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) {
      rafRef.current = 0;
      return;
    }
    const w = rect.width;
    const h = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== w * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    ctx.clearRect(0, 0, w, h);

    const { redRGB } = spideyColors();
    boltsRef.current.forEach((b) => {
      b.t += 0.06;
      const p = Math.min(1, b.t);
      const alpha = Math.max(0, 1 - p) * 0.95;
      ctx.beginPath();
      ctx.moveTo(b.ox, b.oy);
      ctx.quadraticCurveTo(b.cx, b.cy, b.tx, b.ty);
      ctx.strokeStyle = rgba(redRGB, alpha);
      ctx.lineWidth = 1.8;
      ctx.stroke();
      if (p < 0.3) {
        ctx.beginPath();
        ctx.strokeStyle = rgba(redRGB, alpha);
        ctx.lineWidth = 1;
        ctx.arc(b.tx, b.ty, 10 - p * 10, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    const remaining = boltsRef.current.filter((b) => b.t < 1);
    boltsRef.current = remaining;
    if (remaining.length) {
      rafRef.current = requestAnimationFrame(drawFrame);
    } else {
      rafRef.current = 0;
      ctx.clearRect(0, 0, w, h);
    }
  };

  const fireFromFigure = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    const fig = figureRef.current?.getBoundingClientRect();
    if (!rect || !fig) return;

    // aim from figure hands (viewBox ~88,120 → scaled figure)
    const ox = fig.left - rect.left + fig.width * 0.34;
    const oy = fig.top - rect.top + fig.height * 0.32;
    const tx = e.clientX - rect.left;
    const ty = e.clientY - rect.top;
    const dist = Math.hypot(tx - ox, ty - oy) || 1;
    const ux = (tx - ox) / dist;
    const uy = (ty - oy) / dist;
    const perp = { x: -uy, y: ux };
    const cx = (ox + tx) / 2 + perp.x * dist * 0.14;
    const cy = (oy + ty) / 2 + perp.y * dist * 0.14;

    boltsRef.current.push({ ox, oy, cx, cy, tx, ty, t: 0 });
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(drawFrame);
    }
  };

  const scrollToAndSwing = (id) => {
    webSwingTo(id);
    scrollTo(id);
  };

  const thwip = () => {
    setBurst((b) => b + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerDown={fireFromFigure}
      className="hero-web-bg relative scroll-mt-4 pt-3 sm:pt-8 lg:pb-28"
    >
      {/* Corner web accents */}
      <div className="web-corner web-corner--tl" aria-hidden="true" />
      <div
        className="web-corner web-corner--br md:hidden"
        aria-hidden="true"
      />

      {/* web-sling canvas overlay (figure fires at clicks) */}
      <canvas
        ref={shotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3]"
      />

      {/* THWIP easter-egg burst overlay */}
      {burst > 0 && (
        <div key={burst} className="thwip-burst">
          <div className="thwip-burst__ring" />
          <span className="thwip-burst__label">THWIP!</span>
        </div>
      )}

      {/* Mobile Spidey strip — mask + figure so phones aren't Spidey-less */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mobile-spidey-strip mb-4 flex items-end justify-between gap-3 md:hidden"
      >
        <button
          type="button"
          onClick={thwip}
          aria-label="Fire a web"
          className="relative flex flex-col items-center"
        >
          <span className="mb-1 h-5 w-px bg-gradient-to-b from-transparent to-spidey-red" />
          <span className="mask-float">
            <SpiderManAvatar
              size={72}
              className="drop-shadow-[0_6px_12px_rgba(230,36,41,0.45)]"
            />
          </span>
          <span className="mt-1 font-mono text-[8px] tracking-[0.18em] text-spidey-red">
            TAP · THWIP
          </span>
        </button>

        <div className="min-w-0 flex-1 self-center border border-line bg-inset/80 px-3 py-2">
          <p className="font-mono text-[9px] tracking-[0.16em] text-crt">
            ● SPIDER-SENSE ONLINE
          </p>
          <p className="mt-1 truncate font-mono text-[10px] text-muted">
            {site.currentRole}
          </p>
          <p className="mt-0.5 font-mono text-[9px] tracking-[0.08em] text-dim">
            NYC NIGHT · MOBILE PATROL
          </p>
        </div>

        <div className="figure-swing pointer-events-none opacity-90" aria-hidden="true">
          <SpiderFigure
            width={78}
            height={102}
            className="drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)]"
          />
        </div>
      </motion.div>

      {/* Desktop hanging mask */}
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.7, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.45 }}
        onClick={thwip}
        aria-label="Fire a web"
        className="group absolute -right-1 top-1 z-[4] hidden cursor-pointer md:block"
      >
        <div className="absolute -top-7 left-1/2 flex h-8 w-px -translate-x-1/2 flex-col items-center">
          <span className="h-full w-px bg-gradient-to-b from-transparent via-spidey-red to-spidey-red/80" />
        </div>
        <div className="mask-float transition-transform duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(230,36,41,0.55)]">
          <SpiderManAvatar
            size={132}
            className="drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]"
          />
        </div>
        <p className="mt-1 text-center font-mono text-[8px] tracking-[0.2em] text-dim transition-colors group-hover:text-spidey-red">
          THE MASK · THWIP
        </p>
      </motion.button>

      {/* Desktop hang-down figure */}
      <motion.div
        ref={figureRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="pointer-events-none absolute -left-2 top-12 z-[1] hidden lg:block"
        aria-hidden="true"
      >
        <div className="figure-swing opacity-85">
          <SpiderFigure
            width={168}
            height={220}
            className="drop-shadow-[0_12px_24px_rgba(230,36,41,0.35)]"
          />
        </div>
      </motion.div>

      {/* Daily Bugle headline banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 sm:mb-8"
      >
        <DailyBugleBanner />
      </motion.div>

      {/* Asymmetric desk layout — objects, not a balanced card pair */}
      <div className="relative flex flex-col gap-6 lg:block lg:min-h-[28rem]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
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
              <h2 className="mt-2 font-display text-[1.85rem] leading-[1.05] tracking-wide text-cream sm:text-5xl">
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
                onClick={() => scrollToAndSwing("projects")}
                className="btn-system btn-system-primary"
              >
                [ projects ]
              </button>
              <button
                type="button"
                onClick={() => scrollToAndSwing("notes")}
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
          transition={{ duration: 0.45, delay: 0.18 }}
          className="panel accent-blue relative mx-auto w-full max-w-sm lg:absolute lg:right-0 lg:top-14 lg:z-[5] lg:mx-0 lg:w-[38%]"
        >
          <div className="web-corner web-corner--br" aria-hidden="true" />
          <div className="panel-header">
            <span>id_card.jpg</span>
            <span>local · peter-parker mode</span>
          </div>

          <div className="relative p-4 sm:px-4 sm:pb-4 sm:pt-5">
            <div className="relative mx-auto max-w-[180px] rotate-[-2deg] border border-line-strong bg-[#d9d0bc] p-2 pb-3 shadow-[3px_4px_0_rgba(0,0,0,0.35)] sm:max-w-[190px]">
              {/* web-tape strip */}
              <div className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-spidey-red/80" />
              <div className="aspect-[4/5] overflow-hidden border border-[#b8ae98] bg-[#cfc5b0]">
                <img
                  src={site.profileImage}
                  alt={site.name}
                  className="h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
                />
              </div>
              <p className="mt-2 text-center font-mono text-[11px] text-[#3f382c]">
                ashish / 2026 · &ldquo;with great power&hellip;&rdquo;
              </p>
            </div>

            <div className="hand-note absolute -right-1 top-10 hidden max-w-[120px] space-y-1 lg:block">
              <p>← that&apos;s me, unfortunately</p>
              <p className="text-[10px]">[status: friendly neighborhood dev]</p>
            </div>

            <p className="mt-3 text-center font-mono text-[10px] tracking-[0.08em] text-dim lg:hidden">
              [status: friendly neighborhood dev]
            </p>

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
