import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { site } from "@/data/site";
import { ComicReveal } from "@/components/ui/ComicReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    <section id="contact" className="scroll-mt-24">
      <SectionHeading ordinal="08" kicker="Open channel" title="Let’s talk" sub="Hiring for backend or full-stack? I’m available now and open to relocating." />
      <ComicReveal className="panel accent-red">
        {/* What I'm looking for — the recruiter-facing summary */}
        <div className="grid border-b border-line sm:grid-cols-3">
          <div className="border-b border-line p-5 sm:border-b-0 sm:border-r sm:p-7">
            <p className="meta-label">Looking for</p>
            <ul className="mt-2 space-y-1">
              {site.lookingFor.roles.map((role) => (
                <li key={role} className="text-[15px] font-semibold tracking-tight text-fg">
                  {role}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-b border-line p-5 sm:border-b-0 sm:border-r sm:p-7">
            <p className="meta-label">Start</p>
            <p className="mt-2 inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-crt" aria-hidden="true" />
              {site.lookingFor.start}
            </p>
          </div>
          <div className="p-5 sm:p-7">
            <p className="meta-label">Location</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {site.lookingFor.location}
            </p>
          </div>
        </div>

        <div className="border-b border-line px-5 py-4 sm:px-7">
          <p className="meta-label mb-2">Where I add value fastest</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-muted">
            {site.lookingFor.strengths.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-spidey-red" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4 text-left font-mono text-sm">
            <p className="text-xs leading-relaxed text-dim">
              Email is fastest. Or leave a message with the form and it lands
              straight in my inbox.
            </p>

            <div className="divide-y divide-line border-y border-line">
              <div className="flex items-baseline justify-between gap-4 py-3">
                <p className="meta-label">email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-spidey-red hover:decoration-spidey-red"
                >
                  {site.email}
                </a>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <p className="meta-label">github</p>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-spidey-red hover:decoration-spidey-red"
                >
                  github.com/AkprasadoP
                </a>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <p className="meta-label">linkedin</p>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-spidey-red hover:decoration-spidey-red"
                >
                  linkedin.com/in/akprasad14
                </a>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3">
                <p className="meta-label">x</p>
                <a
                  href={site.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-spidey-red hover:decoration-spidey-red"
                >
                  x.com/AshishKrPrasad3
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-line">
            <div className="space-y-4 p-4 sm:p-5">
              <label className="block text-left">
                <span className="meta-label">name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="mt-1 w-full border border-line bg-transparent px-3 py-2.5 text-sm text-fg outline-none transition-colors focus:border-spidey-red"
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
                  className="mt-1 w-full border border-line bg-transparent px-3 py-2.5 text-sm text-fg outline-none transition-colors focus:border-spidey-red"
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
                  className="mt-1 w-full resize-y border border-line bg-transparent px-3 py-2.5 text-sm text-fg outline-none transition-colors focus:border-spidey-red"
                />
              </label>

              <div className="flex items-center justify-between gap-3 pt-1">
                <p className="font-mono text-[10px] text-dim">
                  replies within ~48h
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-system btn-system-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Sending…" : "Send message →"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </ComicReveal>
    </section>
  );
};
