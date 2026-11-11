import axe, { type AxeResults, type Result, type RunOptions } from "axe-core";
import { expect } from "vitest";

// Verificações automáticas de acessibilidade (RIV-29), sobre o DOM do jsdom.
//
// LIMITE: o jsdom não faz layout nem pintura. Por isso o axe NÃO mede aqui o
// contraste de cores (`color-contrast`) nem regras que dependem de tamanho ou posição.
// Contraste, foco visível, alvos de toque e rolagem horizontal continuam na
// auditoria no Chrome (1440 e 390 px), registrada no Jira em cada tarefa.

// Tags do axe que correspondem ao alvo do projeto (WCAG 2.2 AA) e às boas práticas.
const TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
  "best-practice",
];

function options(): RunOptions {
  return {
    runOnly: { type: "tag", values: TAGS },
    rules: {
      "color-contrast": { enabled: false },
      // Regras de página inteira (landmarks, h1) não se aplicam a um trecho de
      // componente. A estrutura da página (main, um único h1) tem asserções
      // próprias em app/page.test.tsx; o axe não a verifica como página inteira,
      // porque os testes renderizam dentro de um <div>, sem <html>.
      region: { enabled: false },
      "landmark-one-main": { enabled: false },
      "page-has-heading-one": { enabled: false },
    },
  };
}

export async function runAxe(container: Element): Promise<AxeResults> {
  return axe.run(container, options());
}

function describeViolation(v: Result): string {
  const nodes = v.nodes
    .map((n) => `    - ${n.target.join(" ")}\n      ${n.html}`)
    .join("\n");
  return `[${v.id}] (${v.impact ?? "sem impacto"}) ${v.help}\n${nodes}`;
}

// Falha o teste listando cada violação, com a regra e o elemento afetado.
//
// Dois cuidados contra falsos resultados de aprovação:
// - Se o axe não avaliou NADA (container vazio ou sem elementos avaliáveis), o
//   teste falha: "zero violações" sem nenhuma regra executada não prova nada.
// - Resultados `incomplete` (o axe não conseguiu decidir sozinho, "revisão
//   manual") NÃO fazem o teste falhar; use `runAxe` para inspecioná-los quando
//   o caso importar.
export async function expectNoA11yViolations(
  container: Element,
): Promise<void> {
  const { violations, passes, incomplete } = await runAxe(container);
  expect(
    passes.length + violations.length + incomplete.length,
    "O axe não avaliou nenhuma regra: container vazio ou sem conteúdo avaliável",
  ).toBeGreaterThan(0);
  expect(
    violations.map(describeViolation).join("\n"),
    `Violações de acessibilidade encontradas (axe-core ${axe.version})`,
  ).toBe("");
}
