# Handoff — Rivelume Labs

## Projeto e autorização

- Produto: website institucional e comercial B2B da Rivelume Labs.
- Repositório: `devricardo90/rivelume-labs-web`.
- Estado (17/11/2026): website V4 Red Pen implementado e **aprovado como mockup** pelo Owner em 16/11/2026 (DEC-RIV-013; baseline `d55ba95`, tag `mockup-v4-approved-2026-11-16`). Sprints 1 e 2 encerradas; Sprint 3 ativa com todas as tarefas em Feito (RIV-36 e RIV-37 incluídas); Sprint 4 **não criada nem iniciada**. `main` em `ea243b2` (PR #26, RIV-46 segurança). Sem publicação em produção, sem projeto Vercel.
- Fonte canônica: [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), **V1.1** (08/11/2026) aprovada pelo Owner. Releia antes de atuar.

## Escopo e stack aprovados

- Stack: Next.js (16.4.6), TypeScript, Tailwind CSS e Vercel. Sem SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend. Analytics não está na Fonte da Verdade.
- Pendentes: DEC-RIV-008 (domínio/e-mail), DEC-RIV-009 (portfólio), textos comerciais definitivos, contato funcional, política de privacidade definitiva, logotipo e favicon, verificação jurídica da marca.

## Fontes externas

- Jira: projeto RIV (`https://ricardodesouzafrancisco.atlassian.net/browse/RIV`), board 233. Épicos RIV-1 a RIV-7. Sprint 3 (id 213) ativa. Tarefas de ativação comercial RIV-38 a RIV-53 no backlog (gate: RIV-52). Não use AXY nem outros projetos do site.
- GitHub: `main` protegida pelo ruleset "Protect Main" (PR obrigatório, 0 aprovações, sem bypass, sem checks exigidos); mudanças por branch → PR; CI em `.github/workflows/ci.yml` (PRs para `main`). **Todo merge exige autorização do Owner vinculada a um HEAD específico**; sem merge automático.
- Ambiente e verificações: Node 22.12 ou superior; `npm run check`, `npm test`, `npm run build` e `npm audit --omit=dev` (ver `docs/DEVELOPMENT.md`). Plano de execução e regras de revisão e de merge: `docs/ops/EXECUTION-PLAN.md`.
- Riscos aceitos e residuais: ver `docs/DEVELOPMENT.md`, seções "Página 404 com `lang` (RIV-37)" e "Segurança (RIV-46)", e `docs/AUDIT-RIV-35.md`.

## Governança local vigente

`Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`

Google Docs governa produto, Jira organiza execução, GitHub comprova desenvolvimento. REVIEW independente e gates do Owner continuam obrigatórios.

## Retomada

Leia `AGENTS.md`, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md` e `docs/ops/CURRENT-OBJECTIVE.md`. Releia a Fonte da Verdade e confirme o Jira. Nenhuma tarefa de ativação comercial inicia sem autorização específica do Owner; não publique em produção; o gate OWNER LAUNCH APPROVAL (RIV-52) está pendente. Não declare conformidade WCAG AA.
