import { useEffect, useRef } from "react";

/**
 * One observer for the whole page. Elements unobserve themselves once they
 * have appeared, so scrolling back up does not replay the animation.
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
 * Fades an element in when it scrolls into view. Attach the ref to any element
 * carrying the `reveal` class; styles.css holds the from/to state.
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
