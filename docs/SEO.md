# SEO e indexação (RIV-40)

A produção ainda depende da RIV-38 (domínio e TLS) e da autorização de
lançamento da RIV-52. O código atual pode ser validado antes dessas decisões.

| Configuração no ambiente de build | Origem do valor |
| --- | --- |
| `VERCEL_ENV=production` | Ambiente de produção da plataforma, com build Next.js de produção |
| `SEO_CANONICAL_HOST` | Host confirmado na RIV-38, sem esquema, porta ou caminho |
| `SITE_URL` | Origem HTTPS exatamente correspondente ao host confirmado |
| `SEO_INDEXING_ENABLED` | Ausente por padrão. Somente `true`, aplicado após aprovação do Owner no gate RIV-52, autoriza a indexação |

Com qualquer condição ausente, as respostas enviam `X-Robots-Tag: noindex`.
As Homes também emitem `meta robots=noindex`. `robots.txt` permite que
rastreadores leiam a diretiva Web e omite a referência ao sitemap, que retorna
um XML vazio. A requisição só pode ficar sem o cabeçalho de bloqueio quando
usa o host canônico e o proxy de produção sinaliza HTTPS.

Após a liberação, `/en` e `/pt` têm canonical próprio e alternates recíprocos
com `x-default` em `/en`. O XML lista só as duas Homes. A privacidade em
rascunho continua com `noindex, nofollow`. Valide o cabeçalho HTTP também nos
aliases e no Preview hospedado. As regras e os metadados de páginas estáticas
são gerados no build, portanto alterações nessas variáveis exigem novo build.

Os cartões sociais reutilizam os títulos e descrições aprovados. A
[proposta visual de 1200 × 630](assets/riv-40-open-graph-proposal.png)
usa o wordmark oficial sobre Paper e o texto em Instrument Sans da V4.
A imagem está fora de `public/` e os cartões permanecem sem referência a ela
até a aprovação visual do Owner.
