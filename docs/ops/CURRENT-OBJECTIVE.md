# Objetivo atual

Sprint 1 — Technical Foundation **encerrada em 08/11/2026** (RIV Sprint 1, id 179), por autorização do Owner: as 9 tarefas (RIV-11 a RIV-15 e RIV-17 a RIV-20) estão em Feito e a RIV-20 foi validada pelo Owner com exceções. **Não há sprint ativa.** Não iniciar a Sprint 2 sem autorização, não iniciar RIV-16 (Sprint 3), não implementar internacionalização antes da Sprint 3 (ADR-0001 vigente), não publicar em produção e não fazer merge sem autorização do Owner.

## Estado

- **PRs #1 a #11 e #13 mesclados** (#12 foi descartável, fechado sem merge; `main` = `1c67821` em 08/11/2026), `main` protegida. RIV-8 a RIV-15 e RIV-17 a RIV-20 em **Feito** (9 de 9 tarefas da Sprint 1).
- **Fundação técnica integrada:** Next.js 16.4.4 (RIV-12), Tailwind 4.3.3 (RIV-13), `Container` e convenção de componentes (RIV-14), ADR-0001 de i18n vigente (RIV-15), ESLint, Prettier e `npm run check` (RIV-17), Vitest com 10 testes (RIV-18) e CI no GitHub Actions em PRs para `main` (RIV-19). Node mínimo: 22.12.
- Fonte da Verdade V1.0 aprovada; DEC-RIV-005/007/008/009 e propostas de conteúdo continuam pendentes; não bloquearam a Sprint 1 e são insumo das próximas sprints. As sugestões da V1.1 estão no Google Docs, em modo SUGGEST, aguardando o aceite do Owner.
- **RIV-20 (gate Technical Foundation Validation):** validada pelo Owner **com exceções** em 08/11/2026 (relatório de evidências e conferência da DoD no Jira) e em Feito; a Sprint 1 foi encerrada em seguida. Exceções aceitas: `content/` e `components/ui/` sem pasta, sem utilitários para testar, Firefox, Safari e Node 20 não testados, CI só em Node 22 e só em PRs, ESLint 9 descontinuado e avisos moderados só em desenvolvimento, sugestões da V1.1 ainda não aceitas.
- Nenhuma implementação da RIV-16 (Sprint 3) e nenhuma publicação em produção.

## Próxima ação elegível

1. **Nenhuma tarefa elegível:** não há sprint ativa. A próxima etapa é a Sprint 2 (identidade visual); ela só começa com autorização do Owner, depois das decisões de produto pendentes (DEC-RIV-005, 007, 008 e 009) e da criação das tarefas da sprint (as do épico RIV-3 ainda não existem).
2. Decisões do Owner em aberto: aceitar ou rejeitar as sugestões da V1.1 da Fonte da Verdade (conferir a numeração DEC-RIV-011); tornar o check de CI obrigatório na proteção da `main`; instalar o GitHub for Atlassian (não autorizado até agora); limpar as branches já mescladas e a `ci-proof/riv-19-failing-test`.
3. Pendências que não bloqueiam: URL-base/domínio (DEC-RIV-008), página única (DEC-RIV-005) e o comportamento do fragmento `#secao` no redirecionamento (validar na RIV-16).
