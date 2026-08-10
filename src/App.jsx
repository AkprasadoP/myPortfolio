import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { WebTrail } from "@/components/ui/WebTrail";
import { MixtapePlayer } from "@/components/MixtapePlayer";

function App() {
  return (
    <>
      <WebTrail />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <MixtapePlayer />
    </>
  );
}

export default App;
