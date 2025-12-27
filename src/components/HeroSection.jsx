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
      className="relative min-h-screen grid grid-rows-[1fr_auto_auto] items-center px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20"
    >
      {/* Main content area with top padding for navbar clearance */}
      <div 
        className="w-full max-w-7xl mx-auto text-center z-10 self-center"
        style={{
          paddingTop: 'clamp(2rem, 8vh, 4rem)'
        }}
      >
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10">
          {/* Clean Profile Image with viewport-based sizing */}
          <div className="relative inline-block mb-2 sm:mb-4 md:mb-6">
            <img
              src="/projects/profile.jpeg"
              alt="Ashish Prasad"
              className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 aspect-square mx-auto rounded-full border-2 sm:border-4 border-primary/20 shadow-xl opacity-0 animate-fade-in object-cover"
              style={{
                minWidth: 'clamp(6rem, 15vw, 16rem)',
                minHeight: 'clamp(6rem, 15vw, 16rem)',
                maxWidth: '16rem',
                maxHeight: '16rem'
              }}
            />
          </div>

          {/* Dynamic Greeting with viewport-based text */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            <h1 
              className="font-bold tracking-tight opacity-0 animate-fade-in-delay-1 leading-tight"
              style={{
                fontSize: 'clamp(1.75rem, 8vw, 5rem)',
                lineHeight: 'clamp(1.1, 1.2, 1.3)'
              }}
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Ashish
              </span>
            </h1>
            
            {/* Animated Role Switcher */}
            <div className="opacity-0 animate-fade-in-delay-2">
              <p 
                className="font-semibold text-muted-foreground"
                style={{
                  fontSize: 'clamp(1rem, 5vw, 2.5rem)',
                  lineHeight: 'clamp(1.2, 1.3, 1.4)'
                }}
              >
                I'm a{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {roles[currentRole]}
                </span>
              </p>
            </div>
          </div>

          {/* Enhanced Description with viewport-based sizing */}
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
            <p 
              className="text-muted-foreground opacity-0 animate-fade-in-delay-3 leading-relaxed"
              style={{
                fontSize: 'clamp(0.875rem, 3.5vw, 1.5rem)',
                lineHeight: 'clamp(1.4, 1.6, 1.8)'
              }}
            >
              Crafting <span className="text-primary font-semibold">intelligent solutions</span> with modern technologies. 
              From AI-powered applications to scalable web platforms, I transform ideas into 
              <span className="text-primary font-semibold"> production-ready systems</span> that make a real impact.
            </p>
          </div>
        </div>
      </div>

      {/* Button section with reasonable spacing */}
      <div 
        className="w-full max-w-7xl mx-auto text-center z-10 self-end"
        style={{
          paddingBottom: 'clamp(3rem, 8vh, 5rem)'
        }}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-lg sm:max-w-none opacity-0 animate-fade-in-delay-4">
          <a 
            href="#projects" 
            className="cosmic-button inline-flex items-center gap-2 sm:gap-3 group w-full sm:w-auto justify-center"
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)'
            }}
          >
            <Code className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>View My Work</span>
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-125 transition-transform duration-300" />
          </a>
          
          <a 
            href="#contact" 
            className="rounded-full border-2 border-primary/50 text-foreground hover:border-primary hover:bg-primary/10 transition-all duration-300 font-semibold inline-flex items-center gap-2 sm:gap-3 group backdrop-blur-sm w-full sm:w-auto justify-center"
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
              fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)'
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Let's Talk</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator in its own grid row */}
      <div 
        className="w-full flex justify-center items-end z-10"
        style={{
          minHeight: 'clamp(2rem, 8vh, 4rem)'
        }}
      >
        <div className="flex flex-col items-center animate-bounce opacity-0 animate-fade-in-delay-4">
          <div 
            className="border-2 border-primary/50 rounded-full flex justify-center mb-2"
            style={{
              width: 'clamp(1.25rem, 3vw, 1.5rem)',
              height: 'clamp(2rem, 5vw, 2.5rem)'
            }}
          >
            <div 
              className="bg-primary rounded-full animate-pulse"
              style={{
                width: 'clamp(0.25rem, 1vw, 0.375rem)',
                height: 'clamp(0.5rem, 2vw, 0.75rem)',
                marginTop: 'clamp(0.25rem, 1vw, 0.5rem)'
              }}
            ></div>
          </div>
          <span 
            className="text-muted-foreground"
            style={{
              fontSize: 'clamp(0.625rem, 2vw, 0.75rem)'
            }}
          >
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
};