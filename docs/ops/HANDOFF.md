# Handoff — Rivelume Labs

## Projeto e autorização

- Produto: website institucional e comercial B2B da Rivelume Labs.
- Repositório: `devricardo90/rivelume-labs-web`.
- Estado (08/11/2026): Sprint 1 **encerrada** por autorização do Owner (RIV Sprint 1, id 179; planejada até 13/11/2026, concluída em 08/11/2026). PRs #1 a #11 e #13 mesclados. A `main` tem a fundação técnica completa: Next.js, Tailwind, estrutura de componentes, ADR-0001 de i18n, ESLint e Prettier, testes com Vitest e CI no GitHub Actions; as 9 tarefas da Sprint 1 (RIV-11 a RIV-15 e RIV-17 a RIV-20) em Feito, com a RIV-20 validada pelo Owner com exceções. Não há sprint ativa: a Sprint 2 e a RIV-16 (Sprint 3) não foram iniciadas.
- Fonte canônica: [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), V1.0 aprovada em 11/10/2026. Releia antes de atuar.

## Escopo e stack aprovados

- Stack: Next.js, TypeScript, Tailwind CSS e Vercel.
- Sem SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend. Analytics não está na Fonte da Verdade.
- Pendentes: DEC-RIV-005 (página única/seis seções), DEC-RIV-007 (identidade visual), DEC-RIV-008 (domínio/e-mail), DEC-RIV-009 (portfólio), proposta de valor final, contato, verificação jurídica do nome.

## Fontes externas

- Jira: projeto RIV (`https://ricardodesouzafrancisco.atlassian.net/browse/RIV`). Épicos RIV-1 a RIV-7. Sprint 1 (id 179, encerrada) em RIV-11 a RIV-15 e RIV-17 a RIV-20, todas em Feito. RIV-8, RIV-9 e RIV-10 em Feito. Prontidão por rótulos (`ready`, `waiting-dependency`, `blocked-owner`, `owner-decision`, `owner-gate`, `owner-assisted`, `evidence-verified`, `sprint-3-backlog`). Não use AXY nem outros projetos do site.
- GitHub: `main` em `1c678214cb16509d02fb2789b60eb58a35b6908e` em 08/11/2026 (merge do PR #13); protegida pelo ruleset "Protect Main" (id 24971542, 0 aprovações, sem bypass, sem checks exigidos), verificado por leitura da API. Mudanças entram por branch → PR (ver `docs/REPOSITORY.md`); sem merge automático. CI em `.github/workflows/ci.yml` (PRs para `main`), não obrigatório.
- Ambiente e verificações: Node 22.12 ou superior; `npm run check`, `npm test`, `npm run build` e `npm audit --omit=dev` (ver `docs/DEVELOPMENT.md`). Plano de execução e regras de revisão e de merge: `docs/ops/EXECUTION-PLAN.md`. Todo merge exige autorização do Owner vinculada a um HEAD específico.
- Fonte da Verdade: sugestões da V1.1 registradas em modo SUGGEST e **não aceitas**; só o Owner as aceita.

## Governança local vigente

`Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`

Google Docs governa produto, Jira organiza execução, GitHub comprova desenvolvimento. REVIEW independente e gates do Owner continuam obrigatórios.

## Retomada

Leia `AGENTS.md`, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md` e `docs/ops/CURRENT-OBJECTIVE.md`. Releia a Fonte da Verdade e confirme o Jira. Não há tarefa elegível nem sprint ativa; a Sprint 2 só começa com autorização do Owner. Respeite os links "Blocks" e não inicie a RIV-16 (Sprint 3). Atualize o Jira conforme o progresso real e não faça merge sem o Owner.
