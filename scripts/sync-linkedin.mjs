#!/usr/bin/env node
// Lê o export oficial de dados do LinkedIn e regenera src/content/linkedin.generated.ts.
//
//   npm run sync:linkedin -- ./caminho/da/pasta-extraida
//   node scripts/sync-linkedin.mjs --self-check
//
// Só regenera o que o LinkedIn realmente possui: experiência, formação e a
// lista plana de skills. Textos curados (hero, sobre, projetos), o agrupamento
// de skills e a tradução em inglês continuam manuais — ver docs/.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve, basename } from "node:path";

// ────────────────────────────────────────────────────────────────────────────
// CSV (RFC 4180). Campos entre aspas podem conter vírgula, quebra de linha e
// aspas duplicadas — as descrições de cargo do LinkedIn têm os três.
// ────────────────────────────────────────────────────────────────────────────
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  let i = 0;

  // Remove BOM, que o export do LinkedIn costuma trazer.
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  while (i < text.length) {
    const c = text[i];

    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        quoted = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }

    if (c === '"') {
      quoted = true;
      i++;
    } else if (c === ",") {
      row.push(field);
      field = "";
      i++;
    } else if (c === "\r" && text[i + 1] === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i += 2;
    } else if (c === "\n" || c === "\r") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
    } else {
      field += c;
      i++;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

/** Converte as linhas em objetos, com cabeçalho normalizado (minúsculo, sem espaço). */
export function toRecords(text) {
  const rows = parseCsv(text);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, ""));
  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((h, idx) => {
      record[h] = (row[idx] ?? "").trim();
    });
    return record;
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Datas. O export sai no idioma da conta, então aceitamos os dois e caímos no
// texto cru se não reconhecermos — melhor um período estranho que um "NaN".
// ────────────────────────────────────────────────────────────────────────────
const MONTHS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  fev: 2, abr: 4, mai: 5, ago: 8, set: 9, out: 10, dez: 12,
};

const PT_MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function formatDate(raw) {
  const value = (raw ?? "").trim();
  if (value === "") return "";

  // "2021-08" ou "2021-08-15"
  const iso = value.match(/^(\d{4})-(\d{2})/);
  if (iso) return `${PT_MONTHS[Number(iso[2]) - 1]}/${iso[1]}`;

  // "Aug 2021" / "ago 2021" / "agosto de 2021"
  const named = value.match(/^([A-Za-zÀ-ÿ]{3,})\.?\s+(?:de\s+)?(\d{4})$/);
  if (named) {
    const month = MONTHS[named[1].slice(0, 3).toLowerCase()];
    if (month) return `${PT_MONTHS[month - 1]}/${named[2]}`;
  }

  // "2021" sozinho
  if (/^\d{4}$/.test(value)) return value;

  return value;
}

/** "ago/2021 — set/2022 · São Bernardo do Campo" */
export function formatPeriod(startRaw, endRaw, location) {
  const start = formatDate(startRaw);
  const end = formatDate(endRaw);
  const range = end === "" ? `${start} — atual` : `${start} — ${end}`;
  const place = (location ?? "").trim();
  return place === "" ? range : `${range} · ${place}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Leitura do export
// ────────────────────────────────────────────────────────────────────────────
function findFile(dir, name) {
  const target = name.toLowerCase();
  const hit = readdirSync(dir).find((f) => f.toLowerCase() === target);
  return hit ? join(dir, hit) : null;
}

function readCsv(dir, name) {
  const path = findFile(dir, name);
  if (!path) return null;
  return toRecords(readFileSync(path, "utf8"));
}

/** Aceita chaves alternativas, porque o LinkedIn já renomeou colunas antes. */
function pick(record, ...keys) {
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== "") return value;
  }
  return "";
}

function buildJobs(rows) {
  return rows
    .map((r) => ({
      company: pick(r, "companyname", "company"),
      role: pick(r, "title", "position"),
      period: formatPeriod(
        pick(r, "startedon", "startdate"),
        pick(r, "finishedon", "enddate"),
        pick(r, "location"),
      ),
      body: pick(r, "description").replace(/\s*\n\s*/g, " ").trim(),
    }))
    .filter((job) => job.company !== "" && job.role !== "");
}

function buildEducation(rows) {
  return rows
    .map((r) => {
      const start = pick(r, "startdate", "startedon");
      const end = pick(r, "enddate", "finishedon");
      const startYear = (start.match(/\d{4}/) ?? [""])[0];
      const endYear = (end.match(/\d{4}/) ?? [""])[0];
      const entry = {
        school: pick(r, "schoolname", "school"),
        course: pick(r, "degreename", "degree", "notes"),
        period: endYear === "" ? `${startYear} —` : `${startYear} — ${endYear}`,
      };
      // Curso em andamento é o que ainda não terminou, ou termina no futuro.
      if (endYear === "" || Number(endYear) > new Date().getFullYear()) {
        entry.status = "Em andamento";
      }
      return entry;
    })
    .filter((entry) => entry.school !== "");
}

function buildSkills(rows) {
  return [...new Set(rows.map((r) => pick(r, "name", "skill")).filter(Boolean))];
}

// ────────────────────────────────────────────────────────────────────────────
// Geração
// ────────────────────────────────────────────────────────────────────────────
function serialize(value, indent = 0) {
  const pad = " ".repeat(indent);
  const inner = " ".repeat(indent + 2);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => inner + serialize(v, indent + 2));
    return `[\n${items.join(",\n")},\n${pad}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${inner}${k}: ${serialize(v, indent + 2)}`);
    return `{\n${entries.join(",\n")},\n${pad}}`;
  }

  return JSON.stringify(value);
}

function render({ jobs, education, skills, source }) {
  return `// GERADO POR scripts/sync-linkedin.mjs — não edite à mão.
// Fonte: ${source}
// Rodado em: ${new Date().toISOString().slice(0, 10)}
//
// Só o que o LinkedIn possui. Textos curados, agrupamento de skills e a
// tradução em inglês ficam em pt.ts / en.ts. Ver docs/sincronizacao-linkedin.md
import type { Education, Job } from "./types";

export const linkedinJobs: Job[] = ${serialize(jobs)};

export const linkedinEducation: Education[] = ${serialize(education)};

/** Lista plana: o LinkedIn não agrupa skills. O agrupamento vive em pt.ts. */
export const linkedinSkills: string[] = ${serialize(skills)};
`;
}

// ────────────────────────────────────────────────────────────────────────────
// Self-check — roda sem export nenhum, falha alto se o parser quebrar.
// ────────────────────────────────────────────────────────────────────────────
function selfCheck() {
  const assert = (cond, msg) => {
    if (!cond) {
      console.error(`FALHOU: ${msg}`);
      process.exit(1);
    }
  };

  const csv = 'a,b\n"tem, vírgula","tem ""aspas"""\n"tem\nquebra",simples\n';
  const rows = toRecords(csv);
  assert(rows.length === 2, `esperava 2 linhas, veio ${rows.length}`);
  assert(rows[0].a === "tem, vírgula", `vírgula dentro de aspas: ${rows[0].a}`);
  assert(rows[0].b === 'tem "aspas"', `aspas duplicadas: ${rows[0].b}`);
  assert(rows[1].a === "tem\nquebra", `quebra de linha dentro de aspas: ${JSON.stringify(rows[1].a)}`);

  assert(formatDate("2021-08") === "ago/2021", `ISO: ${formatDate("2021-08")}`);
  assert(formatDate("Aug 2021") === "ago/2021", `EN: ${formatDate("Aug 2021")}`);
  assert(formatDate("ago 2021") === "ago/2021", `PT: ${formatDate("ago 2021")}`);
  assert(formatDate("2021") === "2021", `ano solto: ${formatDate("2021")}`);
  assert(formatDate("") === "", "vazio deve virar vazio");
  assert(formatDate("qualquer coisa") === "qualquer coisa", "desconhecido passa cru");

  assert(
    formatPeriod("2021-08", "2022-09", "São Bernardo") === "ago/2021 — set/2022 · São Bernardo",
    `período: ${formatPeriod("2021-08", "2022-09", "São Bernardo")}`,
  );
  assert(
    formatPeriod("2025-10", "", "São Paulo") === "out/2025 — atual · São Paulo",
    `cargo atual: ${formatPeriod("2025-10", "", "São Paulo")}`,
  );

  const jobs = buildJobs(
    toRecords('Company Name,Title,Description,Location,Started On,Finished On\nAcme,Dev,"linha um\nlinha dois",SP,2021-08,2022-09\n'),
  );
  assert(jobs.length === 1 && jobs[0].body === "linha um linha dois", "descrição multilinha vira uma linha");

  const edu = buildEducation(toRecords("School Name,Degree Name,Start Date,End Date\nEstácio,Engenharia,2024,2029\n"));
  assert(edu[0].status === "Em andamento", "formatura futura deve marcar em andamento");

  console.log("self-check ok");
}

// ────────────────────────────────────────────────────────────────────────────
function main() {
  const arg = process.argv[2];

  if (arg === "--self-check") return selfCheck();

  if (!arg) {
    console.error("uso: npm run sync:linkedin -- ./pasta-do-export-extraida");
    console.error("     npm run sync:linkedin -- --self-check");
    process.exit(1);
  }

  if (arg.toLowerCase().endsWith(".zip")) {
    console.error("Extraia o zip primeiro e passe a pasta — o script não descompacta.");
    console.error(`  Expand-Archive "${arg}" -DestinationPath ./linkedin-export`);
    process.exit(1);
  }

  const dir = resolve(arg);
  if (!existsSync(dir)) {
    console.error(`pasta não encontrada: ${dir}`);
    process.exit(1);
  }

  const positions = readCsv(dir, "Positions.csv");
  const educationRows = readCsv(dir, "Education.csv");
  const skillRows = readCsv(dir, "Skills.csv");

  if (!positions && !educationRows && !skillRows) {
    console.error(`nenhum de Positions.csv / Education.csv / Skills.csv em ${dir}`);
    console.error("confira se apontou para a pasta certa do export.");
    process.exit(1);
  }

  const jobs = positions ? buildJobs(positions) : [];
  const education = educationRows ? buildEducation(educationRows) : [];
  const skills = skillRows ? buildSkills(skillRows) : [];

  const out = resolve("src/content/linkedin.generated.ts");
  writeFileSync(out, render({ jobs, education, skills, source: `export oficial em ${basename(dir)}` }), "utf8");

  console.log(`escrito ${out}`);
  console.log(`  ${jobs.length} experiências, ${education.length} formações, ${skills.length} skills`);

  // O export sai num idioma só. Se a contagem divergir do en.ts, o inglês ficou para trás.
  const enPath = resolve("src/content/en.ts");
  if (existsSync(enPath)) {
    const enJobs = (readFileSync(enPath, "utf8").match(/company:/g) ?? []).length;
    if (enJobs !== jobs.length) {
      console.warn(`\n  aviso: en.ts tem ${enJobs} experiências e o export trouxe ${jobs.length}.`);
      console.warn("  a tradução em inglês é manual — atualize src/content/en.ts.");
    }
  }
}

if (process.argv[1] && import.meta.url.endsWith(basename(process.argv[1]))) main();
