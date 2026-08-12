import { SITE } from "../config";
import { SECTION_IDS } from "../content/types";
import type { Dict, Lang } from "../content/types";
import type { Theme } from "../hooks/useTheme";

interface Props {
  t: Dict;
  lang: Lang;
  theme: Theme;
  onLangChange: (lang: Lang) => void;
  onThemeToggle: () => void;
}

export function Header({ t, lang, theme, onLangChange, onThemeToggle }: Props) {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="brand" href="#inicio">
          <span className="brand__dot" aria-hidden="true" />
          <span className="brand__name">{SITE.name}</span>
        </a>

        <nav className="header__nav">
          {SECTION_IDS.map((id) => (
            <a key={id} className="header__link" href={`#${id}`}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-button"
            onClick={onThemeToggle}
            title={t.themeLabel}
            aria-label={t.themeLabel}
          >
            <span key={theme} className="icon-button__glyph" aria-hidden="true">
              {theme === "dark" ? "☀" : "☾"}
            </span>
          </button>

          <div className="lang-switch">
            {(["pt", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                className="lang-switch__option"
                aria-pressed={lang === code}
                onClick={() => onLangChange(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          {SITE.cvUrl && (
            <a className="btn btn--primary btn--sm" href={SITE.cvUrl} download>
              {t.cv}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
