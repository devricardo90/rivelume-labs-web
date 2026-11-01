# Objetivo atual

Backlog do Jira RIV preparado e Sprint 1 organizada para execução. Aguardando revisão do Owner. Não iniciar a Sprint 1 no Jira nem desenvolver website, componentes, infraestrutura de produção ou funcionalidades de produto até autorização.

## Estado

- Fonte da Verdade V1.0 aprovada; propostas e DEC-RIV-005/007/008/009 continuam pendentes.
- Projeto Jira RIV existe (id 10232). Criados e lidos de volta: sete épicos (RIV-1 a RIV-7), três tarefas de governança (RIV-8 a RIV-10), nove tarefas da Sprint 1 (RIV-11 a RIV-15 e RIV-17 a RIV-20) e RIV-16 (esqueleto de i18n), que pertence ao épico RIV-5 e à Sprint 3.
- Sprint 0 não está totalmente encerrada: ver tabela em `STATUS.md`.
- "RIV Sprint 1" (id 179, board 233) existe, está em `future` (não iniciada) e contém exatamente RIV-11 a RIV-15 e RIV-17 a RIV-20, verificado pelo campo Sprint em 01/11/2026. RIV-16 está fora.

## Próxima ação elegível (após revisão do Owner)

1. Owner remove o link Blocks RIV-16 → RIV-20 (id 10291), que nenhuma ferramenta disponível exclui, e conclui RIV-8 depois do merge deste PR.
2. Owner revisa e aprova este PR e autoriza o início da Sprint 1 (a sprint ainda não foi iniciada).
3. Tarefas sem dependência aberta: RIV-11 e RIV-12 (e RIV-15, redigir ADR de i18n). RIV-8 e RIV-9 são documentais.
4. Decisões que realmente bloqueiam execução: aprovação do ADR de i18n (bloqueia só RIV-16, que está fora da Sprint 1); a proteção de `main` já está ativa (RIV-10). DEC-RIV-005/007/008/009 não bloqueiam a Sprint 1.
