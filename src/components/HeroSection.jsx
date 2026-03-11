import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center items-start pt-20"
    >
      <div className="w-full max-w-4xl px-4 sm:px-6 z-10">

        {/* Split Layout: Text Left, Photo Right */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Ashish{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Prasad
              </span>
            </motion.h1>

            {/* Animated Roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-4 text-xl sm:text-2xl lg:text-3xl text-zinc-400 font-medium"
            >
              <TypeAnimation
                sequence={[
                  "Full-Stack Developer",
                  2500,
                  "AI Engineer",
                  2500,
                  "Problem Solver",
                  2500,
                ]}
                wrapper="span"
                speed={50}
                className="text-zinc-200"
                repeat={Infinity}
              />
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-3 flex items-center gap-2 text-zinc-500 text-sm justify-center lg:justify-start"
            >
              <MapPin size={14} />
              <span>India &middot; IIIT Jabalpur</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              I build intelligent, production-grade applications — from AI-powered platforms to scalable web systems. Passionate about turning complex problems into elegant solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("main-scroll-area").scrollTo({
                    top: document.getElementById("projects").offsetTop - 40,
                    behavior: "smooth",
                  });
                }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:shadow-lg hover:shadow-white/10"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("main-scroll-area").scrollTo({
                    top: document.getElementById("contact").offsetTop - 40,
                    behavior: "smooth",
                  });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-all"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Right: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            {/* Glow Ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-60 animate-pulse-subtle" />

            {/* Photo Container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 z-10" />
              <img
                src="/projects/profile.jpeg"
                alt="Ashish Prasad"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-2 -right-2 p-2.5 rounded-full bg-[#09090b] border border-white/10 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};