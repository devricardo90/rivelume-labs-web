# Objetivo atual

Sprint 1 — Technical Foundation em andamento (RIV Sprint 1, id 179, 02/11/2026 a 13/11/2026), iniciada por autorização do Owner. Escopo: RIV-11 a RIV-15 e RIV-17 a RIV-20. Não iniciar RIV-16, não implementar internacionalização antes da Sprint 3 (RIV-16 não iniciada; ADR-0001 vigente), não publicar em produção e não fazer merge sem autorização do Owner.

## Estado

- Fundação de governança concluída; **PRs #1 a #4 mesclados** (`main` = `ce1ef45`), `main` protegida. RIV-8 a RIV-12 e RIV-15 em **Feito**.
- **Aplicação Next.js 16.4.4 integrada** (RIV-12; placeholder técnico, sem conteúdo comercial) e **ADR-0001 vigente** (RIV-15; i18n nativa, `/en` e `/pt`, `/` → `/en` com 307).
- Fonte da Verdade V1.0 aprovada; DEC-RIV-005/007/008/009 e propostas de conteúdo continuam pendentes e não bloqueiam a Sprint 1.
- **Sem dependência aberta (`ready`):** RIV-13 (Tailwind CSS), RIV-14 (estrutura de componentes) e RIV-17 (qualidade). RIV-18 aguarda a RIV-17; RIV-19 aguarda RIV-17 e RIV-18; RIV-20 é o gate do Owner.
- Nenhuma implementação da RIV-16 (Sprint 3) e nenhuma publicação em produção. CI não configurado (RIV-19).

## Próxima ação elegível

1. O Owner valida o plano da RIV-13 (apresentado no Jira) antes de qualquer implementação.
2. Ordem recomendada, em PRs independentes e sequenciais (todos tocam `package.json`/`globals.css`): RIV-13 → RIV-14 → RIV-17 → RIV-18 → RIV-19 → RIV-20.
3. Pendências que não bloqueiam: URL-base/domínio (DEC-RIV-008), página única (DEC-RIV-005) e o comportamento do fragmento `#secao` no redirecionamento (validar na RIV-16).
