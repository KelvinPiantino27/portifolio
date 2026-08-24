import { linkedinEducation, linkedinJobs } from "./linkedin.generated";
import type { Dict } from "./types";

export const pt: Dict = {
  cv: "Baixar CV",
  stack: "Stack",
  highlights: "Destaques",
  repo: "Ver no GitHub",
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

  projects: [
    {
      name: "Stampify",
      tags: ["Mobile", "Web"],
      stack: ["Expo", "React Native", "TypeScript", "Supabase", "PostgreSQL"],
      blurb:
        "Do pedido à expedição, sem planilha no meio: gestão de produção para serigrafia, com a fila viva na mão do operador.",
      detail:
        "Serigrafia é produção por etapas: arte, gravação de tela, impressão, secagem, acabamento, qualidade e expedição. Quando isso vive em planilha e caderno, ninguém sabe onde cada pedido está, o refugo só aparece no fechamento do mês e prazo vencido vira descoberta tardia. O Stampify coloca a fila que o gestor prioriza no mesmo lugar em que o operador aponta a produção, pelo celular, no chão de fábrica. Etapa concluída atualiza o painel na hora, e prazo estourando vira aviso dentro do app.",
      points: [
        "Fila priorizada: o operador sempre sabe qual é a próxima",
        "Peças boas e refugo apontados direto do celular, no chão de fábrica",
        "Painel do gestor ao vivo, com aviso de prazo vencido",
      ],
      url: "https://github.com/KelvinPiantino27/Stampify",
      logo: "./stampify.png",
    },
  ],

  // Vem do LinkedIn. Para editar, rode o sync — mudança aqui é sobrescrita.
  jobs: linkedinJobs,
};
