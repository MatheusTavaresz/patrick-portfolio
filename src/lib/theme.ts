export const themeStorageKey = "theme";

export type ThemeName = "light" | "dark";

export const themeInitScript = `(function(){try{var stored=localStorage.getItem("${themeStorageKey}");var theme=stored==="light"||stored==="dark"?stored:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export function readGlobeColors() {
  const styles = getComputedStyle(document.documentElement);
  const accent = toColor(styles.getPropertyValue("--accent"), 0xe39a45);
  const background = toColor(styles.getPropertyValue("--background"), 0x140f0c);

  return {
    color: accent,
    color2: accent,
    backgroundColor: background,
  };
}

export function toggleTheme() {
  const next: ThemeName =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";

  localStorage.setItem(themeStorageKey, next);
  document.documentElement.dataset.theme = next;
  syncThemeColorMeta();
}

export function followSystemTheme() {
  if (localStorage.getItem(themeStorageKey)) {
    return;
  }

  const next: ThemeName = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  document.documentElement.dataset.theme = next;
  syncThemeColorMeta();
}

function syncThemeColorMeta() {
  const background = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();

  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", background);
  });
}

function toColor(value: string, fallback: number) {
  const parsed = Number.parseInt(value.trim().replace("#", ""), 16);
  return Number.isNaN(parsed) ? fallback : parsed;
}
