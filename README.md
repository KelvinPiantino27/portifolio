# Portfólio — Kelvin Piantino

Portfólio single-page em React. Tema claro/escuro, PT/EN, filtro de projetos, modal de detalhe.

Stack: React 19 + TypeScript, build com Vite. Sem router, sem biblioteca de estado, sem biblioteca de i18n — a página não precisa de nenhum dos três.

Documentação detalhada em [`docs/`](docs/README.md).

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

`dist/` é gerado e ignorado pelo git. A publicação é por GitHub Actions — ver [docs/deploy.md](docs/deploy.md).

## Onde editar o conteúdo

**Experiência e formação** vêm do LinkedIn. Não edite `linkedin.generated.ts` à mão; rode o sync:

```bash
npm run sync:linkedin -- ./linkedin-export
```

Passo a passo em [docs/sincronizacao-linkedin.md](docs/sincronizacao-linkedin.md).

**O resto** fica em `src/content/pt.ts` e `src/content/en.ts`. Os dois implementam a interface `Dict` de `types.ts`, então uma chave adicionada só em um idioma quebra o build — é essa a ideia.

- `projects` — os três atuais são fictícios, herdados do design. Troque pelos reais. `tag` tem que ser `"Mobile"`, `"Web"` ou `"Desktop"`, que são também os filtros.
- `skillGroups` — o agrupamento é curadoria sua; o LinkedIn só devolve lista plana.
- `heroTitle`, `heroBody`, `about1`, `about2`, `stats` — textos de vitrine, não existem no perfil.

**Contato, links e perfil**: `src/config.ts`. `LINKEDIN_HANDLE` é a fonte única do link do perfil.

**Cores**: bloco `:root` no topo de `src/styles.css`, e `:root[data-kp-theme="light"]` logo abaixo.

## Foto

`photoUrl` em `src/config.ts` aponta para `https://github.com/Thenivlek.png?size=264`. É um URL permanente que sempre serve o avatar atual da conta — trocar a foto no GitHub troca a do portfólio, sem rebuild e sem deploy.

Se a imagem falhar (rate limit, offline, conta renomeada), o círculo cai no monograma "KP" sozinho.

Alternativas, todas trocando uma linha:

- **Gravatar**, atrelado ao e-mail: `https://gravatar.com/avatar/<sha256-do-email-minúsculo>?s=264`
- **Arquivo local**: ponha em `src/assets/`, `import foto from "./assets/foto.jpg"`, `photoUrl: foto`

## CV

Coloque o PDF em `public/cv.pdf`. O botão já aponta para `./cv.pdf`; sem o arquivo ele dá 404. Para esconder o botão, deixe `cvUrl: ""`.

## Publicar

Push em `main` publica sozinho. A configuração de uma vez só (Pages → Source: GitHub Actions) está em [docs/deploy.md](docs/deploy.md).

## legacy-dc/

Versão anterior, no framework proprietário do Claude Design (`<x-dc>`, `<sc-for>`, `DCLogic`). Guardada só para consulta; nada do projeto atual depende dela e pode ser apagada.

Converter para React cortou o vínculo com o projeto em claude.ai/design: mudanças feitas lá não voltam mais para cá.

## Por que o portfólio não lê o LinkedIn em tempo real

Resposta longa em [docs/linkedin.md](docs/linkedin.md), com a demonstração de por que `.env` não guarda segredo em site estático.
