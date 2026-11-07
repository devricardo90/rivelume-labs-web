# Plano de execução — V1.0 (proposta)

- **Status:** **PROPOSTA.** Só vigora depois do merge, que exige autorização do Owner.
- **Data:** 04/11/2026 · **Tarefa de origem:** pedido do Owner "Execution Plan V1.0"
- **Subordinação:** este documento é **subordinado** à Fonte da Verdade V1.0 (Google Docs), ao `AGENTS.md` e a `docs/GOVERNANCE.md`. Em caso de conflito, prevalecem essas fontes. Ele **não** cria requisitos, **não** altera decisões de produto e **não** é uma segunda Fonte da Verdade.
- **Estado corrente do projeto** fica em `docs/ops/STATUS.md` e no Jira. Este documento define o **método**; os instantâneos datados (seções 3 e 15) existem só como evidência e envelhecem.

## 1. Hierarquia e papéis das fontes

| Fonte | Autoridade | Quem escreve |
| --- | --- | --- |
| **Google Docs — Fonte da Verdade** | Produto, escopo, requisitos, roadmap, critérios de aceitação, gates, decisões comerciais | **Somente o Owner.** O agente lê e nunca modifica |
| **Jira (RIV)** | Épicos, tarefas, estados, dependências, sprints, evidências, bloqueios | Agente, sob comando, por conector; o Owner decide sprint e prioridade |
| **GitHub** | Código, testes, histórico, PRs, revisões, evidências técnicas | Agente (branch e PR); **merge só com autorização do Owner** |
| **`docs/`** | Registro técnico e operacional derivado das fontes acima | Agente, por PR |

Divergência entre fontes: registrar, decidir qual fonte governa o dado, corrigir só o que for divergência **operacional** objetiva e **escalar ao Owner** o que for de produto (`docs/GOVERNANCE.md`).

## 2. Responsabilidades

| Papel | Faz | Não faz |
| --- | --- | --- |
| **Owner** | Aprova escopo, arquitetura material, identidade visual, conteúdo, custos, segurança, credenciais e publicação; autoriza **cada** merge; autoriza início e encerramento de sprint; executa ações que as ferramentas não permitem | — |
| **Agente de implementação (Claude Code)** | Lê as fontes; prepara tarefas; cria branches e PRs; implementa o escopo autorizado; executa verificações; registra evidências; atualiza o Jira com evidência real | Merge sem autorização; alterar a Fonte da Verdade; decidir pelo Owner; ações destrutivas; publicar em produção |
| **Revisor independente (subagente de contexto isolado)** | Reexecuta verificações por conta própria e relata achados com severidade | Editar, mesclar ou comentar em PR ou Jira |
| **Codex (bot do GitHub)** | Revisão automática ao **abrir** o PR | Substituir a revisão independente ou aprovar merge |
| **GitHub (ruleset)** | Impõe PR obrigatório e bloqueia push forçado e exclusão de `main` | — |

## 3. Estado verificado das integrações (instantâneo de 04/11/2026)

Nada abaixo foi presumido: cada linha foi lida ou exercitada com confirmação de retorno.

| Integração | Leitura | Escrita | Limite conhecido |
| --- | --- | --- | --- |
| **Google Docs** | Leitura completa do documento canônico; 642 linhas de conteúdo, **idênticas à leitura de 13/10/2026** | Não exercida, por desenho: o agente não altera a Fonte da Verdade | O documento tem dezenas de milhares de caracteres e é lido via arquivo, não inline |
| **Jira (conector Atlassian)** | Projeto, board 233, sprint 179, issues, links, estados, comentários, transições | Com leitura de retorno: criar e editar issues, comentar, transitar, criar links "Blocks", associar issues a sprint, iniciar sprint. A operação de encerrar sprint **existe e não foi exercida** (irreversível) | **Não há operação para excluir link entre issues** (a remoção do link 10291 foi manual, pelo Owner). O **painel de desenvolvimento** das issues está vazio: não há integração Jira↔GitHub, então nada no Jira se atualiza sozinho a partir de commits, PRs ou merges. Automações internas do Jira não são consultáveis pelo conector |
| **GitHub (`gh` e `git`)** | `main`, ruleset, PRs, comentários, Actions, permissões | Criar branch, PR, comentários e merge, com a conta do Owner (permissão admin) | O token do `gh` tem os escopos `repo`, `gist` e `read:org` e **não tem `workflow`**, necessário para enviar arquivos em `.github/workflows/`. O `git push` usa o Git Credential Manager, cujo token não pôde ser inspecionado: se o push de um workflow funciona é **não verificado** |
| **GitHub Actions / CI** | Habilitado, **0 workflows, 0 execuções**, sem `.github/` na `main` | — | CI **não configurado** (RIV-19). Não há testes automatizados no projeto (RIV-18) |
| **Codex (revisão automática)** | Revisão observada nos PRs #1 e #2, associada ao **primeiro commit** de cada PR (`241cc0b`, `c517e4e`; no PR #1 há também um comentário inline remapeado para o HEAD final, sem nova avaliação); no PR #6 o resumo do Codex referencia o primeiro commit (`467e1ce`), não o HEAD atual | — | Nos PRs #1 e #2 não há revisão do Codex sobre os commits seguintes: não presumir que ele reavalia o HEAD final |
| **Navegador para validação visual** | A extensão do Chrome **não está conectada** nesta máquina (03/11/2026) | — | Usa-se Chrome e Edge **já instalados**, em modo headless, via o skill de automação. Firefox e Safari não estão disponíveis |

### 3.1 O que é automático e o que é sob comando

- **Automático (observado):** a revisão do Codex ao abrir um PR (cobertura do HEAD final não garantida); a imposição do ruleset (impede push direto, push forçado e exclusão de `main`); o reflexo dos estados do Jira no board.
- **Somente sob comando do agente:** toda leitura e escrita no Jira, no GitHub e nos documentos; a revisão independente; as verificações em clone limpo; a sincronização do Jira após merges.
- **Não existe:** sincronização automática Jira↔GitHub; CI por eventos; atualização de `STATUS.md` por evento. **Não declarar nenhuma delas** sem evidência de que funcionam.

## 4. Fluxo de execução por issue

`Fonte da Verdade → Jira → READY → branch → implementação → validações → PR → revisão independente → autorização de merge → merge → verificação na main → Jira`

| # | Passo | Evidência mínima |
| --- | --- | --- |
| 1 | **Ler** os requisitos da Fonte da Verdade que a tarefa cita (e confirmar que a revisão do documento não mudou) | Seções citadas; revisão do documento |
| 2 | **Verificar dependências** no Jira (links "Blocks", estados reais, rótulos) e decisões pendentes | Estados lidos; decisões pendentes listadas |
| 3 | **Criar branch** a partir de `main` atualizada: `<tipo>/<assunto>` com a chave quando aplicável (`docs/REPOSITORY.md`) | Nome e SHA base |
| 4 | **Implementar** só o escopo autorizado; qualquer acréscimo é destacado no PR | Diff restrito aos arquivos previstos |
| 5 | **Validar**: as verificações aplicáveis (seção 7) | Saídas reais, em clone limpo quando houver código |
| 6 | **Abrir PR** com resumo, critérios de aceitação e evidências | Corpo do PR |
| 7 | **Revisão independente** proporcional ao risco (seção 8) | Veredito `CLEAN`, `FINDINGS` ou `BLOCKED` com achados |
| 8 | **Pedir autorização de merge** ao Owner, com HEAD, estado de conflitos e riscos | Mensagem com SHA do HEAD |
| 9 | **Confirmar na `main`** depois do merge: SHA resultante, pais, arquivos integrados, proteção ainda ativa | Leitura do remoto |
| 10 | **Atualizar o Jira** com a evidência e só então mover para Feito | Comentário e leitura de retorno |

Regras transversais: um PR por entrega; **nenhum push direto em `main`**; **sem merge automático**; trabalho só em issue **elegível e autorizada**.

## 5. Critérios de READY

Uma tarefa só recebe o rótulo `ready` quando **todos** valem:

1. Escopo, fora de escopo e critérios de aceitação **verificáveis** estão no Jira e derivam da Fonte da Verdade.
2. **Todas as dependências** (links "Blocks") estão em Feito.
3. **Nenhuma decisão pendente do Owner** bloqueia o escopo (decisões pendentes que afetam só etapas futuras não bloqueiam).
4. Não conflita com a Fonte da Verdade nem com as decisões registradas em `docs/DECISIONS.md`.
5. *(Sem exigência de sprint.)* Uma tarefa pode permanecer `ready` no backlog, fora da sprint ativa.

**Para iniciar a implementação**, a tarefa deve estar na sprint ativa **ou** ter autorização explícita do Owner para execução fora dela (decisão do Owner de 04/11/2026).

O workflow do Jira tem só **A fazer / Fazendo / Feito**: "READY", "REVIEW" e "Remote DONE" são representados por **rótulo e comentário** (`docs/GOVERNANCE.md`). Rótulos em uso: `ready`, `waiting-dependency`, `blocked-owner`, `owner-decision`, `owner-gate`.

## 6. Critérios de DONE

Uma tarefa só vai para **Feito** quando, **todos**:

1. Os critérios de aceitação foram atendidos **e comprovados** (comando e saída, ou leitura direta), um a um.
2. O PR foi **mesclado em `main` com autorização do Owner** e o SHA foi **lido do remoto**.
3. A revisão independente exigida pelo risco foi concluída e os achados foram tratados ou registrados.
4. Os testes pertinentes passaram; o histórico Git está consistente; **nenhuma alteração inesperada**.
5. A documentação necessária está atualizada e o Jira tem o comentário de evidência.
6. Gates do Owner aplicáveis foram respeitados.

**Commit, push, PR aberto ou resposta de API isolados não significam concluído** (Fonte da Verdade §17).

## 7. Verificações aplicáveis

| Tipo de mudança | Verificações |
| --- | --- |
| **Somente documentação** | `git diff --check`; diff restrito a `.md`; varredura de frases desatualizadas em todos os `.md`; conflitos por `git merge-tree` |
| **Código ou configuração** | **Clone limpo** do commit: `npm ci`, `tsc --noEmit`, `npm run build`, `dev` e `start` com HTTP 200 e conteúdo conferido; `npm audit`; `AGENTS.md` com o mesmo hash depois do `dev`; nenhum `CLAUDE.md`; `git status` do clone vazio; **nenhum processo ou porta de teste restante** |
| **Dependências** | Análise do lockfile contra a `main`: scripts de instalação, origem fora do registry, `integrity`, licenças; versões **exatas**; idade da versão |
| **Aparência** | Navegador real (estilos calculados e captura de tela), desktop e celular; declarar **quais navegadores não foram testados** |

Quando a RIV-18 e a RIV-19 existirem, os testes automatizados e o CI entram nesta lista e passam a ser a evidência primária.

## 8. Regras de revisão independente

A revisão é **independente de quem implementou**: subagente de contexto isolado, que lê as fontes primárias, **reexecuta** o que puder e **não confia no resumo do implementador**.

| Nível | Quando | O que o revisor faz |
| --- | --- | --- |
| **R1 — texto** | Redação, datas e estado em documentos | Conferência do diff contra a fonte; sem reexecução completa |
| **R2 — governança e decisões** | `AGENTS.md`, `GOVERNANCE.md`, `DECISIONS.md`, ADR, este plano | Fonte da Verdade, coerência com as decisões do Owner, nenhuma regra enfraquecida |
| **R3 — código ou configuração** | Aplicação, build, estilos | Reexecução própria em clone novo; escopo exato; versões; segurança |
| **R4 — dependências, CI, segurança** | Lockfile, workflows, permissões | R3 mais análise de cadeia de suprimentos, licenças e permissões do workflow |

Regras:

1. **Até 3 rodadas** por entrega; depois disso, registrar `BLOCKED`.
2. **Não repetir auditoria completa por mudança só de redação.** Cada commit posterior à verificação é descrito no PR, com o que **não** foi reverificado.
3. O revisor informa o que **executou** e o que **só leu**. O que não foi verificado vira ressalva visível, nunca uma afirmação.
4. Achados de severidade `bloqueante` impedem o pedido de merge.
5. O comentário do Codex é **sinal adicional**, não substitui a revisão independente; afirmações dele devem ser **verificadas** antes de aceitas ou descartadas (já houve afirmação falsa sobre a autoria de um commit).

## 9. Controle de dependências e sequência

1. A fonte de verdade das dependências é o conjunto de links **"Blocks"** no Jira, lidos antes de cada tarefa. Rótulos não substituem links.
2. Tarefas independentes **não** são bloqueadas por decisões que afetam só etapas futuras.
3. Mesmo independentes, tarefas que tocam os **mesmos arquivos** (`package.json`, `package-lock.json`, `app/globals.css`, `app/page.tsx`, documentos de estado) vão em **PRs sequenciais**, para evitar conflitos.
4. Ordem de integração: um PR por vez; depois do merge, a branch seguinte **recebe a `main`**, é reverificada e só então vai à aprovação.
5. Antes de pedir merge, rodar `git merge-tree` contra a `main` e contra os demais PRs abertos.
6. Não iniciar tarefa **bloqueada**; não antecipar identidade visual nem decisões pendentes (DEC-RIV-005, 007, 008, 009).

## 10. Procedimentos de sincronização

**Depois de abrir o PR:** comentário no Jira com link, HEAD, critérios e evidências; a tarefa continua em **Fazendo**.
**Depois do merge:** (1) ler o remoto: SHA da `main`, pais do merge, arquivos integrados, proteção; (2) comentar no Jira com a evidência e os critérios um a um; (3) mover para **Feito**; (4) ler de volta o estado; (5) sincronizar `STATUS.md`, `CURRENT-OBJECTIVE.md` e `HANDOFF.md` em PR próprio.

Modelo do comentário de evidência no Jira: PR e HEAD · SHA do merge e pais · arquivos integrados · critérios de aceitação (✔ com a prova) · revisão independente (veredito e achados) · o que **não** foi verificado · pendências.

Regras: não registrar sincronização que não foi lida de volta; corrigir no mesmo dia qualquer evidência que se mostre inexata e dizer isso no PR e no Jira; **não existe sincronização automática** entre as ferramentas.

## 11. Gates de aprovação do Owner

| Gate | Exige |
| --- | --- |
| **Merge de qualquer PR** | Autorização explícita, vinculada a um **HEAD específico**. **Qualquer alteração posterior ao HEAD autorizado exige nova validação e nova autorização** (decisão do Owner de 04/11/2026; mais estrita que o texto literal de `AGENTS.md`) |
| **Início e encerramento de sprint** | Autorização explícita (o encerramento é irreversível) |
| **Escopo, arquitetura material, custos, segurança, credenciais, publicação** | Decisão do Owner (`AGENTS.md`, Fonte da Verdade §16.4) |
| **Identidade visual, validação do website, lançamento** | Gates canônicos da Fonte da Verdade §15 (Owner Visual Approval, Owner Website Validation, Owner Launch Approval) |
| **Technical Foundation Validation (RIV-20)** | Validação do Owner ao fim da Sprint 1 |
| **Produção** | Aprovação explícita; nunca implícita |

Uma aprovação vale só para o que foi descrito nela; **não se estende** a outra ação, outro HEAD ou outra tarefa.

## 12. Tratamento de falhas

1. **Três tentativas sem progresso verificável** para o mesmo bloqueio: registrar `BLOCKED`, a causa e a intervenção necessária; **não repetir** a mesma ação sem chance real de sucesso.
2. **Verificação que falha:** corrigir a causa, repetir **as verificações afetadas** e registrar. Não ajustar o teste para passar.
3. **Evidência que se revela inexata:** corrigir no PR e no Jira, com a explicação.
4. **Divergência entre fontes:** seção 1.
5. **Limite de ferramenta** (por exemplo, excluir link no Jira; escopo `workflow` do GitHub): informar **exatamente** a ação ou permissão necessária ao Owner. **Nunca** pedir token, senha ou credencial no chat, e **nunca** buscar credenciais fora do que já está autorizado.
6. **Falha de ambiente local:** diagnosticar a causa (por exemplo, processo que trava arquivos), não contorná-la às cegas.
7. **Mudança que deu errado pela metade** (um script que falha no meio): conferir o estado real do repositório antes de seguir e completar de forma explícita.

## 13. Limites de autonomia

**O agente pode, sem perguntar:** ler qualquer fonte; criar branch e PR dentro de uma tarefa autorizada; mover a tarefa autorizada para Fazendo e registrar comentários e rótulos de prontidão; executar verificações não destrutivas; corrigir redação e estado em documentos dentro do escopo autorizado; abrir uma revisão independente.

**O agente nunca, sem autorização expressa:** mesclar; iniciar ou encerrar sprint; alterar a Fonte da Verdade; mudar escopo, arquitetura ou decisões; executar operação destrutiva (excluir issue, link, branch, histórico); publicar em produção; **instalar software ou baixar binários** (por exemplo, navegadores) fora do que foi autorizado; alterar configurações administrativas, segredos, visibilidade ou plano do GitHub; iniciar tarefa bloqueada.

## 14. Armadilhas conhecidas neste projeto

Aprendizados de 02 e 03/11/2026, a repetir como checagem:

1. **`create-next-app` e `next dev` têm padrões perigosos:** ligam Cache Components e Partial Prefetching, incluem ESLint e Tailwind por padrão, e o `next dev` **escreve um bloco de instruções no `AGENTS.md`** quando detecta um agente (desligado com `agentRules: false`). Sempre conferir o que o scaffold gerou e o hash do `AGENTS.md` depois do `dev`.
2. **O Next.js reescreve o `tsconfig.json`** em `dev` e `build`; manter o arquivo na forma normalizada.
3. **O Tailwind lê `.md` como fonte de classes**; `docs/` e `*.md` da raiz estão excluídos em `app/globals.css`.
4. **Encerrar servidores de teste por linha de comando, não por porta:** no Windows um servidor pode sobreviver sem socket de escuta, e a saída do `netstat` termina em `\r`. Conferir ao final que **não restam processos** do clone.
5. **Evidência que parece verde pode ser de outro processo:** garantir portas livres antes de iniciar o servidor.
6. **Scripts de edição com escapes `\r\n`** podem virar quebras de linha reais no ambiente; preferir `chr(13)` e `chr(10)`.
7. **Extrair texto de JSON do Google Docs com a codificação correta** (UTF-8); comparar versões do documento depois de normalizar.
8. **O worktree do Git** isola a edição de outra branch sem trocar o diretório de trabalho.

## 15. Plano da Sprint 1 até 13/11/2026 (instantâneo de 04/11/2026)

Sprint 179, de 02/11 a 13/11/2026 (duração escolhida pelo Owner), `active`. **Janelas-alvo são propostas de sequência, não estimativas nem compromissos**; dependem da latência de aprovação do Owner.

| Ordem | Tarefa | Depende de | Situação em 04/11 | Janela-alvo |
| --- | --- | --- | --- | --- |
| — | RIV-11, RIV-12, RIV-15 | — | Feito | — |
| 1 | **RIV-13** Tailwind | RIV-12 ✔ | Fazendo; PR #6 revisado, aguardando o Owner | até 05/11 |
| 2 | **RIV-14** Estrutura de componentes e conteúdo | RIV-12 ✔ | Pronta; plano preparatório no Jira (04/11) e decisões do Owner de 04/11 registradas; começa **depois** do merge do PR #6 (toca os mesmos arquivos) | 05–06/11 |
| 3 | **RIV-17** Qualidade (lint, formatação, typecheck) | RIV-12 ✔ | Pronta; depois da RIV-14 (para configurar sobre o código final) | 06–09/11 |
| 4 | **RIV-18** Testes básicos | RIV-17 | Aguarda a RIV-17 | 09–10/11 |
| 5 | **RIV-19** CI inicial | RIV-17, RIV-18 | Aguarda; **risco de permissão** (escopo `workflow`, seção 3) | 10–11/11 |
| 6 | **RIV-20** Gate de validação técnica | todas | Consolidação de evidências; validação do Owner | 12–13/11 |

**Fora do plano:** RIV-16 (Sprint 3), identidade visual (Sprint 2), conteúdo comercial.
**Sinais de risco (viram `AT_RISK`):** PR #6 sem merge até 06/11; decisão de ferramentas da RIV-17 ou da RIV-18 pendente por mais de um dia; permissão de workflow não resolvida antes de 10/11; primeira execução do CI falhando.

## 16. Controle de versões

| Versão | Data | Descrição | Status |
| --- | --- | --- | --- |
| 1.0 | 04/11/2026 | Proposta inicial | Aguardando autorização do Owner para o merge |
