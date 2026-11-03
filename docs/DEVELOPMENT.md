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

Verificação de tipos (a configuração de qualidade entra na RIV-17): `npx tsc --noEmit`.

## Configurações que não devem ser revertidas sem decisão do Owner

- **Cache Components e Partial Prefetching** estão desativados (o scaffold do Next.js os ligaria por padrão).
- **`agentRules: false`** em `next.config.ts`. O `next dev` detecta agentes de IA e, por padrão, escreve um bloco de instruções no `AGENTS.md`. O `AGENTS.md` é um arquivo de governança do Owner e não pode ser alterado por ferramentas de terceiros. Se ele aparecer modificado depois de `npm run dev`, é um defeito: reverta com `git checkout -- AGENTS.md` e reporte.
- **`tsconfig.json`**: o Next.js reescreve e normaliza este arquivo durante `dev`/`build` (inclusive `allowJs`, que ele exige). O arquivo versionado já está na forma normalizada para que o build não gere diferenças; não o formate à mão.

## Tailwind CSS (RIV-13)

- **Versão:** Tailwind CSS **v4**, decisão do Owner. `tailwindcss` e `@tailwindcss/postcss` em **4.3.3** e `postcss` em **8.5.31**, todos com **versão exata** (sem `^`) no `package.json` e no `package-lock.json`. Ao atualizar, mantenha `tailwindcss` e `@tailwindcss/postcss` **na mesma versão exata** (o segundo fixa o primeiro como dependência).
- **Integração:** a integração oficial via PostCSS, a documentada pelo Next.js: `postcss.config.mjs` com o plugin `@tailwindcss/postcss` e `@import "tailwindcss";` em `app/globals.css`. **Não** use o loader `@tailwindcss/turbopack` que o scaffold do Next.js gera: ele fica preso ao Turbopack e não consta na documentação do Next 16.4.4. No teste do scaffold feito na RIV-13 (`create-next-app` 16.4.4 com Tailwind), o `next.config.ts` gerado trazia esse loader junto com Cache Components e Partial Prefetching ligados; aqui continuam desativados, por decisão do Owner.
- **Sem identidade visual:** não há `@theme`, cores, fontes ou tokens de marca. Paleta, tipografia e design system pertencem à Sprint 2 (DEC-RIV-007 pendente) e à RIV-14. O Tailwind aplica apenas os valores padrão dele (fonte do sistema, escala de espaçamento).
- **Detecção de classes:** o Tailwind lê automaticamente todos os arquivos do projeto, inclusive `.md`. Em `app/globals.css`, `@source not "../docs"` e `@source not "../*.md"` impedem que palavras da documentação gerem CSS. Comprovado com arquivos de teste: sem a exclusão, uma palavra em `docs/*.md` ou num `.md` da raiz virou regra CSS; com ela, não. Pastas de código novas (por exemplo `components/`) são detectadas sem configuração. Hoje só `docs/` e os `.md` da raiz são excluídos: quando a RIV-14 definir a pasta de conteúdo do site (Fonte da Verdade §11.5; por exemplo `content/`), decidir explicitamente se o Tailwind a lê.
- **Reset base:** o Tailwind inclui um reset (Preflight). Títulos e parágrafos ficam sem estilo até receberem classes; é esperado.

### Navegadores mínimos

O Tailwind CSS v4 exige navegadores modernos. Os alvos que o `@tailwindcss/node` 4.3.3 usa ao gerar o CSS (lidos no código do pacote instalado) são:

| Navegador | Versão mínima |
| --- | --- |
| Safari (macOS) e Safari no iOS | 16.4 |
| Chrome | 111 |
| Firefox | 128 |

Navegadores anteriores a essas versões podem não exibir os estilos corretamente. A Fonte da Verdade não define uma matriz de navegadores; a validação cross-browser está na Sprint 4 e deve confirmar ou ajustar esta tabela. Se um requisito de navegadores mais antigos surgir, a alternativa é o Tailwind v3 (decisão do Owner).

## Telemetria

O Next.js coleta telemetria anônima por padrão. Por decisão do Owner, ela fica **desativada no ambiente de desenvolvimento** com `npx next telemetry disable`, que é configuração local de cada máquina e não vai para o repositório. Para desativar apenas em uma execução: `NEXT_TELEMETRY_DISABLED=1`.

## Fora do escopo desta base

Estrutura de componentes e design system (RIV-14), lint e formatação, inclusive de classes do Tailwind (RIV-17), testes (RIV-18), CI (RIV-19) e internacionalização (RIV-16, após a decisão do ADR da RIV-15).
