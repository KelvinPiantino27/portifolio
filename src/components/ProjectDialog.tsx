import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Dict, Project } from "../content/types";

interface Props {
  project: Project | null;
  t: Dict;
  onClose: () => void;
}

export function ProjectDialog({ project, t, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  // Controla o modal nativo a partir do estado do React. O showModal() já traz
  // Esc, armadilha de foco, inércia da página atrás e devolução do foco ao
  // fechar — nada disso existia no overlay feito à mão que veio antes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (project && !el.open) el.showModal();
    if (!project && el.open) el.close();
  }, [project]);

  // Esc e clique no backdrop fecham o diálogo sem o React saber. É o evento
  // close que traz o estado de volta à sincronia.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="project-dialog-title"
      // O respiro do diálogo vem do elemento interno, então clique que cai no
      // próprio dialog veio do backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close();
      }}
    >
      {project && (
        <div className="dialog__body">
          <div className="dialog__head">
            <div>
              <p className="eyebrow eyebrow--tight">{project.tag}</p>
              <h2 id="project-dialog-title" className="dialog__title">
                {project.name}
              </h2>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => ref.current?.close()}
              aria-label={t.closeLabel}
            >
              <X size={18} />
            </button>
          </div>

          <p className="dialog__lead">{project.blurb}</p>
          <p className="dialog__detail">{project.detail}</p>

          <h3 className="dialog__label">{t.stack}</h3>
          <ul className="tag-list">
            {project.stack.map((item) => (
              <li key={item} className="tag tag--lg">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="dialog__label">{t.highlights}</h3>
          <ul className="dialog__points">
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          {project.url && (
            <a
              className="btn btn--primary dialog__repo"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {t.repo}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </dialog>
  );
}
