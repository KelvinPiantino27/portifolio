import { SITE } from "../config";
import type { Dict } from "../content/types";
import { Reveal } from "./Reveal";

export function Contact({ t }: { t: Dict }) {
  return (
    <section className="contact" id="contato">
      <div className="contact__inner">
        <Reveal>
          <h2 className="contact__title">{t.contactTitle}</h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="contact__body">{t.contactBody}</p>
        </Reveal>

        <Reveal delay={2} className="contact__links">
          <a className="btn btn--primary btn--lg" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <a className="btn btn--lg" href={SITE.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="btn btn--lg" href={SITE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn--lg" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
        </Reveal>

        <Reveal delay={3}>
          <p className="contact__footer">
            © {new Date().getFullYear()} {SITE.name} · {SITE.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
