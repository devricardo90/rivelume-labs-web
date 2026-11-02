# Rivelume Labs

Repositório do website institucional e comercial B2B da Rivelume Labs, um estúdio independente de tecnologia. A fundação de governança foi preparada na Sprint 0; nenhuma implementação do website foi iniciada.

## Estado

- A Fonte da Verdade canônica está na versão 1.0, aprovada pelo Owner em 11/10/2026. A aprovação cobre o objetivo e o escopo inicial B2B, a stack inicial e a governança; as propostas e decisões pendentes continuam sem autorização até decisão do Owner.
- Stack aprovada para o website B2B inicial: Next.js, TypeScript, Tailwind CSS e Vercel. A aprovação não autoriza SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend sem requisito explícito na Fonte da Verdade.
- O projeto Jira RIV foi criado pelo Owner e verificado em 13/10/2026 (ver `docs/ops/STATUS.md`). Não usar AXY nem outro projeto.
- `main` é inicializada a partir da branch validada `governance/sprint-0-foundation`. Depois do bootstrap, o fluxo normal é branch → revisão/evidências → PR → main; push direto para main não é o fluxo de desenvolvimento.

## Fontes e autoridade

- Produto: [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- Jira: [instância Rivelume Labs](https://ricardodesouzafrancisco.atlassian.net) — projeto `Rivelume Labs`, chave `RIV` ([RIV](https://ricardodesouzafrancisco.atlassian.net/browse/RIV)), criado.
- GitHub: [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web)
- Regras para agentes: [AGENTS.md](AGENTS.md)
- Estado operacional: [docs/ops/STATUS.md](docs/ops/STATUS.md)

Google Docs governa o produto, Jira organiza a execução e GitHub comprova o que foi desenvolvido. Consulte [docs/GOVERNANCE.md](docs/GOVERNANCE.md) antes de qualquer mudança.

## Instruções iniciais

1. Leia `AGENTS.md` e `docs/GOVERNANCE.md`.
2. Releia integralmente a Fonte da Verdade vigente antes de iniciar uma tarefa de produto.
3. Confirme o projeto e o item RIV, seus estados reais, dependências, critérios e gate antes de iniciar trabalho.
4. Use branch, revisão/evidências e PR para integrar alterações em `main`.
5. Não implemente nada além do escopo aprovado nem inicie a Sprint 1 sem autorização do Owner e sem as dependências da tarefa verificadas (RIV-8 fecha após o merge do PR #1).

## Como executar a aplicação

Pré-requisitos: Node.js 20.9 ou superior e npm. A aplicação é um placeholder técnico (Next.js 16.4.4, TypeScript, App Router, sem `src/`); não contém conteúdo comercial.

```bash
npm ci            # instala as dependências do package-lock.json
npm run dev       # servidor de desenvolvimento em http://localhost:3000
npm run build     # build de produção
npm start         # serve o build de produção (rode `npm run build` antes)
```

Verificação de tipos (a configuração de qualidade entra na RIV-17): `npx tsc --noEmit`.

Telemetria: o Next.js coleta telemetria anônima por padrão. Por decisão do Owner, ela fica desativada no ambiente de desenvolvimento (`npx next telemetry disable`, configuração local de cada máquina, que não vai para o repositório). Para desativar apenas em uma execução: `NEXT_TELEMETRY_DISABLED=1`.

Escopo: Tailwind CSS pertence à RIV-13, lint e formatação à RIV-17, testes à RIV-18, CI à RIV-19 e internacionalização à RIV-16 (após a decisão do ADR da RIV-15).
