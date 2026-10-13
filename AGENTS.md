# Instruções para agentes

## Autoridade

1. **Google Docs** é a fonte canônica para produto, escopo, MVP, requisitos, roadmap, decisões comerciais, critérios de aceitação e gates. Leia a [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) antes de qualquer tarefa de produto. Ela está na versão 1.0, aprovada pelo Owner em 11/10/2026; decisões identificadas como propostas ou pendentes não foram aprovadas.
2. **Jira** organiza epics, sprints, tarefas, estados, responsáveis, dependências, evidências e bloqueadores. O projeto Rivelume Labs, chave RIV, foi criado pelo Owner e verificado em 13/10/2026 (ver `docs/ops/STATUS.md`). Não reutilize AXY nem crie issues em outro projeto.
3. **GitHub** comprova código, testes, commits, PRs, revisões e evidências técnicas. Remote: `https://github.com/devricardo90/rivelume-labs-web.git`.

As ferramentas têm responsabilidades distintas. Registre divergências, determine qual fonte governa o dado e corrija apenas divergências operacionais objetivas. Escale conflitos de produto ao Owner; nunca altere requisitos silenciosamente.

## Início de cada execução

- Leia estas instruções, `docs/GOVERNANCE.md`, `docs/ops/STATUS.md`, `docs/ops/CURRENT-OBJECTIVE.md` e `docs/ops/HANDOFF.md`.
- Confirme diretório, remote, branch, `HEAD`, `git status`, commits e identidade Git antes de editar.
- Releia a Fonte da Verdade integralmente e confirme versão, aprovação e pendências diretamente no Google Docs.
- Confirme o projeto e a tarefa Jira, estado real, critérios, dependências, evidências e gate. Não invente estados nem crie duplicatas.
- Se não houver tarefa Jira elegível, projeto inacessível, autoridade insuficiente ou decisão pendente que bloqueie o escopo, registre o bloqueio e não implemente produto.

## Fluxo local vigente — governança autorizada pelo Owner

`Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`

- Use o documento de produto aprovado para decidir o que pode ser feito; Jira deve organizar o trabalho correspondente.
- Crie branch a partir de `main`. Faça revisão técnica independente do diff e das evidências.
- Obtenha aprovação do Owner quando o gate canônico ou a decisão em questão exigir.
- Integre por PR após as aprovações aplicáveis. Não use push direto em `main` como fluxo normal.
- Verifique o estado remoto e sincronize Jira apenas com evidência real antes de marcar `Remote DONE`.
- Até existir uma versão global formalmente aprovada do Rick Loop, este fluxo é a governança local vigente do projeto. Não apresente protocolo candidato ou rascunho como versão global aprovada.

## Implementação, qualidade e auditoria

- A stack aprovada para o website comercial B2B inicial é Next.js, TypeScript, Tailwind CSS e Vercel. Isso não autoriza SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend sem requisito explícito aprovado na Fonte da Verdade.
- Implemente somente uma tarefa Jira elegível e autorizada, respeitando escopo, critérios de aceitação e Definition of Done canônicos.
- Execute testes pertinentes e registre comandos/resultados verificáveis. Não declare verificações que não foram executadas.
- REVIEW deve ser independente do implementador. Registre revisão de diff, riscos, testes e evidências antes de fechar o trabalho.
- Aprovações humanas de produto, identidade visual, validação do website e lançamento continuam obrigatórias quando os gates canônicos se aplicarem. Produção exige aprovação explícita.
- Não adicione aplicação, dependências, workflow de build, serviços pagos ou infraestrutura fora do escopo aprovado.

## Git e credenciais

- Preserve alterações existentes e autoria de commits; não atribua commits a identidade genérica.
- Confirme que a identidade Git pertence ao Owner autorizado.
- Trabalhe em branch de governança/tarefa; use PR para integrar em `main`. Não faça push direto em `main` como fluxo normal.
- Antes de commit, revise o diff completo, valide `git diff --check` e inclua apenas arquivos autorizados.
- Nunca versionar credenciais, tokens ou dados de ambiente. Não altere credenciais.

## Gates, autonomia e bloqueios

- Correções documentais determinísticas dentro da autorização podem ser executadas autonomamente.
- Não decida pelo Owner sobre escopo, conteúdo comercial, identidade pública, arquitetura material além da stack aprovada, custos, segurança, credenciais ou publicação.
- Execução autônoma não substitui revisão independente ou aprovação humana obrigatória.
- Não inicie a Sprint 1 até que o projeto Jira RIV esteja criado, o workflow/tipos/board/sprints reais tenham sido verificados e as dependências da tarefa estejam claras.
- Após três tentativas sem progresso verificável para o mesmo bloqueio, registre `BLOCKED`, a causa e a intervenção necessária.

## Jira

- Usar apenas o projeto Jira Software `Rivelume Labs`, chave `RIV` (já criado); não reutilizar AXY nem outros projetos do site.
- Antes de operar, inspecione tipos, workflow, status, board e sprints reais; o board e as sprints ainda precisam de verificação (RIV-8). Estrutura: Epic → Tarefa → Subtask quando necessário.
- Cada issue deve conter objetivo, contexto, escopo, fora de escopo, dependências, critérios de aceitação, Definition of Done, evidências e gate aplicável, derivados da Fonte da Verdade.
