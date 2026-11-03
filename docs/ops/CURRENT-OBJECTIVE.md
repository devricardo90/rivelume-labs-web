# Objetivo atual

Sprint 1 — Technical Foundation em andamento (RIV Sprint 1, id 179, 02/11/2026 a 13/11/2026), iniciada por autorização do Owner. Escopo: RIV-11 a RIV-15 e RIV-17 a RIV-20. Não iniciar RIV-16, não implementar internacionalização antes da aprovação do ADR (RIV-15), não publicar em produção e não fazer merge sem autorização do Owner.

## Estado

- Fundação de governança concluída: PR #1 mesclado (`54267d6`), `main` protegida, RIV-8, RIV-9 e RIV-10 em Feito, link indevido RIV-16 → RIV-20 removido.
- Fonte da Verdade V1.0 aprovada; DEC-RIV-005/007/008/009 e propostas de conteúdo continuam pendentes e não bloqueiam a Sprint 1.
- Em andamento, cada um em PR próprio aguardando o Owner: **RIV-11** (baseline do repositório, este PR), **RIV-12** (aplicação base Next.js, PR #4, validada em clone limpo) e **RIV-15** (ADR de i18n, PR #3, apenas proposta).
- Nenhum PR foi mesclado além do #1. Ordem de integração recomendada: este PR, depois o PR #4 atualizado com a `main` e reverificado.
- CI não configurado (RIV-19, depende de RIV-12, RIV-17 e RIV-18).

## Próxima ação elegível

1. Owner decide o merge deste PR (RIV-11), depois o do PR #4 (RIV-12).
2. Depois do merge da RIV-12: RIV-13, RIV-14 e RIV-17 podem avançar; RIV-18 depende de RIV-17; RIV-19 depende de RIV-18; RIV-20 é o gate do Owner.
3. O ADR de i18n (PR #3) fica como "Proposed" até o Owner decidir P1 a P4.
4. Decisão pendente do Owner: aprovação do ADR de i18n (RIV-15). Ela só bloqueia RIV-16, que está fora da Sprint 1.
