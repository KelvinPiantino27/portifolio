// GERADO POR scripts/sync-linkedin.mjs — não edite à mão.
// Fonte: seed a partir do conteúdo que já estava em pt.ts. Nenhum export foi
// rodado ainda; o primeiro `npm run sync:linkedin` substitui este arquivo.
//
// Só o que o LinkedIn possui. Textos curados, agrupamento de skills e a
// tradução em inglês ficam em pt.ts / en.ts. Ver docs/sincronizacao-linkedin.md
import type { Education, Job } from "./types";

export const linkedinJobs: Job[] = [
  {
    company: "Cresci e Perdi",
    role: "Desenvolvedor Full Stack DevOps",
    period: "out/2025 — atual · São Paulo",
    body: "Responsável pela portabilidade de sistemas web para aplicações mobile, com atuação em todo o ciclo de desenvolvimento. Conduzo a adaptação técnica e arquitetural, avaliando consumo de APIs, uso de rede e pontos de falha em ambientes serverless. Observabilidade com LogRocket, Sentry e Vexo; aplicações desktop com Tauri publicadas na Microsoft Store e Apple Store.",
  },
  {
    company: "GBS Global Business Solution",
    role: "Desenvolvedor de aplicativos móveis",
    period: "nov/2023 — out/2025 · Mauá",
    body: "Equipe EGISMOB: desenvolvimento e aprimoramento contínuo do aplicativo com Expo-CLI e React Native. Design e implementação de novos recursos, otimização de componentes-chave, revisões de código e testes.",
  },
  {
    company: "WVSolutions Tecnologia",
    role: "Desenvolvedor web front end",
    period: "jan/2023 — nov/2023 · São Paulo",
    body: "Vue.js, HTML, CSS, JavaScript e Tailwind. Layouts responsivos, otimização de performance, componentização e gestão de estado no Vue 3, boas práticas de SEO e acessibilidade, integração com APIs externas e Microsoft Azure.",
  },
  {
    company: "Grupo Webee",
    role: "Desenvolvedor web Full-Stack",
    period: "set/2022 — jan/2023 · São Paulo",
    body: "Desenvolvimento de landing pages na plataforma Hostinger com WordPress.",
  },
  {
    company: "GBS Global Business Solution",
    role: "Desenvolvedor web Full-Stack",
    period: "ago/2021 — set/2022 · São Bernardo do Campo",
    body: "Front-end com Vue.js, Quasar, DevExtreme e Google Maps API; back-end com Node.js, Express.js e SQL Server, incluindo construção de APIs REST e integração com serviços externos.",
  },
];

export const linkedinEducation: Education[] = [
  {
    school: "Estácio",
    course: "Bacharelado em Engenharia de Software",
    period: "2024 — 2029",
    status: "Em andamento",
  },
  {
    school: "ETEC — Escola Técnica Estadual de SP",
    course: "Técnico Integrado em Tecnologia da Informação",
    period: "2016 — 2017",
  },
];

/** Lista plana: o LinkedIn não agrupa skills. O agrupamento vive em pt.ts. */
export const linkedinSkills: string[] = [
  "React Native",
  "Expo",
  "Expo Router",
  "Ionic Framework",
  "React",
  "TypeScript",
  "Vue.js 3",
  "Quasar",
  "DevExtreme",
  "Tailwind",
  "Node.js",
  "Express",
  "PostgreSQL",
  "SQL Server",
  "Serverless",
  "TDD",
  "Sentry",
  "LogRocket",
  "Vexo",
  "Tauri",
  "Azure",
  "GitHub",
];
