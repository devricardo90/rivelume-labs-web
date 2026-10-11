# Handoff

## Projeto

- Produto: website institucional e comercial B2B da Rivelume Labs.
- Repositório: `devricardo90/rivelume-labs-web`.
- Objetivo desta etapa: governança Sprint 0. Não desenvolver o website.
- Estado do Google Docs: versão 0.1, rascunho aguardando aprovação final do Owner. Leia o documento original pelo link em `README.md` antes de agir.

## Estado verificado

- Google Drive/Docs foi lido por MCP; documento ID `1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo`.
- Jira conectado; não há projeto ou issue RIV. Não reutilizar AXY. A integração não expõe criação de projeto Jira.
- GitHub é privado. A branch `governance/sprint-0-foundation` foi publicada no remote com o commit `1cbb5acca84bae7e44332e403c6f31ee32036718`. `main` é somente a default branch configurada na metadata; não há ref remota `main`.
- A tentativa de PR para `main` retornou 422 (`base` inválida). É necessário inicializar `main` para permitir PR; não foi criado um commit vazio na base automaticamente.
- A identidade local Git coincide com o perfil GitHub autenticado.
- A branch de governança retornou `protected: false`; `main` não existe e o endpoint de rulesets retornou 403.

## Protocolo Rick

Rick Loop `RICK_LOOP_V2_0_0` consta como CANDIDATE, ainda sem release; RIC-012 do RICK Control Center está em rascunho para implementação. Não declarar nenhum deles como protocolo aprovado do Rivelume sem confirmação do Owner. Use o fluxo desta governança como orientação provisória.

## Bloqueios e decisões do Owner

1. Aprovar a Fonte da Verdade V1.0 ou manter a Sprint 0 bloqueada para produto.
2. Criar o projeto Jira com nome Rivelume Labs e chave proposta RIV. A conexão atual não disponibiliza operação para isso; confirmar criação manual ou outra integração autorizada.
3. Confirmar o protocolo Rick aplicável ao projeto.
4. Resolver as decisões DEC-RIV-007 a DEC-RIV-010 conforme o documento canônico.
5. Após Jira existir, inspecionar tipo de projeto, workflow, status, board e sprints; não presumir configurações.

## Retomada

Leia `AGENTS.md`, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md` e `docs/ops/CURRENT-OBJECTIVE.md`. Confirme Git e fontes novamente. Não inicie implementação até a Fonte da Verdade estar aprovada e a Sprint 0 passar seu gate.
