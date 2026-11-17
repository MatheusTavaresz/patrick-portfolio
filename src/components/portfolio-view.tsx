"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ViewName = "focus" | "detail";

type PortfolioViewValue = {
  view: ViewName;
  showDetail: () => void;
  showFocus: () => void;
  openSection: (id: string) => void;
};

const PortfolioViewContext = createContext<PortfolioViewValue | null>(null);

export function PortfolioView({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewName>("focus");
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    if (!target) {
      return;
    }
    document.getElementById(target)?.scrollIntoView();
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    setTarget(null);
  }, [target]);

  function showDetail() {
    setView("detail");
    window.scrollTo({ top: 0 });
  }

  function showFocus() {
    setView("focus");
    window.scrollTo({ top: 0 });
  }

  function openSection(id: string) {
    setView("detail");
    setTarget(id);
  }

  return (
    <PortfolioViewContext.Provider value={{ view, showDetail, showFocus, openSection }}>
      {children}
    </PortfolioViewContext.Provider>
  );
}

export function usePortfolioView() {
  const value = useContext(PortfolioViewContext);
  if (!value) {
    throw new Error("PortfolioView ausente");
  }
  return value;
}

export function WhenDetailed({ children }: { children: React.ReactNode }) {
  const { view } = usePortfolioView();
  if (view !== "detail") {
    return null;
  }
  return children;
}
