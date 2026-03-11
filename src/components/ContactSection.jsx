"use client";

import { Send, Github, Linkedin, Twitter, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description:
          "Thanks for reaching out. I'll get back to you as soon as possible.",
      });
      setMessage("");
    }, 1500);

    const formData = new FormData();
    formData.append("access_key", "6eb39fc4-3f05-44af-b01c-2799a1eec244");
    formData.append("message", message);
    formData.append("subject", "Portfolio Contact Message");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="contact" className="relative w-full pb-10">
      <div className="w-full max-w-4xl px-4 sm:px-6 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Touch
            </span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-lg mx-auto">
            Interested in working together or have a question? I'd love to hear
            from you.
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent max-w-md mx-auto" />
        </motion.div>

        {/* Message Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 p-2 bg-[#111113] border border-white/[0.08] rounded-2xl shadow-2xl focus-within:border-white/20 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 px-2">
              <MessageSquare
                size={18}
                className="text-zinc-600 mt-3.5 shrink-0"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="flex-1 bg-transparent border-none outline-none resize-none py-3 text-zinc-200 placeholder:text-zinc-600 custom-scrollbar min-h-[50px] max-h-[150px] text-sm"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-end px-2 pb-2 sm:pb-0">
              <button
                type="submit"
                disabled={!message.trim() || isSubmitting}
                className="p-3 rounded-xl bg-white text-black font-semibold disabled:bg-white/10 disabled:text-zinc-600 transition-all hover:bg-zinc-200 hover:shadow-md"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </form>

          {/* Contact Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              href="mailto:akprasad07mm@gmail.com"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <Mail size={15} /> akprasad07mm@gmail.com
            </a>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex gap-4">
              <a
                href="https://github.com/AkprasadoP"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Github size={17} />
              </a>
              <a
                href="https://www.linkedin.com/in/akprasad14/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://x.com/AshishKrPrasad3"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Twitter size={17} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
