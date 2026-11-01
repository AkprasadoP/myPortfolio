/**
 * Smooth-scroll the window to a section. Sections carry `scroll-mt-*`,
 * so the sticky header offset lives in CSS, not here.
 */
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (!element) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
};
