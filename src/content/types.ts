export type Lang = "pt" | "en";

/** Categorias de projeto. Independem de idioma: são também os ids dos filtros. */
export type Tag = "Mobile" | "Web" | "Desktop";
export type FilterId = "all" | Tag;

export const FILTER_IDS: readonly FilterId[] = ["all", "Mobile", "Web", "Desktop"];

/** Ids das seções, na ordem do menu. Servem para as âncoras e para os rótulos. */
export const SECTION_IDS = ["projetos", "experiencia", "skills", "sobre", "contato"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface Project {
  name: string;
  tag: Tag;
  stack: string[];
  /** Uma linha, exibida no card. */
  blurb: string;
  /** Texto longo, só no diálogo. */
  detail: string;
  points: string[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  body: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Education {
  school: string;
  course: string;
  period: string;
  /** Vira um selo na tela. Omita em cursos concluídos. */
  status?: string;
}

export interface Stat {
  n: string;
  label: string;
}

/**
 * Todo texto traduzível da página. pt e en implementam esta interface, então
 * chave adicionada em um idioma quebra o build até o outro também tê-la.
 */
export interface Dict {
  cv: string;
  stack: string;
  highlights: string;
  themeLabel: string;
  closeLabel: string;
  badge: string;
  nav: Record<SectionId, string>;
  filters: Record<FilterId, string>;
  heroTitle: string;
  heroBody: string;
  seeProjects: string;
  sendEmail: string;
  stats: Stat[];
  projectsTitle: string;
  expTitle: string;
  skillsTitle: string;
  aboutTitle: string;
  about1: string;
  about2: string;
  contactTitle: string;
  contactBody: string;
  education: Education[];
  skillGroups: SkillGroup[];
  projects: Project[];
  jobs: Job[];
}
