import { ArrowUpRight } from "lucide-react";
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
  // Derivado no render em vez de espelhado em estado, assim o filtro nunca sai
  // de sincronia com a lista que ele filtra.
  const visible = filter === "all" ? t.projects : t.projects.filter((p) => p.tag === filter);

  // Só oferece filtro de categoria que tem projeto — caso contrário o clique
  // levaria a uma grade vazia. Com uma categoria só, a régua inteira some.
  const tags = FILTER_IDS.filter((id) => id === "all" || t.projects.some((p) => p.tag === id));

  return (
    <section className="section" id="projetos">
      <Reveal className="section__head">
        <div>
          <p className="eyebrow">{t.nav.projetos}</p>
          <h2 className="section__title section__title--narrow">{t.projectsTitle}</h2>
        </div>

        {tags.length > 2 && (
          <div className="chips">
            {tags.map((id) => (
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
        )}
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
      <div className="project-card__top">
        <span className="project-card__kind">{project.tag}</span>
        <ArrowUpRight className="project-card__arrow" size={16} aria-hidden="true" />
      </div>

      {/* O botão é o alvo do clique; o CSS o estica sobre o card inteiro, então
          a área clicável cresce sem perder o acesso por teclado. */}
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
