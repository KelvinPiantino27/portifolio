import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "kp-portfolio-theme";
/** Espelha a duração da transição de .theme-shifting no styles.css. */
const SHIFT_MS = 560;

/**
 * O script inline do index.html já resolveu o tema antes da primeira pintura.
 * Ler de volta mantém o primeiro render em sincronia com o DOM, em vez de
 * assumir um padrão e corrigir depois num efeito.
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
      // Aba anônima ou storage bloqueado: o tema ainda vale para esta visita.
    }
  }, [theme]);

  // Faz o cross-fade das cores só durante a troca, para a transição não brigar
  // com as animações de reveal do scroll.
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
