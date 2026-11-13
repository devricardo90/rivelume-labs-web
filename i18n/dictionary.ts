import type { Locale } from "@/i18n/config";

// Forma única dos dicionários. EN e PT implementam ESTE tipo, então o TypeScript
// obriga as mesmas chaves nos dois idiomas; o teste de paridade cobre o restante
// (textos vazios, chaves a mais). Nenhum componente é duplicado por idioma: o
// texto chega por props.
//
// As cadeias atuais são MÍNIMAS e provisórias (RIV-16): não há conteúdo comercial.
export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  home: {
    heading: string;
    underConstruction: string;
  };
  language: {
    // Nome acessível do seletor de idioma.
    label: string;
    // Cada idioma escrito no PRÓPRIO idioma (não depende do idioma atual).
    names: Record<Locale, string>;
  };
};
