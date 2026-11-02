# Repositório — baseline e política de branches

Entrega da tarefa RIV-11 (Fonte da Verdade §15 Sprint 1, "Repositório"; fluxo em §16.3). Os fatos abaixo foram lidos da API do GitHub e do Git em 02/11/2026, com `main` em `54267d61b3c3dbf729c81b4ad37b0104eb0e2f32`.

## Baseline verificada

| Item | Valor |
| --- | --- |
| Repositório | [devricardo90/rivelume-labs-web](https://github.com/devricardo90/rivelume-labs-web) |
| Remote | `origin` = `https://github.com/devricardo90/rivelume-labs-web.git` |
| Visibilidade | pública |
| Branch padrão e base | `main` |
| Proteção de `main` | ruleset ativo "Protect Main" (id 24971542), alvo `~DEFAULT_BRANCH` |
| Regras do ruleset | `pull_request` (0 aprovações), `non_fast_forward`, `deletion`; sem bypass; sem checks exigidos |
| Métodos de merge | o repositório habilita merge, squash e rebase, mas o ruleset permite apenas **merge** e **rebase** |
| Exclusão automática de branch após merge | desabilitada (`delete_branch_on_merge: false`) |
| Conteúdo | 10 arquivos rastreados, apenas documentação e `.gitignore`: sem aplicação, sem `package.json`, sem `.github/` |
| GitHub Actions | habilitado, 0 workflows, 0 execuções |
| Identidade Git | Ricardo Souza `<devricardo90@gmail.com>` |

O `.gitignore` já ignora `.env`, `.env.*` (exceto `.env.example`), `node_modules/`, `.next/`, `out/`, `dist/`, `coverage/`, `.vercel/` e arquivos do sistema operacional.

## Fluxo de mudança

Conforme `docs/GOVERNANCE.md` e a Fonte da Verdade §16.3:

1. Parta de uma tarefa Jira RIV elegível, na sprint ativa, com critérios de aceitação.
2. Crie uma branch a partir de `main` atualizada.
3. Implemente somente o escopo da tarefa; rode os testes pertinentes; valide `git diff --check`.
4. Abra um PR para `main` com critérios de aceitação e evidências.
5. Faça a REVIEW independente do implementador e registre o resultado.
6. O Owner aprova e executa (ou autoriza) o merge. Não há merge automático e não há push direto em `main`; o ruleset impõe isso.
7. Confirme o estado remoto (SHA de `main`) e atualize o Jira com evidência real antes de mover a tarefa para "Feito".

O ruleset exige PR mas não exige aprovação do GitHub (0 aprovações, decisão do Owner para um repositório de um único mantenedor). Por isso a independência da REVIEW fica registrada nas evidências do PR e do Jira, e o merge segue dependendo do Owner por regra de governança, não por regra técnica.

## Convenções

Convenções observadas no histórico e adotadas daqui em diante:

- **Branches:** `<tipo>/<assunto>`, com a chave Jira quando a branch implementa uma tarefa. Exemplos existentes: `governance/sprint-0-foundation`, `docs/jira-bootstrap-sprint-1`. Exemplos novos: `docs/riv-11-repo-baseline`, `feat/riv-12-nextjs-app`. Tipos usuais: `docs`, `feat`, `fix`, `chore`, `test`, `ci`, `governance`.
- **Commits:** `<tipo>(<escopo opcional>): <resumo no imperativo>`, em inglês, como nos commits existentes (por exemplo, `docs(ops): record verified board 233 and Sprint 1 (id 179) assignment`). Nunca atribuir commits a identidade genérica.
- **PRs:** título no mesmo formato dos commits; corpo com resumo, fora de escopo, critérios de aceitação com evidência, e a chave Jira.
- **Segredos:** nunca versionar credenciais, tokens ou arquivos `.env`. Sem workflow de build, dependências ou infraestrutura fora do escopo aprovado.

## Pontos em aberto (decisão do Owner, sem bloqueio)

- Habilitar a exclusão automática de branches após o merge reduziria as branches antigas (`origin/governance/sprint-0-foundation` e `origin/docs/jira-bootstrap-sprint-1` já mescladas). É configuração administrativa; não foi alterada.
- Exigir o check de CI na proteção de `main` só faz sentido depois que o workflow da RIV-19 existir e tiver uma execução válida.
