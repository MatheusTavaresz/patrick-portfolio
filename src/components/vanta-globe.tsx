"use client";

import { useEffect, useRef } from "react";
import type { GlobeEffect } from "@/lib/globe";
import { mountGlobe } from "@/lib/globe";
import { readGlobeColors } from "@/lib/theme";

export function VantaGlobe() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      return;
    }

    const effectRef: { current: GlobeEffect | undefined } = { current: undefined };
    let cancelled = false;

    void mountGlobe(element).then((created) => {
      if (cancelled) {
        created.destroy();
        return;
      }

      effectRef.current = created;
      created.setOptions(readGlobeColors());
    });

    const observer = new MutationObserver(() => {
      effectRef.current?.setOptions(readGlobeColors());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      effectRef.current?.destroy();
    };
  }, []);

  return (
    <div ref={elementRef} className="absolute inset-0 bg-background" aria-hidden="true">
      <div className="absolute inset-y-0 right-0 hidden w-full items-center justify-center motion-reduce:flex md:w-1/2">
        <div className="size-48 rounded-full border border-accent" />
      </div>
    </div>
  );
}
