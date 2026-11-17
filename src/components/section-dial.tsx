"use client";

import { useRef } from "react";
import { usePortfolioView } from "@/components/portfolio-view";
import { navigation } from "@/lib/profile";

const buttonSize = 2.75;
const fanGap = 1.05;
const arcStart = (160 * Math.PI) / 180;
const arcEnd = (20 * Math.PI) / 180;

function fanOffset(index: number, count: number) {
  const steps = Math.max(count - 1, 1);
  const step = (arcStart - arcEnd) / steps;
  const radius = (buttonSize + fanGap) / (2 * Math.sin(step / 2));
  const angle = arcStart - step * index;
  return {
    x: Math.cos(angle) * radius,
    y: -Math.sin(angle) * radius,
  };
}

function labelPlace(offset: { x: number; y: number }) {
  if (Math.abs(offset.x) < Math.abs(offset.y) * 0.45) {
    return "bottom-[calc(100%+0.45rem)] left-1/2 -translate-x-1/2";
  }
  if (offset.x < 0) {
    return "bottom-[calc(100%+0.45rem)] right-1/2";
  }
  return "bottom-[calc(100%+0.45rem)] left-1/2";
}

const sectionIcons: Record<string, () => React.JSX.Element> = {
  projetos: ProjectsIcon,
  repositorios: GitIcon,
  trajetoria: BriefcaseIcon,
  tecnologias: CodeIcon,
  formacao: CapIcon,
  conexao: MailIcon,
};

export function SectionDial() {
  const { activeId, openSection } = usePortfolioView();
  const toggleRef = useRef<HTMLInputElement>(null);
  const origin = "left-1/2 top-[calc(100%-2.1rem)]";

  function choose(id: string) {
    if (toggleRef.current) {
      toggleRef.current.checked = false;
    }
    openSection(id);
  }

  return (
    <div className="relative h-56 w-full">
      <input ref={toggleRef} id="section-fan" type="checkbox" className="peer sr-only" />
      {navigation.map((item, index) => {
        const id = item.href.slice(1);
        const offset = fanOffset(index, navigation.length);
        const Icon = sectionIcons[id] ?? ProjectsIcon;
        const on = activeId === id;
        return (
          <button
            key={item.href}
            type="button"
            aria-label={item.label}
            aria-pressed={on}
            style={
              {
                transitionDelay: `${index * 50}ms`,
                "--fan-x": `${offset.x}rem`,
                "--fan-y": `${offset.y}rem`,
              } as React.CSSProperties
            }
            className={`${origin} group absolute z-10 grid size-11 place-items-center rounded-full border border-line bg-surface text-foreground opacity-0 pointer-events-none [transform:translate(-50%,-50%)_scale(0.4)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:pointer-events-auto peer-checked:opacity-100 peer-checked:[transform:translate(calc(-50%+var(--fan-x)),calc(-50%+var(--fan-y)))_scale(1)] hover:z-30 focus-visible:z-30 motion-reduce:transition-none ${
              on ? "border-accent text-accent" : ""
            }`}
            onClick={() => choose(id)}
          >
            <span
              className={`pointer-events-none absolute z-30 whitespace-nowrap rounded-full bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${labelPlace(offset)}`}
            >
              {item.label}
            </span>
            <Icon />
          </button>
        );
      })}
      <label
        htmlFor="section-fan"
        className={`${origin} absolute z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-accent text-on-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent peer-checked:[&_svg]:rotate-45`}
        style={{ boxShadow: "0 0 1.5rem color-mix(in srgb, var(--accent) 42%, transparent)" }}
      >
        <span className="sr-only">Seções</span>
        <PlusIcon />
      </label>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-6 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function iconFrame(children: React.ReactNode) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function ProjectsIcon() {
  return iconFrame(
    <>
      <rect x="7" y="7" width="12" height="12" rx="1.6" />
      <path d="M5 16.5V6.6A1.6 1.6 0 0 1 6.6 5H16" />
    </>,
  );
}

function GitIcon() {
  return iconFrame(
    <>
      <circle cx="6.5" cy="6.5" r="2.1" />
      <circle cx="6.5" cy="17.5" r="2.1" />
      <circle cx="17.5" cy="12" r="2.1" />
      <path d="M6.5 8.6v6.8M8.4 7.4c2.4.8 5.2 1.4 7 3.2" />
    </>,
  );
}

function BriefcaseIcon() {
  return iconFrame(
    <>
      <rect x="3" y="8" width="18" height="11" rx="1.6" />
      <path d="M9 8V6.6A1.6 1.6 0 0 1 10.6 5h2.8A1.6 1.6 0 0 1 15 6.6V8M3 13h18" />
    </>,
  );
}

function CodeIcon() {
  return iconFrame(
    <>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </>,
  );
}

function CapIcon() {
  return iconFrame(
    <>
      <path d="m3 10 9-4 9 4-9 4-9-4Z" />
      <path d="M7.5 12.2V16c0 .9 2 2.4 4.5 2.4s4.5-1.5 4.5-2.4v-3.8M21 10.2V16" />
    </>,
  );
}

function MailIcon() {
  return iconFrame(
    <>
      <rect x="3" y="6" width="18" height="12" rx="1.6" />
      <path d="m4 7 8 6 8-6" />
    </>,
  );
}
