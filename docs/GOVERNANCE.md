# Governança do projeto

## Responsabilidades das ferramentas

| Sistema | Autoridade |
| --- | --- |
| Google Docs | Produto, escopo, MVP, requisitos, roadmap, decisões comerciais, critérios de aceitação e gates. |
| Jira | Epics, sprints, tarefas, estados, responsáveis, dependências, evidências e bloqueadores. |
| GitHub | Código implementado, testes, histórico de commits, PRs, revisões e evidências técnicas. |

A [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) é a versão 1.0 aprovada pelo Owner em 11/10/2026. Propostas e pendências continuam abertas conforme indicadas no documento. O projeto Jira RIV foi criado pelo Owner e verificado em 13/10/2026 (ver `docs/ops/STATUS.md`); não reutilizar AXY nem outros projetos do site. O repositório é [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web).

## Contrato de trabalho Jira

O projeto `Rivelume Labs` / `RIV` existe (team-managed). Tipos de issue: Epic, História, Tarefa, Bug, Subtask. Estrutura: Epic → Tarefa → Subtask quando necessário. Cada tarefa deve registrar objetivo, contexto, escopo, fora de escopo, dependências, critérios de aceitação, Definition of Done, evidências esperadas e gate aplicável, sempre derivados da Fonte da Verdade. Não importar backlog de AXY nem criar issues em outros projetos. Épicos representam grandes entregas, não sprints.

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

Estados reais lidos do Jira em 13/10/2026 (transições globais): **A fazer**, **Fazendo**, **Feito**. Não existem estados READY, REVIEW nem Remote DONE.

| Etapa do fluxo | Representação no Jira |
| --- | --- |
| READY | estado "A fazer" + rótulo `ready` (escopo, critérios e dependências satisfeitos) |
| Aguardando dependência / Owner | rótulos `waiting-dependency`, `blocked-owner`, `owner-decision`, `owner-gate` |
| Implementação e testes | "Fazendo" |
| REVIEW independente e revisão do Owner | "Fazendo" + comentário com evidências do PR e da revisão (lacuna: sem estado próprio) |
| Remote DONE | "Feito" somente após merge em `main`, estado remoto verificado e DoD (§17) comprovada |

O board e as sprints ainda não foram verificados (a integração não os expõe); a verificação é pré-condição para iniciar a Sprint 1 (RIV-8). Uma tarefa só vai a "Feito" com evidência. Uma tarefa só termina com critérios atendidos, revisão exigida, testes pertinentes, evidências, gates, histórico Git e estado Jira coerentes. Commit, push ou resposta de API isolados não significam conclusão.

REVIEW deve ser independente do implementador. Gates canônicos de produto, identidade visual, validação do website e lançamento continuam exigindo aprovação humana quando aplicáveis. Publicação em produção exige aprovação explícita.

## Reconciliação de divergências

1. Registre a divergência e sua origem.
2. Determine qual sistema tem autoridade sobre aquele dado.
3. Corrija divergências operacionais objetivas sem alterar produto.
4. Escale conflitos de produto e decisões ambíguas ao Owner.
5. Registre decisões aprovadas em [DECISIONS.md](DECISIONS.md) com referência canônica.

## Branches, controles e segurança

Use branch → revisão/evidências → PR → `main`. Não faça push direto em `main` como rotina de desenvolvimento e não faça merge sem revisão e gates. O bootstrap inicial usa a branch validada `governance/sprint-0-foundation`; sua integração na criação inicial de `main` não cria base artificial nem substitui o fluxo normal posterior.

Estado verificado em 13/10/2026 por leitura da API do GitHub: o repositório é público e a `main` está protegida pelo ruleset ativo **"Protect Main"** (id 24971542): PR obrigatório com **0 aprovações**, bloqueio de force-push (`non_fast_forward`) e de exclusão, sem bypass e sem checks de CI exigidos. A decisão de 0 aprovações é do Owner (repositório de um único mantenedor); a independência da REVIEW é registrada nas evidências do PR e do Jira, não por aprovação obrigatória do GitHub. Não exigir checks de CI enquanto não existir workflow com execução válida. Qualquer alteração futura do ruleset deve ser lida de volta antes de ser registrada.

Não versionar segredos, modificar credenciais, criar workflow de build antes de existir aplicação ou adicionar serviços/infraestrutura sem escopo aprovado.

## Execução autônoma e Protocolo Rick

Não foi confirmada uma versão global formalmente aprovada do Rick Loop. Até isso ocorrer, o fluxo acima é a governança local vigente autorizada pelo Owner. Agentes podem executar correções determinísticas no escopo aprovado, mas não substituem auditoria independente, decisão do Owner ou gates humanos. Bloqueie se faltarem autoridade, dependências, identidade ou aprovação exigida. Após três tentativas sem progresso verificável para o mesmo bloqueio, registre `BLOCKED` e a ação necessária.
