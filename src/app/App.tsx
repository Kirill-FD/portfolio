import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DiagnosticChecklistPage } from "./components/DiagnosticChecklistPage";
import { OpenclawGuidePage } from "./components/OpenclawGuidePage";
import { PromptGuidePage } from "./components/PromptGuidePage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { PersonalDataConsentPage } from "./components/PersonalDataConsentPage";
import { OfferAgreementPage } from "./components/OfferAgreementPage";
import {
  PAYMENT_PRODUCT_QUERY_PARAM,
  PAYMENT_STATUS_QUERY_PARAM,
  PAYMENT_SUCCESS_VALUE,
  PROMPT_GUIDE_PRODUCT_ID,
  grantPromptGuideAccess,
  hasPromptGuideAccess,
} from "./promptGuideAccess";
import type { AppPage } from "./types";

const hashToPage: Record<string, AppPage> = {
  "#/diagnostic-checklist": "diagnostic-checklist",
  "#/openclaw-guide": "openclaw-guide",
  "#/prompt-guide": "prompt-guide",
  "#/privacy-policy": "privacy-policy",
  "#/personal-data-consent": "personal-data-consent",
  "#/offer-agreement": "offer-agreement",
};

const pageToHash: Record<Exclude<AppPage, "portfolio">, string> = {
  "diagnostic-checklist": "#/diagnostic-checklist",
  "openclaw-guide": "#/openclaw-guide",
  "prompt-guide": "#/prompt-guide",
  "privacy-policy": "#/privacy-policy",
  "personal-data-consent": "#/personal-data-consent",
  "offer-agreement": "#/offer-agreement",
};

function getCurrentPage(): AppPage {
  const pageFromHash = hashToPage[window.location.hash] ?? "portfolio";

  if (pageFromHash === PROMPT_GUIDE_PRODUCT_ID && !hasPromptGuideAccess()) {
    return "portfolio";
  }

  return pageFromHash;
}

export default function App() {
  const [page, setPage] = useState<AppPage>(() => getCurrentPage());
  const [isPromptGuideUnlocked, setIsPromptGuideUnlocked] = useState<boolean>(() =>
    hasPromptGuideAccess(),
  );
  const previousPageRef = useRef<AppPage | null>(null);
  const portfolioScrollYRef = useRef<number>(0);

  const navigateToPage = useCallback((targetPage: AppPage) => {
    if (targetPage === PROMPT_GUIDE_PRODUCT_ID && !hasPromptGuideAccess()) {
      return;
    }

    if (page === "portfolio" && targetPage !== "portfolio") {
      portfolioScrollYRef.current = window.scrollY;
    }

    const nextHash = targetPage === "portfolio" ? "" : pageToHash[targetPage];
    window.history.pushState(null, "", `${window.location.pathname}${nextHash}`);
    setPage(targetPage);
  }, [page]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentStatus = searchParams.get(PAYMENT_STATUS_QUERY_PARAM);
    const paidProduct = searchParams.get(PAYMENT_PRODUCT_QUERY_PARAM);

    if (paymentStatus !== PAYMENT_SUCCESS_VALUE || paidProduct !== PROMPT_GUIDE_PRODUCT_ID) {
      return;
    }

    grantPromptGuideAccess();
    setIsPromptGuideUnlocked(true);

    searchParams.delete(PAYMENT_STATUS_QUERY_PARAM);
    searchParams.delete(PAYMENT_PRODUCT_QUERY_PARAM);

    const nextSearch = searchParams.toString();
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      const nextPage = hashToPage[window.location.hash] ?? "portfolio";
      const unlocked = hasPromptGuideAccess();

      if (page === "portfolio" && nextPage !== "portfolio") {
        portfolioScrollYRef.current = window.scrollY;
      }

      setIsPromptGuideUnlocked(unlocked);

      if (nextPage === PROMPT_GUIDE_PRODUCT_ID && !unlocked) {
        window.history.replaceState(null, "", window.location.pathname);
        setPage("portfolio");
        return;
      }

      setPage(nextPage);
    };

    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("hashchange", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("hashchange", onLocationChange);
    };
  }, [page]);

  useEffect(() => {
    const previousPage = previousPageRef.current;
    previousPageRef.current = page;

    if (previousPage === null) {
      return;
    }

    // On opening legal/material pages, always start from the top.
    if (page !== "portfolio") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    // On returning to the main page, restore scroll position from before leaving.
    if (previousPage !== "portfolio" && page === "portfolio") {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: portfolioScrollYRef.current,
          behavior: "auto",
        });
      });
    }
  }, [page]);

  if (page !== "portfolio") {
    const materialPageMap: Record<Exclude<AppPage, "portfolio">, JSX.Element> = {
      "diagnostic-checklist": <DiagnosticChecklistPage />,
      "openclaw-guide": <OpenclawGuidePage />,
      "prompt-guide": <PromptGuidePage />,
      "privacy-policy": <PrivacyPolicyPage />,
      "personal-data-consent": <PersonalDataConsentPage />,
      "offer-agreement": <OfferAgreementPage />,
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
      <Products onOpenProduct={navigateToPage} hasPromptGuideAccess={isPromptGuideUnlocked} />
      <Contact />
      <Footer />
    </div>
  );
}
