import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Default to dark mode for new visitors or if no preference is stored
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-6 right-6 z-50 w-14 h-14 rounded-full transition-all duration-500",
        "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
        "border-2 border-primary/30 backdrop-blur-xl",
        "hover:scale-110 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/25",
        "active:scale-95 group overflow-hidden",
        "focus:outline-none focus:ring-2 focus:ring-primary/50"
      )}
      aria-label="Toggle theme"
    >
      {/* Animated Background Circle */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-700 ease-in-out",
          isDarkMode 
            ? "bg-gradient-to-br from-slate-800 to-slate-900" 
            : "bg-gradient-to-br from-amber-100 to-orange-200"
        )}
      />
      
      {/* Sun/Moon Icon Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun Icon */}
        <div 
          className={cn(
            "absolute transition-all duration-500 ease-in-out",
            isDarkMode 
              ? "opacity-0 rotate-90 scale-0" 
              : "opacity-100 rotate-0 scale-100"
          )}
        >
          <div className="relative">
            {/* Sun Center */}
            <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg" />
            
            {/* Sun Rays */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-0.5 h-2 bg-gradient-to-t from-amber-400 to-orange-500 rounded-full",
                  "animate-pulse"
                )}
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-14px)`,
                  transformOrigin: '50% 14px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Moon Icon */}
        <div 
          className={cn(
            "absolute transition-all duration-500 ease-in-out",
            isDarkMode 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-0"
          )}
        >
          <div className="relative">
            {/* Moon Body */}
            <div className="w-5 h-5 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full shadow-lg relative overflow-hidden">
              {/* Moon Craters */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-slate-500/30 rounded-full" />
              <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-slate-500/40 rounded-full" />
              <div className="absolute top-2 right-0.5 w-0.5 h-0.5 bg-slate-500/30 rounded-full" />
            </div>
            
            {/* Stars around moon */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-0.5 h-0.5 bg-slate-200 rounded-full animate-pulse"
                )}
                style={{
                  top: `${[2, 12, 8][i]}px`,
                  left: `${[12, 2, -2][i]}px`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          isDarkMode
            ? "bg-gradient-to-br from-slate-400/20 to-transparent"
            : "bg-gradient-to-br from-amber-300/30 to-transparent"
        )}
      />
    </button>
  );
};
