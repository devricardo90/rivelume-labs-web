import type { NextConfig } from "next";

// Configuração mínima (RIV-12).
// - Cache Components e Partial Prefetching ficam desativados por decisão do
//   Owner; qualquer ativação exige nova aprovação.
// - agentRules: false impede que `next dev` escreva um bloco de instruções
//   próprio no AGENTS.md. Esse arquivo é de governança do projeto (Owner) e
//   não pode ser alterado por ferramentas de terceiros.
const nextConfig: NextConfig = {
  agentRules: false,
};

export default nextConfig;
