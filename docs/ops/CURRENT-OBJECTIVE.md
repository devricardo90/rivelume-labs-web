# Objetivo atual

Sprint 1 — Technical Foundation em andamento (RIV Sprint 1, id 179, 02/11/2026 a 13/11/2026), iniciada por autorização do Owner. Escopo: RIV-11 a RIV-15 e RIV-17 a RIV-20. Não iniciar RIV-16, não implementar internacionalização antes do merge do ADR (PR #3) e da Sprint 3 (RIV-16 não iniciada), não publicar em produção e não fazer merge sem autorização do Owner.

## Estado

- Fundação de governança concluída: PR #1 mesclado (`54267d6`), `main` protegida, RIV-8, RIV-9 e RIV-10 em Feito, link indevido RIV-16 → RIV-20 removido. **RIV-11 em Feito:** PR #2 mesclado em `5644df8` (03/11/2026).
- Fonte da Verdade V1.0 aprovada; DEC-RIV-005/007/008/009 e propostas de conteúdo continuam pendentes e não bloqueiam a Sprint 1.
- Em andamento, cada um em PR próprio aguardando o Owner: **RIV-12** (aplicação base Next.js, PR #4, atualizada com a `main` e reverificada) e **RIV-15** (ADR de i18n **Accepted**, PR #3, sem implementação).
- PRs mesclados: #1 e #2. Próximo na ordem de integração: PR #4; o PR #3 só com nova autorização do Owner.
- CI não configurado (RIV-19, depende de RIV-12, RIV-17 e RIV-18).

## Próxima ação elegível

1. Owner decide o merge do PR #4 (RIV-12) e, separadamente, o do PR #3 (ADR de i18n).
2. Depois do merge da RIV-12: RIV-13, RIV-14 e RIV-17 podem avançar; RIV-18 depende de RIV-17; RIV-19 depende de RIV-18; RIV-20 é o gate do Owner.
3. O ADR de i18n está "Accepted" (decisões P1 a P4 do Owner, ADR-0001); a implementação é a RIV-16 (Sprint 3), não iniciada.
4. Pendências que não bloqueiam: URL-base/domínio (DEC-RIV-008), página única (DEC-RIV-005) e o comportamento do fragmento `#secao` no redirecionamento (validar na RIV-16).
