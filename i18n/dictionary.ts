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
  // Hero da V4 Red Pen (RIV-31). A folha de rascunho é um EXEMPLO ilustrativo
  // (selo "Example"): não representa cliente nem resultado real.
  hero: {
    // Rótulo vertical decorativo (aria-hidden).
    verticalLabel: string;
    eyebrow: string;
    // O título quebra em três linhas; a última (itálico sobre o marcador) é a ênfase.
    headingLine1: string;
    headingLine2: string;
    headingEmphasis: string;
    // Anotação manuscrita decorativa ao lado do título (aria-hidden).
    note: string;
    body: string;
    cta: string;
    linkProcess: string;
    linkServices: string;
    sheet: {
      title: string;
      example: string;
      // Selos que se alternam: DRAFT (rascunho) e FINAL.
      stampDraft: string;
      stampFinal: string;
      // Botão da folha (V4): aplica ou desfaz as edições.
      apply: string;
      undo: string;
      // Estado por TEXTO para leitores de tela (anunciado ao mudar).
      statusDraft: string;
      statusFinal: string;
      // Três linhas: o problema (riscado) e a resposta manuscrita.
      items: ReadonlyArray<{ before: string; after: string }>;
      result: string;
    };
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
    // Link para a página de RASCUNHO da política (RIV-33).
    privacy: string;
    tagline: string;
    copyright: string;
  };
  // Seções de conteúdo da V4 (RIV-32). TEXTOS COMERCIAIS PROVISÓRIOS: pendentes
  // de validação do Owner (EN e PT). Não há clientes, projetos, resultados nem
  // métricas reais: Selected Work são CONCEITOS (DEC-RIV-012, Fonte §8).
  services: {
    eyebrow: string;
    headingLead: string;
    headingEmphasis: string;
    headingTail: string;
    intro: string;
    // Três serviços oficiais, na ordem 01 a 03.
    items: ReadonlyArray<{
      title: string;
      description: string;
      application: string;
      // Exemplo em fonte mono: entrada -> saída.
      from: string;
      to: string;
    }>;
    applicationLabel: string;
    benefitLabel: string;
    benefit: string;
  };
  // Faixa "The draft and the final" (RIV-34): nomes de arquivo bagunçados em
  // movimento, com controle de pausa (WCAG 2.2.2).
  band: {
    label: string;
    files: ReadonlyArray<string>;
    phraseLead: string;
    phraseEmphasis: string;
    pause: string;
    play: string;
  };
  // Página 404 (RIV-37). Texto provisório, pendente de validação do Owner.
  notFound: {
    eyebrow: string;
    headingLead: string;
    headingEmphasis: string;
    body: string;
    home: string;
  };
  work: {
    eyebrow: string;
    headingLead: string;
    headingEmphasis: string;
    intro: string;
    problemLabel: string;
    // Cartões: CONCEITOS (sem cliente, resultado ou projeto entregue) e, desde a
    // RIV-44 (DEC-RIV-009), UM projeto real do fundador (Ricardo Tour). Os campos
    // opcionais só existem no cartão do projeto real.
    items: ReadonlyArray<{
      label: string;
      badge: string;
      placeholder: string;
      title: string;
      problem: string;
      // Substitui `work.problemLabel` neste cartão (ex.: "About the project").
      problemLabel?: string;
      // Idiomas do site apresentado (linha informativa).
      languages?: string;
      // Link para o site público (abre em nova aba). `ariaLabel` começa pelo texto
      // visível (WCAG 2.5.3) e avisa que abre em nova aba.
      link?: { label: string; href: string; ariaLabel: string };
    }>;
  };
  process: {
    eyebrow: string;
    headingLead: string;
    headingEmphasis: string;
    flow: string;
    // Quatro passos aprovados: Understand, Plan, Build, Deliver.
    steps: ReadonlyArray<{ title: string; description: string }>;
  };
  about: {
    eyebrow: string;
    headingLead: string;
    headingEmphasis: string;
    lead: string;
    body: string;
    values: ReadonlyArray<string>;
  };
  // Contato e Política de Privacidade (RIV-33). O formulário é uma DEMONSTRAÇÃO
  // sem backend: nada é enviado nem armazenado. Textos provisórios, pendentes de
  // validação do Owner; a política é um RASCUNHO, sem afirmações jurídicas.
  contact: {
    eyebrow: string;
    headingLead: string;
    headingEmphasis: string;
    intro: string;
    note: string;
    // E-mail comercial ainda não definido (decisão do Owner, Fonte §6.2).
    emailPending: string;
    demoNotice: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      topicsLabel: string;
      topics: ReadonlyArray<string>;
      messageLabel: string;
      messagePlaceholder: string;
      error: string;
      submit: string;
    };
    preview: {
      status: string;
      title: string;
      body: string;
      back: string;
    };
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    draftNotice: string;
    title: string;
    intro: string;
    sections: ReadonlyArray<{ heading: string; body: string }>;
    back: string;
  };
};
