# Documentação

- [linkedin.md](linkedin.md) — por que o portfólio não lê o LinkedIn em runtime, e quais caminhos existem
- [sincronizacao-linkedin.md](sincronizacao-linkedin.md) — como rodar o sync a partir do export oficial
- [deploy.md](deploy.md) — como o site é publicado

## Mapa rápido

| Quero mudar | Onde |
|---|---|
| Link do LinkedIn, e-mail, telefone, foto, CV | [`src/config.ts`](../src/config.ts) |
| Experiência e formação | rodar o sync — [sincronizacao-linkedin.md](sincronizacao-linkedin.md) |
| Projetos, textos do hero e do "sobre" | [`src/content/pt.ts`](../src/content/pt.ts) e [`en.ts`](../src/content/en.ts) |
| Agrupamento de skills | `skillGroups` em `pt.ts` / `en.ts` |
| Cores | `:root` em [`src/styles.css`](../src/styles.css) |

## Por que esta pasta não é mais o build

Antes o Vite gerava em `docs/` porque o GitHub Pages sabe servir dessa pasta. Com `emptyOutDir: true`, qualquer documentação aqui morreria no próximo `npm run build`.

O build foi para `dist/` (ignorado pelo git) e a publicação passou a ser pelo workflow oficial do Pages. Ver [deploy.md](deploy.md).
