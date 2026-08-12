import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "kp-portfolio-theme";
/** Matches the .theme-shifting transition duration in styles.css. */
const SHIFT_MS = 560;

/**
 * The inline script in index.html already resolved the theme before first
 * paint. Reading it back keeps the first render in sync with the DOM instead
 * of assuming a default and correcting it in an effect.
 */
function initialTheme(): Theme {
  return document.documentElement.dataset.kpTheme === "light" ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const shiftTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.dataset.kpTheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private mode or blocked storage: the theme still applies for this visit.
    }
  }, [theme]);

  // Cross-fades colors only while toggling, so the transition does not fight
  // the reveal animations on scroll.
  const toggle = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-shifting");
    window.clearTimeout(shiftTimer.current);
    shiftTimer.current = window.setTimeout(
      () => root.classList.remove("theme-shifting"),
      SHIFT_MS,
    );
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => () => window.clearTimeout(shiftTimer.current), []);

  return { theme, toggle };
}
