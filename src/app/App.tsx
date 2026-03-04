import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DiagnosticChecklistPage } from "./components/DiagnosticChecklistPage";
import { OpenclawGuidePage } from "./components/OpenclawGuidePage";
import { PromptGuidePage } from "./components/PromptGuidePage";
import type { AppPage } from "./types";

const hashToPage: Record<string, AppPage> = {
  "#/diagnostic-checklist": "diagnostic-checklist",
  "#/openclaw-guide": "openclaw-guide",
  "#/prompt-guide": "prompt-guide",
};

const pageToHash: Record<Exclude<AppPage, "portfolio">, string> = {
  "diagnostic-checklist": "#/diagnostic-checklist",
  "openclaw-guide": "#/openclaw-guide",
  "prompt-guide": "#/prompt-guide",
};

function getCurrentPage(): AppPage {
  return hashToPage[window.location.hash] ?? "portfolio";
}

export default function App() {
  const [page, setPage] = useState<AppPage>(() => getCurrentPage());

  const navigateToPage = useCallback((targetPage: AppPage) => {
    const nextHash = targetPage === "portfolio" ? "" : pageToHash[targetPage];
    window.history.pushState(null, "", `${window.location.pathname}${nextHash}`);
    window.scrollTo({ top: 0, behavior: "auto" });
    setPage(targetPage);
  }, []);

  useEffect(() => {
    const onLocationChange = () => setPage(getCurrentPage());
    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("hashchange", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("hashchange", onLocationChange);
    };
  }, []);

  if (page !== "portfolio") {
    const materialPageMap: Record<Exclude<AppPage, "portfolio">, JSX.Element> = {
      "diagnostic-checklist": <DiagnosticChecklistPage />,
      "openclaw-guide": <OpenclawGuidePage />,
      "prompt-guide": <PromptGuidePage />,
    };

    return (
      <div style={{ background: "#17171a", minHeight: "100vh" }}>
        <Navbar showBackButton onBackClick={() => navigateToPage("portfolio")} />
        {materialPageMap[page]}
      </div>
    );
  }

  return (
    <div style={{ background: "#17171a", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <Products onOpenProduct={navigateToPage} />
      <Contact />
      <Footer />
    </div>
  );
}
