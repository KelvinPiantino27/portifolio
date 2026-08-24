import { useEffect, useRef } from "react";

/**
 * Um observer para a página inteira. O elemento se desobserva assim que
 * aparece, então rolar de volta para cima não repete a animação.
 */
let observer: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return observer;
}

/**
 * Faz o elemento surgir com fade ao entrar na tela. Ligue a ref em qualquer
 * elemento com a classe `reveal`; o estado inicial/final está no styles.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = sharedObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return ref;
}
