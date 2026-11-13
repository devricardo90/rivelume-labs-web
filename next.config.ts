import type { NextConfig } from "next";

// Configuração mínima (RIV-12).
// - Cache Components e Partial Prefetching ficam desativados por decisão do
//   Owner; qualquer ativação exige nova aprovação.
// - agentRules: false impede que `next dev` escreva um bloco de instruções
//   próprio no AGENTS.md. Esse arquivo é de governança do projeto (Owner) e
//   não pode ser alterado por ferramentas de terceiros.
const nextConfig: NextConfig = {
  agentRules: false,
  // ADR-0001, P4: `/` redireciona para `/en` com HTTP 307 (`permanent: false`),
  // sem `proxy` e sem detectar o idioma do navegador. O destino é o idioma
  // padrão (DEFAULT_LOCALE em i18n/config.ts; um teste garante que coincidem).
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
