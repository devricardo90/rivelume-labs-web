# ADR 0001 — Estratégia de internacionalização (EN / PT-BR)

- **Status:** **PROPOSTA — aguardando decisão do Owner.** Nada neste documento foi aprovado nem deve ser implementado antes da aprovação.
- **Tarefa Jira:** RIV-15 (S1-05). A implementação é a RIV-16 (Sprint 3, bloqueada por este ADR).
- **Data:** 02/11/2026
- **Decisor:** Owner (arquitetura material, Fonte da Verdade §16.4).
- **Referências:** Fonte da Verdade §2.4 (idiomas), §11.2 (princípios), §11.5 (conteúdo no repositório), §11.6 (i18n definida na fundação técnica), §12 RF-03, §13.3 (SEO), §13.5 (privacidade), DEC-RIV-006 (stack).

## 1. Contexto e requisitos vindos da Fonte da Verdade

- Idioma principal **inglês (EN)**; secundário **português do Brasil (PT-BR)**; o site deve permitir **alternância** entre os idiomas (§2.4, RF-03).
- "A implementação deve evitar duplicação desnecessária de componentes" (§2.4).
- Arquitetura simples, componentes reutilizáveis, **baixa dependência de serviços externos**, conteúdo mantido no repositório, **sem CMS complexo** (§11.2, §11.5).
- SEO: metadados, **configuração de idioma**, sitemap, indexação correta (§13.3). Privacidade: coleta mínima, transparência sobre ferramentas externas (§13.5).
- Formato inicial proposto: **uma página principal com seis seções** e navegação por âncoras (§6, §7). Essa estrutura é a **DEC-RIV-005, ainda proposta e não aprovada**; este ADR deve funcionar nos dois casos (página única ou poucas páginas).
- O domínio ainda não está definido (**DEC-RIV-008, pendente**); URLs absolutas (hreflang, sitemap) dependem dele.

Escopo estimado de conteúdo: seis seções de texto curto, três categorias de serviço, sem formulários complexos. Estimativa qualitativa, não medida.

## 2. Fora do escopo deste ADR

Tradução do conteúdo comercial (depende da proposta de valor final, ainda pendente), identidade visual, implementação, e qualquer ferramenta de analytics (não prevista na Fonte da Verdade).

## 3. Critérios de decisão

1. Aderência à Fonte da Verdade (idiomas, alternância, sem duplicar componentes).
2. Proporcionalidade: menor complexidade e menos dependências que atendam o requisito.
3. SEO correto por idioma (URLs distintas, `lang`, hreflang, sitemap).
4. Privacidade: sem cookies nem serviços externos desnecessários.
5. Manutenibilidade: paridade de chaves EN/PT garantida por tipos e testes.
6. Reversibilidade: custo de trocar de abordagem depois.

## 4. Opções consideradas

Versões abaixo lidas do registro npm em 02/11/2026: Next.js 16.4.4 (Node ≥ 20.9), next-intl 4.14.9 (peer `next` até ^16), i18next 26.7.1, react-i18next 17.1.11, todas MIT.

### Opção A — Solução nativa do Next.js, sem biblioteca (dicionários tipados + segmento `[lang]`)

Rota dinâmica por idioma, dicionários em arquivos TypeScript/JSON no repositório, uma função `getDictionary(locale)` e um pequeno arquivo de interceptação de requisição (`proxy`) apenas para reescrever/redirecionar. Segue o padrão do guia de internacionalização do Next.js para o App Router (**a validar contra a documentação da versão 16 antes da RIV-16**, pois não foi reconferido nesta sessão).

- **Prós:** zero dependências novas; total controle de URLs, metadados e `lang`; conteúdo 100% no repositório; fácil de entender e remover; alinhado a §11.2.
- **Contras:** formatação de plurais/datas/números e mensagens ICU precisam ser feitas à mão (não necessárias agora); helpers de link e de troca de idioma escritos por nós (~dezenas de linhas); a paridade EN/PT depende de tipos e testes nossos. Servir o EN **sem prefixo** em `/` exige uma regra de reescrita no arquivo de interceptação (`proxy`); com prefixo nos dois idiomas (`/en`, `/pt-br`) essa regra não é necessária. A diferença de complexidade é pequena, mas é uma das razões da pergunta 2 ao Owner.

### Opção B — `next-intl`

Biblioteca específica para Next.js (App Router), com roteamento por idioma, helpers de navegação, mensagens tipadas e formatação ICU.

- **Prós:** cobre roteamento, links e troca de idioma prontos; formatação rica; mantida ativamente (última publicação 02/10/2026); suporte declarado a Next 16.
- **Contras:** uma dependência a mais para ~6 seções de texto; acopla o projeto à API da biblioteca e às mudanças do Next; parte dos recursos (plurais, datas, muitos namespaces) não é necessária no escopo atual.

### Opção C — `i18next` + `react-i18next`

Ecossistema genérico de i18n para React.

- **Prós:** muito difundido; recursos ricos; independente de framework.
- **Contras:** duas dependências e configuração própria; integração com Server Components e roteamento por idioma exige código de cola; o ganho sobre B/A é pequeno para este escopo. (Não validado em protótipo; avaliação baseada na documentação e na experiência, marcada como **a confirmar** se o Owner quiser considerá-la.)

### Opção D — Idioma por subdomínio/domínio (`en.…`, `pt.…`)

Descartada por ora: depende do domínio (DEC-RIV-008, pendente), aumenta infraestrutura e custos de DNS/certificados e não é necessária para o escopo.

`next-i18next` (16.4.6; peers lidos no npm em 02/11/2026: `next >= 14.1`, `i18next >= 23.7.13`, `react-i18next >= 14`) é uma camada sobre o i18next e não foi avaliada em separado: para este escopo ela cai na mesma análise da Opção C (mais dependências e configuração).

## 5. Avaliação

| Critério | A — nativa | B — next-intl | C — i18next |
| --- | --- | --- | --- |
| Aderência à Fonte da Verdade | atende | atende | atende |
| Proporcionalidade / dependências | **melhor (0 novas)** | 1 nova | 2 novas |
| SEO por idioma | atende (nós implementamos) | atende (helpers prontos) | atende (cola própria) |
| Privacidade (sem cookie/serviço) | atende | atende (configurável) | atende (configurável) |
| Paridade de chaves | tipos + teste nosso | tipos da biblioteca + teste | teste nosso |
| Reversibilidade | **alta** | média | média |
| Esforço inicial | médio | **menor** | maior |

## 6. Recomendação (proposta)

**Opção A**, com os parâmetros abaixo, e **gatilho explícito para migrar para a Opção B** se o escopo crescer.

Motivo: o requisito atual (duas línguas, poucas seções, conteúdo no repositório, baixa dependência) é proporcional à solução nativa. A Opção B é a alternativa forte e segura; é a escolha preferível se o Owner priorizar menos código próprio em troca de uma dependência.

**Gatilhos para reavaliar e migrar para B:** (a) a DEC-RIV-005 mudar para um site com várias páginas; (b) surgirem plurais, datas/moedas localizadas ou mais de dois idiomas; (c) o conteúdo passar a vir de um CMS.

### Parâmetros propostos

1. **URLs:** EN em `/` (idioma principal, sem prefixo) e PT-BR em `/pt-br`. Âncoras preservadas (`/#services`, `/pt-br#services`).
2. **Atributo de idioma:** `<html lang="en">` e `<html lang="pt-BR">` conforme a página.
3. **SEO:** `<link rel="alternate" hreflang="en|pt-BR|x-default">` com URLs absolutas (depende do domínio), canonical por idioma e sitemap listando as duas versões com alternates.
4. **Alternância de idioma:** um link simples para a mesma seção no outro idioma, acessível por teclado e com `lang`/`hreflang` no link. Sem JavaScript obrigatório.
5. **Sem redirecionamento automático por `Accept-Language`** e **sem cookie** de idioma: o idioma vem da URL. Isso evita problemas de indexação e mantém a privacidade (§13.5). Um aviso opcional sugerindo o outro idioma pode ser avaliado depois.
6. **Conteúdo:** um dicionário por idioma em `content/` (ex.: `en.ts`, `pt-br.ts`), com um tipo único que obriga as mesmas chaves nos dois. Componentes recebem o texto por props; **nenhum componente é duplicado por idioma**.
7. **Testes (para a RIV-16/RIV-18):** teste de paridade de chaves EN/PT, teste de seleção de idioma por rota e verificação de `lang`/hreflang no HTML gerado.
8. **Fallback:** rota de idioma desconhecido responde 404; não há mistura de idiomas na mesma página.

## 7. Consequências e riscos

- A manutenção dos helpers (links, metadados) é nossa; mitigada pelo tamanho pequeno e pelos testes.
- Trocar para a Opção B depois exige migrar os dicionários e os links; custo estimado baixo enquanto o conteúdo for pequeno. Estimativa qualitativa, não medida.
- Hreflang e sitemap precisam do domínio final (DEC-RIV-008); até lá usam um valor configurável.
- O tema depende do que a DEC-RIV-005 decidir sobre página única.
- Mudanças na API de interceptação de requisição do Next.js entre versões podem exigir ajuste; mitigação: manter o arquivo pequeno e coberto por teste. EN sem prefixo (`/`) acrescenta uma regra de reescrita a esse arquivo; a alternativa `/en` e `/pt-br` a dispensa.

## 8. Perguntas para o Owner

1. Aprova a **Opção A** ou prefere a **Opção B** (next-intl)?
2. EN em `/` e PT-BR em `/pt-br`, ou ambos com prefixo (`/en`, `/pt-br`)?
3. Concorda em **não** redirecionar automaticamente por idioma do navegador e **não** usar cookie?
4. Confirma que a decisão vale para página única **e** para poucas páginas, enquanto a DEC-RIV-005 estiver pendente?

## 9. Aprovação

Pendente. Depois da decisão do Owner, registrar em `docs/DECISIONS.md` (seção de decisões operacionais) com referência a este ADR e atualizar o status acima. Só então a RIV-16 poderá ser planejada.
