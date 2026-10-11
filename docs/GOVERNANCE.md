# Governança do projeto

## Responsabilidade das fontes

| Sistema | Autoridade |
| --- | --- |
| Google Docs | Produto, escopo, MVP, requisitos, roadmap, decisões, critérios de aceitação e gates. |
| Jira | Epics, sprints, tarefas, estados, responsáveis, dependências, evidências e bloqueadores. |
| GitHub | Código implementado, testes, histórico de commits, PRs, revisões e evidências técnicas. |

O documento canônico atual é a [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), versão 0.1, rascunho não aprovado. O Jira RIV ainda não existe. O remote GitHub existe, é privado e está vazio.

## Contrato de trabalho

Cada item Jira, quando o projeto estiver disponível, deve conter sua chave, sprint, objetivo, contexto, escopo, fora de escopo, dependências, critérios de aceitação, Definition of Done, evidências esperadas e gate aplicável. A tarefa deve derivar do documento canônico aprovado; nenhuma tarefa antiga de AXY ou roadmap anterior pode ser importada automaticamente.

Estrutura operacional desejada: Epic → Task → Subtask quando necessário. Tipos, workflow e nomes de status reais ainda não foram verificados para RIV. Inspecione-os após a criação e documente o mapeamento antes de operar o backlog.

## Ciclo de execução

1. Identificar projeto, repositório, branch e estado de trabalho.
2. Ler a versão vigente e aprovada da Fonte da Verdade.
3. Confirmar item Jira, critérios de aceitação, dependências e autorização.
4. Verificar decisões pendentes e o gate de entrada.
5. Implementar somente o escopo autorizado.
6. Executar testes e validações pertinentes, registrando comandos e resultados reais.
7. Solicitar auditoria independente do diff e das evidências.
8. Aplicar gates humanos obrigatórios.
9. Revisar diff, validar `git diff --check` e criar commit em branch de trabalho.
10. Abrir PR e validar o estado remoto quando houver branch base.
11. Atualizar Jira somente com evidências verificadas; confirmar a leitura de volta.
12. Selecionar a próxima tarefa elegível.

## Estados e aprovação

Não há workflow de RIV para mapear ainda. O agente não pode presumir que Jira usa estados como “Ready”, “In Progress” ou “Done”. Depois que o Owner provisionar o projeto, ler os estados configurados por tipo e relacioná-los ao protocolo aprovado.

Uma tarefa só termina com critérios atendidos, revisão exigida, testes pertinentes, evidências, gates, histórico Git e Jira coerentes e documentação atualizada. Commit, push e resposta da API não significam automaticamente Done.

Revisão técnica independente deve ser feita por revisor diferente do implementador quando o gate exigir auditoria. Aprovação do Owner continua obrigatória para gates de produto, identidade visual, validação do website e lançamento conforme o roadmap canônico. Produção exige aprovação explícita.

## Reconciliação de divergências

1. Registre o dado divergente e sua origem.
2. Determine qual sistema tem autoridade sobre esse tipo de informação.
3. Corrija divergência operacional objetiva sem alterar o produto.
4. Se houver conflito de produto ou decisão pendente, bloqueie a tarefa e encaminhe ao Owner.
5. Registre a decisão e sua referência no [registro de decisões](DECISIONS.md).

## Branches, publicação e segurança

Trabalhe em branch de tarefa/governança e use PR para revisão. Não faça merge sem revisão e gates aplicáveis; não publique em produção sem aprovação explícita. Branch protection e rulesets do GitHub não puderam ser lidos pela integração (respostas 403), então seu estado permanece desconhecido. Não altere configurações administrativas sem autorização.

Nunca versionar credenciais. Não criar workflows de build antes de existir aplicação aprovada. Não adicionar serviços pagos ou infraestrutura sem aprovação.

## Protocolo Rick e execução autônoma

Discovery → validação da Fonte da Verdade → contrato Jira → dependências → implementação → testes → revisão independente → evidências → gates → commit/PR → validação remota → sincronização Jira → próxima tarefa.

No ambiente consultado, Rick Loop `RICK_LOOP_V2_0_0` está identificado como **CANDIDATE** e ainda não como release. RIC-012, no RICK Control Center, está em **Draft for implementation**, versão 1.0. Nenhum dos dois foi confirmado como versão aprovada para este projeto. O fluxo acima foi fornecido pelo Owner nesta execução e é a orientação operacional provisória; decisões e gates humanos continuam obrigatórios.
