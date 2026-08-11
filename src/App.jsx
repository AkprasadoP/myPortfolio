import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { WebTrail } from "@/components/ui/WebTrail";
import { WebBackground } from "@/components/ui/WebBackground";
import { WebShooterCursor } from "@/components/ui/WebShooterCursor";
import { SpiderSenseRadar } from "@/components/ui/SpiderSenseRadar";
import { SuitUp } from "@/components/ui/SuitUp";
import { CrawlingSpider } from "@/components/ui/CrawlingSpider";
import { SwingBolt } from "@/components/ui/SwingBolt";
import { KonamiWatcher } from "@/components/ui/KonamiWatcher";
import { MixtapePlayer } from "@/components/MixtapePlayer";
import { CommandPalette } from "@/components/CommandPalette";

function App() {
  const [suitSeq, setSuitSeq] = useState(0);

  return (
    <>
      <WebBackground />
      <CrawlingSpider />
      <SwingBolt />
      <WebShooterCursor />
      <SpiderSenseRadar />
      <SuitUp key={`suit-${suitSeq}`} />
      <KonamiWatcher onMatch={() => setSuitSeq((s) => s + 1)} />
      <WebTrail />
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
