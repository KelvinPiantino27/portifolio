import { linkedinEducation, linkedinJobs } from "./linkedin.generated";
import type { Dict } from "./types";

export const pt: Dict = {
  cv: "Baixar CV",
  stack: "Stack",
  highlights: "Destaques",
  themeLabel: "Alternar tema claro/escuro",
  closeLabel: "Fechar",
  badge: "Disponível para novas oportunidades",

  nav: {
    projetos: "Projetos",
    experiencia: "Experiência",
    skills: "Habilidades",
    sobre: "Sobre",
    contato: "Contato",
  },

  filters: { all: "Tudo", Mobile: "Mobile", Web: "Web", Desktop: "Desktop" },

  heroTitle: "Desenvolvedor Full Stack & Mobile",
  heroBody:
    "Cinco anos levando sistemas web para o mobile com React Native e Expo, assumindo responsabilidade técnica de ponta a ponta e participando das decisões arquiteturais. Foco em performance, estabilidade e consumo eficiente de APIs em ambientes serverless.",
  seeProjects: "Ver projetos",
  sendEmail: "Enviar e-mail",

  stats: [
    { n: "5 anos", label: "de experiência em desenvolvimento" },
    { n: "3 plataformas", label: "web, mobile e desktop em produção" },
    { n: "React Native", label: "especialidade principal, com Expo" },
    { n: "2 lojas", label: "publicações em Microsoft Store e Apple Store" },
  ],

  projectsTitle: "Projetos selecionados",
  expTitle: "Trajetória",
  skillsTitle: "Habilidades técnicas",

  aboutTitle: "Visão sistêmica do produto",
  about1:
    "Atuo de forma crítica na adaptação técnica de soluções web para o contexto mobile, avaliando arquitetura, padrões, riscos e impacto operacional. Tenho participação direta na definição de estratégias de integração, revisão técnica de implementações e garantia da qualidade do produto em produção.",
  about2:
    "Utilizo Inteligência Artificial de forma estratégica no desenvolvimento, documentação e construção de funcionalidades, integrando serviços como ChatGPT e Claude via API para acelerar entregas e aumentar a confiabilidade técnica.",

  contactTitle: "Vamos conversar sobre o próximo projeto",
  contactBody: "Aberto a posições sênior em mobile e full stack. Respondo em até um dia útil.",

  education: [
    // Vem do LinkedIn. Para editar, rode o sync — mudança aqui é sobrescrita.
    ...linkedinEducation,
    // Cursos complementares: curadoria manual, o sync não mexe aqui.
    { school: "LinkedIn Learning", course: "Fundamentos de React", period: "fev/2026" },
    { school: "Alura", course: "React Native: Desenvolvendo com Expo", period: "ago/2026" },
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
      title: "Back-end & dados",
      items: ["Node.js", "Express", "PostgreSQL", "SQL Server", "APIs REST", "Serverless"],
    },
    {
      title: "Qualidade & plataforma",
      items: ["TDD", "Jest", "Sentry", "LogRocket", "Vexo", "Tauri", "Azure", "GitHub"],
    },
    {
      title: "Idiomas",
      items: ["Português — nativo", "Inglês — básico"],
    },
  ],

  // PENDENTE: os três projetos abaixo são fictícios, herdados do design, e as
  // métricas deles são inventadas. Trocar pelos reais antes de divulgar o site
  // — o mesmo bloco existe em en.ts e os dois precisam bater.
  projects: [
    {
      name: "Kaizen Fit",
      tag: "Mobile",
      stack: ["React Native", "Expo", "Supabase", "TypeScript"],
      blurb: "App de acompanhamento de treinos com sincronização offline e notificações de rotina.",
      detail:
        "Projeto fictício de demonstração. A camada offline usa uma fila local de mutações que reconcilia com o servidor na volta da conexão, mantendo o histórico de treino consistente mesmo em uso na academia sem sinal.",
      points: [
        "Fila offline com reconciliação por timestamp",
        "Bundle reduzido em 38% com code splitting de rotas",
        "Crash-free sessions acompanhadas via Sentry",
      ],
    },
    {
      name: "Rota",
      tag: "Web",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      blurb: "Painel de logística em tempo real para acompanhamento de frota e rotas de entrega.",
      detail:
        "Projeto fictício de demonstração. Painel com mapa, filtros por região e atualização via websocket, desenhado para operar com centenas de veículos simultâneos sem degradar a renderização.",
      points: [
        "Atualização em tempo real via websocket",
        "Virtualização de listas para 500+ veículos",
        "APIs REST com contratos versionados",
      ],
    },
    {
      name: "Ledger",
      tag: "Desktop",
      stack: ["Tauri", "React", "SQLite", "Rust"],
      blurb:
        "Aplicação desktop de conciliação financeira, empacotada para Microsoft Store e Apple Store.",
      detail:
        "Projeto fictício de demonstração. Empacotamento multiplataforma com Tauri, banco local em SQLite e importação de extratos em lote, com publicação nas lojas oficiais.",
      points: [
        "Build multiplataforma Windows e macOS",
        "Importação em lote com validação de esquema",
        "Publicação nas lojas oficiais",
      ],
    },
  ],

  // Vem do LinkedIn. Para editar, rode o sync — mudança aqui é sobrescrita.
  jobs: linkedinJobs,
};
