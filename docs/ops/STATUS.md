# Estado operacional — 13/10/2026

## Source of Truth

- **Documento:** [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- **Document ID:** `1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo`
- **Versão/status:** V1.0 — APROVADA PELO OWNER em 11/10/2026; relida integralmente em 13/10/2026.
- **Escopo da aprovação:** objetivo e escopo B2B inicial, DEC-RIV-006 (stack) e governança. DEC-RIV-005 e DEC-RIV-007–009, proposta de valor final, contato e demais propostas seguem explicitamente pendentes. Não são aprovação implícita.
- **Stack aprovada:** Next.js, TypeScript, Tailwind CSS e Vercel. Nenhum website ou infraestrutura de produção iniciado.

## Jira

- **Projeto:** Rivelume Labs, chave `RIV`, id 10232, Software team-managed, em `https://ricardodesouzafrancisco.atlassian.net/browse/RIV`. Criado pelo Owner; verificado por leitura de retorno em 13/10/2026.
- **Tipos de issue:** Epic, História, Tarefa, Bug, Subtask. **Estados reais** (transições globais): "A fazer", "Fazendo", "Feito". Não há READY, REVIEW nem Remote DONE; mapeamento em `docs/GOVERNANCE.md`. Board e sprints ainda não verificados (pendente em RIV-8).
- **Links disponíveis:** Blocks, Cloners, Duplicate, Relates.
- **Sprint:** o Owner informa que o Jira já tem a "RIV Sprint 1". A integração não lista nem edita sprints, e a sessão do agente não tem autenticação para a API ágil (`/rest/agile/1.0/board/233`), então board, estado da sprint e issues associadas NÃO foram verificados; nenhuma issue foi atribuída a ela e as labels `sprint-1` não equivalem a associação real. A Sprint 1 não foi iniciada.
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

- RIV-8 Registrar o projeto Jira e mapear o workflow — `ready`, `owner-assisted` (mapeamento feito; a leitura de board e sprints exige o Owner ou outra integração)
- RIV-9 Reconciliar STATUS.md com a Fonte da Verdade — `ready`
- RIV-10 Verificar a proteção de `main` — `evidence-verified` (proteção ativa; fecha após o merge deste PR)

### Sprint 1 — Technical Foundation

| Chave | Tarefa | Prontidão | Depende de |
| --- | --- | --- | --- |
| RIV-11 | S1-01 Baseline do repositório e política de branches | ready | — |
| RIV-12 | S1-02 Next.js + TypeScript | ready | — |
| RIV-13 | S1-03 Tailwind CSS | waiting-dependency | RIV-12 |
| RIV-14 | S1-04 Estrutura de componentes e conteúdo | waiting-dependency | RIV-12 |
| RIV-15 | S1-05 ADR da estratégia i18n EN/PT-BR | ready (decisão final do Owner) | — |
| RIV-17 | S1-07 Qualidade (lint, formatação, typecheck) | waiting-dependency | RIV-12 |
| RIV-18 | S1-08 Testes básicos | waiting-dependency | RIV-12, RIV-17 |
| RIV-19 | S1-09 CI inicial | waiting-dependency | RIV-12, RIV-17, RIV-18 |
| RIV-20 | S1-10 Gate Technical Foundation Validation | waiting-dependency, owner-gate | RIV-11 a RIV-15, RIV-17 a RIV-19 |

Dependências registradas como links "Blocks" e lidas de volta. Nenhuma tarefa foi iniciada.

**RIV-16 (esqueleto de i18n) fica fora da Sprint 1.** A Fonte da Verdade §15 lista só "Estratégia EN/PT" na Sprint 1; a implementação de "Internacionalização" é entrega da Sprint 3. RIV-16 permanece no épico RIV-5, bloqueada pelo ADR aprovado (RIV-15) e por RIV-12. Nota: o link "Blocks" RIV-16 → RIV-20 criado antes dessa correção não pôde ser removido pela integração. **Pendência do Owner:** remover esse link no Jira (id 10291, tipo Blocks, RIV-16 bloqueia RIV-20) e reler RIV-20; a sessão do agente não tem autenticação para `DELETE /rest/api/3/issueLink/{id}`; até lá, ignorar (RIV-20 não depende de RIV-16).

## GitHub

- **Repositório:** [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web). `main` em `b67d29b7689ec7255dde616b8089c194b321da25` em 13/10/2026.
- **Visibilidade:** pública. **Proteção de `main`:** ativa. Ruleset "Protect Main" (id 24971542), verificado por leitura da API em 13/10/2026: PR obrigatório com 0 aprovações, bloqueio de force-push e de exclusão, sem bypass e sem checks exigidos (configuração do Owner; 0 aprovações é a decisão vigente).
- **CI:** `CI_NOT_CONFIGURED` — Actions habilitado, 0 workflows, 0 execuções, sem `.github/` e sem aplicação. Implementação em RIV-19, que depende de RIV-12, RIV-17 e RIV-18.

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
| Projeto Jira criado | Projeto RIV lido de volta em 13/10/2026 | Cumprida |
| Critérios de qualidade definidos | DoD (§17) e RNF (§13) existem; sem ferramentas configuradas | Parcial |

**Conclusão:** a Sprint 0 não deve ser tratada como totalmente encerrada. O marco anterior "DONE" não tinha evidência para o Jira. Os itens parciais dependem de decisões do Owner, e a divergência interna da Fonte da Verdade sobre onde fica a estratégia de i18n (Sprint 0 vs. §11.6) fica para o Owner decidir.

## Limites

Não implementar website, componentes, infraestrutura de produção ou funcionalidades. Não iniciar a Sprint 1 no Jira sem autorização do Owner. Não alterar segredos, visibilidade ou plano do GitHub.
