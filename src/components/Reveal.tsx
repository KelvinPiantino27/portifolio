import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface Props {
  children: ReactNode;
  className?: string;
  /** Stagger step; each unit delays the fade by 60ms. */
  delay?: number;
}

/** Wraps content that should fade up once it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      style={delay ? { transitionDelay: `${delay * 60}ms` } : undefined}
    >
      {children}
    </div>
  );
}
