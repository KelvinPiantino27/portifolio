export type Lang = "pt" | "en";

/** Project categories. Language-independent: they are also the filter ids. */
export type Tag = "Mobile" | "Web" | "Desktop";
export type FilterId = "all" | Tag;

export const FILTER_IDS: readonly FilterId[] = ["all", "Mobile", "Web", "Desktop"];

/** Section ids, in nav order. Used for both the anchors and the nav labels. */
export const SECTION_IDS = ["projetos", "experiencia", "skills", "sobre", "contato"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface Project {
  name: string;
  tag: Tag;
  stack: string[];
  /** One-liner on the card. */
  blurb: string;
  /** Long form, dialog only. */
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
  /** Renders as a badge. Omit for finished courses. */
  status?: string;
}

export interface Stat {
  n: string;
  label: string;
}

/**
 * Every translated string on the page. Both pt and en satisfy this, so a key
 * added to one language fails the build until the other has it too.
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
