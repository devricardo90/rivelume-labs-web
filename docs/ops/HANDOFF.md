# Handoff — Rivelume Labs

## Projeto e autorização

- Produto: website institucional e comercial B2B da Rivelume Labs.
- Repositório: `devricardo90/rivelume-labs-web`.
- Estado: bootstrap do Jira concluído, aguardando revisão do Owner. Nenhum código de produto escrito; Sprint 1 não iniciada.
- Fonte canônica: [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), V1.0 aprovada em 11/10/2026. Releia antes de atuar.

## Escopo e stack aprovados

- Stack: Next.js, TypeScript, Tailwind CSS e Vercel.
- Sem SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend. Analytics não está na Fonte da Verdade.
- Pendentes: DEC-RIV-005 (página única/seis seções), DEC-RIV-007 (identidade visual), DEC-RIV-008 (domínio/e-mail), DEC-RIV-009 (portfólio), proposta de valor final, contato, verificação jurídica do nome.

## Fontes externas

- Jira: projeto RIV (`https://ricardodesouzafrancisco.atlassian.net/browse/RIV`). Épicos RIV-1 a RIV-7. Sprint 1 em RIV-11 a RIV-15 e RIV-17 a RIV-20. Prontidão por rótulos (`ready`, `waiting-dependency`, `blocked-owner`, `owner-decision`, `owner-gate`). Não use AXY nem outros projetos do site.
- GitHub: `main` em `b67d29b7689ec7255dde616b8089c194b321da25` em 13/10/2026; protegida pelo ruleset "Protect Main" (id 24971542, 0 aprovações, sem bypass), verificado por leitura da API. Mudanças entram por branch → PR.

## Governança local vigente

`Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`

Google Docs governa produto, Jira organiza execução, GitHub comprova desenvolvimento. REVIEW independente e gates do Owner continuam obrigatórios.

## Retomada

Leia `AGENTS.md`, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md` e `docs/ops/CURRENT-OBJECTIVE.md`. Releia a Fonte da Verdade e confirme o Jira. Só pegue tarefa com rótulo `ready` depois que RIV-8 estiver concluída (workflow, board e sprints verificados) e a Sprint 1 for autorizada pelo Owner.
