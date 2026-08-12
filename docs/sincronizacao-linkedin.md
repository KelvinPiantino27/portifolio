# Sincronizar experiência e formação com o LinkedIn

Regenera `src/content/linkedin.generated.ts` a partir do export oficial de dados do LinkedIn. Rode quando atualizar o perfil.

Por que é assim e não em tempo real: [linkedin.md](linkedin.md).

## 1. Pedir o export

LinkedIn → **Configurações e privacidade** → **Privacidade de dados** → **Obter uma cópia dos seus dados**.

Escolha os dados específicos e marque ao menos **Positions**, **Education** e **Skills**. Pedir tudo também funciona, só demora mais e traz coisa que este projeto não usa.

O arquivo chega por e-mail em alguns minutos, às vezes até 24h.

## 2. Extrair

O script não descompacta — passe a pasta já extraída.

```bash
Expand-Archive ~/Downloads/Basic_LinkedInDataExport.zip -DestinationPath ./linkedin-export
```

`linkedin-export/` e `*_LinkedInDataExport*.zip` estão no `.gitignore`. **Mantenha assim.** O export completo contém e-mail, conexões, mensagens e histórico de buscas — nada disso deve ir para um repositório público.

## 3. Rodar

```bash
npm run sync:linkedin -- ./linkedin-export
```

Saída esperada:

```
escrito .../src/content/linkedin.generated.ts
  5 experiências, 2 formações, 22 skills
```

## 4. Conferir e publicar

```bash
git diff src/content/linkedin.generated.ts
```

Leia o diff antes de commitar. O export traz a descrição do cargo exatamente como está no LinkedIn — se lá estiver em bullets ou abreviado, é assim que vai aparecer no portfólio. Vale ajustar o texto **no LinkedIn** e reexportar, para as duas versões continuarem batendo.

Commitar em `main` dispara o deploy sozinho. Ver [deploy.md](deploy.md).

## O que fica manual

O script só regenera o que o LinkedIn possui:

- **Agrupamento de skills** — o export é uma lista plana. Os blocos "Mobile", "Front-end", "Back-end & dados" e "Qualidade & plataforma" são curadoria sua, em `skillGroups` no `pt.ts` / `en.ts`. Use `linkedinSkills` do arquivo gerado como referência do que entrou ou saiu.
- **Inglês** — o export sai num idioma só. `src/content/en.ts` é traduzido à mão. O script avisa quando a contagem de experiências diverge:

  ```
  aviso: en.ts tem 5 experiências e o export trouxe 6.
  a tradução em inglês é manual — atualize src/content/en.ts.
  ```

- **Projetos, hero e "sobre"** — não existem no perfil nesse formato. Ficam em `pt.ts` / `en.ts`.

## Se algo quebrar

O parser tem verificação própria:

```bash
npm run sync:linkedin -- --self-check
```

Cobre vírgula e quebra de linha dentro de aspas, aspas duplicadas, os formatos de data em português e inglês, e a marcação de "Em andamento" para formatura futura. Roda também no CI, antes do build.

O LinkedIn já renomeou colunas do export antes. O script aceita nomes alternativos (`Started On` ou `Start Date`, `Company Name` ou `Company`) e ignora o que não reconhece em vez de falhar. Se um campo vier vazio no resultado, é sinal de que a coluna mudou de nome de novo — o ajuste é na função `pick` em `scripts/sync-linkedin.mjs`.
