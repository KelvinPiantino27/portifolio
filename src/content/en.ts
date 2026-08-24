import type { Dict } from "./types";

export const en: Dict = {
  cv: "Download CV",
  stack: "Stack",
  highlights: "Highlights",
  repo: "View on GitHub",
  themeLabel: "Toggle light/dark theme",
  closeLabel: "Close",
  badge: "Available for new opportunities",

  nav: {
    projetos: "Projects",
    experiencia: "Experience",
    skills: "Skills",
    sobre: "About",
    contato: "Contact",
  },

  filters: { all: "All", Mobile: "Mobile", Web: "Web", Desktop: "Desktop" },

  heroTitle: "Full Stack & Mobile Developer",
  heroBody:
    "Five years moving web systems to mobile with React Native and Expo, owning technical responsibility end to end and taking part in architectural decisions. Focused on performance, stability and efficient API consumption in serverless environments.",
  seeProjects: "See projects",
  sendEmail: "Send email",

  stats: [
    { n: "5 years", label: "of development experience" },
    { n: "3 platforms", label: "web, mobile and desktop in production" },
    { n: "React Native", label: "core specialty, with Expo" },
    { n: "2 stores", label: "releases on Microsoft Store and Apple Store" },
  ],

  projectsTitle: "Selected projects",
  expTitle: "Track record",
  skillsTitle: "Technical skills",

  aboutTitle: "A systemic view of the product",
  about1:
    "I take a critical approach to adapting web solutions for mobile, assessing architecture, patterns, risk and operational impact. I take direct part in defining integration strategies, reviewing implementations and safeguarding product quality in production.",
  about2:
    "I use AI strategically in development, documentation and feature work, integrating services such as ChatGPT and Claude via API to speed up delivery and raise technical reliability.",

  contactTitle: "Let's talk about the next project",
  contactBody: "Open to senior mobile and full stack roles. I reply within one business day.",

  education: [
    {
      school: "Estácio",
      course: "B.Eng. in Software Engineering",
      period: "2024 — 2029",
      status: "In progress",
    },
    {
      school: "ETEC — São Paulo State Technical School",
      course: "Technical degree in Information Technology",
      period: "2016 — 2017",
    },
    // Cursos complementares: curadoria manual, o sync não mexe aqui.
    { school: "LinkedIn Learning", course: "React Fundamentals", period: "Feb 2026" },
    { school: "Alura", course: "React Native: Building with Expo", period: "Aug 2026" },
  ],

  skillGroups: [
    {
      title: "Mobile",
      items: ["React Native", "Expo", "Expo Router", "Ionic Framework", "App Store", "Play Store"],
    },
    {
      title: "Front-end",
      items: ["React", "TypeScript", "Vue.js 3", "Quasar", "DevExtreme", "Tailwind"],
    },
    {
      title: "Back-end & data",
      items: ["Node.js", "Express", "PostgreSQL", "SQL Server", "REST APIs", "Serverless"],
    },
    {
      title: "Quality & platform",
      items: ["TDD", "Jest", "Sentry", "LogRocket", "Vexo", "Tauri", "Azure", "GitHub"],
    },
    {
      title: "Languages",
      items: ["Portuguese — native", "English — elementary"],
    },
  ],

  projects: [
    {
      name: "Stampify",
      tags: ["Mobile", "Web"],
      stack: ["Expo", "React Native", "TypeScript", "Supabase", "PostgreSQL"],
      blurb:
        "From order to shipping with no spreadsheet in between: production management for screen printing, with the live queue in the operator's hand.",
      detail:
        "Screen printing runs in stages: art, screen burning, printing, drying, finishing, quality and shipping. When that lives in spreadsheets and notebooks, nobody knows where each order stands, scrap only surfaces at month-end and a blown deadline becomes a late discovery. Stampify puts the queue the manager prioritizes in the same place the operator reports production from, by phone, on the shop floor. A finished stage updates the dashboard instantly, and a deadline running out becomes an alert inside the app.",
      points: [
        "Prioritized queue: the operator always knows what comes next",
        "Good pieces and scrap reported straight from the phone, on the floor",
        "Live manager dashboard, with overdue deadline alerts",
      ],
      url: "https://github.com/KelvinPiantino27/Stampify",
      logo: "./stampify.png",
    },
  ],

  jobs: [
    {
      company: "Cresci e Perdi",
      role: "Full Stack DevOps Developer",
      period: "Oct 2025 — present · São Paulo",
      body: "Responsible for porting web systems to mobile applications across the whole development cycle. I lead the technical and architectural adaptation, assessing API consumption, network usage and failure points in serverless environments. Observability with LogRocket, Sentry and Vexo; desktop apps with Tauri published to the Microsoft Store and Apple Store.",
    },
    {
      company: "GBS Global Business Solution",
      role: "Mobile application developer",
      period: "Nov 2023 — Oct 2025 · Mauá",
      body: "EGISMOB team: continuous development and improvement of the app with Expo-CLI and React Native. Designed and implemented new features, optimized key components, took part in code reviews and testing.",
    },
    {
      company: "WVSolutions Tecnologia",
      role: "Front-end web developer",
      period: "Jan 2023 — Nov 2023 · São Paulo",
      body: "Vue.js, HTML, CSS, JavaScript and Tailwind. Responsive layouts, web performance optimization, componentization and state management in Vue 3, SEO and accessibility practices, external API integration and Microsoft Azure.",
    },
    {
      company: "Grupo Webee",
      role: "Full-Stack web developer",
      period: "Sep 2022 — Jan 2023 · São Paulo",
      body: "Landing page development on the Hostinger platform with WordPress.",
    },
    {
      company: "GBS Global Business Solution",
      role: "Full-Stack web developer",
      period: "Aug 2021 — Sep 2022 · São Bernardo do Campo",
      body: "Front-end with Vue.js, Quasar, DevExtreme and the Google Maps API; back-end with Node.js, Express.js and SQL Server, including REST API construction and third-party integrations.",
    },
  ],
};
