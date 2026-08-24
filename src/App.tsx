import { useCallback, useEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProjectDialog } from "./components/ProjectDialog";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Stats } from "./components/Stats";
import { Timeline } from "./components/Timeline";
import { DICTS } from "./content";
import type { FilterId, Lang } from "./content/types";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const [lang, setLang] = useState<Lang>("pt");
  const [filter, setFilter] = useState<FilterId>("all");
  // Guarda o projeto aberto pelo nome, e não pelo objeto: o nome é estável
  // entre os idiomas, então trocar PT/EN retraduz o diálogo em vez de congelar
  // o texto de quando ele foi aberto.
  const [openName, setOpenName] = useState<string | null>(null);
  const { theme, toggle } = useTheme();

  const t = DICTS[lang];
  const openProject = t.projects.find((project) => project.name === openName) ?? null;

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  // Identidade estável: o ProjectDialog assina o evento close nativo com ela.
  const closeProject = useCallback(() => setOpenName(null), []);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header
        t={t}
        lang={lang}
        theme={theme}
        onLangChange={setLang}
        onThemeToggle={toggle}
      />

      <main>
        <Hero t={t} />
        <Stats stats={t.stats} />
        <Projects t={t} filter={filter} onFilterChange={setFilter} onOpen={setOpenName} />
        <Timeline t={t} />
        <Skills t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>

      <ProjectDialog project={openProject} t={t} onClose={closeProject} />
    </>
  );
}
