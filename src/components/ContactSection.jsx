"use client";

import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('akprasad07mm@gmail.com');
      toast({
        title: "Email copied!",
        description: "akprasad07mm@gmail.com has been copied to your clipboard.",
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'akprasad07mm@gmail.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: "Email copied!",
        description: "akprasad07mm@gmail.com has been copied to your clipboard.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "6eb39fc4-3f05-44af-b01c-2799a1eec244");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (data.success) {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      e.target.reset();
    } else {
      toast({
        title: "Error",
        description: data.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <div className="title-decoration"></div>
            <h2 className="enhanced-section-title title-glow">
              Get In <span className="text-primary">Touch</span>
            </h2>
            {/* Floating decorative elements */}
            <div className="floating-icon -top-8 -left-8">
              <Mail className="w-6 h-6 text-primary/30" />
            </div>
            <div className="floating-icon -top-6 -right-6" style={{ animationDelay: '1s' }}>
              <Send className="w-5 h-5 text-primary/40" />
            </div>
            <div className="floating-icon -bottom-4 left-4" style={{ animationDelay: '2s' }}>
              <Phone className="w-4 h-4 text-primary/25" />
            </div>
          </div>
          <p className="section-subtitle">
            I'm currently available for work and always open to discussing new
            opportunities. Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Info */}
          <div className="space-y-8">
            <div className="modern-card p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Let's Connect</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                Ready to bring your ideas to life? Whether it's a new project, collaboration, 
                or just a friendly chat about technology, I'd love to hear from you.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="group p-6 rounded-2xl bg-gradient-to-r from-card to-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">Email</h4>
                      <a
                        href="mailto:akprasad07mm@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                      >
                        akprasad07mm@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-gradient-to-r from-card to-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">Phone</h4>
                      <a
                        href="tel:+918459439461"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                      >
                        +91 8459439461
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-gradient-to-r from-card to-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">Location</h4>
                      <span className="text-muted-foreground text-sm">
                        Aurangabad, Maharashtra
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-border/50">
                <h4 className="font-bold text-foreground mb-6 text-center">Connect With Me</h4>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://www.linkedin.com/in/akprasad14/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://x.com/AshishKrPrasad3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl bg-gradient-to-r from-gray-800 to-black text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://www.instagram.com/_akprasad_14_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="modern-card p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                <Send className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Send a Message</h3>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-3 text-foreground group-focus-within:text-primary transition-colors duration-300"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground hover:border-primary/50"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-3 text-foreground group-focus-within:text-primary transition-colors duration-300"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground hover:border-primary/50"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-3 text-foreground group-focus-within:text-primary transition-colors duration-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground hover:border-primary/50 resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-3 group text-lg px-8 py-4 mt-8",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="modern-card p-10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Start Something Amazing?
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Whether you have a project in mind, need technical consultation, or just want to discuss 
              the latest in AI and web development, I'm here to help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={copyEmailToClipboard}
                className="cosmic-button inline-flex items-center justify-center gap-3 group text-lg px-10 py-4"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Copy Email Address</span>
              </button>
              <a
                href="https://wa.me/918459439461?text=Hi%20Ashish,%20I'd%20like%20to%20schedule%20a%20call%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold inline-flex items-center justify-center gap-3 group text-lg"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>WhatsApp Me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
