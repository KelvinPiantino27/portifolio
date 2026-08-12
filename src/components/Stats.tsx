import type { Stat } from "../content/types";
import { Reveal } from "./Reveal";

/** The full-bleed indigo band under the hero. */
export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="stats">
      <div className="stats__stripes" aria-hidden="true" />
      <div className="stats__sweep" aria-hidden="true">
        <div className="stats__sweep-line" />
      </div>

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
