import { SystemChrome } from "../components/SystemChrome";
import { HeroSection } from "../components/HeroSection";
import { StackMarquee } from "../components/StackMarquee";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ExperimentsSection } from "../components/ExperimentsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { OpenSourceSection } from "../components/OpenSourceSection";
import { LeetCodeSection } from "../components/LeetCodeSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col overflow-x-clip text-fg">
      <SystemChrome />

      <main id="main" className="relative flex-1">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-16 pt-10 sm:gap-32 sm:px-6 sm:pt-16 md:px-10">
          <HeroSection />
          <StackMarquee />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <OpenSourceSection />
          <SkillsSection />
          <LeetCodeSection />
          <ExperimentsSection />
          <ContactSection />
        </div>

        <Footer />
      </main>
    </div>
  );
};
