import { ArrowUp, Heart, Code2, Coffee, Sparkles, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-20 px-4 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card/95 to-background"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto max-w-7xl relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="relative">
                <Code2 className="w-8 h-8 text-primary" />
                <Sparkles className="w-4 h-4 text-primary/60 absolute -top-1 -right-1" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                AkPrasad
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Crafting intelligent solutions with modern technologies. 
              Passionate about AI, full-stack development, and creating 
              impactful digital experiences.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and lots of</span>
              <Coffee className="w-4 h-4 text-amber-600" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-foreground mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: "About", href: "#about" },
                { name: "Skills", href: "#skills" },
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-105 transform"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-foreground mb-6">Let's Connect</h4>
            <p className="text-muted-foreground mb-6">
              Follow my journey and connect with me on social platforms
            </p>
            <div className="flex justify-center md:justify-end space-x-4 mb-6">
              <a
                href="https://github.com/AkprasadoP"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-gradient-to-r from-gray-800 to-black text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/akprasad14/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://x.com/AshishKrPrasad3"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-gradient-to-r from-gray-800 to-black text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.instagram.com/_akprasad_14_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            <a
              href="mailto:akprasad07mm@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>akprasad07mm@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} AkPrasad. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hidden md:block">•</span>
              <span>Built with React & TailwindCSS</span>
              <span className="hidden md:block">•</span>
              <span>Deployed on Vercel</span>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group p-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>

        {/* Fun Stats */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group">
              <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                {currentYear - 2021}+
              </div>
              <div className="text-xs text-muted-foreground">Years Coding</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-xs text-muted-foreground">Projects Built</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <div className="text-xs text-muted-foreground">Internships</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                ∞
              </div>
              <div className="text-xs text-muted-foreground">Coffee Cups</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
