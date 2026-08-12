import { FILTER_IDS } from "../content/types";
import type { Dict, FilterId, Project } from "../content/types";
import { useReveal } from "../hooks/useReveal";
import { Reveal } from "./Reveal";

interface Props {
  t: Dict;
  filter: FilterId;
  onFilterChange: (filter: FilterId) => void;
  onOpen: (name: string) => void;
}

export function Projects({ t, filter, onFilterChange, onOpen }: Props) {
  // Derived while rendering rather than mirrored into state, so the filter can
  // never drift out of sync with the list it filters.
  const visible = filter === "all" ? t.projects : t.projects.filter((p) => p.tag === filter);

  return (
    <section className="section" id="projetos">
      <div className="orb" aria-hidden="true" />

      <Reveal className="section__head">
        <div>
          <p className="eyebrow">{t.nav.projetos}</p>
          <h2 className="section__title section__title--narrow">{t.projectsTitle}</h2>
        </div>

        <div className="chips">
          {FILTER_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className="chip"
              aria-pressed={filter === id}
              onClick={() => onFilterChange(id)}
            >
              {t.filters[id]}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard key={project.name} project={project} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (name: string) => void }) {
  const ref = useReveal<HTMLElement>();

  return (
    <article ref={ref} className="reveal project-card">
      <div className="project-card__bloom" aria-hidden="true" />

      <div className="project-card__top">
        <span className="project-card__kind">{project.tag}</span>
        <span className="project-card__arrow" aria-hidden="true">
          ↗
        </span>
      </div>

      {/* The button carries the click target; CSS stretches it over the whole
          card so the mouse affordance survives without losing keyboard access. */}
      <h3 className="project-card__name">
        <button type="button" className="project-card__trigger" onClick={() => onOpen(project.name)}>
          {project.name}
        </button>
      </h3>

      <p className="project-card__blurb">{project.blurb}</p>

      <ul className="tag-list">
        {project.stack.map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
