"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioView } from "@/components/portfolio-view";
import { navigation } from "@/lib/profile";

const center = 50;
const orbit = 32;
const reach = 22;
const dead = 11;
const commitMs = 1000;

function angleOf(index: number) {
  return -Math.PI / 2 + (index * Math.PI * 2) / navigation.length;
}

function sectorOf(x: number, y: number) {
  if (Math.hypot(x, y) < dead) {
    return null;
  }
  const step = (Math.PI * 2) / navigation.length;
  const turned = Math.atan2(y, x) + Math.PI / 2;
  const normalized = (turned + Math.PI * 2) % (Math.PI * 2);
  return Math.round(normalized / step) % navigation.length;
}

function clampReach(x: number, y: number) {
  const distance = Math.hypot(x, y);
  if (distance <= reach) {
    return { x, y };
  }
  const scale = reach / distance;
  return { x: x * scale, y: y * scale };
}

function at(index: number) {
  const angle = angleOf(index);
  return { x: Math.cos(angle) * reach, y: Math.sin(angle) * reach };
}

function settledIndex(activeId: string | null) {
  if (activeId == null) {
    return null;
  }
  const index = navigation.findIndex((item) => item.href.slice(1) === activeId);
  return index < 0 ? null : index;
}

function readVector(event: React.PointerEvent<HTMLDivElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) / bounds.width) * 100 - center,
    y: ((event.clientY - bounds.top) / bounds.height) * 100 - center,
  };
}

export function SectionDial() {
  const { activeId, openSection, view } = usePortfolioView();
  const drag = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const viewRef = useRef(view);
  const [phase, setPhase] = useState<"drag" | "rest">("rest");
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [pending, setPending] = useState<number | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const settled = settledIndex(activeId);

  useEffect(() => {
    setHovered(null);
  }, [activeId]);

  useEffect(() => {
    const returned = viewRef.current === "detail" && view === "focus";
    viewRef.current = view;
    if (!returned) {
      return;
    }
    drag.current = false;
    pendingRef.current = null;
    setPhase("rest");
    setPending(null);
    setAttempt(0);
  }, [view]);

  useEffect(() => {
    if (attempt === 0 || pending == null) {
      return;
    }
    const index = pending;
    const ticket = attempt;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      openSection(navigation[index].href.slice(1));
      setPending(null);
      setAttempt((current) => (current === ticket ? 0 : current));
    }, reduce ? 0 : commitMs);
    return () => window.clearTimeout(id);
  }, [attempt, pending, openSection]);

  function stage(index: number | null, force = false) {
    if (!force && pendingRef.current === index) {
      return;
    }
    pendingRef.current = index;
    setPending(index);
    setAttempt((ticket) => (index == null ? 0 : ticket + 1));
  }

  function follow(event: React.PointerEvent<HTMLDivElement>) {
    const vector = readVector(event);
    setPointer(clampReach(vector.x, vector.y));
    stage(sectorOf(vector.x, vector.y));
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const target = event.target;
    if (event.button !== 0 || (target instanceof Element && target.closest("button"))) {
      return;
    }
    drag.current = true;
    setPhase("drag");
    event.currentTarget.setPointerCapture(event.pointerId);
    follow(event);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) {
      return;
    }
    follow(event);
  }

  function onPointerUp() {
    if (!drag.current) {
      return;
    }
    drag.current = false;
    setPhase("rest");
  }

  function choose(index: number) {
    drag.current = false;
    setPhase("rest");
    stage(index, true);
  }

  const knob =
    phase === "drag"
      ? pointer
      : pending != null
        ? at(pending)
        : settled != null
          ? at(settled)
          : { x: 0, y: 0 };
  const marked = pending ?? settled;
  const shown = pending ?? hovered ?? settled;

  return (
    <div className="w-full">
      <div
        role="group"
        aria-label="Seções"
        className="relative aspect-square w-full touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <circle cx={center} cy={center} r={orbit} fill="none" stroke="var(--line)" strokeWidth="0.45" />
          {pending != null ? (
            <circle
              key={attempt}
              className="dial-commit"
              cx={center}
              cy={center}
              r={orbit}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.6"
              pathLength={100}
              style={{ animationDuration: `${commitMs}ms` }}
            />
          ) : null}
        </svg>
        {navigation.map((item, index) => {
          const angle = angleOf(index);
          const on = marked === index;
          return (
            <button
              key={item.href}
              type="button"
              aria-label={item.label}
              aria-pressed={on}
              className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full"
              style={{
                left: `${center + Math.cos(angle) * orbit}%`,
                top: `${center + Math.sin(angle) * orbit}%`,
              }}
              onClick={() => choose(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered((current) => (current === index ? null : current))}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered((current) => (current === index ? null : current))}
            >
              <span
                className={`size-1.5 rounded-full transition-transform duration-200 motion-reduce:transition-none ${
                  on ? "scale-150 bg-accent" : "bg-foreground/80"
                }`}
              />
            </button>
          );
        })}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute size-[18%] rounded-full bg-accent ${
            phase === "drag"
              ? ""
              : "transition-[left,top] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          }`}
          style={{
            left: `${center + knob.x}%`,
            top: `${center + knob.y}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 0 0.7rem color-mix(in srgb, var(--accent) 22%, transparent)",
          }}
        />
      </div>
      <p
        aria-live="polite"
        className="mt-[0.65em] min-h-[1.2em] text-center font-mono text-[10px] uppercase tracking-[0.16em] text-accent"
      >
        {shown == null ? "Seções" : navigation[shown].label}
      </p>
    </div>
  );
}
