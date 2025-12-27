import { Briefcase, Code, User, GraduationCap, Rocket, Heart, Award, Target } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="title-decoration"></div>
            <h2 className="enhanced-section-title title-glow">
              About <span className="text-primary">Me</span>
            </h2>
            {/* Floating decorative elements */}
            <div className="floating-icon -top-8 -left-8">
              <User className="w-6 h-6 text-primary/30" />
            </div>
            <div className="floating-icon -top-6 -right-6" style={{ animationDelay: '1s' }}>
              <Code className="w-5 h-5 text-primary/40" />
            </div>
          </div>
          <p className="section-subtitle">
            Passionate full-stack developer crafting innovative solutions with modern technologies.
            From concept to deployment, I bring ideas to life through clean code and thoughtful design.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          {/* Main Content Cards */}
          <div className="space-y-8">
            <div className="modern-card p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">My Journey</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Pursuing a Bachelor of Technology in Computer Science at <span className="text-primary font-semibold">IIIT Jabalpur</span>, 
                I've built a strong foundation in Algorithms, Data Structures, Operating Systems, and DBMS. 
                Through internships at <span className="text-primary font-semibold">AI Talent Force (Japan)</span> and 
                <span className="text-primary font-semibold"> BlueStack</span>, I've gained hands-on experience in 
                AI-powered cybersecurity, full-stack development, and production-grade system deployment.
              </p>
              
              <p className="text-muted-foreground leading-relaxed text-lg">
                I've successfully built and deployed multiple <span className="text-primary font-semibold">AI-powered applications</span> including 
                cybersecurity platforms, weather assistants, and document intelligence systems. My work spans from 
                <span className="text-primary font-semibold"> Chrome extensions</span> and <span className="text-primary font-semibold">RAG implementations</span> to 
                scalable backend APIs, with several projects actively serving real users in production environments.
              </p>
            </div>

            <div className="modern-card p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <Code className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Technical Expertise</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-lg">
                Specializing in <span className="text-primary font-semibold">AI-powered full-stack development</span>, 
                I work with cutting-edge technologies including <span className="text-primary font-semibold">Google Gemini AI</span>, 
                <span className="text-primary font-semibold"> FastAPI</span>, and <span className="text-primary font-semibold">Chrome Extensions</span>. 
                My expertise spans React, TypeScript, Node.js, Python, and cloud deployment, with a focus on building 
                intelligent systems that solve real-world problems—from cybersecurity platforms achieving 89% F1 scores 
                to bilingual AI assistants and document intelligence systems.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a 
              href="#contact" 
              className="cosmic-button inline-flex items-center justify-center gap-3 group text-lg px-10 py-4"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Let's Connect</span>
            </a>

            <a
              href="/projects/AshishPrasad.pdf"
              download
              className="px-10 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold inline-flex items-center justify-center gap-3 group text-lg"
            >
              <Award className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Feature Highlights - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="modern-card p-8 text-center group">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg mx-auto mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
              <Code className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
              Full-Stack Development
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Engineering scalable web applications using modern frameworks and clean architectural practices.
            </p>
          </div>

          <div className="modern-card p-8 text-center group">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg mx-auto mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
              <Rocket className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
              AI & Innovation
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Building intelligent systems and integrating machine learning solutions into real-world applications.
            </p>
          </div>

          <div className="modern-card p-8 text-center group">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg mx-auto mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
              <Target className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
              Problem Solving
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Tackling complex challenges through algorithmic thinking and delivering innovative solutions.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center modern-card p-8">
            <div className="text-4xl font-bold text-primary mb-2">3+</div>
            <div className="text-muted-foreground font-medium">Years Coding</div>
          </div>
          <div className="text-center modern-card p-8">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground font-medium">Projects Built</div>
          </div>
          <div className="text-center modern-card p-8">
            <div className="text-4xl font-bold text-primary mb-2">10+</div>
            <div className="text-muted-foreground font-medium">Technologies</div>
          </div>
          <div className="text-center modern-card p-8">
            <div className="text-4xl font-bold text-primary mb-2">2</div>
            <div className="text-muted-foreground font-medium">Internships</div>
          </div>
        </div>
      </div>
    </section>
  );
};