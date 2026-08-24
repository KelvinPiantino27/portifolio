import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface Props {
  children: ReactNode;
  className?: string;
  /** Passo do escalonamento; cada unidade atrasa o fade em 60ms. */
  delay?: number;
}

/** Envolve conteúdo que deve surgir com fade quando entra na tela. */
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
