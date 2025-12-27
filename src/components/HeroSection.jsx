import { ArrowDown, Code, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Full-Stack Developer",
    "AI Engineer", 
    "Problem Solver",
    "Tech Innovator"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-5xl mx-auto text-center z-10">
        <div className="space-y-8">
          {/* Clean Profile Image */}
          <div className="relative inline-block mb-8">
            <img
              src="/projects/profile.jpeg"
              alt="Ashish Prasad"
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 aspect-square mx-auto rounded-full border-4 border-primary/20 shadow-xl opacity-0 animate-fade-in object-cover"
            />
          </div>

          {/* Dynamic Greeting */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight opacity-0 animate-fade-in-delay-1">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Ashish
              </span>
            </h1>
            
            {/* Animated Role Switcher */}
            <div className="opacity-0 animate-fade-in-delay-2">
              <p className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                I'm a{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {roles[currentRole]}
                </span>
              </p>
            </div>
          </div>

          {/* Enhanced Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-delay-3 leading-relaxed">
            Crafting <span className="text-primary font-semibold">intelligent solutions</span> with modern technologies. 
            From AI-powered applications to scalable web platforms, I transform ideas into 
            <span className="text-primary font-semibold"> production-ready systems</span> that make a real impact.
          </p>

          {/* Multiple Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 opacity-0 animate-fade-in-delay-4">
            <a 
              href="#projects" 
              className="cosmic-button inline-flex items-center gap-3 group text-lg px-8 py-4"
            >
              <Code className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>View My Work</span>
              <Zap className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 font-semibold inline-flex items-center gap-3 group text-lg backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Let's Talk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Complex Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-0 animate-fade-in-delay-4">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center mb-2">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
      </div>
    </section>
  );
};