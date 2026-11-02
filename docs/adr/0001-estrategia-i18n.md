# ADR 0001 — Estratégia de internacionalização (EN / PT-BR)

- **Status:** **PROPOSTA — direção do Owner registrada em 02/11/2026; ainda NÃO é "Accepted".** Há decisões pendentes (seção 9). Nada neste documento deve ser implementado antes da aprovação final.
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

## 6. Direção do Owner (02/11/2026) e recomendação

### 6.1 Direção recebida do Owner

Registrada como **recomendação arquitetural do Owner**, ainda não como aprovação final do ADR:

- Inglês como idioma principal; português brasileiro como segundo idioma.
- **Solução nativa do Next.js** (Opção A), sem biblioteca de i18n.
- Rotas **`/en`** e **`/pt`**; redirecionamento de **`/` para `/en`**.
- Dicionários separados por idioma.
- Preparação para `canonical` e `hreflang`.
- **Sem implementação de i18n nesta tarefa** (a RIV-16 continua bloqueada e fora da Sprint 1).

Esta direção **substitui** os parâmetros 1 e 5 da proposta original abaixo (EN em `/` sem prefixo e PT-BR em `/pt-br`; sem redirecionamento). Onde houver divergência, vale a direção do Owner.

### 6.2 Recomendação técnica original (proposta)

**Opção A**, com os parâmetros abaixo, e **gatilho explícito para migrar para a Opção B** se o escopo crescer.

Motivo: o requisito atual (duas línguas, poucas seções, conteúdo no repositório, baixa dependência) é proporcional à solução nativa. A Opção B é a alternativa forte e segura; é a escolha preferível se o Owner priorizar menos código próprio em troca de uma dependência.

**Gatilhos para reavaliar e migrar para B:** (a) a DEC-RIV-005 mudar para um site com várias páginas; (b) surgirem plurais, datas/moedas localizadas ou mais de dois idiomas; (c) o conteúdo passar a vir de um CMS.

### Parâmetros propostos

1. **URLs (conforme direção do Owner):** EN em `/en` e PT-BR em `/pt`; `/` redireciona para `/en`. Âncoras preservadas (`/en#services`, `/pt#services`). O prefixo `/pt` é o *slug* de URL; o atributo de idioma continua `pt-BR` (ver ponto de atenção 1 na seção 8). *Original da proposta: EN em `/` e PT-BR em `/pt-br`.*
2. **Atributo de idioma:** `<html lang="en">` em `/en` e `<html lang="pt-BR">` em `/pt`.
3. **SEO (preparação pedida pelo Owner):** `canonical` por idioma e `<link rel="alternate" hreflang="en|pt-BR|x-default">` com URLs absolutas montadas a partir de uma URL-base configurável (o domínio depende da DEC-RIV-008, pendente); sitemap listando as duas versões com alternates. Qual URL recebe `x-default` é decisão pendente (seção 9).
4. **Alternância de idioma:** um link simples para a mesma seção no outro idioma, acessível por teclado e com `lang`/`hreflang` no link. Sem JavaScript obrigatório.
5. **Redirecionamento e detecção:** a direção do Owner define apenas o redirecionamento **fixo** de `/` para `/en`. A proposta original recomendava **não** redirecionar por `Accept-Language` e **não** usar cookie de idioma (idioma vem da URL; evita problemas de indexação e mantém a privacidade, §13.5). O Owner **não se pronunciou** sobre detecção por `Accept-Language` nem sobre cookie: seguem como recomendação e pendentes de confirmação (seção 9).
6. **Conteúdo:** um dicionário por idioma em `content/` (ex.: `en.ts`, `pt.ts`), com um tipo único que obriga as mesmas chaves nos dois. Componentes recebem o texto por props; **nenhum componente é duplicado por idioma**.
7. **Testes (para a RIV-16/RIV-18):** teste de paridade de chaves EN/PT, teste de seleção de idioma por rota e verificação de `lang`/hreflang no HTML gerado.
8. **Fallback:** rota de idioma desconhecido responde 404; não há mistura de idiomas na mesma página.
9. **Mecanismo (a validar na RIV-16):** como as rotas têm prefixo nos dois idiomas, o redirecionamento de `/` para `/en` pode ser uma regra estática de redirecionamento na configuração do Next.js, sem arquivo de interceptação de requisição (`proxy`) e sem regra de reescrita; isso simplifica a Opção A. Não foi validado contra a documentação do Next.js 16 nesta sessão.

## 7. Consequências e riscos

- A manutenção dos helpers (links, metadados) é nossa; mitigada pelo tamanho pequeno e pelos testes.
- Trocar para a Opção B depois exige migrar os dicionários e os links; custo estimado baixo enquanto o conteúdo for pequeno. Estimativa qualitativa, não medida.
- Hreflang e sitemap precisam do domínio final (DEC-RIV-008); até lá usam um valor configurável.
- O tema depende do que a DEC-RIV-005 decidir sobre página única; a estrutura `/en` + `/pt` serve tanto para página única quanto para poucas páginas.
- O redirecionamento de `/` para `/en` precisa de um código de status definido (temporário 307 ou permanente 308): um redirecionamento permanente pode ficar em cache de navegadores e buscadores se o idioma padrão mudar um dia. Decisão pendente (seção 9). O comportamento do fragmento (`#secao`) em redirecionamentos deve ser validado na RIV-16.
- Mudanças na API de interceptação de requisição do Next.js entre versões podem exigir ajuste; mitigação: manter o arquivo pequeno e coberto por teste. Com a direção do Owner (prefixo nos dois idiomas), a regra de reescrita para EN sem prefixo deixa de ser necessária.

## 8. Perguntas da proposta original, respostas e pontos de atenção

### 8.1 As quatro perguntas

| # | Pergunta | Situação após a direção do Owner |
| --- | --- | --- |
| 1 | Opção A (nativa) ou B (next-intl)? | **Respondida pela direção:** solução nativa do Next.js (Opção A). Falta apenas a aprovação formal. |
| 2 | EN em `/` + PT-BR em `/pt-br`, ou ambos com prefixo? | **Respondida pela direção:** ambos com prefixo, mas com o *slug* **`/pt`** (não `/pt-br`) e `/` redirecionando para `/en`. O slug `/pt` é uma escolha nova, não analisada na proposta (ponto de atenção 1). |
| 3 | Sem redirecionamento automático por idioma do navegador e sem cookie? | **Parcialmente respondida:** o redirecionamento fixo `/` → `/en` está decidido. **Pendente:** detecção por `Accept-Language` (recomendação: não) e cookie de idioma (recomendação: não). |
| 4 | A decisão vale para página única e para poucas páginas enquanto a DEC-RIV-005 estiver pendente? | **Não respondida.** A estrutura proposta serve para ambos; precisa de confirmação explícita. |

### 8.2 Conflitos e pontos de atenção frente à Fonte da Verdade

Não foi identificado **conflito direto** com requisitos aprovados. Pontos de atenção:

1. **Slug `/pt` x idioma PT-BR (§2.4).** A Fonte da Verdade define o segundo idioma como PT-BR. `/pt` é apenas o caminho de URL e não contradiz isso, desde que `lang` e `hreflang` usem `pt-BR`. Risco: `/pt` sugere português genérico, e o mercado europeu (§2.3) pode um dia pedir português de Portugal, o que colidiria com o mesmo caminho. Mitigação: documentar `/pt` como português do Brasil, ou usar `/pt-br`.
2. **Redirecionamento `/` → `/en`.** A Fonte da Verdade não o especifica nem o impede. Em SEO, o redirecionamento fixo não é o problema; o cuidado é o código de status e qual URL é canônica/`x-default` (seção 9). Mostra a página inicial sempre em inglês, coerente com EN como idioma principal (§2.4).
3. **DEC-RIV-005 (página única) pendente.** O ADR é neutro: a estrutura `/en`/`/pt` funciona com uma ou várias páginas. Não é tratada como aprovada.
4. **DEC-RIV-008 (domínio) pendente.** `canonical`, `hreflang` e sitemap precisam de URLs absolutas. Solução: URL-base configurável; não bloqueia a aceitação do ADR, mas bloqueia concluir a parte de SEO na RIV-16.
5. **§11.6.** A estratégia de roteamento e tradução deve ser definida na fundação técnica: este ADR cumpre isso. O §15 também lista a estratégia na Sprint 0 (divergência interna já registrada em `docs/ops/STATUS.md`).
6. **Privacidade (§13.5).** A direção não menciona cookies; a recomendação de não usar cookie de idioma permanece e está pendente de confirmação.
7. **Sem implementação.** Coerente com a RIV-15 (apenas ADR) e com a RIV-16 fora da Sprint 1.

## 9. Decisões ainda pendentes antes de marcar como "Accepted"

| # | Decisão pendente | Recomendação técnica | Bloqueia "Accepted"? |
| --- | --- | --- | --- |
| P1 | Detecção por `Accept-Language` e cookie de idioma (pergunta 3) | Não detectar e não usar cookie | Sim |
| P2 | Validade para página única e para poucas páginas (pergunta 4) | Sim, a estrutura serve para ambos | Sim |
| P3 | Slug **`/pt`** ou `/pt-br` (ponto de atenção 1) | `/pt` aceitável se documentado como português do Brasil; `/pt-br` evita ambiguidade futura | Sim |
| P4 | Código do redirecionamento `/` → `/en` (307 temporário ou 308 permanente) e qual URL recebe `x-default` | 307 enquanto a estrutura não estiver estável; `x-default` apontando para `/en` | Sim |
| P5 | URL-base/domínio para `canonical` e `hreflang` (DEC-RIV-008) | Valor configurável até a DEC-RIV-008 | Não (bloqueia só o SEO da RIV-16) |
| P6 | Estrutura de página única (DEC-RIV-005) | ADR neutro | Não |

## 10. Aprovação

**Pendente.** O ADR só passa a "Accepted" depois que o Owner decidir P1 a P4. Então: registrar em `docs/DECISIONS.md` (seção de decisões operacionais) com referência a este ADR, atualizar o status acima e só então planejar a RIV-16.
