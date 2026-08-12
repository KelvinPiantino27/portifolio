import type { Dict } from "../content/types";
import { Reveal } from "./Reveal";

export function About({ t }: { t: Dict }) {
  return (
    <section className="section" id="sobre">
      <div className="about">
        <div>
          <Reveal>
            <p className="eyebrow">{t.nav.sobre}</p>
            <h2 className="section__title section__title--narrow-16">{t.aboutTitle}</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="about__lead">{t.about1}</p>
          </Reveal>
          <Reveal delay={2}>
            <p className="about__body">{t.about2}</p>
          </Reveal>
        </div>

        <Reveal className="education">
          {t.education.map((entry) => (
            <article key={entry.school} className="education__item">
              <div className="education__meta">
                <span className="education__period">{entry.period}</span>
                {entry.status && <span className="education__status">{entry.status}</span>}
              </div>
              <h3 className="education__school">{entry.school}</h3>
              <p className="education__course">{entry.course}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
