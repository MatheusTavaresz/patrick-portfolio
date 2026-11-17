declare module "vanta/dist/vanta.globe.min" {
  type VantaGlobeOptions = {
    el: HTMLElement | string;
    THREE?: object;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
  };

  export default function createGlobe(options: VantaGlobeOptions): {
    destroy: () => void;
    setOptions: (options: Partial<VantaGlobeOptions>) => void;
  };
}
