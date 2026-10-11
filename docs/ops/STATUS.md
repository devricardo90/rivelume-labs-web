# Estado operacional — 11/10/2026

## Source of Truth

- **Documento:** [FONTE DA VERDADE — RIVELUME LABS](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- **Document ID:** `1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo`
- **Versão/status:** V1.0 — APROVADA PELO OWNER em 11/10/2026.
- **Leitura verificada:** conteúdo integral relido e alterações lidas de volta pela integração Google Docs nesta execução.
- **Escopo da aprovação:** objetivo e escopo B2B inicial, DEC-RIV-006 (stack) e governança. DEC-RIV-005 e DEC-RIV-007–009, proposta de valor final, contato e demais propostas seguem explicitamente pendentes. Não são aprovação implícita.
- **Stack aprovada:** Next.js, TypeScript, Tailwind CSS e Vercel para o website comercial B2B inicial. Nenhum website ou infraestrutura de produção iniciado.

## Jira

- **Projeto esperado:** Rivelume Labs, chave `RIV`.
- **Estado verificado:** o projeto não existe na instância conectada; busca/listagem retornou zero projetos RIV.
- **Capacidade da integração:** não há operação Jira disponível para criar projetos. Nenhuma issue ou sprint foi criada em projeto alternativo.
- **Ação manual única do Owner:** criar um projeto Jira Software novo com nome `Rivelume Labs` e chave `RIV`. Não reutilizar AXY. Depois da criação, verificar tipo de projeto, issue types, workflow/estados, board e sprints antes de planejar ou iniciar Sprint 1.
- Confirmar a URL real do projeto diretamente no Jira após o provisionamento; não presumir URL antes da criação.

## GitHub

- **Repositório:** [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web), remote `https://github.com/devricardo90/rivelume-labs-web.git`.
- **Branch de governança de entrada:** `governance/sprint-0-foundation`, HEAD validado antes desta atualização: `b64655fafdeb730dcecc3e5432507f2e5fdbab22`; leitura remota confirmou o mesmo SHA.
- **Bootstrap de main:** criada a partir do HEAD final validado da branch de governança, sem commit artificial; o readback remoto confirma o mesmo SHA no momento do bootstrap.
- **Proteção:** GitHub readback mostra `protected: false`. O endpoint de rulesets retornou HTTP 403 com mensagem de que rulesets exigem GitHub Pro ou tornar o repositório público. Nenhuma configuração foi alterada.
- **Ação administrativa manual:** proteger `main`; exigir PR, ao menos uma aprovação, bloquear force-push e exclusão. Não exigir check de CI antes de existir workflow aprovado. Não mudar plano ou visibilidade nesta operação.

## Protocolo e auditoria

- Não foi identificada versão global formalmente aprovada do Rick Loop.
- Governança local vigente por decisão do Owner: `Source of Truth → Jira → branch → implementação → testes/evidências → REVIEW → revisão/Owner quando aplicável → merge main → Remote DONE`.
- REVIEW deve ser independente; aprovação humana continua exigida quando gates canônicos se aplicarem.

## Sprint 0

- **Estado:** DONE, com um único bloqueio operacional externo documentado para criar Jira RIV manualmente; nenhuma implementação de produto iniciada.
- **Concluído:** Fonte da Verdade V1.0 aprovada e lida de volta; decisões abertas preservadas; governança local atualizada; `main` criada e verificada a partir do HEAD final da branch de governança; configuração manual de proteção documentada.
- **Pendente do Owner:** provisionar Jira Software `Rivelume Labs` / `RIV`.
- **Configuração GitHub recomendada:** aplicar manualmente as regras descritas acima quando a interface/plano permitir; a integração não pode alterá-las.
- **Próxima ação elegível:** depois do Jira criado, verificar configurações reais e preparar a Sprint 1; não iniciar nesta execução.

## Limites

Não implementar website, componentes, infraestrutura de produção ou funcionalidades. Não criar issues em AXY, não alterar configuração administrativa, segredos, visibilidade ou plano do GitHub.
