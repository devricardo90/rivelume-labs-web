# Rivelume Labs

Repositório do website institucional e comercial B2B da Rivelume Labs, um estúdio independente de tecnologia. A fundação de governança foi preparada na Sprint 0; nenhuma implementação do website foi iniciada.

## Estado

- A Fonte da Verdade canônica está na versão 1.0, aprovada pelo Owner em 11/10/2026. A aprovação cobre o objetivo e o escopo inicial B2B, a stack inicial e a governança; as propostas e decisões pendentes continuam sem autorização até decisão do Owner.
- Stack aprovada para o website B2B inicial: Next.js, TypeScript, Tailwind CSS e Vercel. A aprovação não autoriza SaaS, autenticação, dashboard, banco de dados, CMS complexo ou backend sem requisito explícito na Fonte da Verdade.
- O projeto Jira RIV ainda precisa ser criado manualmente. Não usar AXY nem outro projeto.
- `main` é inicializada a partir da branch validada `governance/sprint-0-foundation`. Depois do bootstrap, o fluxo normal é branch → revisão/evidências → PR → main; push direto para main não é o fluxo de desenvolvimento.

## Fontes e autoridade

- Produto: [Fonte da Verdade — Rivelume Labs](https://docs.google.com/document/d/1hfrUEnS6E12huzGAPq7sFH00rKnBqny0tD5BnUqGlmo/edit)
- Jira: [instância Rivelume Labs](https://ricardodesouzafrancisco.atlassian.net) — projeto novo `Rivelume Labs`, chave `RIV`, pendente de criação.
- GitHub: [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web)
- Regras para agentes: [AGENTS.md](AGENTS.md)
- Estado operacional: [docs/ops/STATUS.md](docs/ops/STATUS.md)

Google Docs governa o produto, Jira organiza a execução e GitHub comprova o que foi desenvolvido. Consulte [docs/GOVERNANCE.md](docs/GOVERNANCE.md) antes de qualquer mudança.

## Instruções iniciais

1. Leia `AGENTS.md` e `docs/GOVERNANCE.md`.
2. Releia integralmente a Fonte da Verdade vigente antes de iniciar uma tarefa de produto.
3. Confirme o projeto e o item RIV, seus estados reais, dependências, critérios e gate antes de iniciar trabalho.
4. Use branch, revisão/evidências e PR para integrar alterações em `main`.
5. Não implemente nada além do escopo aprovado nem inicie a Sprint 1 enquanto o projeto Jira RIV não estiver disponível e as dependências operacionais não tiverem sido verificadas.
