import { useState } from "react";
import { SITE } from "../config";
import type { Dict } from "../content/types";
import { Reveal } from "./Reveal";

export function Hero({ t }: { t: Dict }) {
  // The avatar is fetched from a third party, so it can 404, rate-limit, or be
  // blocked. Falling back to the monogram keeps the hero intact when it does.
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = SITE.photoUrl !== "" && !photoFailed;

  return (
    <section className="hero" id="inicio">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__aurora hero__aurora--a" aria-hidden="true" />
      <div className="hero__aurora hero__aurora--b" aria-hidden="true" />

      <div className="hero__inner">
        <Reveal className="hero__portrait-wrap">
          <div className="portrait">
            {showPhoto ? (
              <img
                className="portrait__img"
                src={SITE.photoUrl}
                alt={SITE.name}
                width={132}
                height={132}
                referrerPolicy="no-referrer"
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <span className="portrait__initials" aria-hidden="true">
                {SITE.initials}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={1}>
          <p className="badge">
            <span className="badge__dot" aria-hidden="true" />
            {t.badge}
          </p>
        </Reveal>

        <Reveal delay={2}>
          <h1 className="hero__title">{t.heroTitle}</h1>
        </Reveal>

        <Reveal delay={3}>
          <p className="hero__body">{t.heroBody}</p>
        </Reveal>

        <Reveal delay={4} className="hero__actions">
          <a className="btn btn--primary btn--lg" href="#projetos">
            {t.seeProjects}
          </a>
          <a className="btn btn--lg" href={`mailto:${SITE.email}`}>
            {t.sendEmail}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
