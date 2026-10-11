# Instruções para agentes

## Autoridade

1. **Google Docs** é canônico para produto, MVP, requisitos, roadmap, decisões comerciais, critérios de aceitação e gates. Documento atual: [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), versão 0.1, rascunho.
2. **Jira** deve organizar epics, sprints, tarefas, estados, responsáveis, dependências, evidências e bloqueadores. O projeto RIV ainda não foi criado; não use o projeto AXY nem outro projeto existente como substituto.
3. **GitHub** comprova código, testes, commits, pull requests, revisões e evidências técnicas. Remote esperado: `https://github.com/devricardo90/rivelume-labs-web.git`.

As ferramentas não são fontes concorrentes. Ao detectar divergência, registre-a, identifique qual fonte tem autoridade sobre o dado e reconcilie apenas correções operacionais objetivas. Conflitos de produto, decisões ambíguas e mudança de escopo devem ser escalados ao Owner; nunca altere requisitos silenciosamente.

## Início de cada execução

- Leia estas instruções, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md`, `docs/ops/CURRENT-OBJECTIVE.md` e `docs/ops/HANDOFF.md`.
- Confirme diretório, identidade do repositório, branch, `HEAD`, `origin`, `git status`, commits e identidade Git antes de editar.
- Consulte a versão atual e o estado de aprovação da Fonte da Verdade; não confie em cópias locais antigas.
- Consulte o Jira e confirme projeto, tarefa, estado, dependências, critérios de aceitação e evidências esperadas. Não invente status nem crie tarefas duplicadas.
- Verifique se há decisões pendentes que bloqueiem a tarefa. Se faltar autoridade, registre o bloqueio e não implemente produto.

## Fluxo autorizado

Discovery → validação da Fonte da Verdade → contrato Jira → dependências → implementação → testes pertinentes → auditoria independente → evidências → gates → commit/PR → validação remota → sincronização Jira → próxima tarefa elegível.

O Protocolo Rick Loop `RICK_LOOP_V2_0_0` foi encontrado como **CANDIDATE**, não como release aprovada. O protocolo RIC-012 do RICK Control Center está em rascunho. Não os apresente como protocolo vigente aprovado para este repositório. Até confirmação do Owner, siga somente o fluxo e os limites definidos nesta governança e na instrução autorizada da tarefa.

## Implementação, qualidade e auditoria

- Implemente somente uma tarefa elegível, rastreável a um item Jira e ao escopo aprovado.
- Respeite os critérios de aceitação e a Definition of Done da fonte canônica. Escolha testes pertinentes à mudança; não declare validações não executadas.
- Uma revisão independente deve avaliar o diff, testes, riscos e cobertura dos critérios antes de fechar trabalho. O implementador não declara sua própria revisão independente.
- Registre evidências verificáveis. Commit, push ou resposta de API isolados não provam que uma tarefa está concluída ou sincronizada.
- Não adicione dependências, infraestrutura, workflows de build, aplicação, hospedagem ou integrações sem escopo aprovado.

## Git e credenciais

- Preserve alterações existentes e nunca modifique autoria de commits anteriores.
- Trabalhe em branch de tarefa/governança; não faça commit direto em `main`.
- Antes do commit, revise o diff completo e `git diff --check`; inclua apenas arquivos autorizados.
- Abra PR quando houver branch base válida e integração disponível. Não faça merge sem revisão e gates aplicáveis.
- Não inclua segredos em arquivos, logs, commits, evidências ou Jira. Mantenha arquivos de ambiente locais fora do Git.
- Confirme que `user.name` e `user.email` correspondem a uma identidade autorizada do Owner. A identidade local observada corresponde ao perfil GitHub autenticado de Ricardo Souza.

## Gates e autonomia

- Gates concretos são os aprovados na Fonte da Verdade. Atualmente a fonte está em rascunho, e os gates de produto não autorizam iniciar a implementação.
- Correções documentais determinísticas dentro da solicitação autorizada podem ser executadas autonomamente.
- Não tome decisões pelo Owner sobre escopo, proposta comercial, identidade pública, arquitetura material, custos, segurança, credenciais ou publicação.
- Aprovação humana obrigatória não pode ser substituída por automação. Interrompa se identidade, autoridade, dependências ou gates não puderem ser verificados.
- Após três tentativas sem progresso verificável para o mesmo bloqueio, marque o trabalho como `BLOCKED`, registre a causa e peça intervenção.

## Estados Jira

O workflow de RIV não está disponível para inspeção porque o projeto não existe. Não invente nomes nem mapeamentos de status. Após a criação, inventarie os tipos e estados reais e documente o mapeamento para o protocolo antes de sincronizar tarefas.
