# Estado operacional — 02/11/2026

## Source of Truth

- **Documento:** [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- **Document ID:** `1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo`
- **Versão/status:** V1.0 — APROVADA PELO OWNER em 11/10/2026; relida integralmente em 13/10/2026.
- **Escopo da aprovação:** objetivo e escopo B2B inicial, DEC-RIV-006 (stack) e governança. DEC-RIV-005 e DEC-RIV-007–009, proposta de valor final, contato e demais propostas seguem explicitamente pendentes. Não são aprovação implícita.
- **Stack aprovada:** Next.js, TypeScript, Tailwind CSS e Vercel. Nenhum website ou infraestrutura de produção iniciado.

## Jira

- **Projeto:** Rivelume Labs, chave `RIV`, id 10232, Software team-managed, em `https://ricardodesouzafrancisco.atlassian.net/browse/RIV`. Criado pelo Owner; verificado por leitura de retorno em 13/10/2026 e 02/11/2026.
- **Tipos de issue:** Epic, História, Tarefa, Bug, Subtask. **Estados reais** (transições globais): "A fazer", "Fazendo", "Feito". Não há READY, REVIEW nem Remote DONE; mapeamento em `docs/GOVERNANCE.md`. Board 233 e sprint 179 verificados em 01/11/2026 (ver abaixo).
- **Links disponíveis:** Blocks, Cloners, Duplicate, Relates.
- **Board e sprint (verificados em 01/11/2026 pelo conector Atlassian MCP, leitura direta):** board 233 "RIV board" (tipo simple, projeto RIV), colunas A fazer / Fazendo / Feito, iguais ao workflow. Única sprint do board: **"RIV Sprint 1", id 179, estado `active`**. O Owner autorizou o início em 02/11/2026; a sprint foi iniciada em 02/11/2026 e termina em 13/11/2026 (duração de 2 semanas escolhida pelo Owner, porque a Fonte da Verdade não define duração). Releitura em 02/11/2026: sprint 179 `active`, de 02/11 a 13/11/2026, com as 9 tarefas. Contém, pelo campo Sprint, exatamente RIV-11 a RIV-15 e RIV-17 a RIV-20 (9 tarefas); RIV-16, RIV-8, RIV-9 e RIV-10 estão fora. Labels `sprint-1` não são a evidência: vale o campo Sprint.
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

### Sprint 1 — Technical Foundation

| Chave | Tarefa | Prontidão | Depende de |
| --- | --- | --- | --- |
| RIV-11 | S1-01 Baseline do repositório e política de branches | **Feito** (PR #2 mesclado em `5644df8`, 03/11/2026; `docs/REPOSITORY.md`) | — |
| RIV-12 | S1-02 Next.js + TypeScript | Fazendo (implementada e validada em clone limpo; PR #4 aguardando merge do Owner) | — |
| RIV-13 | S1-03 Tailwind CSS | waiting-dependency | RIV-12 |
| RIV-14 | S1-04 Estrutura de componentes e conteúdo | waiting-dependency | RIV-12 |
| RIV-15 | S1-05 ADR da estratégia i18n EN/PT-BR | Fazendo (ADR **Accepted**: decisões P1 a P4 aprovadas pelo Owner em 03/11/2026, registradas como ADR-0001; PR #3 aguardando merge do Owner) | — |
| RIV-17 | S1-07 Qualidade (lint, formatação, typecheck) | waiting-dependency | RIV-12 |
| RIV-18 | S1-08 Testes básicos | waiting-dependency | RIV-12, RIV-17 |
| RIV-19 | S1-09 CI inicial | waiting-dependency | RIV-12, RIV-17, RIV-18 |
| RIV-20 | S1-10 Gate Technical Foundation Validation | waiting-dependency, owner-gate | RIV-11 a RIV-15, RIV-17 a RIV-19 |

Dependências registradas como links "Blocks" e lidas de volta (RIV-20 tem 8 links, de RIV-11 a RIV-15 e RIV-17 a RIV-19, verificados em 02/11/2026). RIV-11 está em "Feito"; RIV-12 e RIV-15 estão em "Fazendo"; as demais, em "A fazer".

**RIV-16 (esqueleto de i18n) fica fora da Sprint 1.** A Fonte da Verdade §15 lista só "Estratégia EN/PT" na Sprint 1; a implementação de "Internacionalização" é entrega da Sprint 3. RIV-16 permanece no épico RIV-5, bloqueada pelo ADR aprovado (RIV-15) e por RIV-12. O link "Blocks" RIV-16 → RIV-20 (id 10291), criado antes dessa correção, foi removido manualmente pelo Owner; a releitura de RIV-20 em 02/11/2026 confirma 8 links restantes.

## GitHub

- **Repositório:** [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web). `main` em `5644df85a80f0ac52fa2e34b8c8fb423ab78cb21` em 03/11/2026 (merge do PR #2; antes, `54267d6`, merge do PR #1). Baseline completa em `docs/REPOSITORY.md`.
- **Visibilidade:** pública. **Proteção de `main`:** ativa. Ruleset "Protect Main" (id 24971542), verificado por leitura da API em 13/10/2026 e 02/11/2026: PR obrigatório com 0 aprovações, bloqueio de force-push e de exclusão, sem bypass e sem checks exigidos (configuração do Owner; 0 aprovações é a decisão vigente).
- **CI:** `CI_NOT_CONFIGURED` — Actions habilitado, 0 workflows, 0 execuções e sem `.github/` em `main` (a aplicação base da RIV-12 está no PR #4, ainda não mesclado). Implementação em RIV-19, que depende de RIV-12, RIV-17 e RIV-18 (ainda em "A fazer").

## Protocolo

Sem versão global aprovada do Rick Loop. Vigora o fluxo local de `docs/GOVERNANCE.md`. REVIEW independente e aprovações humanas dos gates continuam obrigatórias.

## Sprint 0 — reconciliação com a Fonte da Verdade (§15)

| Entrega | Evidência | Estado |
| --- | --- | --- |
| Fonte da verdade aprovada | V1.0 aprovada em 11/10/2026, relida | Cumprida |
| Escopo do MVP | §6, aprovado como escopo B2B inicial; DEC-RIV-005 (página única/seis seções) ainda proposta | Parcial |
| Identidade comercial definida | Nome aprovado com ressalva jurídica (DEC-RIV-002); proposta de valor, identidade visual (DEC-RIV-007) e domínio (DEC-RIV-008) pendentes | Parcial |
| Arquitetura aprovada | DEC-RIV-006 | Cumprida |
| Estratégia de internacionalização | Idiomas EN/PT-BR definidos; roteamento e tradução ficam para a fundação técnica (§11.6), em RIV-15 (Fonte da Verdade §15 lista a estratégia nas Sprints 0 e 1; §11.6 a adia para a fundação técnica) | Parcial |
| Repositório definido | Repositório, `main` e branch de governança verificados | Cumprida; `main` protegida pelo ruleset 24971542 |
| Projeto Jira criado | Projeto RIV lido de volta em 13/10/2026; workflow, board 233 e sprint 179 verificados | Cumprida |
| Critérios de qualidade definidos | DoD (§17) e RNF (§13) existem; sem ferramentas configuradas | Parcial |

**Conclusão:** a Sprint 0 não deve ser tratada como totalmente encerrada. O marco anterior "DONE" não tinha evidência para o Jira. Os itens parciais dependem de decisões do Owner, e a divergência interna da Fonte da Verdade sobre onde fica a estratégia de i18n (Sprint 0 vs. §11.6) fica para o Owner decidir.

## Limites

A Sprint 1 está em andamento por autorização do Owner (02/11/2026), com escopo estrito nas tarefas RIV-11 a RIV-15 e RIV-17 a RIV-20. Não iniciar a RIV-16. Não implementar internacionalização antes da aprovação do ADR (RIV-15). Não publicar em produção. Merges só com autorização do Owner. Não alterar segredos, visibilidade ou plano do GitHub.
