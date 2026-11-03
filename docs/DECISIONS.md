# Registro de decisões

Referência canônica de produto: [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit), versão 1.0, aprovada em 11/10/2026. Este registro resume decisões e seu estado; não transforma propostas em decisões.

| ID | Data | Contexto / decisão | Autoridade | Status | Referência |
| --- | --- | --- | --- | --- | --- |
| DEC-RIV-001 | 11/10/2026 | Primeiro produto: website comercial B2B da Rivelume Labs. | Fonte da Verdade | Aprovado | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-002 | 11/10/2026 | Nome escolhido: Rivelume Labs; disponibilidade jurídica/comercial ainda precisa ser verificada. | Fonte da Verdade | Aprovado com ressalva | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-003 | 11/10/2026 | Priorizar simplicidade, clareza e conversão comercial. | Fonte da Verdade | Aprovado | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-004 | 11/10/2026 | Usar referências reais e criar identidade visual original. | Fonte da Verdade | Aprovado | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-005 | 11/10/2026 | Página única com seis seções comerciais. | Fonte da Verdade | Proposta, não aprovada | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-006 | 11/10/2026 | Next.js, TypeScript, Tailwind CSS e Vercel para o website comercial B2B inicial; não adicionar SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend sem requisito explícito. | Owner / Fonte da Verdade | Aprovado | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-007 | 11/10/2026 | Definir identidade visual final. | Owner | Pendente | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-008 | 11/10/2026 | Definir domínio e e-mail comercial. | Owner | Pendente | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-009 | 11/10/2026 | Aprovar portfólio público. | Owner | Pendente | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |
| DEC-RIV-010 | 11/10/2026 | Aprovar Fonte da Verdade V1.0. | Owner | Aprovado | [Google Docs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit) |

## Decisões operacionais do Owner

| ID | Data | Decisão | Autoridade | Status |
| --- | --- | --- | --- | --- |
| GOV-RIV-001 | 11/10/2026 | Google Docs governa produto, Jira organiza execução e GitHub comprova o desenvolvimento. | Owner | Vigente |
| GOV-RIV-002 | 11/10/2026 | Usar apenas projeto Jira novo `Rivelume Labs` / `RIV`; não reutilizar AXY. | Owner | Vigente; projeto RIV criado e verificado em 13/10/2026 |
| GOV-RIV-003 | 11/10/2026 | A branch `governance/sprint-0-foundation` validada será a origem do bootstrap inicial de `main`; sem commit artificial. | Owner | Vigente |
| GOV-RIV-004 | 11/10/2026 | Após o bootstrap, desenvolvimento usa branch → revisão/evidências → PR → main; push direto em main não é a rotina. | Owner | Vigente |
| GOV-RIV-005 | 11/10/2026 | Até existir versão global formalmente aprovada do Rick Loop, adotar fluxo local `Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`. | Owner | Vigente como protocolo local |

## Decisões técnicas do Owner (ADRs)

| ID | Data | Decisão | Autoridade | Status | Referência |
| --- | --- | --- | --- | --- | --- |
| ADR-0001 | 03/11/2026 | Internacionalização EN/PT-BR com a solução nativa do Next.js, sem biblioteca inicial. **P1:** idioma só pela URL, sem detecção automática e sem cookie de preferência. **P2:** arquitetura compatível com página única ou múltiplas páginas, sem criar páginas adicionais. **P3:** rotas `/en` (hreflang `en`) e `/pt` (hreflang `pt-BR`). **P4:** `/` redireciona para `/en` com HTTP 307; `x-default` = `/en`. Implementação na RIV-16 (Sprint 3), não iniciada. | Owner | Aprovado (vigente a partir do merge do PR #3) | [`docs/adr/0001-estrategia-i18n.md`](adr/0001-estrategia-i18n.md) |

Esta decisão não aprova DEC-RIV-005 (página única) nem DEC-RIV-008 (domínio), que continuam pendentes na Fonte da Verdade.
