import { SystemChrome } from "../components/SystemChrome";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ExperimentsSection } from "../components/ExperimentsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { WebStrand } from "../components/WebStrand";

const SectionRule = () => <hr className="section-rule" />;

export const Home = () => {
  return (
    <div className="system-grain flex h-screen w-full flex-col overflow-hidden bg-bg text-fg">
      <SystemChrome />

      <main
        id="main-scroll-area"
        className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pb-12"
      >
        <WebStrand />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-3 py-6 sm:gap-10 sm:px-5 sm:py-8 md:px-8">
          <HeroSection />
          <SectionRule />
          <AboutSection />
          <SectionRule />
          <SkillsSection />
          <SectionRule />
          <ExperimentsSection />
          <SectionRule />
          <ProjectsSection />
          <SectionRule />
          <ExperienceSection />
          <SectionRule />
          <ContactSection />
        </div>

        <Footer />
      </main>
    </div>
  );
};
