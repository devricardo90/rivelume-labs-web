# Handoff — Rivelume Labs Sprint 0

## Projeto e autorização

- Produto: website institucional e comercial B2B da Rivelume Labs.
- Repositório: `devricardo90/rivelume-labs-web`.
- Esta etapa fecha governança da Sprint 0. Não desenvolver website, componentes, infraestrutura de produção ou funcionalidades de produto; não iniciar Sprint 1.
- Fonte canônica: [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), ID `1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo`, V1.0 aprovada pelo Owner em 11/10/2026. Foi lida integralmente e a aprovação foi verificada por readback. Leia novamente antes de atuar.

## Escopo e stack aprovados

- O produto é um website comercial B2B. Stack inicial aprovada: Next.js, TypeScript, Tailwind CSS e Vercel.
- Não adicionar SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend sem requisito explícito aprovado na Fonte da Verdade.
- DEC-RIV-005 (página única/seis seções), identidade visual, domínio/e-mail, portfólio, proposta de valor final e contato permanecem pendentes onde assim indicados. A V1.0 não os aprovou.

## Fontes externas

- Jira: foi verificado que RIV não existe; a integração não expõe criação de projeto. Ação manual necessária do Owner: criar novo projeto Jira Software `Rivelume Labs`, chave `RIV`; não reutilizar AXY. Depois, verificar tipo, issue types, workflow/status, board e sprints reais. Nenhum issue foi criado.
- GitHub: o HEAD de entrada de `governance/sprint-0-foundation` foi confirmado em `b64655fafdeb730dcecc3e5432507f2e5fdbab22` local e remotamente. `main` foi inicializada a partir do HEAD final validado da branch de governança e seu readback confirmou o mesmo SHA no bootstrap.
- Proteção: readback da branch `main` mostrou `protected: false`. Rulesets retornou HTTP 403, informando que exige GitHub Pro ou repositório público. A integração atual não altera controles administrativos. Configuração manual documentada: proteger `main`, exigir PR, ao menos uma aprovação e bloquear force-push/exclusão; não exigir checks inexistentes. Não alterar plano nem visibilidade.

## Governança local vigente

Até haver versão global formalmente aprovada do Rick Loop, seguir decisão do Owner:

`Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`

Google Docs governa produto, Jira organiza execução e GitHub comprova desenvolvimento. REVIEW independente e aprovações humanas dos gates continuam obrigatórias.

## Retomada

Leia `AGENTS.md`, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md` e `docs/ops/CURRENT-OBJECTIVE.md`. Confirme Git local/remoto e os três sistemas. O próximo trabalho elegível após o provisionamento manual do Jira é inspecionar seu workflow e preparar Sprint 1. Não selecione nem inicie tarefa de produto antes dessa conferência.
