# LinkedIn como fonte de conteúdo

Registro da decisão. O objetivo era: mudo um link do perfil numa variável global e todos os componentes puxam as informações do LinkedIn sozinhos, em tempo real, na montagem.

A parte da variável global foi feita. A leitura em runtime não é possível — e este documento explica por quê, para não ser reinvestigada daqui a seis meses.

## A variável global

```ts
// src/config.ts
export const LINKEDIN_HANDLE = "kelvin-piantino";
export const LINKEDIN_URL = `https://www.linkedin.com/in/${LINKEDIN_HANDLE}`;
```

Fonte única. Todo lugar que aponta para o perfil deriva daí, incluindo `SITE.linkedin`. Trocar o handle é a única edição necessária.

## Por que não dá para ler o perfil no navegador

Quatro bloqueios independentes. Cada um sozinho já encerra o assunto.

**1. Não existe endpoint que devolva esse conteúdo.** O produto público atual é *Sign In with LinkedIn using OpenID Connect*. O `/v2/userinfo` retorna `sub`, `name`, `given_name`, `family_name`, `picture`, `email`, `locale`. Não retorna experiência, formação, skills nem projetos. Isso vive em produtos de tier de parceria, que não são concedidos para portfólio pessoal.

**2. O OAuth autentica a pessoa errada.** OAuth autoriza *quem está logando*. Um recrutador abrindo a página logaria na conta dele, e o retorno seria o perfil dele. Para buscar o seu perfil seria preciso o seu access token embutido no bundle — público, portanto — e que expira em 60 dias.

**3. CORS.** Os endpoints do LinkedIn não enviam `Access-Control-Allow-Origin` para origens arbitrárias. O `fetch` morre no preflight, antes de qualquer discussão sobre autenticação.

**4. Scraping** exige sessão autenticada, é combatido ativamente e contraria os termos de uso. Fora de cogitação.

## Por que `.env` não resolve

Isto foi verificado empiricamente neste projeto, não deduzido:

```bash
# .env
VITE_LINKEDIN_API_KEY=SEGREDO_SUPER_SECRETO_12345
```

Depois de `npm run build`, o valor aparece em texto puro dentro de `dist/assets/index-*.js` — o arquivo que o GitHub Pages entrega ao visitante.

O Vite injeta variáveis `VITE_*` no bundle em tempo de build. Elas são **configuração pública**, não segredo. Qualquer chave que o navegador use, o visitante lê com o DevTools aberto.

Consequência: chave de API exige backend. Backend significa que o site deixa de ser estático.

## Por que "em tempo real na montagem" seria ruim mesmo se funcionasse

Buscar no `useEffect` de montagem significa que o recrutador espera uma requisição a um terceiro antes de ver seu currículo. Se esse terceiro estiver lento, ele vê skeleton. Se estiver fora, ele vê um portfólio vazio.

Essa é a única página que não pode falhar diante dessa pessoa. Conteúdo de currículo muda duas ou três vezes por ano; não há motivo para pagar latência e risco de página em branco a cada visita por um dado que é praticamente estático.

## O que existe hoje neste projeto

Sincronização a partir do **export oficial de dados do LinkedIn**. Gratuito, legítimo, sem terceiros. Você baixa o export quando atualiza o perfil e roda um comando; o conteúdo é regenerado e o commit dispara o deploy.

Passo a passo em [sincronizacao-linkedin.md](sincronizacao-linkedin.md).

O que ele cobre e o que não cobre:

| Campo | Origem |
|---|---|
| Experiência (`jobs`) | export, regenerado |
| Formação (`education`) | export, regenerado |
| Skills, lista plana | export, regenerado |
| Agrupamento de skills | manual — o LinkedIn não agrupa |
| Projetos, hero, "sobre" | manual — não existem no perfil nesse formato |
| Tradução em inglês | manual — o export sai num idioma só |

O script avisa quando o número de experiências do export diverge do `en.ts`, que é o sinal de que o inglês ficou para trás.

## Se um dia quiser automação de verdade

O único desenho que entrega "troco o link e o conteúdo se atualiza sozinho":

```
LINKEDIN_URL (público, tudo bem)
      ↓
GitHub Action agendada  ──── chave do provedor em GitHub Secrets
      ↓                       (secreto de verdade: roda no servidor)
provedor terceiro de dados → JSON do perfil
      ↓
regenera src/content/linkedin.generated.ts, commita, dispara o deploy
```

O site continua estático e instantâneo, o recrutador nunca espera nada, e a atualização acontece no ciclo da Action em vez do page load — diferença que ninguém percebe.

O que falta para isso existir: **um provedor de dados**. Não há como escapar disso; qualquer leitura automatizada do LinkedIn passa por um serviço que revende dados raspados. Eles são pagos por requisição e o LinkedIn litiga contra esse mercado, então provedores aparecem e somem. Se o seu cair, o sync para de rodar — mas o site continua no ar com o último conteúdo commitado, que é justamente a vantagem de gerar em build time em vez de runtime.

Ponto de plugue: trocar a leitura de CSV em `scripts/sync-linkedin.mjs` por uma chamada HTTP ao provedor. As funções `buildJobs`, `buildEducation` e `buildSkills` recebem registros já normalizados, então só a camada de leitura muda.
