# Objetivo atual

Sprint 1 — Technical Foundation em andamento (RIV Sprint 1, id 179, 02/11/2026 a 13/11/2026), iniciada por autorização do Owner. Escopo: RIV-11 a RIV-15 e RIV-17 a RIV-20. Não iniciar RIV-16, não implementar internacionalização antes da Sprint 3 (RIV-16 não iniciada; ADR-0001 vigente), não publicar em produção e não fazer merge sem autorização do Owner.

## Estado

- **PRs #1 a #11 mesclados** (`main` = `8fc9106`, 08/11/2026), `main` protegida. RIV-8 a RIV-15 e RIV-17 a RIV-19 em **Feito** (8 de 9 tarefas da Sprint 1).
- **Fundação técnica integrada:** Next.js 16.4.4 (RIV-12), Tailwind 4.3.3 (RIV-13), `Container` e convenção de componentes (RIV-14), ADR-0001 de i18n vigente (RIV-15), ESLint, Prettier e `npm run check` (RIV-17), Vitest com 10 testes (RIV-18) e CI no GitHub Actions em PRs para `main` (RIV-19). Node mínimo: 22.12.
- Fonte da Verdade V1.0 aprovada; DEC-RIV-005/007/008/009 e propostas de conteúdo continuam pendentes e não bloqueiam a Sprint 1. As sugestões da V1.1 estão no Google Docs, em modo SUGGEST, aguardando o aceite do Owner.
- **RIV-20 (gate Technical Foundation Validation):** sem dependência aberta; aguarda o relatório de evidências e a validação explícita do Owner.
- Nenhuma implementação da RIV-16 (Sprint 3) e nenhuma publicação em produção.

## Próxima ação elegível

1. **RIV-20:** o agente prepara o relatório de evidências (tarefas, PRs, execuções de CI, decisões, pendências para a Sprint 2); o Owner revisa e valida explicitamente. Sem essa validação, a RIV-20 não é concluída e a sprint não é encerrada.
2. Decisões do Owner em aberto: aceitar ou rejeitar as sugestões da V1.1 da Fonte da Verdade (conferir a numeração DEC-RIV-011); tornar o check de CI obrigatório na proteção da `main`; instalar o GitHub for Atlassian (não autorizado até agora); encerrar a Sprint 1.
3. Pendências que não bloqueiam: URL-base/domínio (DEC-RIV-008), página única (DEC-RIV-005) e o comportamento do fragmento `#secao` no redirecionamento (validar na RIV-16).
