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
  a11y: {
    // Link "pular para o conteúdo" (RIV-27).
    skipToContent: string;
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
    // Código visível no cabeçalho (EN | PT); o nome acessível é o de `names`.
    codes: Record<Locale, string>;
  };
  // Navegação por âncoras (RIV-30). Sem "Home": o logotipo volta ao início
  // (DEC-RIV-012). Os destinos são as seções da página inicial.
  nav: {
    // Nome acessível do <nav> do cabeçalho.
    label: string;
    // Nome acessível do logotipo (link para o início, no idioma atual).
    logoLabel: string;
    services: string;
    work: string;
    process: string;
    about: string;
    contact: string;
    // Botão do menu móvel.
    menuOpen: string;
    menuClose: string;
  };
  footer: {
    // Nome acessível do <nav> do rodapé.
    label: string;
    description: string;
    navigateHeading: string;
    legalHeading: string;
    // Texto simples: a política só será publicada após aprovação do Owner.
    privacy: string;
    tagline: string;
    copyright: string;
  };
};
