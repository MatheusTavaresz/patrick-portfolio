import { readGlobeColors } from "@/lib/theme";

export type GlobeEffect = {
  destroy: () => void;
  setOptions: (options: ReturnType<typeof readGlobeColors>) => void;
};

export const globeBehavior = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1,
  scaleMobile: 1,
} as const;

export async function mountGlobe(element: HTMLElement): Promise<GlobeEffect> {
  const THREE = await import("three");
  const { default: createGlobe } = await import("vanta/dist/vanta.globe.min");

  return createGlobe({
    el: element,
    THREE,
    ...globeBehavior,
    ...readGlobeColors(),
  });
}
