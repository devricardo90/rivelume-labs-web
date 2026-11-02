# Objetivo atual

Sprint 1 — Technical Foundation em andamento (RIV Sprint 1, id 179, 02/11/2026 a 13/11/2026), iniciada por autorização do Owner. Escopo: RIV-11 a RIV-15 e RIV-17 a RIV-20. Não iniciar RIV-16, não implementar internacionalização antes da aprovação do ADR (RIV-15), não publicar em produção e não fazer merge sem autorização do Owner.

## Estado

- Fundação de governança concluída: PR #1 mesclado (`54267d6`), `main` protegida, RIV-8, RIV-9 e RIV-10 em Feito, link indevido RIV-16 → RIV-20 removido.
- Fonte da Verdade V1.0 aprovada; DEC-RIV-005/007/008/009 e propostas de conteúdo continuam pendentes e não bloqueiam a Sprint 1.
- Em andamento: **RIV-11** (baseline do repositório, `docs/REPOSITORY.md`) e **RIV-15** (ADR de i18n, apenas proposta), ambos em PR para revisão do Owner.
- Próximo: **RIV-12** (Next.js + TypeScript). O plano técnico foi apresentado ao Owner; a implementação só começa após a validação do ponto de controle.
- CI não configurado (RIV-19, depende de RIV-12, RIV-17 e RIV-18).

## Próxima ação elegível

1. Owner revisa e decide o merge dos PRs de RIV-11 e RIV-15.
2. Owner valida o plano técnico da RIV-12 e autoriza a implementação.
3. Depois de RIV-12: RIV-13, RIV-14 e RIV-17 podem avançar; RIV-18 depende de RIV-17; RIV-19 depende de RIV-18; RIV-20 é o gate do Owner.
4. Decisão pendente do Owner: aprovação do ADR de i18n (RIV-15). Ela só bloqueia RIV-16, que está fora da Sprint 1.
