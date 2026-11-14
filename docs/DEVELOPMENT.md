# Desenvolvimento local

Aplicação base da RIV-12: Next.js 16.4.4, TypeScript (`strict`), App Router, sem `src/`, gerenciada com npm, com Tailwind CSS v4 (RIV-13). É um **placeholder técnico** sem conteúdo comercial nem identidade visual.

## Como executar

Pré-requisitos: **Node.js 22.12 ou superior** (versão mínima suportada; o CI usa Node 22) e npm.

```bash
npm ci            # instala as dependências do package-lock.json
npm run dev       # servidor de desenvolvimento em http://localhost:3000
npm run build     # build de produção
npm start         # serve o build de produção (rode `npm run build` antes)
```

Verificações de qualidade (RIV-17): `npm run check` executa, em sequência, `lint`, `format:check` e `typecheck` e falha se qualquer uma falhar. Antes de abrir um PR, rode também `npm test` e `npm run build`.

## Configurações que não devem ser revertidas sem decisão do Owner

- **Cache Components e Partial Prefetching** estão desativados (o scaffold do Next.js os ligaria por padrão).
- **`agentRules: false`** em `next.config.ts`. O `next dev` detecta agentes de IA e, por padrão, escreve um bloco de instruções no `AGENTS.md`. O `AGENTS.md` é um arquivo de governança do Owner e não pode ser alterado por ferramentas de terceiros. Se ele aparecer modificado depois de `npm run dev`, é um defeito: reverta com `git checkout -- AGENTS.md` e reporte.
- **`tsconfig.json`**: o Next.js reescreve e normaliza este arquivo durante `dev`/`build` (inclusive `allowJs`, que ele exige). O arquivo versionado já está na forma normalizada para que o build não gere diferenças; não o formate à mão.

## Tailwind CSS (RIV-13)

- **Versão:** Tailwind CSS **v4**, decisão do Owner. `tailwindcss` e `@tailwindcss/postcss` em **4.3.3** e `postcss` em **8.5.31**, todos com **versão exata** (sem `^`) no `package.json` e no `package-lock.json`. Ao atualizar, mantenha `tailwindcss` e `@tailwindcss/postcss` **na mesma versão exata** (o segundo fixa o primeiro como dependência).
- **Integração:** a integração oficial via PostCSS, a documentada pelo Next.js: `postcss.config.mjs` com o plugin `@tailwindcss/postcss` e `@import "tailwindcss";` em `app/globals.css`. **Não** use o loader `@tailwindcss/turbopack` que o scaffold do Next.js gera: ele fica preso ao Turbopack e não consta na documentação do Next 16.4.4. No teste do scaffold feito na RIV-13 (`create-next-app` 16.4.4 com Tailwind), o `next.config.ts` gerado trazia esse loader junto com Cache Components e Partial Prefetching ligados; aqui continuam desativados, por decisão do Owner.
- **Identidade visual (RIV-27 e RIV-28):** os tokens, as fontes e os componentes base da **V4 Red Pen** (DEC-RIV-012, proposta aguardando aceite do Owner) estão em `app/globals.css` e `components/`; ver "Fundação visual V4 Red Pen". Esta linha descrevia a base da RIV-13, sem identidade.
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
| `app/` | Rotas, layouts e páginas do App Router. Todas as rotas ficam sob `app/[lang]/` (RIV-16). Compõe componentes; não guarda texto comercial | Existente |
| `components/layout/` | Componentes **estruturais** (contêineres, grades, seções-base), sem conteúdo | Contém `Container` |
| `components/ui/` | Componentes **reutilizáveis** de interface (botões, links, etc.) | `Button`, `ButtonLink`, `TextLink`, `Eyebrow`, `Heading`, `Highlight`, `HandNote` (RIV-28) |
| `content/` | Conteúdo textual do site, mantido no repositório, sem CMS (Fonte da Verdade §11.5). Separado dos componentes e preparado para EN/PT | Reservada; **não criada** até haver conteúdo |

Convenções:

- **Nomes:** arquivos em `kebab-case` (`container.tsx`); componentes em `PascalCase` com exportação nomeada (`export function Container`).
- **Server Components por padrão.** Use `"use client"` só quando houver necessidade comprovada.
- **Tokens, nunca valores soltos:** componentes usam os tokens do `@theme` (`bg-paper`, `text-red-pen`, `font-serif`...), sem hex solto. Componentes comerciais pertencem à Sprint 3.
- **Sem bibliotecas de componentes** sem necessidade comprovada e aprovação do Owner.
- **Conteúdo fora dos componentes:** o texto vem dos dicionários por idioma em `i18n/dictionaries/` (RIV-16, ver "Internacionalização"), nunca escrito dentro do componente. A pasta `content/` continua reservada e só será criada se algum conteúdo não couber no dicionário (decisão de organização da RIV-16, a confirmar pelo Owner). Hoje a página inicial tem o Hero (RIV-31) e as seções de conteúdo (RIV-32).
- **`Container`** (`components/layout/container.tsx`): `div` com `mx-auto w-full max-w-7xl` (1280px); aceita `className` e as demais propriedades de `div`. **Sem padding próprio**: o respiro horizontal vem do `Section` (`clamp(20px, 5vw, 80px)`), como na V4.

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

## Testes (RIV-18)

| Script | O que faz |
| --- | --- |
| `npm test` | `vitest run`: executa a suíte uma vez e falha se algum teste falhar |
| `npm run test:watch` | `vitest`: modo interativo, para desenvolvimento |

- **Ferramentas (recomendação do Owner):** Vitest, React Testing Library e jsdom, a combinação documentada pelo Next.js para testes unitários e de componentes. Configuração em `vitest.config.mts` (ambiente `jsdom`, alias `@` para a raiz, ignora `.next/`) e `vitest.setup.ts` (limpeza do DOM depois de cada teste).
- **Versões exatas:** `vitest` 5.1.0, `vite` 6.4.5, `jsdom` 26.1.0, `@testing-library/react` 16.3.3 e `@testing-library/dom` 10.4.2. Não há plugin do React: o JSX segue o `jsx: react-jsx` do `tsconfig.json`. Não há `@testing-library/jest-dom`; as asserções usam as consultas do Testing Library e comparações simples.
- **Onde ficam os testes:** ao lado do código, como `*.test.ts` ou `*.test.tsx` (por exemplo `components/layout/container.test.tsx`). Eles não viram rotas do Next.js.
- **O que cobrem hoje:** o helper de acessibilidade (RIV-29), o `Container` (filhos, classes padrão, `className` acrescentado sem perder as padrão, propriedades repassadas), a página inicial (título, landmark `main`, aviso de construção, uso do `Container`) e os metadados do site. Não há utilitários no código para testar. Testes funcionais completos e E2E ficam para a Sprint 4 (RIV-6).
- **Limite conhecido:** o Vitest não renderiza Server Components assíncronos; se aparecerem, o Next.js recomenda testes E2E.
- **Versão mínima de Node: 22.12.** O `vitest` 5 exige Node `^22.12 || ^24 || >=26`; por isso o `@types/node` passou de `^20` para `^22` (peer opcional do Vitest 5, sem o qual o npm recusa a instalação) e, na RIV-19, o `engines` do projeto passou de `>=20.9.0` para `>=22.12.0`, para não declarar compatível uma versão que não consegue rodar os testes (decisão do Owner de 08/11/2026). O Next.js 16.4.4 sozinho aceitaria Node 20.9 e o ESLint 9, Node 20.9; a versão mínima do projeto é a das ferramentas de teste. Não testei Node 20.
- **Por que o Vitest 5:** as linhas anteriores não eram uma opção segura ou instalável. O `vitest` 3.2.7, que cobre Node 20, traz 2 avisos críticos (`tinypool`, GHSA-5gmw-xhrv-c9v3 e GHSA-85c8-ppgw-ccpr) e 2 moderados (`@vitest/mocker`, GHSA-82fw-gwwq-j7x9 e GHSA-qxg6-89mg-rqv8) no `npm audit` completo; o `vitest` 4.1.12 derruba o npm 10.9.9 (`Cannot read properties of null (reading 'edgesOut')`), mesmo em diretório vazio. Com o `vitest` 5.1.0 o `npm audit` completo fica só com os 8 avisos moderados do `minimatch` já aceitos na seção anterior; `npm audit --omit=dev` continua em 0.

## Testes de acessibilidade automatizados (RIV-29)

O Owner aprovou o `axe-core` integrado ao Vitest. Nada de Jest: o helper roda no Vitest, Testing Library e jsdom já existentes.

```tsx
import { render } from "@testing-library/react";
import { expectNoA11yViolations } from "@/test/a11y";

it("não tem violações de acessibilidade detectáveis pelo axe", async () => {
  const { container } = render(<MeuComponente />);
  await expectNoA11yViolations(container);
});
```

- **Helper:** `test/a11y.ts` (`runAxe` e `expectNoA11yViolations`). Roda as regras do axe das tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` e `best-practice`. A falha lista cada violação com o id da regra, o impacto e o elemento. `test/a11y.test.tsx` prova que o helper detecta imagem sem `alt`, botão sem nome, campo sem rótulo, link sem nome, `role` inválido e ARIA inválido, e que **falha se o axe não avaliar nenhuma regra** (container vazio), para não aprovar sem testar nada. Resultados `incomplete` (o axe não decidiu sozinho) **não** falham o teste; use `runAxe` para inspecioná-los.
- **Dependência:** `axe-core` **4.14.0**, versão exata, só de desenvolvimento, licença MPL-2.0 (ferramenta de teste, não vai para o bundle do site). Ele **já estava instalado** como dependência indireta do `eslint-plugin-jsx-a11y` (via `eslint-config-next`), na mesma versão e com o mesmo hash de integridade; a mudança só o declara como dependência direta e fixa a versão. Nenhum pacote novo entrou na árvore. Publicada em 05/10/2026, sem dependências próprias.
- **O que NÃO é medido aqui (limite do jsdom, que não faz layout nem pintura):** contraste de cores (`color-contrast` fica desligado), foco visível, tamanho de alvos de toque, rolagem horizontal e regras de página inteira (`region`, `landmark-one-main`, `page-has-heading-one`, desligadas porque os testes renderizam trechos dentro de um `<div>`; a estrutura da página, como `main` e um único `h1`, tem asserções próprias nos testes da página) e `duplicate-id`, que o axe 4.14.0 marcou como obsoleta e fica fora das tags escolhidas. Esses itens continuam na auditoria no Chrome (1440 e 390 px), registrada no Jira por tarefa. Um teste do helper documenta o limite do contraste.
- **Uso esperado:** todo componente novo ganha um teste com `expectNoA11yViolations`. Passar no axe é necessário, mas não prova acessibilidade completa.

## Fundação visual V4 Red Pen (RIV-27 e RIV-28)

Referência visual vigente (decisão do Owner de 14/11/2026): **Home V4 Red Pen**, arquivo `V4-RedPen.dc.html` (SHA-256 `faedd2d42baf9a60f82453743f877f5235b4d8989c091a3859026e575b13a367`); substitui a V3 Sketch to Final. É um **mockup exportado**: o código com `<x-dc>`, `DCLogic`, `support.js` e o React embarcado **não** é código de produção e **não** foi copiado. A DEC-RIV-012 que registra a decisão está como sugestão no Google Docs, **aguardando o aceite do Owner**.

| Peça | Onde |
| --- | --- |
| Tokens de cor e sombras duras (`@theme`) | `app/globals.css`: Paper `#F5F0E4`, Ink `#1D1A17`, Burgundy `#6B3343`, Deep Burgundy `#3F1624`, Red Pen `#C8231D`, Highlight Yellow `#F6E24B` e os de apoio (Rose, muted, body, sheet, rule, dash) |
| Fontes | `app/[lang]/fonts.ts` (`next/font/google`, autohospedadas no build): Fraunces (títulos), Instrument Sans (texto), Geist Mono (rótulos), Caveat (manuscrito). Courier Prime (V3) foi descontinuada |
| Estilos globais | `app/globals.css`: fundo Paper, foco 3px Red Pen (Highlight sobre fundos escuros), marcador amarelo (`.marker`), reduced-motion global |
| Layout | `Container` (1280px), `Section` (tons `paper`, `highlight`, `burgundy`, `burgundy-deep`, `ink`; `bordered` opcional), `SkipLink` (traduzido, alvo `#main`) |
| Componentes base | `components/ui/`: `Button` e `ButtonLink` (`ink` e `highlight`), `TextLink`, `Eyebrow`, `Heading` e `Em`, `Highlight`, `HandNote` |

- **Verificado contra a V4 no Chrome** (estilos calculados, 1440 e 390px): títulos (display, seção, About, Contato, serviço, passo), rótulo, anotação manuscrita, marcador, botões (borda, cores, sombra dura de 6px, altura), link de texto e as seções (fundos, bordas, respiros): **16 de 16 pares idênticos nos dois tamanhos**. Hover (-2px, sombra de 9px) e clique (+3px, sem sombra) dos botões coincidem com a V4. Nenhuma requisição a fontes externas.
- **Diferenças intencionais em relação à V4:** o `TextLink` mostra o sublinhado Red Pen também no **foco do teclado** (a V4 só definiu o hover); as bordas das seções são opcionais (`bordered`), pois o Contato da V4 é Burgundy **sem** borda.
- **Contraste medido** (WCAG 2.1, calculado e no Chrome): Ink sobre Paper 15,2:1; texto `#3B362F` 10,5:1; `#5B544B` 6,6:1; Red Pen sobre Paper 5,0:1 e sobre a folha 5,6:1; Paper sobre Burgundy 8,5:1; Rose sobre Burgundy 6,0:1; Highlight sobre Burgundy 7,3:1; Paper sobre Deep Burgundy 13,7:1; Ink sobre Highlight 13,1:1. O anel de foco Red Pen sobre Paper tem 5,0:1 e o amarelo sobre Burgundy 7,3:1. **Atenção para as tarefas seguintes:** o placeholder da V4 (Rose a 80% sobre Burgundy) dá **4,48:1**, abaixo de 4,5:1 (usar opacidade 1, 6,0:1); Red Pen sobre Burgundy dá 1,7:1 e **não pode** ser usado.
- **Foco em fundos escuros:** a troca do anel para Highlight vale **dentro de elementos com `data-tone`** (o `Section`). Cabeçalho ou rodapé escuros fora de um `Section` precisam usar `Section` ou `data-tone`, senão ficam com o anel Red Pen (1,7:1 sobre Burgundy).
- **Reduced-motion global:** desliga TODAS as animações e transições (mais amplo que a V4). A interação Draft → Final (RIV-34) tem de funcionar sem animação e mostrar o estado final.
- **Classes sem CSS:** os testes de jsdom conferem NOMES de classe, não que o Tailwind gerou CSS para elas (uma classe com erro de digitação passaria). A revisão independente conferiu no CSS do build que as 118 classes usadas geram regra; **não há verificação automática disso no CI**, só o build e o Chrome.
- **O que NÃO é medido no jsdom:** contraste, foco visível, hover e layout. O `app/globals.test.ts` confere os VALORES dos tokens no arquivo; o resto foi medido no Chrome (resultado no Jira) e será reauditado na RIV-35.
- **Build:** o `next/font/google` baixa as fontes **no `next build`** (o CI precisa de rede); em tempo de execução o navegador não fala com o Google.
- **Fora desta etapa:** cabeçalho, rodapé, Hero, seções, contato e a interação Draft → Final (RIV-30 a RIV-34).

## Internacionalização (RIV-16)

Implementa o ADR-0001 (DEC-RIV-011): solução nativa do Next.js, **sem biblioteca de i18n**. O idioma vem **só da URL**; não há detecção do navegador, `proxy` nem cookie.

| Peça | Onde |
| --- | --- |
| Idiomas, tag de cada um e `localePath` | `i18n/config.ts` (`en` -> `en`, `pt` -> `pt-BR`, em um único lugar) |
| Forma única dos dicionários (obriga as mesmas chaves) | `i18n/dictionary.ts` (`Dictionary`) |
| Dicionários | `i18n/dictionaries/en.ts` e `pt.ts` (PT é o português do Brasil; texto provisório) |
| Carregamento por idioma | `i18n/get-dictionary.ts` (`import()` dinâmico) |
| Rotas | `app/[lang]/layout.tsx` e `page.tsx`; `generateStaticParams` gera `/en` e `/pt`; `dynamicParams = false` |
| `<html lang>` | `en` em `/en` e `pt-BR` em `/pt` |
| Seletor de idioma | `components/layout/language-switcher.tsx`: links comuns (`lang`, `hreflang`, `aria-current`); preserva a seção (RIV-30) |
| Redirecionamento | `next.config.ts`: `/` -> `/en` com **307** (`permanent: false`) |
| `canonical`, `hreflang` e `x-default` | `i18n/seo.ts`; `x-default` aponta para `/en` |
| Sitemap | `app/sitemap.ts`, com as duas versões e seus alternates |

- **URL-base:** o domínio é a DEC-RIV-008 (pendente). `SITE_URL` (variável de ambiente só do servidor, não é segredo; ex.: `https://example.com`) define a base de `canonical`, `hreflang` e sitemap. Só a **origem** é usada: caminho, consulta e fragmento são descartados (site sob subcaminho não é suportado) e credenciais embutidas (`user:pass@`) não chegam aos metadados. **Sem `SITE_URL`, nada disso é emitido** (o sitemap fica vazio): URLs inventadas ou de localhost seriam piores que nenhuma. Como as páginas são estáticas, `SITE_URL` precisa estar definida **no momento do `next build`**. Valor inválido ou que não seja http/https derruba o build com mensagem clara.
- **404:** qualquer idioma que não seja `en` ou `pt` (por exemplo `/fr`, `/PT`, `/pt-br`) e qualquer caminho abaixo de `/en` ou `/pt` que não exista respondem 404. **Limite conhecido:** como não existe layout raiz fora de `[lang]`, a página 404 padrão do Next.js sai com `<html>` **sem atributo `lang`** (critério WCAG 3.1.1). A correção é o `global-not-found.js`, que no Next.js 16.4.4 é **experimental** (`experimental.globalNotFound`); ativar recurso experimental exige aprovação do Owner (como no Cache Components), então **não foi ativado**. Fica registrado como pendência/decisão para a tarefa do 404 e da navegação (RIV-30), ou para uma decisão do Owner.
- **Novo texto:** acrescente a chave em `i18n/dictionary.ts`; o TypeScript obriga o PT a ter a mesma chave, e o teste de paridade confere. O componente recebe o texto por props; **nenhum componente é duplicado por idioma**.
- **Verificação em servidor real** (`next build` e `next start`, 12/11/2026): `GET /` responde `307` com `location: /en`, **mesmo com `Accept-Language: pt-BR`**; nenhuma resposta define cookie; `/en` e `/pt` trazem `<html lang>` e `hreflang` corretos; `/fr`, `/PT`, `/pt-br`, `/en/x` respondem 404; com `SITE_URL` definida, `canonical`, os três `alternate` e o sitemap saem corretos. **Fragmento (ADR-0001, P7):** no Chromium, abrir `/#services` termina em `/en#services` (o fragmento é preservado pelo redirecionamento).
- **Não cobre ainda:** conteúdo comercial e sua tradução e as seções de destino das âncoras (RIV-31 em diante). `x-default` e os alternates são os mesmos nas páginas e no sitemap (`i18n/seo.ts`).

## Cabeçalho, navegação, seletor de idioma e rodapé (RIV-30)

Implementados sobre a V4 Red Pen e a infraestrutura da RIV-16; ficam no `app/[lang]/layout.tsx` (cabeçalho antes do `<main>`, rodapé depois), então valem para todas as páginas.

- **Cabeçalho** (`components/layout/site-header.tsx`, cliente): logotipo (link para `/en` ou `/pt`, volta ao início no idioma atual), navegação por âncoras **sem Home** (`components/layout/nav-items.ts`: `#services`, `#work`, `#process`, `#about`, `#contact`; DEC-RIV-012) e seletor de idioma. Textos em `nav` e `language` dos dicionários.
- **Menu móvel** (< 768px; a V4 não define o mobile): botão com `aria-expanded` e `aria-controls`, alvo de 44px; o painel traz a navegação e o seletor. Escape fecha e devolve o foco ao botão; escolher um link fecha. **Depende de JavaScript** (sem JS, no mobile o painel fica oculto).
- **Seletor** (`language-switcher.tsx`, cliente): `EN | PT` com o nome completo como nome acessível; a seção atual é o `hash` da URL (`useSyncExternalStore`, `hashchange`/`popstate`), então `/en#services` leva a `/pt#services`. O HTML inicial não tem hash (igual no servidor); o hash entra após a hidratação. Os links de âncora do cabeçalho são `<a>` nativos (o roteador do Next.js não dispara `hashchange`). A seção só é a de destino se o hash vier de clique ou URL; a rolagem não atualiza o hash.
- **Rodapé** (`site-footer.tsx`): fundo Ink com `data-tone=ink` (foco Highlight). "Privacy Policy (coming soon)" é **texto simples**: não há página nem texto legal (pendência do Owner).
- **Limite:** as seções de destino das âncoras ainda não existem (RIV-31 em diante); hoje clicar em `#services` não rola para lugar algum. O 404 sem `lang` segue na RIV-37.
- **Verificação manual no Chrome** (feita pelo implementador, registrada no PR #19 e no Jira RIV-30; não é teste automatizado; build de produção): estilos computados do cabeçalho e do rodapé iguais aos da V4 (1440 e 390px), exceto `rotate` (Tailwind usa a propriedade `rotate`, com o mesmo efeito do `transform` da V4) e o seletor, que substitui o "EN | PT soon".

## Hero (RIV-31)

`components/home/hero.tsx` e `draft-sheet.tsx`, renderizados por `app/[lang]/page.tsx` dentro de `<main id="main">`. O `HomePlaceholder` e as chaves `home.*` dos dicionários foram removidos; as chaves novas ficam em `hero.*` (EN e PT; o PT é provisório).

- **Composição da V4:** rótulo vertical e anotação "this is the job." com seta (decorativos, `aria-hidden`, visíveis só a partir de 1101px, como a V4 que os oculta até 1100px); eyebrow; H1 (`Heading size="display"`) com "simpler." em itálico sobre o marcador com varredura; parágrafo; CTA `#contact`; links `#process` e `#services`.
- **Folha de rascunho** (`DraftSheet`): estática, no estado "editado" (linhas riscadas em `<del>`, respostas manuscritas, selo FINAL, resultado). Traz o selo **Example**: é ilustrativa, nunca um caso real. O estado vem do atributo `data-edited` (`edited`, padrão `true`): o CSS `.strike` (`globals.css`) e as variantes `group-data-[edited=true]:` já respondem a ele, então a RIV-34 só precisa alternar o valor e acrescentar a animação, o botão Apply/Undo e a frase "That's the draft…" (fora desta tarefa). O selo "DRAFT" da V4 não foi incluído porque a folha está no estado final.
- **Ajustes de fidelidade feitos junto:** o `Button` passou a `box-content` (56px de altura total, como na V4, que usa content-box) e o `Eyebrow` `sm` ganhou `leading-normal` (18px, como a V4).
- **Verificação manual no Chrome** (build de produção, 1440 e 390px): estilos computados do Hero e da folha iguais aos da V4 em 17 de 20 pares comparados; diferenças restantes: (a) a altura da folha é 68px menor porque o botão Apply/Undo é da RIV-34; (b) o CTA tem 3px a mais por causa da seta (a fonte reserva do glifo "→" difere); (c) `rotate` do Tailwind no lugar de `transform`, e `box-shadow` com camadas vazias do Tailwind. Sem rolagem horizontal em 320, 360, 390, 768, 1100, 1101, 1440 e 1920px (EN e PT); com reduced-motion a varredura do marcador não anima e o marcador aparece completo.
- **Contraste medido (WCAG 2.1):** Red Pen sobre a folha 5,56:1 (anotações e selo); texto riscado `#6F685C` sobre a folha 5,41:1; Ink sobre a folha 17,0:1; texto `#3B362F` sobre Paper 10,5:1; Ink sobre Highlight 13,1:1. Sem declaração de conformidade WCAG AA.
- **Limites:** o CTA e os links levam a seções que ainda não existem (RIV-32 em diante); **divergência de critério a decidir pelo Owner:** o critério "primeiro viewport responde como contatar" não é atendido a 1440 × 900, onde o CTA fica logo abaixo da dobra (y≈925 de 900); a V4 de referência é igual (y≈959) e a implementação a segue, sem alterar o design. A 390px o CTA aparece na primeira tela.

## Seções de conteúdo: Services, Selected Work, How We Work e About (RIV-32)

`components/home/services-section.tsx`, `work-section.tsx`, `process-section.tsx` e `about-section.tsx`, renderizados por `app/[lang]/page.tsx` depois do Hero, com as âncoras `#services`, `#work`, `#process` e `#about` da navegação. Texto em `services.*`, `work.*`, `process.*` e `about.*` dos dicionários.

- **TEXTOS COMERCIAIS PROVISÓRIOS, pendentes de validação do Owner (EN e PT).** A copy vem da V4 aprovada, com as exceções abaixo; o PT é provisório. Nada disso é copy definitiva.
- **Divergências da V4 resolvidas por decisão do Owner:** o processo usa **Understand → Plan → Build → Deliver** (a V4 trazia Listen/Map/Build/Maintain) e o serviço 2 é **Business Automation** (a V4 trazia Business Process Automation). O passo "Deliver" ("We hand over a documented solution and walk you through how it works.") é texto **novo e provisório** (o "Maintain" da V4 prometia manutenção); não há compromisso de manutenção recorrente nem de acompanhamento contínuo.
- **Services:** três serviços oficiais, numerados 01 a 03. No hover da linha: fundo burgundy a 6%, marcador amarelo no título, sublinhado Red Pen no exemplo mono e seta que avança (classes `.marker-reveal` e `.underline-reveal` em `globals.css`, variantes `group-hover/row:` e `group-focus-within/row:`).
- **Selected Work são CONCEITOS:** cartões "Concept 0N" com selo "Case study soon", área tracejada "[ ... / concept ]" e texto de apoio ("subject to approval"). Não há cliente, depoimento, resultado, métrica, estudo de caso nem link. Um case real só entra com confirmação e aprovação do Owner. **Pendência para o Owner:** o título do cartão 3 ("Client Project") e o selo "Case study soon" são da V4, mas podem sugerir que existem trabalhos para clientes; decidir se mantém ou troca (por exemplo, "Client-style project").
- **How We Work:** quatro passos com borda superior que se preenche em Red Pen no hover (variantes `group-hover/step:` e `group-focus-within/step:`) e ícones manuscritos.
- **About:** pequeno estúdio de tecnologia (faixa Highlight com bordas Ink); sem equipe, certificações, experiência ou histórico. A frase "solutions that remain maintainable long after launch" e o valor "Long-term maintainability" são da V4 e descrevem a qualidade do código, não um serviço de manutenção; **sujeitos à validação do Owner**.
- **Foco por teclado:** os efeitos também respondem a `focus-within`, mas as seções não têm itens focáveis (são texto), então hoje o efeito é só de ponteiro. Não se acrescentou `tabindex` a texto estático (anti-padrão de acessibilidade). Interpretação do critério "hover também por foco de teclado" a confirmar pelo Owner.
- **Verificação manual no Chrome** (build de produção, feita pelo implementador): 41 de 47 pares de estilos computados idênticos aos da V4 em 1440 e 390px; as diferenças restantes são de texto (títulos Business Automation e Understand/Plan/Build/Deliver mudam quebras de linha e alturas), da cor de fundo transparente da V4 (a página é Paper) e do formato `oklab` das cores com alfa. O bloco de conceito usa `box-content` e `leading-normal`, como a V4 (200px de conteúdo). Hover verificado na V4 e na implementação: fundo da linha, marcador 100%, sublinhado 100%, seta +8px, borda do passo preenchida e cartão levantado (-8px, sem rotação). Sem rolagem horizontal em 320, 360, 390, 768, 1024, 1440 e 1920px, em EN e PT (a 320px o PT estourava por "Manutenibilidade"; corrigido com `hyphens-auto`). Reduced-motion: transições de 0s.
- **Contraste medido (WCAG 2.1):** Paper sobre Deep Burgundy 13,7:1; Rose sobre Deep 9,7:1; Highlight sobre Deep 11,8:1; Ink sobre Highlight 13,1:1; Burgundy sobre Highlight 7,3:1; Red Pen sobre Paper 5,0:1 (selo "Case study soon" e números); Burgundy sobre Paper 8,5:1; texto `#3B362F` sobre Paper 10,5:1 e sobre o fundo de hover 9,6:1. Sem declaração de conformidade WCAG AA.
- **Fora de escopo:** contato e política de privacidade (RIV-33), interação Draft → Final (RIV-34), auditoria (RIV-35) e 404 sem `lang` (RIV-37).

## Integração contínua (RIV-19)

O workflow `.github/workflows/ci.yml` (GitHub Actions) roda **a cada Pull Request para `main`**, ao abrir, atualizar ou reabrir, e uma nova atualização cancela a execução anterior. Passos, em ordem: `npm ci`, `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test`, `npm run build` e `npm audit --omit=dev`. Para reproduzir localmente:

```bash
npm ci && npm run check && npm test && npm run build && npm audit --omit=dev
```

- **Ambiente:** `ubuntu-latest` e Node 22 (a versão mínima do projeto é 22.12). Telemetria do Next.js desligada.
- **Sem segredos, sem deploy e sem serviços pagos.** Permissão mínima (`contents: read`) e `persist-credentials: false` no checkout.
- **Actions fixadas por SHA do commit** (`actions/checkout` v7.0.1 e `actions/setup-node` v7.1.0, com a versão no comentário). Para atualizar, troque o SHA e o comentário no mesmo PR.
- **Auditoria só de produção:** o `npm audit` completo mostra 8 avisos moderados do `minimatch`, só de desenvolvimento, aceitos na seção "Qualidade de código".
- **Não é check obrigatório na proteção da `main`.** Exigi-lo é decisão do Owner, depois de a execução se mostrar estável; hoje o ruleset exige só Pull Request.
- **Não cobre:** deploy na Vercel, testes E2E (Sprint 4) e execução em outros sistemas operacionais ou versões de Node.

## Telemetria

O Next.js coleta telemetria anônima por padrão. Por decisão do Owner, ela fica **desativada no ambiente de desenvolvimento** com `npx next telemetry disable`, que é configuração local de cada máquina e não vai para o repositório. Para desativar apenas em uma execução: `NEXT_TELEMETRY_DISABLED=1`.

## Fora do escopo desta base

Design system e identidade visual (Sprint 2), ordenação de classes do Tailwind e deploy.
