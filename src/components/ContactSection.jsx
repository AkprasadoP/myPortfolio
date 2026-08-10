import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { site } from "@/data/site";
import { LOADING_COPY } from "@/components/ui/LoadingLabel";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    if (!accessKey) {
      toast({
        title: "Channel offline",
        description:
          "Contact form is not configured. Email me directly instead.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          subject: `Portfolio message from ${form.name.trim()}`,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Submission failed");
      }

      toast({
        title: "Message queued",
        description: "Thanks for reaching out — I'll get back to you.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Transmission failed",
        description: "Something went wrong. Try emailing me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="panel accent-red"
      >
        <div className="panel-header">
          <span>OPEN A CHANNEL</span>
          <span>contact.sh</span>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 text-left font-mono text-sm">
            <p className="text-xs leading-relaxed text-dim">
              Prefer the old way? Use the addresses below. Or leave a message in
              the terminal.
            </p>

            <div className="space-y-3 border border-line bg-inset p-4">
              <div>
                <p className="meta-label">email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-spidey-blue hover:text-spidey-red"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="meta-label">github</p>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-spidey-blue hover:text-spidey-red"
                >
                  github.com/AkprasadoP
                </a>
              </div>
              <div>
                <p className="meta-label">linkedin</p>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-spidey-blue hover:text-spidey-red"
                >
                  linkedin.com/in/akprasad14
                </a>
              </div>
              <div>
                <p className="meta-label">x</p>
                <a
                  href={site.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="text-spidey-blue hover:text-spidey-red"
                >
                  x.com/AshishKrPrasad3
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-line bg-inset">
            <div className="border-b border-line px-3 py-2 font-mono text-[10px] tracking-[0.12em] text-dim">
              <span className="text-spidey-red">ashish@workbench</span>
              <span className="text-muted">:~$</span> compose --to ashish
            </div>

            <div className="space-y-3 p-4">
              <label className="block text-left">
                <span className="meta-label">name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="mt-1 w-full border border-line bg-panel px-3 py-2 font-mono text-sm text-fg outline-none focus:border-spidey-blue"
                />
              </label>

              <label className="block text-left">
                <span className="meta-label">email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="mt-1 w-full border border-line bg-panel px-3 py-2 font-mono text-sm text-fg outline-none focus:border-spidey-blue"
                />
              </label>

              <label className="block text-left">
                <span className="meta-label">message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-1 w-full resize-y border border-line bg-panel px-3 py-2 font-mono text-sm text-fg outline-none focus:border-spidey-blue"
                />
              </label>

              <div className="flex items-center justify-between gap-3 pt-1">
                <p className="font-mono text-[10px] text-dim">
                  <span className="animate-blink text-spidey-red">█</span>{" "}
                  awaiting input
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-system btn-system-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting
                    ? `[ ${LOADING_COPY} ]`
                    : "[ send message ]"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
