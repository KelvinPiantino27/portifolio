import type { Dict, SkillGroup } from "../content/types";
import { useReveal } from "../hooks/useReveal";
import { Reveal } from "./Reveal";

export function Skills({ t }: { t: Dict }) {
  return (
    <section className="section section--tight" id="skills">
      <Reveal>
        <p className="eyebrow">{t.nav.skills}</p>
        <h2 className="section__title section__title--spaced">{t.skillsTitle}</h2>
      </Reveal>

      <div className="skill-grid">
        {t.skillGroups.map((group) => (
          <SkillCard key={group.title} group={group} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal skill-card">
      <h3 className="skill-card__title">{group.title}</h3>
      <ul className="skill-card__items">
        {group.items.map((item) => (
          <li key={item} className="pill">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
