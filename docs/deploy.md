# Deploy

Push em `main` publica. O workflow está em [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).

## Configuração, uma vez só

No repositório: **Settings** → **Pages** → **Source**: `GitHub Actions`.

Se estava em `Deploy from a branch`, precisa trocar. A pasta `docs/` agora é documentação, não build, e `dist/` é ignorado pelo git — não existe mais pasta publicável no repositório.

## O que o workflow faz

```
push em main
   ↓
npm ci
   ↓
node scripts/sync-linkedin.mjs --self-check    ← parser do sync
   ↓
npm run build   →   tsc --noEmit  +  vite build
   ↓
upload de dist/ como artifact
   ↓
deploy-pages
```

Duas travas antes de publicar: o self-check do parser e o `tsc --noEmit`. Erro de tipo ou parser quebrado falha o job e o site no ar continua sendo o último que passou.

`concurrency: pages` com `cancel-in-progress` garante uma publicação por vez; dois pushes seguidos e o mais novo vence.

## Rodar na mão

A aba **Actions** → **Deploy** → **Run workflow**. Serve para republicar sem commit novo.

## Local

```bash
npm run dev
```

```bash
npm run build
```

`npm run preview` serve o `dist/` para conferir o build antes do push.

## `base: "./"`

Em [`vite.config.ts`](../vite.config.ts). Deixa os caminhos dos assets relativos, então o build funciona tanto em `usuario.github.io/portifolio/` quanto na raiz de um domínio próprio, sem recompilar.

## Domínio próprio

Coloque um arquivo `public/CNAME` com o domínio dentro. O Vite copia `public/` para `dist/` como está, e o Pages lê o CNAME do artifact publicado.
