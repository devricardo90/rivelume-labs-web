# Governança do projeto

## Responsabilidades das ferramentas

| Sistema | Autoridade |
| --- | --- |
| Google Docs | Produto, escopo, MVP, requisitos, roadmap, decisões comerciais, critérios de aceitação e gates. |
| Jira | Epics, sprints, tarefas, estados, responsáveis, dependências, evidências e bloqueadores. |
| GitHub | Código implementado, testes, histórico de commits, PRs, revisões e evidências técnicas. |

A [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) é a versão 1.0 aprovada pelo Owner em 11/10/2026. Propostas e pendências continuam abertas conforme indicadas no documento. O projeto Jira RIV foi criado pelo Owner e verificado em 13/10/2026 (ver `docs/ops/STATUS.md`); não reutilizar AXY nem outros projetos do site. O repositório é [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web).

## Contrato de trabalho Jira

Após a criação do projeto novo `Rivelume Labs` / `RIV`, verificar seu tipo, issue types, workflow, estados, board e sprints. Não assumir nomes de status. Estrutura prevista: Epic → Task → Subtask quando necessário. Cada tarefa deve registrar objetivo, contexto, escopo, fora de escopo, dependências, critérios de aceitação, Definition of Done, evidências esperadas e gate aplicável, sempre derivados da Fonte da Verdade. Não criar issues agora nem importar backlog de AXY.

## Fluxo operacional local vigente

Autorizado pelo Owner até existir uma versão global formalmente aprovada do Rick Loop:

`Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`

1. Leia a Fonte da Verdade integralmente e confirme versão, status, escopo e decisões pendentes.
2. Verifique tarefa, critérios e dependências no Jira.
3. Crie branch a partir de `main`; implemente apenas o escopo autorizado.
4. Execute testes pertinentes, documente evidências e passe por REVIEW independente.
5. Aplique revisão/aprovação do Owner quando o gate exigir.
6. Integre por PR após as aprovações; push direto para `main` não é o fluxo normal.
7. Confirme o estado remoto e sincronize Jira com evidência verificável antes de marcar `Remote DONE`.

O fluxo é orientação de governança do projeto, não autorização para ignorar gates humanos nem executar escopo sem issue elegível.

## Estados e aprovação

Até existir RIV, não há estados para mapear. Após criação, ler a configuração real e documentar o mapeamento para este fluxo. Uma tarefa só termina com critérios atendidos, revisão exigida, testes pertinentes, evidências, gates, histórico Git e estado Jira coerentes. Commit, push ou resposta de API isolados não significam conclusão.

REVIEW deve ser independente do implementador. Gates canônicos de produto, identidade visual, validação do website e lançamento continuam exigindo aprovação humana quando aplicáveis. Publicação em produção exige aprovação explícita.

## Reconciliação de divergências

1. Registre a divergência e sua origem.
2. Determine qual sistema tem autoridade sobre aquele dado.
3. Corrija divergências operacionais objetivas sem alterar produto.
4. Escale conflitos de produto e decisões ambíguas ao Owner.
5. Registre decisões aprovadas em [DECISIONS.md](DECISIONS.md) com referência canônica.

## Branches, controles e segurança

Use branch → revisão/evidências → PR → `main`. Não faça push direto em `main` como rotina de desenvolvimento e não faça merge sem revisão e gates. O bootstrap inicial usa a branch validada `governance/sprint-0-foundation`; sua integração na criação inicial de `main` não cria base artificial nem substitui o fluxo normal posterior.

O readback do GitHub mostrou `main` sem proteção. A leitura do endpoint de rulesets retornou HTTP 403 informando que rulesets requerem GitHub Pro ou repositório público. A integração disponível não permite alterar configuração administrativa. Configuração manual necessária: nas configurações do repositório, proteger `main`, exigir PR para merge, exigir ao menos uma aprovação e impedir force-push e exclusão; não exigir checks de CI enquanto não existirem workflows aprovados. Não mudar visibilidade/plano nesta etapa.

Não versionar segredos, modificar credenciais, criar workflow de build antes de existir aplicação ou adicionar serviços/infraestrutura sem escopo aprovado.

## Execução autônoma e Protocolo Rick

Não foi confirmada uma versão global formalmente aprovada do Rick Loop. Até isso ocorrer, o fluxo acima é a governança local vigente autorizada pelo Owner. Agentes podem executar correções determinísticas no escopo aprovado, mas não substituem auditoria independente, decisão do Owner ou gates humanos. Bloqueie se faltarem autoridade, dependências, identidade ou aprovação exigida. Após três tentativas sem progresso verificável para o mesmo bloqueio, registre `BLOCKED` e a ação necessária.
