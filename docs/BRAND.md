# Identidade: logotipo e ícones (RIV-41)

Decisões do Owner de 21/11/2026 (RIV-41): o **logotipo da V4 Red Pen é a identidade definitiva do website**; o ícone é a **variante B** (fundo Highlight, monograma R em Ink e traço Red Pen), com a **versão otimizada para tamanhos pequenos**; ficam **adiados** os ícones Android, o manifest e a imagem Open Graph (esta segue no escopo da RIV-40). O design V4 aprovado não mudou. O nome Rivelume Labs segue como **nome candidato**: as consultas oficiais de marca estão pendentes (RIV-54) e o logotipo **não** está registrado como marca.

## Logotipo (wordmark)

O logotipo é a composição que o site já usa no cabeçalho e no rodapé:

- **"Rivelume"** em Fraunces 800, tracking −0,02 em, em Ink (#1D1A17) sobre Paper ou em Paper (#F5F0E4) sobre Ink.
- **"labs"** em Caveat 700, girado −4°, em Red Pen (#C8231D) sobre Paper ou em Highlight (#F6E24B) sobre Ink.
- Só duas combinações são aprovadas: **Ink + Red Pen sobre Paper** e **Paper + Highlight sobre Ink** (o contraste do "labs" Red Pen sobre Paper é de 4,97:1; sobre fundos escuros usa-se Highlight).

No site o logotipo continua sendo **texto** (`components/layout/site-header.tsx` e `site-footer.tsx`), sem arquivo de imagem. Para outros usos (assinatura de e-mail, imagem Open Graph, apresentações) há duas versões em SVG, em contornos (sem depender de fonte instalada):

| Arquivo | Uso | Espelha |
| --- | --- | --- |
| `public/brand/wordmark-on-paper.svg` | fundos claros (Paper) | cabeçalho (30 px; `opsz` 30; "labs" a 10 px do "Rivelume") |
| `public/brand/wordmark-on-ink.svg` | fundos escuros (Ink) | rodapé (44 px; `opsz` 44; espaço comum; tracking também no "labs") |

A Fraunces usa o eixo óptico `opsz` igual ao tamanho da fonte; por isso cada arquivo segue o tamanho que espelha. **Fidelidade medida (21/11/2026, Chrome, ampliado 3 a 4 vezes, comparando o SVG com o cabeçalho e o rodapé reais):** as caixas do desenho diferem em cerca de 1% de largura e de altura (cabeçalho 764 × 97 contra 757 × 96 e 766 × 96 em outra medição; rodapé 801 × 106 contra 794 × 107). A sobreposição de máscara (IoU) depende do alinhamento: cabeçalho de 0,75 (caixas de tinta normalizadas) a 0,95 (alinhamento pelo canto); rodapé de 0,74 a 0,78. **Diferença conhecida:** no rodapé o "labs" do SVG fica cerca de 2 px de CSS mais à direita que no site (visível só ampliado 4 vezes).

**Regras de uso**

- **Área de respiro:** pelo menos a altura da letra "R" ao redor do logotipo.
- **Tamanho mínimo:** 100 px de largura em tela (cerca de 16 px de fonte; o cabeçalho do site usa 30 px de fonte e cerca de 191 px de largura); abaixo disso usar o ícone.
- **Não:** esticar ou comprimir, trocar fontes ou cores, mudar o giro do "labs", adicionar sombra, contorno ou efeito, colocar o "labs" Red Pen sobre fundo escuro, usar sobre fotografia sem fundo sólido, nem recriar o logotipo digitando o texto em outra fonte.

## Ícone (favicon e ícone da tela inicial)

Monograma **R** (o mesmo glifo Fraunces 800, `opsz` 24) sobre fundo Highlight, com um traço de caneta vermelha embaixo (o gesto "Red Pen" da V4). Convenção de arquivos de metadados do Next.js, em `app/` (o Next.js gera os `<link>` no `<head>`):

| Arquivo | Conteúdo |
| --- | --- |
| `app/favicon.ico` | ICO com 3 imagens PNG: 16, 32 e 48 px (variante otimizada) |
| `app/icon.svg` | SVG 512 × 512 em contornos (variante otimizada); é o ícone dos navegadores modernos |
| `app/apple-icon.png` | PNG 180 × 180, quadrado, opaco, sem cantos arredondados (o iOS aplica a máscara); traço ondulado |

**Variante otimizada para tamanho pequeno:** em 16 e 32 px o traço ondulado virava uma mancha; a versão otimizada usa traço **reto e mais grosso** (44 de 512). O `icon.svg` também usa essa versão porque os navegadores o exibem em 16 a 32 px na aba. O `apple-icon.png` usa a versão completa (traço ondulado), por ser grande.

**Como foram gerados (para regenerar):** o glifo "R" e os contornos do logotipo foram extraídos das fontes servidas pelo `next/font` (arquivos do build) com `fontTools` (instância `wght` 800 e o `opsz` indicado) e `uharfbuzz` (kerning); o fundo é um quadrado de cantos arredondados (raio 112 de 512); os PNG foram rasterizados do SVG pelo navegador (canvas) e o ICO foi montado com os PNG de 16, 32 e 48 px. Para alterar o ícone, edite o SVG e gere os PNG/ICO de novo nesses tamanhos.

**Verificação:** `/favicon.ico`, `/icon.svg` e `/apple-icon.png` respondem 200 com os tipos `image/x-icon`, `image/svg+xml` e `image/png`, **antes** da reescrita da página 404 (RIV-37), e recebem os headers de segurança (RIV-46); o CSP (`img-src 'self'`) permite. O `<head>` de `/en` e `/pt` traz os três `<link>`; no Chrome as páginas carregam **sem nenhum erro 404 de ícone**. Testes em `app/brand-assets.test.ts`.

## Fontes e licença

| Fonte | Licença | Direitos autorais |
| --- | --- | --- |
| Fraunces | SIL Open Font License 1.1 | © The Fraunces Project Authors (github.com/undercasetype/Fraunces) |
| Caveat | SIL Open Font License 1.1 | © The Caveat Project Authors (github.com/googlefonts/caveat) |

Verificado em 21/11/2026 nos metadados das próprias fontes (URL da licença) e no `OFL.txt` dos repositórios oficiais. **Nenhuma das duas declara "Reserved Font Name"** (a única menção no texto é a definição padrão da licença). A OFL permite usar as fontes em qualquer arte, inclusive logotipo e ícone, e embutir os contornos em SVG, sem exigir atribuição na arte. O site serve os arquivos das fontes pelo próprio domínio (`next/font`), sob a mesma licença; ao redistribuir os arquivos de fonte (não os SVG), inclua o texto da licença. Esta nota é uma verificação técnica, não parecer jurídico.

## Pendências

- Ícones Android (192 e 512 px) e `manifest`: adiados pelo Owner.
- Imagem Open Graph (1200 × 630): RIV-40.
- Nome candidato e marca: RIV-54 (consultas oficiais no INPI, EUIPO e PRV).
