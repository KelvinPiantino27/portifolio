import type { Dict } from "./types";

export const en: Dict = {
  cv: "Download CV",
  stack: "Stack",
  highlights: "Highlights",
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

  // PENDENTE: os três projetos abaixo são fictícios, herdados do design, e as
  // métricas deles são inventadas. Trocar pelos reais antes de divulgar o site
  // — o mesmo bloco existe em pt.ts e os dois precisam bater.
  projects: [
    {
      name: "Kaizen Fit",
      tag: "Mobile",
      stack: ["React Native", "Expo", "Supabase", "TypeScript"],
      blurb: "Workout tracking app with offline sync and routine notifications.",
      detail:
        "Fictional demo project. The offline layer uses a local mutation queue that reconciles with the server once connectivity returns, keeping training history consistent even with no signal at the gym.",
      points: [
        "Offline queue with timestamp reconciliation",
        "38% smaller bundle through route code splitting",
        "Crash-free sessions tracked with Sentry",
      ],
    },
    {
      name: "Rota",
      tag: "Web",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      blurb: "Real-time logistics dashboard for fleet and delivery route monitoring.",
      detail:
        "Fictional demo project. Map view, region filters and websocket updates, designed to handle hundreds of concurrent vehicles without degrading rendering.",
      points: [
        "Real-time websocket updates",
        "List virtualization for 500+ vehicles",
        "Versioned REST API contracts",
      ],
    },
    {
      name: "Ledger",
      tag: "Desktop",
      stack: ["Tauri", "React", "SQLite", "Rust"],
      blurb: "Desktop financial reconciliation app, packaged for Microsoft Store and Apple Store.",
      detail:
        "Fictional demo project. Cross-platform packaging with Tauri, local SQLite storage and batch statement import, published to the official stores.",
      points: [
        "Cross-platform Windows and macOS builds",
        "Batch import with schema validation",
        "Published to official stores",
      ],
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
