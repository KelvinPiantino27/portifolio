import { useEffect, useRef } from "react";
import type { Dict, Project } from "../content/types";

interface Props {
  project: Project | null;
  t: Dict;
  onClose: () => void;
}

export function ProjectDialog({ project, t, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  // Drives the native modal from React state. showModal() supplies Esc, the
  // focus trap, inertness of the page behind, and focus restore on close —
  // all of which the previous hand-rolled overlay lacked.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (project && !el.open) el.showModal();
    if (!project && el.open) el.close();
  }, [project]);

  // Esc and backdrop dismissal close the dialog without React knowing. The
  // close event is what brings state back in sync.
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
      // The dialog box is padded by its inner element, so a click landing on
      // the dialog itself came from the backdrop.
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
              ✕
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
        </div>
      )}
    </dialog>
  );
}
