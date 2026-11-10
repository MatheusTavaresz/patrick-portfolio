type GlobeEffect = {
  destroy: () => void;
};

export const globeSettings = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1,
  scaleMobile: 1,
  color: 0x24a482,
  backgroundColor: 0x0,
} as const;

export async function mountGlobe(element: HTMLElement): Promise<GlobeEffect> {
  const THREE = await import("three");
  const { default: createGlobe } = await import("vanta/dist/vanta.globe.min");

  return createGlobe({
    el: element,
    THREE,
    ...globeSettings,
  });
}
