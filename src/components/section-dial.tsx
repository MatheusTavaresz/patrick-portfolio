"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/lib/profile";
import { usePortfolioView } from "@/components/portfolio-view";

const orbit = 32;
const knobTravel = 13;
const knobRadius = 10;
const commitDelay = 1000;

function sectorIndex(x: number, y: number, limit: number) {
  if (Math.hypot(x, y) < limit) {
    return null;
  }
  const step = (Math.PI * 2) / navigation.length;
  const turned = Math.atan2(y, x) + Math.PI / 2;
  const normalized = (turned + Math.PI * 2) % (Math.PI * 2);
  return Math.round(normalized / step) % navigation.length;
}

function angleOf(index: number) {
  return -Math.PI / 2 + (index * Math.PI * 2) / navigation.length;
}

export function SectionDial() {
  const { openSection } = usePortfolioView();
  const [active, setActive] = useState<number | null>(null);
  const [pull, setPull] = useState({ x: 0, y: 0 });
  const drag = useRef(-1);
  const choice = useRef<number | null>(null);
  const wait = useRef<number | null>(null);

  function clearWait() {
    if (wait.current == null) {
      return;
    }
    window.clearTimeout(wait.current);
    wait.current = null;
  }

  function releaseAim() {
    clearWait();
    choice.current = null;
    setActive(null);
  }

  function cancel() {
    releaseAim();
    setPull({ x: 0, y: 0 });
  }

  function arm(index: number) {
    setActive(index);
    if (choice.current === index) {
      return;
    }
    clearWait();
    choice.current = index;
    const id = navigation[index].href.slice(1);
    wait.current = window.setTimeout(() => {
      wait.current = null;
      openSection(id);
    }, commitDelay);
  }

  useEffect(() => clearWait, []);

  function readPoint(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.width;
    const reach = 0.16;
    const distance = Math.hypot(x, y);
    const scale = distance > reach ? reach / distance : 1;
    return {
      x: x * scale,
      y: y * scale,
      index: sectorIndex(x, y, 0.24),
    };
  }

  function follow(point: { x: number; y: number; index: number | null }) {
    setPull({ x: point.x, y: point.y });
    if (point.index == null) {
      releaseAim();
      return;
    }
    arm(point.index);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    drag.current = event.pointerId;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
    follow(readPoint(event));
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current !== event.pointerId) {
      return;
    }
    follow(readPoint(event));
  }

  function finish(event: React.PointerEvent<HTMLDivElement>) {
    if (drag.current !== event.pointerId) {
      return;
    }
    drag.current = -1;
    const point = readPoint(event);
    if (point.index == null) {
      cancel();
      return;
    }
    setPull({ x: 0, y: 0 });
    arm(point.index);
  }

  const angle = active == null ? Math.atan2(pull.y, pull.x) : angleOf(active);
  const knob =
    active == null
      ? { x: pull.x * 100, y: pull.y * 100 }
      : { x: Math.cos(angle) * knobTravel, y: Math.sin(angle) * knobTravel };
  const destination =
    active == null
      ? knob
      : { x: Math.cos(angle) * orbit, y: Math.sin(angle) * orbit };
  const span = Math.hypot(destination.x - knob.x, destination.y - knob.y);
  const unitX = span === 0 ? Math.cos(angle) : (destination.x - knob.x) / span;
  const unitY = span === 0 ? Math.sin(angle) : (destination.y - knob.y) / span;
  const lineStart = knobRadius + 1.2;
  const lineEnd = active == null ? lineStart + 8 : span;
  const moving = Math.hypot(knob.x, knob.y) > 1 || active != null;

  return (
    <div className="w-full">
      <div
        className="relative aspect-square w-full touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r={orbit} fill="none" stroke="var(--line)" strokeWidth="0.45" />
          {navigation.map((item, index) => {
            const dotAngle = angleOf(index);
            return (
              <circle
                key={item.href}
                cx={50 + Math.cos(dotAngle) * orbit}
                cy={50 + Math.sin(dotAngle) * orbit}
                r={active === index ? 1.35 : 0.75}
                fill={active === index ? "var(--accent)" : "var(--foreground)"}
                opacity={active === index ? 1 : 0.7}
              />
            );
          })}
          {moving ? (
            <line
              x1={50 + knob.x + unitX * lineStart}
              y1={50 + knob.y + unitY * lineStart}
              x2={50 + knob.x + unitX * lineEnd}
              y2={50 + knob.y + unitY * lineEnd}
              stroke="var(--accent)"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          ) : null}
        </svg>
        <span
          className="pointer-events-none absolute size-[20%] rounded-full bg-accent"
          style={{
            left: `${50 + knob.x}%`,
            top: `${50 + knob.y}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 0 12% color-mix(in srgb, var(--accent) 22%, transparent)",
          }}
        />
      </div>
      <p className="mt-[0.65em] min-h-[1.2em] text-center font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
        {active == null ? "\u00a0" : navigation[active].label}
      </p>
    </div>
  );
}
