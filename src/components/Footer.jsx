export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 border-t border-white/5 flex justify-center mt-auto">
      <div className="flex items-center gap-3 text-xs text-zinc-600">
        <span>&copy; {currentYear} Ashish Prasad</span>
        <span className="text-zinc-800">&middot;</span>
        <span>Built with React & Vite</span>
      </div>
    </footer>
  );
};
