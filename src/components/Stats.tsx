import type { Stat } from "../content/types";
import { Reveal } from "./Reveal";

/** A faixa índigo de ponta a ponta logo abaixo do hero. */
export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="stats">
      <div className="stats__stripes" aria-hidden="true" />

      <div className="stats__inner">
        {stats.map((stat, i) => (
          <Reveal key={stat.n} className="stat" delay={i}>
            <span className="stat__n">{stat.n}</span>
            <span className="stat__label">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
