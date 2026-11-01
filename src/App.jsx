import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { WebNoir } from "@/components/ui/WebNoir";
import { SuitUp } from "@/components/ui/SuitUp";
import { KonamiWatcher } from "@/components/ui/KonamiWatcher";
import { MixtapePlayer } from "@/components/MixtapePlayer";
import { CommandPalette } from "@/components/CommandPalette";

function App() {
  // Suit-up intro is an easter egg now — only the Konami code plays it.
  const [suitSeq, setSuitSeq] = useState(0);

  return (
    <>
      <WebNoir />
      {suitSeq > 0 && <SuitUp key={`suit-${suitSeq}`} />}
      <KonamiWatcher onMatch={() => setSuitSeq((s) => s + 1)} />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <MixtapePlayer />
      <CommandPalette />
    </>
  );
}

export default App;
