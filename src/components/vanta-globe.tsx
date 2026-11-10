"use client";

import { useEffect, useRef } from "react";
import { mountGlobe } from "@/lib/globe";

export function VantaGlobe() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let effect: { destroy: () => void } | undefined;
    let cancelled = false;

    void mountGlobe(element).then((created) => {
      if (cancelled) {
        created.destroy();
        return;
      }

      effect = created;
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className="relative h-72 overflow-hidden bg-black md:h-96"
      aria-hidden="true"
    >
      <div className="absolute inset-0 hidden items-center justify-center motion-reduce:flex">
        <div className="size-40 rounded-full border border-[#24a482]" />
      </div>
    </div>
  );
}
