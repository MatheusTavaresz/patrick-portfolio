"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ViewName = "focus" | "detail";

type PortfolioViewValue = {
  view: ViewName;
  activeId: string | null;
  fanClose: number;
  showDetail: () => void;
  showFocus: () => void;
  openSection: (id: string) => void;
};

const PortfolioViewContext = createContext<PortfolioViewValue | null>(null);

export function PortfolioView({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewName>("focus");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [fanClose, setFanClose] = useState(0);

  const dismissFan = useCallback(() => {
    setFanClose((current) => current + 1);
  }, []);

  function applyView(next: ViewName) {
    document.documentElement.dataset.view = next;
    setView(next);
  }

  useEffect(() => {
    document.documentElement.dataset.view = view;
  }, [view]);

  useEffect(() => {
    if (!target) {
      return;
    }
    document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    setTarget(null);
  }, [target]);

  function showDetail() {
    dismissFan();
    if (view !== "detail") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    applyView("detail");
  }

  function showFocus() {
    dismissFan();
    setActiveId(null);
    applyView("focus");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const openSection = useCallback(
    (id: string) => {
      document.documentElement.dataset.view = "detail";
      dismissFan();
      setView("detail");
      setActiveId(id);
      setTarget(id);
    },
    [dismissFan],
  );

  return (
    <PortfolioViewContext.Provider
      value={{ view, activeId, fanClose, showDetail, showFocus, openSection }}
    >
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
