"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { usePortfolioView } from "@/components/portfolio-view";
import { followSystemTheme, toggleTheme } from "@/lib/theme";

type SiteHeaderProps = {
  brand: string;
  homeHref: string;
  items: readonly { href: string; label: string }[];
  labels: {
    menu: string;
    close: string;
    themeToLight: string;
    themeToDark: string;
    detail: string;
    focus: string;
  };
};

export function SiteHeader({ brand, homeHref, items, labels }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("");
  const { view, showDetail, showFocus } = usePortfolioView();
  const detailed = view === "detail";

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme ?? "dark");
    const hash = window.location.hash;
    if (!hash) {
      return;
    }
    document.querySelector(hash)?.scrollIntoView();
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function onChange() {
      followSystemTheme();
      setTheme(document.documentElement.dataset.theme ?? "");
    }

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="h-1 bg-accent" aria-hidden="true" />
      <Container className="flex items-center justify-between py-4">
        <a
          href={homeHref}
          className="font-serif text-xl tracking-tight"
          onClick={(event) => {
            event.preventDefault();
            scrollWithoutHash(homeHref);
          }}
        >
          {brand}
        </a>
        <div className="flex items-center gap-5">
          <nav
            id="site-menu"
            className={
              !detailed
                ? "hidden"
                : open
                  ? "absolute inset-x-0 top-full border-b border-line bg-background px-5 py-5 md:static md:inset-auto md:border-0 md:bg-transparent md:p-0"
                  : "hidden md:block"
            }
          >
            <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-7">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
                    onClick={(event) => {
                      event.preventDefault();
                      setOpen(false);
                      scrollWithoutHash(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
            onClick={detailed ? showFocus : showDetail}
          >
            {detailed ? labels.focus : labels.detail}
          </button>
          <button
            type="button"
            className="relative grid size-9 cursor-pointer place-items-center overflow-hidden border border-line text-muted transition-colors hover:border-foreground hover:text-foreground"
            onClick={() => {
              toggleTheme();
              setTheme(document.documentElement.dataset.theme ?? "");
            }}
          >
            <span className="theme-to-light" aria-hidden={theme !== "dark"}>
              <SunIcon />
              <span className="sr-only">{labels.themeToLight}</span>
            </span>
            <span className="theme-to-dark" aria-hidden={theme !== "light"}>
              <MoonIcon />
              <span className="sr-only">{labels.themeToDark}</span>
            </span>
          </button>
          <button
            type="button"
            className={`font-mono text-[11px] uppercase tracking-[0.16em] md:hidden ${detailed ? "" : "hidden"}`}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? labels.close : labels.menu}
          </button>
        </div>
      </Container>
    </header>
  );
}

function scrollWithoutHash(href: string) {
  document.querySelector(href)?.scrollIntoView();
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path
        strokeLinecap="round"
        d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 14.5A7.5 7.5 0 0 1 9.5 4 6.5 6.5 0 1 0 20 14.5Z"
      />
    </svg>
  );
}
