# Handoff — Rivelume Labs

## Projeto e autorização

- Produto: website institucional e comercial B2B da Rivelume Labs.
- Repositório: `devricardo90/rivelume-labs-web`.
- Estado (02/11/2026): governança inicial concluída e Sprint 1 em andamento por autorização do Owner (RIV Sprint 1, id 179, até 13/11/2026). Nenhum código de produto escrito ainda; RIV-11 e RIV-15 em PR; RIV-12 aguarda validação do plano técnico.
- Fonte canônica: [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), V1.0 aprovada em 11/10/2026. Releia antes de atuar.

## Escopo e stack aprovados

- Stack: Next.js, TypeScript, Tailwind CSS e Vercel.
- Sem SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend. Analytics não está na Fonte da Verdade.
- Pendentes: DEC-RIV-005 (página única/seis seções), DEC-RIV-007 (identidade visual), DEC-RIV-008 (domínio/e-mail), DEC-RIV-009 (portfólio), proposta de valor final, contato, verificação jurídica do nome.

## Fontes externas

- Jira: projeto RIV (`https://ricardodesouzafrancisco.atlassian.net/browse/RIV`). Épicos RIV-1 a RIV-7. Sprint 1 em RIV-11 a RIV-15 e RIV-17 a RIV-20. RIV-8, RIV-9 e RIV-10 em Feito. Prontidão por rótulos (`ready`, `waiting-dependency`, `blocked-owner`, `owner-decision`, `owner-gate`, `owner-assisted`, `evidence-verified`, `sprint-3-backlog`). Não use AXY nem outros projetos do site.
- GitHub: `main` em `54267d61b3c3dbf729c81b4ad37b0104eb0e2f32` em 02/11/2026 (merge do PR #1); protegida pelo ruleset "Protect Main" (id 24971542, 0 aprovações, sem bypass), verificado por leitura da API. Mudanças entram por branch → PR (ver `docs/REPOSITORY.md`); sem merge automático.

## Governança local vigente

`Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`

Google Docs governa produto, Jira organiza execução, GitHub comprova desenvolvimento. REVIEW independente e gates do Owner continuam obrigatórios.

## Retomada

Leia `AGENTS.md`, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md` e `docs/ops/CURRENT-OBJECTIVE.md`. Releia a Fonte da Verdade e confirme o Jira. Pegue apenas tarefas da Sprint 1 (RIV-11 a RIV-15 e RIV-17 a RIV-20) respeitando os links "Blocks"; não inicie RIV-16. Atualize o Jira conforme o progresso real e não faça merge sem o Owner.
