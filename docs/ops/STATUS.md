# Estado operacional — 08/11/2026

## Source of Truth

- **Documento:** [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- **Document ID:** `1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo`
- **Versão/status:** V1.0 — APROVADA PELO OWNER em 11/10/2026; relida integralmente em 13/10/2026.
- **Escopo da aprovação:** objetivo e escopo B2B inicial, DEC-RIV-006 (stack) e governança. DEC-RIV-005 e DEC-RIV-007–009, proposta de valor final, contato e demais propostas seguem explicitamente pendentes. Não são aprovação implícita.
- **Stack aprovada:** Next.js, TypeScript, Tailwind CSS e Vercel. Nenhum website ou infraestrutura de produção iniciado.
- **Sugestões de atualização (V1.1, proposta):** registradas em modo SUGGEST em 07/11/2026, **sem aceitar**: §19 (Jira RIV criado e Sprint 1 iniciada), novo registro DEC-RIV-011 (ADR-0001, decisões P1 a P4) na §18 e linha 1.1 na §20. Aguardam revisão e aceite do Owner; a V1.0 continua sendo a versão vigente até lá. A numeração DEC-RIV-011 deve ser conferida pelo Owner.

## Jira

- **Projeto:** Rivelume Labs, chave `RIV`, id 10232, Software team-managed, em `https://ricardodesouzafrancisco.atlassian.net/browse/RIV`. Criado pelo Owner; verificado por leitura de retorno em 13/10/2026 e 02/11/2026.
- **Tipos de issue:** Epic, História, Tarefa, Bug, Subtask. **Estados reais** (transições globais): "A fazer", "Fazendo", "Feito". Não há READY, REVIEW nem Remote DONE; mapeamento em `docs/GOVERNANCE.md`. Board 233 e sprint 179 verificados em 01/11/2026 (ver abaixo).
- **Links disponíveis:** Blocks, Cloners, Duplicate, Relates.
- **Board e sprint (verificados em 01/11/2026 pelo conector Atlassian MCP, leitura direta):** board 233 "RIV board" (tipo simple, projeto RIV), colunas A fazer / Fazendo / Feito, iguais ao workflow. Única sprint do board: **"RIV Sprint 1", id 179, estado `closed`**: encerrada em 08/11/2026 por autorização expressa do Owner, com as 9 tarefas em Feito (lido de volta do Jira; irreversível). O Owner autorizou o início em 02/11/2026; a sprint foi iniciada em 02/11/2026 e tinha fim planejado em 13/11/2026 (duração de 2 semanas escolhida pelo Owner, porque a Fonte da Verdade não define duração). Releitura em 02/11/2026: sprint 179 `active`, de 02/11 a 13/11/2026, com as 9 tarefas. Contém, pelo campo Sprint, exatamente RIV-11 a RIV-15 e RIV-17 a RIV-20 (9 tarefas); RIV-16, RIV-8, RIV-9 e RIV-10 estão fora. Labels `sprint-1` não são a evidência: vale o campo Sprint.
- **Marcadores de prontidão** (o workflow não tem estado READY): rótulos `ready`, `waiting-dependency`, `blocked-owner`, `owner-decision`, `owner-gate`, `owner-assisted`, `evidence-verified`, `sprint-1`, `sprint-3-backlog`, `sprint-0-residual` (mais `epic-*` nos épicos).

### Épicos

| Chave | Épico |
| --- | --- |
| RIV-1 | Governance & Delivery Setup |
| RIV-2 | Technical Foundation |
| RIV-3 | Brand & Design System |
| RIV-4 | Commercial Website |
| RIV-5 | Internationalization |
| RIV-6 | Quality, SEO & Privacy |
| RIV-7 | Launch Readiness |

Épicos não correspondem a sprints. Analytics não consta na Fonte da Verdade e ficou fora. Tarefas de RIV-3, RIV-4, RIV-6 e RIV-7 serão criadas antes das respectivas sprints.

### Governança (Sprint 0 residual)

- RIV-8 Registrar o projeto Jira e mapear o workflow — **Feito** (02/11/2026)
- RIV-9 Reconciliar STATUS.md com a Fonte da Verdade — **Feito** (01/11/2026, PR #1)
- RIV-10 Verificar a proteção de `main` — **Feito** (01/11/2026, PR #1)

### Sprint 1 — Technical Foundation (encerrada em 08/11/2026)

| Chave | Tarefa | Prontidão | Depende de |
| --- | --- | --- | --- |
| RIV-11 | S1-01 Baseline do repositório e política de branches | **Feito** (PR #2 mesclado em `5644df8`, 03/11/2026; `docs/REPOSITORY.md`) | — |
| RIV-12 | S1-02 Next.js + TypeScript | **Feito** (PR #4 mesclado em `575550b`, 03/11/2026; Next.js 16.4.4 + TypeScript) | — |
| RIV-13 | S1-03 Tailwind CSS | **Feito** (PR #6 mesclado em `9edfa08`, 07/11/2026; Tailwind 4.3.3 via PostCSS) | — |
| RIV-14 | S1-04 Estrutura de componentes e conteúdo | **Feito** (PR #8 mesclado em `d8477ce`, 08/11/2026; `components/layout/Container`, convenção em `docs/DEVELOPMENT.md`) | — |
| RIV-15 | S1-05 ADR da estratégia i18n EN/PT-BR | **Feito** (PR #3 mesclado em `ce1ef45`, 03/11/2026; ADR-0001 **Accepted**: decisões P1 a P4 do Owner, vigente) | — |
| RIV-17 | S1-07 Qualidade (lint, formatação, typecheck) | **Feito** (PR #9 mesclado em `9c3a7ae`, 08/11/2026; ESLint 9.39.5, `eslint-config-next` 16.4.4, Prettier 3.9.10) | — |
| RIV-18 | S1-08 Testes básicos | **Feito** (PR #10 mesclado em `2631b4a`, 08/11/2026; Vitest 5.1.0 + React Testing Library, 10 testes) | — |
| RIV-19 | S1-09 CI inicial | **Feito** (PR #11 mesclado em `8fc9106`, 08/11/2026; GitHub Actions em PRs para `main`; Node mínimo 22.12) | — |
| RIV-20 | S1-10 Gate Technical Foundation Validation | **Feito** (08/11/2026; validada pelo Owner **com exceções**: relatório de evidências e conferência da DoD, §17, no comentário da tarefa) | RIV-11 a RIV-15 e RIV-17 a RIV-19 (todas Feito) |

Dependências registradas como links "Blocks" e lidas de volta (RIV-20 tem 8 links, de RIV-11 a RIV-15 e RIV-17 a RIV-19, verificados em 02/11/2026). As 8 dependências da RIV-20 (RIV-11 a RIV-15 e RIV-17 a RIV-19) estão em "Feito" em 08/11/2026; a RIV-20 foi validada pelo Owner com exceções e movida para "Feito" em 08/11/2026. Cada tarefa tem o comentário de evidência no Jira. **As 9 tarefas da Sprint 1 estão em Feito e a sprint 179 foi encerrada em 08/11/2026.**

**RIV-16 (esqueleto de i18n) fica fora da Sprint 1.** A Fonte da Verdade §15 lista só "Estratégia EN/PT" na Sprint 1; a implementação de "Internacionalização" é entrega da Sprint 3. RIV-16 permanece no épico RIV-5, bloqueada pelo ADR aprovado (RIV-15) e por RIV-12. O link "Blocks" RIV-16 → RIV-20 (id 10291), criado antes dessa correção, foi removido manualmente pelo Owner; a releitura de RIV-20 em 02/11/2026 confirma 8 links restantes.

## GitHub

- **Repositório:** [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web). `main` em `1c678214cb16509d02fb2789b60eb58a35b6908e` em 08/11/2026 (merge do PR #13, última alteração da Sprint 1; PRs posteriores só de documentação avançam a `main` sem mudar o código). Merges: PR #1 `54267d6`, #2 `5644df8`, #3 `ce1ef45`, #4 `575550b`, #5 `8984a38`, #6 `9edfa08`, #7 `b4d886b`, #8 `d8477ce`, #9 `9c3a7ae`, #10 `2631b4a`, #11 `8fc9106`, #13 `1c67821` (o #12 foi um PR descartável, fechado sem merge). Baseline completa em `docs/REPOSITORY.md`.
- **Visibilidade:** pública. **Proteção de `main`:** ativa. Ruleset "Protect Main" (id 24971542), verificado por leitura da API em 13/10/2026 e 02/11/2026: PR obrigatório com 0 aprovações, bloqueio de force-push e de exclusão, sem bypass e sem checks exigidos (configuração do Owner; 0 aprovações é a decisão vigente).
- **CI:** `CI_CONFIGURED` — `.github/workflows/ci.yml` (RIV-19) roda a cada Pull Request para `main`: `npm ci`, lint, `format:check`, typecheck, `npm test`, build e `npm audit --omit=dev`, em Node 22. Execução verde na branch da tarefa e falha proposital reportada (ver o comentário da RIV-19). **Não é check obrigatório:** o ruleset continua exigindo só Pull Request; torná-lo obrigatório é decisão do Owner. O workflow não roda em `push` para `main`.
- **Ferramentas de qualidade:** ESLint 9.39.5 (descontinuado pelo npm; risco aceito), Prettier 3.9.10, Vitest 5.1.0, React Testing Library e jsdom, em versões exatas. Node mínimo do projeto: **22.12** (`engines`). `npm audit --omit=dev`: 0 vulnerabilidades; o `npm audit` completo mostra 8 avisos moderados do `minimatch` (GHSA-g3hv-75wg-m249), só em desenvolvimento, aceitos pelo Owner (ver `docs/DEVELOPMENT.md`).

## Protocolo

Sem versão global aprovada do Rick Loop. Vigora o fluxo local de `docs/GOVERNANCE.md`. REVIEW independente e aprovações humanas dos gates continuam obrigatórias.

## Sprint 0 — reconciliação com a Fonte da Verdade (§15)

| Entrega | Evidência | Estado |
| --- | --- | --- |
| Fonte da verdade aprovada | V1.0 aprovada em 11/10/2026, relida | Cumprida |
| Escopo do MVP | §6, aprovado como escopo B2B inicial; DEC-RIV-005 (página única/seis seções) ainda proposta | Parcial |
| Identidade comercial definida | Nome aprovado com ressalva jurídica (DEC-RIV-002); proposta de valor, identidade visual (DEC-RIV-007) e domínio (DEC-RIV-008) pendentes | Parcial |
| Arquitetura aprovada | DEC-RIV-006 | Cumprida |
| Estratégia de internacionalização | Idiomas EN/PT-BR definidos; estratégia de roteamento e tradução **decidida no ADR-0001** (`docs/adr/0001-estrategia-i18n.md`, RIV-15; aprovado pelo Owner em 03/11/2026, vigente desde o merge do PR #3 em `ce1ef45`). A Fonte da Verdade §15 lista a estratégia nas Sprints 0 e 1; §11.6 a adia para a fundação técnica | Cumprida |
| Repositório definido | Repositório, `main` e branch de governança verificados | Cumprida; `main` protegida pelo ruleset 24971542 |
| Projeto Jira criado | Projeto RIV lido de volta em 13/10/2026; workflow, board 233 e sprint 179 verificados | Cumprida |
| Critérios de qualidade definidos | DoD (§17) e RNF (§13); lint, formatação, typecheck, testes e CI configurados nas RIV-17, RIV-18 e RIV-19 | Cumprida (08/11/2026) |

**Conclusão:** a Sprint 0 não deve ser tratada como totalmente encerrada. O marco anterior "DONE" não tinha evidência para o Jira. Os itens parciais que restam dependem de decisões do Owner, e a divergência interna da Fonte da Verdade sobre onde fica a estratégia de i18n (Sprint 0 vs. §11.6) fica para o Owner decidir.

## Limites

A Sprint 1 foi **encerrada em 08/11/2026** por autorização do Owner, com as 9 tarefas em Feito (RIV-20 validada com exceções). **Não há sprint ativa:** a Sprint 2 não foi criada nem iniciada e só começa com autorização do Owner. Não iniciar a RIV-16. Não implementar internacionalização antes da Sprint 3 (RIV-16 não iniciada; o ADR-0001 já está vigente). Não publicar em produção. Merges só com autorização do Owner. Não alterar segredos, visibilidade ou plano do GitHub.
