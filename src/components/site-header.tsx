"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/container";

type SiteHeaderProps = {
  brand: string;
  items: readonly { href: string; label: string }[];
};

export function SiteHeader({ brand, items }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

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
        <a href="#topo" className="font-serif text-xl tracking-tight">
          {brand}
        </a>
        <button
          type="button"
          className="font-mono text-[11px] uppercase tracking-[0.16em] md:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Fechar" : "Menu"}
        </button>
        <nav
          id="site-menu"
          className={
            open
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
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
