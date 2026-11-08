# Desenvolvimento local

Aplicação base da RIV-12: Next.js 16.4.4, TypeScript (`strict`), App Router, sem `src/`, gerenciada com npm, com Tailwind CSS v4 (RIV-13). É um **placeholder técnico** sem conteúdo comercial nem identidade visual.

## Como executar

Pré-requisitos: Node.js 20.9 ou superior e npm.

```bash
npm ci            # instala as dependências do package-lock.json
npm run dev       # servidor de desenvolvimento em http://localhost:3000
npm run build     # build de produção
npm start         # serve o build de produção (rode `npm run build` antes)
```

Verificações de qualidade (RIV-17): `npm run check` executa, em sequência, `lint`, `format:check` e `typecheck` e falha se qualquer uma falhar. Antes de abrir um PR, rode também `npm run build`.

## Configurações que não devem ser revertidas sem decisão do Owner

- **Cache Components e Partial Prefetching** estão desativados (o scaffold do Next.js os ligaria por padrão).
- **`agentRules: false`** em `next.config.ts`. O `next dev` detecta agentes de IA e, por padrão, escreve um bloco de instruções no `AGENTS.md`. O `AGENTS.md` é um arquivo de governança do Owner e não pode ser alterado por ferramentas de terceiros. Se ele aparecer modificado depois de `npm run dev`, é um defeito: reverta com `git checkout -- AGENTS.md` e reporte.
- **`tsconfig.json`**: o Next.js reescreve e normaliza este arquivo durante `dev`/`build` (inclusive `allowJs`, que ele exige). O arquivo versionado já está na forma normalizada para que o build não gere diferenças; não o formate à mão.

## Tailwind CSS (RIV-13)

- **Versão:** Tailwind CSS **v4**, decisão do Owner. `tailwindcss` e `@tailwindcss/postcss` em **4.3.3** e `postcss` em **8.5.31**, todos com **versão exata** (sem `^`) no `package.json` e no `package-lock.json`. Ao atualizar, mantenha `tailwindcss` e `@tailwindcss/postcss` **na mesma versão exata** (o segundo fixa o primeiro como dependência).
- **Integração:** a integração oficial via PostCSS, a documentada pelo Next.js: `postcss.config.mjs` com o plugin `@tailwindcss/postcss` e `@import "tailwindcss";` em `app/globals.css`. **Não** use o loader `@tailwindcss/turbopack` que o scaffold do Next.js gera: ele fica preso ao Turbopack e não consta na documentação do Next 16.4.4. No teste do scaffold feito na RIV-13 (`create-next-app` 16.4.4 com Tailwind), o `next.config.ts` gerado trazia esse loader junto com Cache Components e Partial Prefetching ligados; aqui continuam desativados, por decisão do Owner.
- **Sem identidade visual:** não há `@theme`, cores, fontes ou tokens de marca. Paleta, tipografia e design system pertencem à Sprint 2 (DEC-RIV-007 pendente). O Tailwind aplica apenas os valores padrão dele (fonte do sistema, escala de espaçamento).
- **Detecção de classes:** o Tailwind lê automaticamente todos os arquivos do projeto, inclusive `.md`. Em `app/globals.css`, `@source not "../docs"` e `@source not "../*.md"` impedem que palavras da documentação gerem CSS. Comprovado com arquivos de teste: sem a exclusão, uma palavra em `docs/*.md` ou num `.md` da raiz virou regra CSS; com ela, não. Pastas de código novas (por exemplo `components/`) são detectadas sem configuração. Hoje só `docs/` e os `.md` da raiz são excluídos. Por decisão do Owner (04/11/2026), a pasta `content/` (ver a seção seguinte) **não** é adicionada à detecção do Tailwind por ora: conteúdo não deve conter classes de estilo.
- **Reset base:** o Tailwind inclui um reset (Preflight). Títulos e parágrafos ficam sem estilo até receberem classes; é esperado.

### Navegadores mínimos

O Tailwind CSS v4 exige navegadores modernos. Os alvos que o `@tailwindcss/node` 4.3.3 usa ao gerar o CSS (lidos no código do pacote instalado) são:

| Navegador | Versão mínima |
| --- | --- |
| Safari (macOS) e Safari no iOS | 16.4 |
| Chrome | 111 |
| Firefox | 128 |

Navegadores anteriores a essas versões podem não exibir os estilos corretamente. A Fonte da Verdade não define uma matriz de navegadores; a validação cross-browser está na Sprint 4 e deve confirmar ou ajustar esta tabela. Se um requisito de navegadores mais antigos surgir, a alternativa é o Tailwind v3 (decisão do Owner).

## Estrutura de componentes e conteúdo (RIV-14)

Decisão do Owner de 04/11/2026. Sem `src/`; tudo na raiz, com o alias `@/*` (raiz do projeto) já configurado no `tsconfig.json`.

| Pasta | Uso | Estado |
| --- | --- | --- |
| `app/` | Rotas, layouts e páginas do App Router. Compõe componentes; não guarda texto comercial | Existente |
| `components/layout/` | Componentes **estruturais** (contêineres, grades, seções-base), sem conteúdo | Contém `Container` |
| `components/ui/` | Componentes **reutilizáveis** de interface (botões, links, etc.) | Reservada; criada quando houver o primeiro componente |
| `content/` | Conteúdo textual do site, mantido no repositório, sem CMS (Fonte da Verdade §11.5). Separado dos componentes e preparado para EN/PT | Reservada; **não criada** até haver conteúdo |

Convenções:

- **Nomes:** arquivos em `kebab-case` (`container.tsx`); componentes em `PascalCase` com exportação nomeada (`export function Container`).
- **Server Components por padrão.** Use `"use client"` só quando houver necessidade comprovada.
- **Sem identidade visual definitiva:** componentes usam apenas a escala padrão do Tailwind, sem cores, fontes ou tokens de marca (DEC-RIV-007 pendente). Componentes comerciais pertencem à Sprint 3.
- **Sem bibliotecas de componentes** sem necessidade comprovada e aprovação do Owner.
- **Conteúdo fora dos componentes:** textos comerciais vão para `content/`; o formato por idioma será definido na RIV-16, conforme o ADR-0001. Hoje a página inicial é um placeholder técnico.
- **`Container`** (`components/layout/container.tsx`): `div` com `mx-auto w-full max-w-5xl px-4 sm:px-6`; aceita `className` e as demais propriedades de `div`. Valida a convenção; não é um componente final.

## Qualidade de código (RIV-17)

| Script | O que faz |
| --- | --- |
| `npm run lint` | `eslint .` com a configuração oficial do Next.js (`core-web-vitals` e `typescript`), em `eslint.config.mjs` |
| `npm run format:check` | `prettier --check .`: verifica a formatação sem alterar arquivos |
| `npm run format` | `prettier --write .`: formata o código e a configuração |
| `npm run typecheck` | `tsc --noEmit` (TypeScript em modo `strict`) |
| `npm run check` | `lint`, `format:check` e `typecheck` em sequência |

- **Versões exatas (decisão do Owner):** `eslint` 9.39.5, `eslint-config-next` 16.4.4 (mesma versão do `next`) e `prettier` 3.9.10, sem `^`. O `next lint` foi removido no Next.js 16, por isso o lint usa o CLI do ESLint. O ESLint 9 já não recebe suporte oficial (o `npm install` avisa que a versão está descontinuada); a migração para a 10.x é uma decisão futura do Owner, a validar com `eslint-config-next`.
- **Sem `prettier-plugin-tailwindcss`** nesta sprint (decisão do Owner): a ordenação de classes do Tailwind fica para quando os componentes visuais crescerem.
- **O que o Prettier não formata:** `docs/` e todos os `*.md` (inclusive `AGENTS.md`, que é do Owner), `tsconfig.json` e `package-lock.json` (o Next.js e o npm os reescrevem), e os arquivos gerados (`.next/`, `next-env.d.ts`, `tsconfig.tsbuildinfo`). O ESLint ignora `.next/`, `out/`, `build/`, `coverage/` e `next-env.d.ts`. Fins de linha: `endOfLine: "auto"`, para não conflitar com a conversão do Git no Windows.
- **`npm audit`:** em produção (`npm audit --omit=dev`) não há vulnerabilidades. A árvore de desenvolvimento do `eslint-config-next` 16.4.4 traz 8 avisos de severidade moderada, todos da mesma causa: negação de serviço potencial por amplificação de *globparts* no `minimatch` (GHSA-g3hv-75wg-m249; corrigido no `minimatch` 11.0.1), usado pelo `typescript-estree`, que fixa a faixa 10.x. É código que só roda na máquina de desenvolvimento e no CI, sobre os arquivos do próprio repositório. O `npm audit fix --force` sugere rebaixar o `eslint-config-next` para a 15, o que contraria a decisão do Owner; **risco aceito até uma atualização do `eslint-config-next` ou do `typescript-eslint` que o resolva** (um `override` do npm também resolveria, mas está fora do escopo e não foi decidido). Em CI, use `npm audit --omit=dev`.

## Telemetria

O Next.js coleta telemetria anônima por padrão. Por decisão do Owner, ela fica **desativada no ambiente de desenvolvimento** com `npx next telemetry disable`, que é configuração local de cada máquina e não vai para o repositório. Para desativar apenas em uma execução: `NEXT_TELEMETRY_DISABLED=1`.

## Fora do escopo desta base

Design system e identidade visual (Sprint 2), ordenação de classes do Tailwind, testes (RIV-18), CI (RIV-19) e internacionalização (RIV-16, após a decisão do ADR da RIV-15).
