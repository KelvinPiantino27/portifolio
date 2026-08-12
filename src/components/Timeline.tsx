import type { Dict, Job } from "../content/types";
import { useReveal } from "../hooks/useReveal";
import { Reveal } from "./Reveal";

export function Timeline({ t }: { t: Dict }) {
  return (
    <section className="section" id="experiencia">
      <Reveal>
        <p className="eyebrow">{t.nav.experiencia}</p>
        <h2 className="section__title section__title--spaced">{t.expTitle}</h2>
      </Reveal>

      <ol className="timeline">
        {t.jobs.map((job) => (
          // The same company appears twice, so the period disambiguates it.
          <JobItem key={`${job.company}-${job.period}`} job={job} />
        ))}
      </ol>
    </section>
  );
}

function JobItem({ job }: { job: Job }) {
  const ref = useReveal<HTMLLIElement>();

  return (
    <li ref={ref} className="reveal timeline__item">
      <span className="timeline__dot" aria-hidden="true" />
      <p className="timeline__period">{job.period}</p>
      <h3 className="timeline__role">{job.role}</h3>
      <p className="timeline__company">{job.company}</p>
      <p className="timeline__body">{job.body}</p>
    </li>
  );
}
