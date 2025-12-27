import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [sunRays, setSunRays] = useState([]);
  const [lightParticles, setLightParticles] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Set initial dark mode if no theme is set
    if (!document.documentElement.classList.contains('dark') && !localStorage.getItem("theme")) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    }

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    generateElements();

    const handleResize = () => {
      generateElements();
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const generateElements = () => {
    // Restore original star count for beautiful effect
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    
    // Generate stars (for dark mode) - RESTORED ORIGINAL
    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }
    setStars(newStars);

    // Generate meteors (for dark mode) - BETTER DISTRIBUTION
    const newMeteors = [];
    for (let i = 0; i < 4; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100, // Back to full width distribution
        y: Math.random() * 15 + 5,  // Keep away from very top
        delay: 0, // NO DELAY - all start immediately
        animationDuration: Math.random() * 2 + 4, // 4-6 seconds duration
      });
    }
    setMeteors(newMeteors);

    // Generate sun rays (for light mode)
    const numberOfRays = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    const newSunRays = [];
    for (let i = 0; i < numberOfRays; i++) {
      newSunRays.push({
        id: i,
        width: Math.random() * 100 + 50,
        height: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1,
        animationDuration: Math.random() * 8 + 4,
      });
    }
    setSunRays(newSunRays);

    // Generate light particles (for light mode)
    const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    const newParticles = [];
    for (let i = 0; i < numberOfParticles; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.2,
        animationDuration: Math.random() * 6 + 3,
        delay: Math.random() * 5,
      });
    }
    setLightParticles(newParticles);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark Mode - Stars and Meteors */}
      {isDarkMode && (
        <>
          {stars.map((star) => (
            <div
              key={`star-${star.id}`}
              className="star animate-pulse-subtle"
              style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animationDuration: star.animationDuration + "s",
              }}
            />
          ))}

          {meteors.map((meteor) => (
            <div
              key={`meteor-${meteor.id}`}
              className="meteor animate-meteor"
              style={{
                width: meteor.size * 50 + "px",
                height: meteor.size * 2 + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDuration: meteor.animationDuration + "s",
                transform: 'rotate(215deg)',
              }}
            />
          ))}
        </>
      )}

      {/* Light Mode - Sun Rays and Light Particles */}
      {!isDarkMode && (
        <>
          {/* Animated Sun Rays */}
          {sunRays.map((ray) => (
            <div
              key={`ray-${ray.id}`}
              className="sun-ray animate-float"
              style={{
                width: ray.width + "px",
                height: ray.height + "px",
                left: ray.x + "%",
                top: ray.y + "%",
                transform: `rotate(${ray.rotation}deg)`,
                opacity: ray.opacity,
                animationDuration: ray.animationDuration + "s",
              }}
            />
          ))}

          {/* Floating Light Particles */}
          {lightParticles.map((particle) => (
            <div
              key={`particle-${particle.id}`}
              className="light-particle animate-float"
              style={{
                width: particle.size + "px",
                height: particle.size + "px",
                left: particle.x + "%",
                top: particle.y + "%",
                opacity: particle.opacity,
                animationDuration: particle.animationDuration + "s",
                animationDelay: particle.delay + "s",
              }}
            />
          ))}

          {/* Simple floating dots instead of clouds */}
          <div className="floating-dot dot-1"></div>
          <div className="floating-dot dot-2"></div>
          <div className="floating-dot dot-3"></div>
          <div className="floating-dot dot-4"></div>
          <div className="floating-dot dot-5"></div>
        </>
      )}
    </div>
  );
};
