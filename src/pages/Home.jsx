import { Sidebar } from "../components/Sidebar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarBackground />
      </div>

      {/* Left Sidebar Pane */}
      <div className="relative z-10">
        <Sidebar />
      </div>

      {/* Right Content Pane */}
      <main 
        id="main-scroll-area" 
        className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar z-10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 flex flex-col gap-24 relative z-10 pb-32">
          {/* Note: I removed ThemeToggle because we are forcing Dark Mode in this Antigravity design. */}
          <HeroSection />
          
          <div className="flex flex-col gap-32">
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </div>

        </div>
        
        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </main>
    </div>
  );
};
