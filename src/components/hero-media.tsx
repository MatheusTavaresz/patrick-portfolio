"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroMedia() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlay(!motion.matches);
  }, []);

  return (
    <>
      <Image
        src="/VTR00133.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      {play ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/patrick.mp4" type="video/mp4" />
        </video>
      ) : null}
    </>
  );
}
