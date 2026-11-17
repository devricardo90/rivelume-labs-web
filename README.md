# Rivelume Labs

Repositório do website institucional e comercial B2B da Rivelume Labs, um estúdio independente de tecnologia. A fundação de governança foi preparada na Sprint 0. O website V4 Red Pen está implementado em Next.js (EN/PT) e foi **aprovado pelo Owner como mockup** em 16/11/2026 (DEC-RIV-013); contato demonstrativo e política de privacidade em rascunho; **não está publicado em produção**. Como executá-la: `docs/DEVELOPMENT.md`.

## Estado

- A Fonte da Verdade canônica está na versão 1.1 (08/11/2026; a V1.0 foi aprovada em 11/10/2026). As decisões pendentes (por exemplo DEC-RIV-008, domínio e e-mail, e DEC-RIV-009, portfólio) continuam sem autorização até decisão do Owner.
- Stack aprovada para o website B2B inicial: Next.js, TypeScript, Tailwind CSS e Vercel. A aprovação não autoriza SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend sem requisito explícito na Fonte da Verdade.
- O projeto Jira RIV foi criado pelo Owner e verificado em 13/10/2026 (ver `docs/ops/STATUS.md`). Não usar AXY nem outro projeto.
- `main` é inicializada a partir da branch validada `governance/sprint-0-foundation`. Depois do bootstrap, o fluxo normal é branch → revisão/evidências → PR → main; push direto para main não é o fluxo de desenvolvimento.

## Fontes e autoridade

- Produto: [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- Jira: [instância Rivelume Labs](https://ricardodesouzafrancisco.atlassian.net) — projeto `Rivelume Labs`, chave `RIV` ([RIV](https://ricardodesouzafrancisco.atlassian.net/browse/RIV)), criado.
- GitHub: [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web)
- Regras para agentes: [AGENTS.md](AGENTS.md)
- Estado operacional: [docs/ops/STATUS.md](docs/ops/STATUS.md)

Google Docs governa o produto, Jira organiza a execução e GitHub comprova o que foi desenvolvido. Consulte [docs/GOVERNANCE.md](docs/GOVERNANCE.md) antes de qualquer mudança.

## Instruções iniciais

1. Leia `AGENTS.md` e `docs/GOVERNANCE.md`.
2. Releia integralmente a Fonte da Verdade vigente antes de iniciar uma tarefa de produto.
3. Confirme o projeto e o item RIV, seus estados reais, dependências, critérios e gate antes de iniciar trabalho.
4. Use branch, revisão/evidências e PR para integrar alterações em `main`.
5. Não implemente nada além do escopo aprovado nem inicie tarefa sem autorização específica do Owner (a Sprint 4 não foi criada; as tarefas RIV-38 a RIV-53 estão no backlog) nem antes de suas dependências estarem satisfeitas; não publique em produção.
