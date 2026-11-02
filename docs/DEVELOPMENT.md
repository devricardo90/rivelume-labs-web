# Desenvolvimento local

Aplicação base da RIV-12: Next.js 16.4.4, TypeScript (`strict`), App Router, sem `src/`, gerenciada com npm. É um **placeholder técnico** sem conteúdo comercial nem identidade visual.

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

## Telemetria

O Next.js coleta telemetria anônima por padrão. Por decisão do Owner, ela fica **desativada no ambiente de desenvolvimento** com `npx next telemetry disable`, que é configuração local de cada máquina e não vai para o repositório. Para desativar apenas em uma execução: `NEXT_TELEMETRY_DISABLED=1`.

## Fora do escopo desta base

Tailwind CSS (RIV-13), estrutura de componentes (RIV-14), lint e formatação (RIV-17), testes (RIV-18), CI (RIV-19) e internacionalização (RIV-16, após a decisão do ADR da RIV-15).
