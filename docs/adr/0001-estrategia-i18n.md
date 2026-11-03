# ADR 0001 — Estratégia de internacionalização (EN / PT-BR)

- **Status:** **ACCEPTED — decisões P1 a P4 e solução nativa aprovadas pelo Owner em 03/11/2026** (vigente desde o merge do PR #3 em `ce1ef45`, 03/11/2026, autorizado pelo Owner). **Sem implementação:** a RIV-16 (Sprint 3) não foi iniciada.
- **Tarefa Jira:** RIV-15 (S1-05). A implementação é a RIV-16 (Sprint 3, bloqueada por este ADR).
- **Data:** proposta em 02/11/2026; decisão do Owner em 03/11/2026
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

Rota dinâmica por idioma, dicionários em arquivos TypeScript/JSON no repositório, uma função `getDictionary(locale)` e `hasLocale` para validar o idioma. Segue o padrão do guia de internacionalização do Next.js para o App Router, **conferido em 03/11/2026 na documentação empacotada com o Next.js 16.4.4** (`node_modules/next/dist/docs/01-app/02-guides/internationalization.md`): pasta `app/[lang]`, dicionários por idioma, `hasLocale` + `notFound()` para idioma desconhecido e `generateStaticParams` para rotas estáticas. Com a decisão P1 (sem detecção de idioma) e P4 (redirecionamento estático), **nenhum arquivo `proxy` é necessário**.

- **Prós:** zero dependências novas; total controle de URLs, metadados e `lang`; conteúdo 100% no repositório; fácil de entender e remover; alinhado a §11.2.
- **Contras:** formatação de plurais/datas/números e mensagens ICU precisam ser feitas à mão (não necessárias agora); helpers de link e de troca de idioma escritos por nós (~dezenas de linhas); a paridade EN/PT depende de tipos e testes nossos. O guia do Next.js usa detecção por `Accept-Language` num `proxy` como padrão; a decisão P1 do Owner não a adota, o que simplifica a solução (ver seção 6).

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

## 6. Decisão

**Decisão geral (Owner, 03/11/2026):** manter a **solução nativa do Next.js (Opção A), sem biblioteca adicional inicialmente**. EN é o idioma principal e PT-BR o segundo (§2.4). Nenhuma implementação nesta tarefa.

### 6.1 Decisões aprovadas, justificativas e consequências

**P1 — Idioma determinado exclusivamente pela URL; sem detecção automática e sem cookie de preferência.**
- *Justificativa:* uma URL por idioma torna cada versão indexável, compartilhável e cacheable sem variação por cabeçalho; atende à privacidade (§13.5, coleta mínima e sem cookie) e à simplicidade (§11.2). O guia do Next.js 16.4.4 mostra a detecção por `Accept-Language` como padrão *recomendado*, mas ela é opcional; a escolha do Owner é deliberadamente diferente.
- *Consequências técnicas:* não há `proxy` nem leitura de cabeçalhos; não há cookie de idioma (nenhuma implicação de consentimento por causa do idioma); quem entra em `/` sempre vê EN e precisa usar o link para PT-BR (custo de experiência aceito); a troca de idioma é um link comum para a mesma página/seção no outro idioma. Uma sugestão não intrusiva de idioma só poderia ser reavaliada depois, com nova decisão.

**P2 — Arquitetura compatível com website de página única ou múltiplas páginas, sem implementar páginas adicionais.**
- *Justificativa:* a DEC-RIV-005 (página única com seis seções) ainda é uma proposta e não foi aprovada; a estrutura não deve forçar nenhuma das duas.
- *Consequências técnicas:* todas as rotas ficam sob `app/[lang]/`; seções por âncora (`/en#services`) ou páginas (`/en/services`) cabem sem mudar a estrutura; os dicionários são organizados por seção/página; nenhuma página adicional é criada agora.

**P3 — `/en` para inglês e `/pt` para português brasileiro; `hreflang` `en` e `pt-BR`, respectivamente.**
- *Justificativa:* URLs curtas e previsíveis; o idioma segue sendo PT-BR (§2.4), expresso na tag (`lang` e `hreflang`), não no caminho. A recomendação técnica original era `/pt-br`; o Owner decidiu por `/pt`.
- *Consequências técnicas:* o mapeamento *slug → tag* (`en` → `en`, `pt` → `pt-BR`) fica em **um único lugar** e é coberto por teste; `<html lang>` usa a tag (`en` / `pt-BR`); o dicionário PT chama-se `pt`. *Risco aceito:* `/pt` é um caminho genérico; se o mercado europeu (§2.3) exigir português de Portugal no futuro, haverá conflito de nome e será preciso nova decisão (por exemplo, adicionar `/pt-pt` e reavaliar `/pt`). Por isso `/pt` deve ser documentado como **português do Brasil**.

**P4 — Redirecionar `/` para `/en` com HTTP 307; `x-default` = `/en`.**
- *Justificativa:* 307 é temporário e não fica em cache indefinidamente em navegadores e buscadores, o que preserva a liberdade de mudar a estrutura enquanto DEC-RIV-005 e DEC-RIV-008 estão pendentes. `x-default` em `/en` é coerente com EN como idioma principal.
- *Consequências técnicas:* **verificado em 03/11/2026 na documentação do Next.js 16.4.4** (`.../05-config/01-next-config-js/redirects.md`): `redirects()` em `next.config` usa **307 com `permanent: false`** e 308 com `permanent: true`. Logo, uma regra estática `{ source: '/', destination: '/en', permanent: false }` basta, sem `proxy`. Parâmetros de consulta são repassados (documentação). `/` não é página indexável (é só redirecionamento); `canonical` e `hreflang` ficam apenas em `/en` e `/pt`. Se um dia existir um seletor de idioma em `/`, o redirecionamento sai e o `x-default` muda. O comportamento do fragmento (`#secao`) através do redirecionamento não foi testado: **validar na RIV-16**.

### 6.2 Parâmetros técnicos resultantes (para a RIV-16, sem implementar agora)

1. **Rotas:** `app/[lang]/...` com `lang` ∈ {`en`, `pt`}; idioma desconhecido responde 404 via `hasLocale` + `notFound()`; `generateStaticParams` devolve `[{ lang: 'en' }, { lang: 'pt' }]` (páginas estáticas).
2. **Redirecionamento:** regra estática de `/` para `/en` (307) em `next.config.ts`; nenhum `proxy`.
3. **Atributo de idioma:** `<html lang="en">` em `/en` e `<html lang="pt-BR">` em `/pt`.
4. **SEO:** `canonical` por idioma; `<link rel="alternate" hreflang="en|pt-BR|x-default">` com `x-default` apontando para `/en`; sitemap com as duas versões e alternates; URLs absolutas montadas a partir de uma **URL-base configurável** (o domínio é a DEC-RIV-008, pendente).
5. **Conteúdo:** um dicionário por idioma no repositório (`en` e `pt`), com **um tipo único** que obriga as mesmas chaves; componentes recebem o texto por props, **nenhum componente é duplicado por idioma**. Sem CMS (§11.5).
6. **Alternância de idioma:** link comum, acessível por teclado, com `lang`/`hreflang` no link; sem JavaScript obrigatório e sem cookie.
7. **Testes (RIV-16/RIV-18):** paridade de chaves EN/PT; mapeamento slug→tag; resposta 307 de `/` para `/en`; `lang` e `hreflang` no HTML; 404 para idioma desconhecido.
8. **Dependências:** nenhuma biblioteca de i18n.

### 6.3 Gatilhos para reavaliar (e considerar `next-intl`)

(a) a DEC-RIV-005 ou o crescimento do site pedir muitas páginas e namespaces; (b) surgirem plurais, datas/moedas localizadas ou mais de dois idiomas; (c) o conteúdo passar a vir de um CMS; (d) a manutenção dos helpers próprios (links, metadados) passar a custar mais do que uma dependência.

## 7. Consequências e riscos

- A manutenção dos helpers (links, metadados) é nossa; mitigada pelo tamanho pequeno e pelos testes. Trocar para a Opção B depois exige migrar dicionários e links; custo estimado baixo enquanto o conteúdo for pequeno (estimativa qualitativa, não medida).
- Sem detecção de idioma (P1), visitantes de língua portuguesa chegam em EN e precisam trocar manualmente.
- `/pt` pode conflitar com português de Portugal no futuro (P3).
- `canonical`, `hreflang` e sitemap dependem do domínio final (DEC-RIV-008); até lá usam uma URL-base configurável.
- A estrutura funciona para página única e para várias páginas (P2), mas o formato definitivo depende da DEC-RIV-005.
- Mudanças de comportamento do Next.js entre versões: as afirmações acima foram conferidas na documentação da versão 16.4.4; reconferir ao atualizar a versão.

## 8. Consistência com a Fonte da Verdade

Verificação de 03/11/2026 contra o texto da Fonte da Verdade V1.0:

| Referência | Exigência | Situação |
| --- | --- | --- |
| §2.4 | EN principal, PT-BR secundário, alternância, sem duplicar componentes | Atendido (P3, 6.2 itens 5 e 6) |
| §2.3 | Mercados Brasil, Suécia e outros países europeus | Sem conflito; risco de nome `/pt` registrado (P3) |
| §6, §7 | Página principal com seções e âncoras; versão portuguesa com rótulos traduzidos | Compatível (P2) |
| §11.2, §11.5 | Arquitetura simples, baixa dependência, conteúdo no repositório, sem CMS | Atendido (nativa, 0 dependências) |
| §11.6 | Estratégia de roteamento e tradução definida na fundação técnica | Cumprido por este ADR |
| §12 RF-03 | Conteúdo disponível em EN/PT | Preparado; implementação na RIV-16 |
| §13.3 | Metadados, configuração de idioma, sitemap, indexação | Atendido (6.2 itens 3 e 4) |
| §13.5 | Coleta mínima, transparência | Atendido (P1: sem cookie nem detecção) |
| §14 | Fora de escopo V1 | Nada adicionado |
| §15 | Sprint 0 e Sprint 1 listam a estratégia; Sprint 3 a implementação | Este ADR é a estratégia; a implementação fica na RIV-16 (Sprint 3) |
| DEC-RIV-005 | Página única — **proposta, não aprovada** | Não tratada como aprovada (P2) |
| DEC-RIV-008 | Domínio — **pendente** | Não tratada como aprovada (URL-base configurável) |
| DEC-RIV-006 | Stack aprovada | Respeitada |

**Conclusão:** nenhum conflito com requisitos aprovados. Os pontos em aberto não bloqueiam este ADR (seção 9).

## 9. Pendências que não bloqueiam este ADR

| # | Pendência | Efeito |
| --- | --- | --- |
| P5 | URL-base/domínio (DEC-RIV-008) | Bloqueia apenas concluir `canonical`, `hreflang` e sitemap na RIV-16 |
| P6 | Estrutura de página única (DEC-RIV-005) | O ADR é neutro (P2) |
| P7 | Comportamento do fragmento `#secao` no redirecionamento de `/` | Validar na RIV-16 |

## 10. Aprovação

**Aprovado pelo Owner em 03/11/2026:** solução nativa do Next.js sem biblioteca inicial e as decisões P1 a P4 conforme a seção 6.1. Registrado em `docs/DECISIONS.md` como **ADR-0001**. A implementação pertence à RIV-16 (Sprint 3), que **não foi iniciada**. O PR deste ADR (#3) foi mesclado em 03/11/2026 (`ce1ef45`) com autorização do Owner.
