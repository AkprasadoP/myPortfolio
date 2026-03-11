import { Briefcase, Code, GraduationCap, Rocket, Heart, Award, Target } from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="w-full max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Me
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Passionate full-stack developer crafting innovative solutions with modern technologies. 
            From concept to deployment, I bring ideas to life through clean code and thoughtful design.
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/30 to-transparent" />
        </motion.div>

        {/* Content Cards */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-100">My Journey</h3>
              </div>

              <p className="text-zinc-400 leading-relaxed text-[15px] sm:text-base mb-4">
                Pursuing a Bachelor of Technology in Computer Science at{" "}
                <span className="text-blue-400 font-semibold">IIIT Jabalpur</span>,
                I've built a strong foundation in Algorithms, Data Structures, Operating Systems, and DBMS.
                Through internships at{" "}
                <span className="text-blue-400 font-semibold">AI Talent Force (Japan)</span> and{" "}
                <span className="text-blue-400 font-semibold">BlueStack</span>, I've gained hands-on experience in
                AI-powered cybersecurity, full-stack development, and production-grade system deployment.
              </p>

              <p className="text-zinc-400 leading-relaxed text-[15px] sm:text-base">
                I've successfully built and deployed multiple{" "}
                <span className="text-blue-400 font-semibold">AI-powered applications</span> including
                cybersecurity platforms, weather assistants, and document intelligence systems. My work spans from{" "}
                <span className="text-blue-400 font-semibold">Chrome extensions</span> and{" "}
                <span className="text-blue-400 font-semibold">RAG implementations</span> to
                scalable backend APIs, with several projects actively serving real users in production.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-100">Technical Expertise</h3>
              </div>

              <p className="text-zinc-400 leading-relaxed text-[15px] sm:text-base">
                Specializing in{" "}
                <span className="text-emerald-400 font-semibold">AI-powered full-stack development</span>,
                I work with cutting-edge technologies including{" "}
                <span className="text-emerald-400 font-semibold">Google Gemini AI</span>,{" "}
                <span className="text-emerald-400 font-semibold">FastAPI</span>, and{" "}
                <span className="text-emerald-400 font-semibold">Chrome Extensions</span>.
                My expertise spans React, TypeScript, Node.js, Python, and cloud deployment, with a focus on building
                intelligent systems that solve real-world problems — from cybersecurity platforms achieving 89% F1 scores
                to bilingual AI assistants and document intelligence systems.
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("main-scroll-area").scrollTo({
                  top: document.getElementById("contact").offsetTop - 40,
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all hover:shadow-lg hover:shadow-white/10 group"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Let's Connect
            </a>

            <a
              href="/projects/AshishPrasad.pdf"
              download
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-all group"
            >
              <Award className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Code,
              title: "Full-Stack Development",
              desc: "Engineering scalable web applications using modern frameworks and clean architectural practices.",
              gradient: "from-blue-500 to-cyan-500",
              shadow: "shadow-blue-500/20",
              hover: "group-hover:text-cyan-400",
            },
            {
              icon: Rocket,
              title: "AI & Innovation",
              desc: "Building intelligent systems and integrating machine learning solutions into real-world applications.",
              gradient: "from-purple-500 to-pink-500",
              shadow: "shadow-purple-500/20",
              hover: "group-hover:text-purple-400",
            },
            {
              icon: Target,
              title: "Problem Solving",
              desc: "Tackling complex challenges through algorithmic thinking and delivering innovative solutions.",
              gradient: "from-green-500 to-emerald-600",
              shadow: "shadow-emerald-500/20",
              hover: "group-hover:text-emerald-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#09090b] border border-white/[0.06] hover:border-white/15 transition-all text-center group"
            >
              <div
                className={`p-3 rounded-2xl bg-gradient-to-r ${item.gradient} text-white ${item.shadow} shadow-lg mx-auto mb-5 w-fit group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h4
                className={`font-bold text-lg text-zinc-100 mb-3 ${item.hover} transition-colors duration-300`}
              >
                {item.title}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "3+", label: "Years Coding", gradient: "from-blue-400 to-cyan-400" },
            { value: "15+", label: "Projects Built", gradient: "from-purple-400 to-pink-400" },
            { value: "10+", label: "Technologies", gradient: "from-green-400 to-emerald-400" },
            { value: "2", label: "Internships", gradient: "from-orange-400 to-red-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all"
            >
              <div
                className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}
              >
                {stat.value}
              </div>
              <div className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};