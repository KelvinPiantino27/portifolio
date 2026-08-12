# Portfólio — Kelvin Piantino

Portfólio single-page em React. Tema claro/escuro, PT/EN, filtro de projetos e modal de detalhe.

Stack: React 19 + TypeScript, build com Vite. Sem router, sem biblioteca de estado, sem biblioteca de i18n — a página não precisa de nenhum dos três.

No ar em [kelvinpiantino27.github.io/portifolio](https://kelvinpiantino27.github.io/portifolio/).

## Rodar

```bash
npm install
```

```bash
npm run dev
```

`npm run build` faz type-check e gera `dist/`. `npm run preview` serve esse build.

## Estrutura

```
index.html              entry do Vite; aplica o tema salvo antes do primeiro paint
vite.config.ts          base "./" e saída em dist/
src/
  main.tsx              createRoot
  App.tsx               estado da página e composição das seções
  styles.css            tokens do design system Nocturne + todas as classes
  config.ts             LINKEDIN_URL, e-mail, telefone, links, CV, foto
  content/
    types.ts            tipos + Dict, o contrato dos dois idiomas
    pt.ts  en.ts        todo o texto
    linkedin.generated.ts   experiência e formação — GERADO, não editar
  hooks/
    useTheme.ts         dark/light + localStorage
    useReveal.ts        fade-in no scroll, um IntersectionObserver para a página
  components/           Header Hero Stats Projects ProjectDialog
                        Timeline Skills About Contact Reveal
scripts/
  sync-linkedin.mjs     export oficial do LinkedIn → linkedin.generated.ts
docs/                   documentação
legacy-dc/              versão anterior, no framework do Claude Design
```

`dist/` é gerado e ignorado pelo git.

## Conteúdo

**Experiência e formação** vêm do export oficial do LinkedIn. `linkedin.generated.ts` é gerado; editá-lo à mão é sobrescrito no próximo sync:

```bash
npm run sync:linkedin -- ./linkedin-export
```

**O resto do texto** está em `src/content/pt.ts` e `src/content/en.ts`. Os dois implementam a interface `Dict` de `types.ts`, então uma chave presente em só um idioma quebra o build — é intencional.

Em `projects`, o campo `tag` aceita `"Mobile"`, `"Web"` ou `"Desktop"`, que são também os filtros da seção. `skillGroups` é agrupamento curado: o LinkedIn devolve lista plana.

**Contato, links e perfil** estão em `src/config.ts`, com `LINKEDIN_HANDLE` como fonte única do link do perfil. A foto vem de `https://github.com/KelvinPiantino27.png`, que serve sempre o avatar atual da conta; se falhar, o círculo cai no monograma. O botão de currículo aponta para `./cv.pdf` — coloque o arquivo em `public/`, ou deixe `cvUrl: ""` para escondê-lo.

**Cores**: bloco `:root` no topo de `src/styles.css`, e `:root[data-kp-theme="light"]` logo abaixo.

## Publicar

Push em `main` publica sozinho, via GitHub Actions e Pages. O workflow roda o self-check do sync e o type-check antes de publicar, então erro de tipo não vai ao ar.

## Documentação

- [docs/deploy.md](docs/deploy.md) — pipeline de publicação
- [docs/sincronizacao-linkedin.md](docs/sincronizacao-linkedin.md) — passo a passo do sync
- [docs/linkedin.md](docs/linkedin.md) — por que os dados do LinkedIn são sincronizados em build, e não lidos em tempo real

## legacy-dc/

Versão anterior da página, no framework proprietário do Claude Design (`<x-dc>`, `<sc-for>`, `DCLogic`). Guardada só para consulta — nada do projeto atual depende dela.
