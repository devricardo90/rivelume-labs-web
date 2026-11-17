# Estado operacional — 17/11/2026 (reconciliado na RIV-49)

As seções históricas de 01 a 08/11/2026 (Sprint 0, Sprint 1, board 233) foram preservadas como registro; o estado vigente das Sprints 2 e 3, das decisões e do GitHub está nas seções "Sprint 2, Sprint 3 e Sprint 4" e "GitHub".

## Source of Truth

- **Documento:** [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- **Document ID:** `1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo`
- **Versão/status:** **V1.1** (08/11/2026) APROVADA PELO OWNER no aceite das sugestões (operacional, sem alterar decisões comerciais); V1.0 aprovada em 11/10/2026. Lida integralmente no Google Docs em 16/11/2026.
- **Decisões (Fonte da Verdade V1.1, lidas em 16/11/2026):** DEC-RIV-005 (página única, seis seções) **aprovada em 08/11/2026**; DEC-RIV-006 (stack) aprovada; DEC-RIV-007 (sistema visual) aprovada em 11/11/2026 e substituída como referência visual pela **DEC-RIV-012** (V4 Red Pen, **aprovada em 14/11/2026**); DEC-RIV-011 (i18n, ADR-0001) aprovada; **DEC-RIV-013** (aprovação do mockup V4, 16/11/2026) registrada. **Pendentes:** DEC-RIV-008 (domínio e e-mail), DEC-RIV-009 (portfólio público), textos comerciais definitivos, logotipo definitivo, verificação jurídica da marca. Nenhuma publicação em produção autorizada.
- **Stack aprovada:** Next.js, TypeScript, Tailwind CSS e Vercel. Website implementado e aprovado como mockup (baseline `d55ba95`); **nenhuma publicação em produção, nenhum projeto Vercel vinculado**.
- **Sugestões da V1.1:** aceitas pelo Owner (08/11/2026).

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

### Sprint 2, Sprint 3 e Sprint 4 (lido do Jira em 17/11/2026)

Sprints do board 233: **Sprint 1** (id 179) encerrada em 08/11/2026; **Sprint 2** (id 212, Design Foundation) encerrada em 11/11/2026, com RIV-21 a RIV-26 em Feito; **Sprint 3** (id 213, Website Implementation) **ativa** (11/11 a 04/12/2026 planejado), com RIV-16 e RIV-27 a RIV-37 em Feito. A RIV-36 (gate OWNER WEBSITE VALIDATION) foi concluída em 16/11/2026 com o mockup aprovado pelo Owner (**MOCKUP APPROVED**, DEC-RIV-013); a RIV-37 (404 com `lang`) foi entregue com exceções aceitas pelo Owner. A Sprint 3 não foi encerrada (decisão do Owner).

**Sprint 4 (Quality and Launch): não criada nem iniciada.** Tarefas no backlog, sem sprint: RIV-38 domínio/`SITE_URL`/e-mail, RIV-39 contato funcional, RIV-40 SEO, RIV-41 favicon e logotipo, RIV-42 privacidade definitiva, RIV-43 copy EN/PT, RIV-44 Selected Work (DEC-RIV-009), RIV-45 verificação da marca, **RIV-46 segurança (Feito, 17/11/2026)**, RIV-47 acessibilidade manual e cross-browser, RIV-48 desempenho em aparelho real, RIV-49 esta reconciliação, RIV-50 plano de publicação/rollback/Vercel, RIV-51 preview final, RIV-52 gate OWNER LAUNCH APPROVAL (pendente), RIV-53 dependências de desenvolvimento com alertas. Dependências por links "Blocks" (RIV-38 a RIV-51 e RIV-36 bloqueiam a RIV-52). Cada tarefa só começa com autorização específica do Owner.

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

- **Repositório:** [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web). `main` em `ea243b2` em 17/11/2026 (merge do PR #26, RIV-46). **Baseline do mockup aprovado:** `d55ba95dcac73a3138e3e32fcc642a5a670ba6f6`, tag anotada `mockup-v4-approved-2026-11-16` (marco de histórico; **não** é release nem aprovação de publicação). Merges da Sprint 1: PR #1 `54267d6`, #2 `5644df8`, #3 `ce1ef45`, #4 `575550b`, #5 `8984a38`, #6 `9edfa08`, #7 `b4d886b`, #8 `d8477ce`, #9 `9c3a7ae`, #10 `2631b4a`, #11 `8fc9106`, #13 `1c67821`, #14 `1790f4b` (o #12 foi descartável, fechado sem merge). Sprints 2 e 3: #16 `0e5edb0` (RIV-29), #17 `3b8255a` (RIV-16), #18 `bdf2ce7` (RIV-27, RIV-28), #19 `c70f203` (RIV-30), #20 `fcf7a8a` (RIV-31), #21 `001747b` (RIV-32), #22 `e4ae138` (RIV-33), #23 `39fa745` (RIV-34), #24 `cfb92ca` (RIV-35), #25 `d55ba95` (RIV-37), #26 `ea243b2` (RIV-46). Baseline completa em `docs/REPOSITORY.md`.
- **Visibilidade:** pública. **Proteção de `main`:** ativa. Ruleset "Protect Main" (id 24971542), verificado por leitura da API em 13/10/2026 e 02/11/2026: PR obrigatório com 0 aprovações, bloqueio de force-push e de exclusão, sem bypass e sem checks exigidos (configuração do Owner; 0 aprovações é a decisão vigente).
- **CI:** `CI_CONFIGURED` — `.github/workflows/ci.yml` (RIV-19) roda a cada Pull Request para `main`: `npm ci`, lint, `format:check`, typecheck, `npm test`, build e `npm audit --omit=dev`, em Node 22. Execução verde na branch da tarefa e falha proposital reportada (ver o comentário da RIV-19). **Não é check obrigatório:** o ruleset continua exigindo só Pull Request; torná-lo obrigatório é decisão do Owner. O workflow não roda em `push` para `main`.
- **Ferramentas de qualidade:** Next.js **16.4.6** (atualizada de 16.4.4 na RIV-46), Tailwind 4.3.3, ESLint 9.39.5 (descontinuado pelo npm; risco aceito), Prettier 3.9.10, Vitest 5.1.0, React Testing Library, jsdom e axe-core 4.14.0, em versões exatas; **333 testes**. Node mínimo: **22.12**. `npm audit --omit=dev`: **0 vulnerabilidades** (17/11/2026). O `npm audit` completo tem 17 avisos (6 moderados, 11 altos), todos em dependências de desenvolvimento, **aceitos temporariamente pelo Owner e não resolvidos** (tarefa RIV-53; ver `docs/DEVELOPMENT.md`, "Segurança (RIV-46)").

## Protocolo

Sem versão global aprovada do Rick Loop. Vigora o fluxo local de `docs/GOVERNANCE.md`. REVIEW independente e aprovações humanas dos gates continuam obrigatórias.

## Sprint 0 — reconciliação com a Fonte da Verdade (§15)

| Entrega | Evidência | Estado |
| --- | --- | --- |
| Fonte da verdade aprovada | V1.0 aprovada em 11/10/2026, relida | Cumprida |
| Escopo do MVP | §6; DEC-RIV-005 (página única, seis seções) aprovada pelo Owner em 08/11/2026 | Cumprida |
| Identidade comercial definida | Nome aprovado com ressalva jurídica (DEC-RIV-002); sistema visual aprovado (DEC-RIV-007, 11/11/2026; V4 Red Pen na DEC-RIV-012, 14/11/2026); proposta de valor, domínio (DEC-RIV-008), logotipo definitivo e verificação da marca pendentes | Parcial |
| Arquitetura aprovada | DEC-RIV-006 | Cumprida |
| Estratégia de internacionalização | Idiomas EN/PT-BR definidos; estratégia de roteamento e tradução **decidida no ADR-0001** (`docs/adr/0001-estrategia-i18n.md`, RIV-15; aprovado pelo Owner em 03/11/2026, vigente desde o merge do PR #3 em `ce1ef45`). A Fonte da Verdade §15 lista a estratégia nas Sprints 0 e 1; §11.6 a adia para a fundação técnica | Cumprida |
| Repositório definido | Repositório, `main` e branch de governança verificados | Cumprida; `main` protegida pelo ruleset 24971542 |
| Projeto Jira criado | Projeto RIV lido de volta em 13/10/2026; workflow, board 233 e sprint 179 verificados | Cumprida |
| Critérios de qualidade definidos | DoD (§17) e RNF (§13); lint, formatação, typecheck, testes e CI configurados nas RIV-17, RIV-18 e RIV-19 | Cumprida (08/11/2026) |

**Conclusão:** a Sprint 0 não deve ser tratada como totalmente encerrada. O marco anterior "DONE" não tinha evidência para o Jira. Os itens parciais que restam dependem de decisões do Owner, e a divergência interna da Fonte da Verdade sobre onde fica a estratégia de i18n (Sprint 0 vs. §11.6) fica para o Owner decidir.

## Limites

Sprints 1 e 2 **encerradas**; Sprint 3 **ativa** (não encerrada; decisão do Owner); **Sprint 4 não criada nem iniciada**. Website aprovado como **mockup** (DEC-RIV-013); o gate OWNER LAUNCH APPROVAL (RIV-52) permanece pendente. **Não publicar em produção** (sem projeto Vercel nem domínio), não fazer merge sem autorização do Owner vinculada a um HEAD específico e não iniciar tarefa sem autorização. Não declarar conformidade WCAG AA. Não alterar segredos, visibilidade ou plano do GitHub.
