# Auditoria integrada da Home V4 Red Pen (RIV-35)

Auditoria da implementação em `main` no commit `39fa745a44dce4cf833d399815cbd5f029c547b2` (RIV-27 a RIV-34), com as correções desta tarefa na branch `audit/riv-35-v4-integrated`. Referência visual: `V4-RedPen.dc.html` (SHA-256 `faedd2d42baf9a60f82453743f877f5235b4d8989c091a3859026e575b13a367`).

**Método.** Build de produção (`next build` + `next start`) auditado em Chrome (patchright, Chromium 1248), Firefox 148 e WebKit 26.4 (Playwright 1.59 com os binários instalados; **WebKit do Playwright no Windows, não é o Safari**), mais Lighthouse 13.6 (instalado fora do repositório). Os números abaixo são **medições do implementador**, não testes automatizados do CI; só as correções têm teste de unidade. Evidências (capturas e saídas) ficam no Jira.

> **Não declaramos conformidade WCAG AA.** A RIV-37 (404 sem `lang`, WCAG 3.1.1) está aberta e não há teste com leitor de tela, Safari real nem aparelhos reais. O que segue distingue o que foi verificado do que não foi.

## Resultado por severidade

### Bloqueante
- **RIV-37 (404 sem `lang`)** continua aberta: `/fr`, `/en/x` etc. respondem 404 com `<html>` **sem** `lang`. Corrige-se com `global-not-found` (experimental no Next.js 16.4.4, não autorizado) ou com decisão do Owner. **Bloqueia a conformidade WCAG AA e o gate final (RIV-36).**

### Importante
| # | Achado | Situação |
| --- | --- | --- |
| I1 | Logotipo do cabeçalho: nome acessível "Rivelume Labs, back to top" não continha o texto visível ("Rivelumelabs": faltava o espaço entre os dois `<span>`). axe `label-content-name-mismatch` (WCAG 2.5.3, nível A) em todas as páginas e estados; Lighthouse também. | **Corrigido** (espaço entre os spans; sem efeito visual; teste). |
| I2 | Leitor de tela leria o marcador "01 /" como "zero um barra" e leria duas vezes a sequência Understand → Plan → Build → Deliver (resumo + lista). (Itens transferidos da RIV-32.) | **Corrigido**: marcador `aria-hidden`; linha-resumo `aria-hidden` (a lista ordenada continua lida); testes. |
| I3 | A etiqueta **"Example"** da folha fica **23–24% coberta** pelo carimbo DRAFT/FINAL a partir de 768px (5% a 390px, 0% a 320px). É a geometria da V4 (o carimbo sobrepõe a etiqueta nela também). A etiqueta é o aviso de "exemplo ilustrativo". | **Decisão do Owner** (muda o visual aprovado): por exemplo, mover a etiqueta ou o carimbo. Não alterado. |
| I4 | **Favicon**: `/favicon.ico` responde 404 em toda página (erro no console; Lighthouse Boas práticas 96). | **Pendente do Owner**: depende do logotipo definitivo (identidade). Não inventado. |
| I5 | **SEO/metadados**: sem `canonical`/`hreflang` (sem `SITE_URL`, DEC-RIV-008 pendente); `description` ainda diz "(under construction)"; sem Open Graph; sem `robots.txt`; a Home **não** tem `noindex` (só a Privacidade tem) — ao publicar em URL pública seria indexável. | **Pendente do Owner**: domínio, texto da descrição, política de indexação. |
| I6 | **Performance (lab)**: Lighthouse mobile (4× CPU, 3G lento) mediana ≈ 81 (75–94), desktop 75–88; **TBT** bimodal (140 a 950 ms) por uma tarefa longa de ~400–700 ms no início (hidratação/estilo); LCP 0,9 s (mobile) e 0,35 s (desktop); CLS ≈ 0. Isolei: **não** são as animações nem o prefetch de RSC. Causa exata não determinada. | **Registrado**; ver a seção de desempenho. |

### Menor
- **M1.** Link "Work" do cabeçalho tem 41 × 51px (EN); AA (2.5.8) exige 24px e passa; 44px é recomendação. Espaçamento da V4; não alterado.
- **M2.** Link "Skip to content" leva a `#main`, mas `<main>` não é focável: o foco sequencial segue de `#main` em Chrome; Safari pode divergir. Opcional: `tabIndex={-1}` no `<main>`.
- **M3.** WebKit (Playwright, Windows) renderiza os títulos Fraunces com o corte de texto (glifos mais largos que no Chrome/Firefox); sem estouro nem corte. **Safari real não testado.**
- **M4.** Com espaçamento de texto exagerado (WCAG 1.4.12: letra 0,12em, palavra 0,16em, linha 1,5): sem corte, mas rolagem horizontal de 10px (390px) e de até 64px em PT a 320px por palavras longas ("Desenvolvimento", "compreendido."). Conteúdo permanece acessível; sem quebra automática de palavra.
- **M5.** Botão do CTA tem 3px a mais que na V4 (glifo "→" cai na fonte reserva).

### Melhoria opcional
- Pré-carga de fontes: ver a seção de desempenho.
- `tabIndex={-1}` no `<main>`; `overflow-wrap` em títulos longos.

## Fidelidade visual à V4 (estilos computados, 1440 e 390px)
| Área | Pares idênticos | Diferenças (todas explicadas) |
| --- | --- | --- |
| Cabeçalho e rodapé | 8 de 12 | `display` do link (flex vs inline-block, sem efeito visual); o item "Privacidade" agora é link. |
| Hero e folha | 18 de 21 | CTA +3px (M5); folha com o botão e o resultado (V4 também). |
| Draft → Final | estados FINAL e DRAFT **idênticos**; retângulo da folha 654 × 590 (1440) e 338 × 1005 (390); durações e atrasos de transição idênticos | `aria-pressed` removido do botão por decisão do Owner. |
| Faixa | mesmas fontes, cores e frase | +44px do botão de pausa (aprovado). |
| Services, Selected Work, How We Work, About | 39–40 de 46–47 | Textos novos (títulos de conceito, "Business Automation", Understand/Plan/Build/Deliver, About reescrito) mudam quebras de linha e alturas. |
| Contato | 9 de 11 | Aviso de demonstração e e-mail pendente (novos); +3px do botão. |

## Responsividade (7 larguras × EN/PT)
320, 360, 390, 768, 1024, 1440 e 1920px, com a Home em FINAL, DRAFT, erro e prévia do formulário e, abaixo de 768px, com o menu aberto: **0 rolagem horizontal, 0 elementos cortados** (fora a faixa, que corta por desenho), **0 alvos menores que 24px**; um único alvo abaixo de 44px (M1). Em reduced-motion a faixa quebra em linhas sem cortes de 320 a 1440px. Zoom 200% equivale a ~720px e o reflow 400% a 320px, ambos cobertos. Firefox 148 e WebKit 26.4: sem rolagem horizontal a 1440, 390 e 320px; folha, formulário (sem requisição de rede), desfazer e pausa funcionam.

## Acessibilidade
**Automatizado** (axe-core 4.14 em Chrome real, WCAG 2.0/2.1/2.2 A e AA + boas práticas; 18 combinações: EN/PT × Home FINAL/DRAFT assentado/faixa pausada/menu aberto 390/320/erro/prévia/reduced-motion + Privacidade): **0 violações** após a correção I1. `color-contrast` "incompleto" em 17–18 nós (gradiente do marcador, seta, etiqueta sobreposta) foi coberto à mão. Lighthouse Acessibilidade: 100 em 3 de 5 execuções; 96 em 2 por `color-contrast` **transitório** (texto manuscrito no meio do fade-in no instante da medição, a ~1,8–4s); com a transição assentada, 0.

**Contraste medido** (script próprio sobre todo nó de texto, cor efetiva com opacidade, EN e PT, Home FINAL e DRAFT, erro, prévia, menu móvel e Privacidade): **34 combinações distintas de cor, 0 falhas** nos fundos Paper, folha, Highlight, Burgundy, Deep Burgundy e Ink. Menores razões: Red Pen sobre Paper 4,97:1; texto riscado sobre a folha 5,41:1; Red Pen sobre a folha 5,56:1; Rose sobre Burgundy 6,03:1; Muted sobre Paper 6,56:1. (Textos com opacidade 0 do estado oposto são ocultos de propósito e `aria-hidden`.) Placeholder do formulário medido antes (Rose, 6,03:1).

**Teclado:** ordem lógica (DOM = visual) em EN e PT a 1440 e a 390px (28 e 29 paradas, incluindo o menu), skip link visível e funcional, **todo foco com anel de ≥ 2px e contraste ≥ 4,97:1** (Red Pen sobre Paper/folha, Highlight sobre Burgundy, Deep Burgundy e Ink). **Formulário:** erro com `role="alert"`, foco no campo, prévia com `role="status"` e foco; nenhuma requisição de rede nem armazenamento. **Pause/Play:** mouse, Enter e Espaço congelam e retomam. **Reduced-motion real:** abre em FINAL de imediato; ao desligar a preferência em execução continua FINAL; faixa sem animação e sem cortes. **Draft → Final:** começa em DRAFT e aplica sozinho a 1,8s; o foco ou o clique cancelam; desfazer não reaplica; texto de estado anunciado em `role="status"`.

**Não verificado (ressalvas):** leitor de tela real (NVDA, JAWS, VoiceOver, TalkBack), Safari/iOS e aparelhos reais, navegação por voz, alto contraste do Windows, e qualquer julgamento de conformidade sem os itens acima. Ponto aberto: o rótulo dinâmico do botão Apply/Undo foi escolhido pelo Owner sem `aria-pressed`.

## Desempenho
- **JavaScript**: ~143 KB transferidos (React/Next ≈ 116 KB + código da página), 27 KB estimados sem uso; **CSS** 9 KB; **HTML** 14 KB; sem recurso externo (fontes locais); total ≈ 423–450 KB.
- **Fontes pré-carregadas** (latin, woff2): Fraunces itálico 79 KB, Fraunces normal 65 KB, Instrument Sans 29 KB, Geist Mono 22 KB e Caveat 72 KB = **272 KB**. **Aplicado (sem mudar a tipografia):** `weight: "700"` na Caveat (todo uso é negrito 700): o arquivo latin cai de 72 para **49 KB**, e o conjunto pré-carregado para ≈ **249 KB** (−23 KB, −8%). As larguras do texto manuscrito e do logotipo seguem idênticas à V4. **Não alterado:** Fraunces (título, itálico e eixo óptico), Instrument Sans e Geist Mono (variáveis; instâncias estáticas dariam mais arquivos, não menos). `preload: false` na Caveat só mudaria a prioridade (o logotipo "labs" usa a fonte acima da dobra), sem reduzir bytes: não recomendado.
- **Lighthouse** (lab, build de produção local): mobile 75–94 (mediana ≈ 81), desktop 75–88; LCP 0,9 s e 0,35 s; CLS ≈ 0. TBT bimodal; ver I6.
- **Animações:** só `transform` (faixa) e `opacity`/`translate`/`background-size` (folha, marcador); sem `will-change` necessário; as medições com cada animação desligada não mudaram o TBT de forma sistemática.

## Funcionamento integrado (curl e Chrome)
`/` redireciona 307 para `/en`, **mesmo com `Accept-Language: pt-BR`**, sem cookie; `/en`, `/pt`, `/en/privacy` e `/pt/privacy` respondem 200 com `lang` `en`/`pt-BR`; `/fr`, `/PT`, `/pt-br`, `/en/x` respondem 404 (sem `lang`: RIV-37). Troca de idioma preserva a página e a âncora; âncoras do cabeçalho e do rodapé funcionam na Home e na Privacidade; Contato sem requisição de rede; Privacidade em rascunho, `noindex`, fora do sitemap (vazio sem `SITE_URL`).

## Pendências comerciais e do Owner (inalteradas)
Método e e-mail de contato definitivos; validação jurídica e aprovação da Privacidade; validação de toda a copy EN/PT; nomes PT dos serviços; logotipo definitivo e favicon; domínio (DEC-RIV-008) e política de indexação; decisão sobre a etiqueta "Example" (I3).
