import type { Dictionary } from "@/i18n/dictionary";

// Português do Brasil (PT-BR). Copy comercial aprovada pelo Owner em 18/11/2026
// (RIV-43); Contato (formulário e e-mail) e Privacidade seguem provisórios.
export const pt: Dictionary = {
  meta: {
    title: "Rivelume Labs | Software sob medida, automação e IA prática",
    description:
      "A Rivelume Labs é um pequeno estúdio de tecnologia que cria software sob medida, automação de processos e soluções práticas de IA para empresas em crescimento.",
  },
  a11y: {
    skipToContent: "Ir para o conteúdo",
  },
  hero: {
    verticalLabel: "RIVELUME LABS / ESTÚDIO DE TECNOLOGIA",
    eyebrow: "Estúdio de tecnologia",
    headingLine1: "Software que",
    headingLine2: "torna o negócio",
    headingEmphasis: "mais simples.",
    note: "este é o trabalho.",
    body: "Ajudamos empresas a superar o trabalho manual repetitivo, as ferramentas desconectadas e os fluxos ineficientes com software sob medida, automação e IA prática.",
    cta: "Vamos conversar sobre o seu projeto",
    linkProcess: "Veja como construímos",
    linkServices: "Conheça nossos serviços",
    sheet: {
      title: "segunda_de_manhã — rascunho 3",
      example: "Exemplo",
      stampDraft: "RASCUNHO",
      stampFinal: "FINAL",
      apply: "Aplicar as edições",
      undo: "Desfazer as edições",
      statusDraft: "Rascunho: as edições não foram aplicadas.",
      statusFinal: "Final: as edições foram aplicadas.",
      items: [
        {
          before: "Juntar seis planilhas antes de toda reunião.",
          after: "Um painel para o time inteiro.",
        },
        {
          before: "Correr atrás de novos contatos em cinco caixas de entrada.",
          after: "Direcionados para a equipe certa.",
        },
        {
          before: "Refazer o relatório semanal à mão. De novo.",
          after: "Um relatório que se envia sozinho.",
        },
      ],
      result: "Resultado: mais tempo para trabalho de maior valor.",
    },
  },
  language: {
    label: "Idioma",
    names: { en: "English", pt: "Português (Brasil)" },
    codes: { en: "EN", pt: "PT" },
  },
  nav: {
    label: "Principal",
    logoLabel: "Rivelume Labs, voltar ao início",
    services: "Serviços",
    work: "Trabalhos",
    process: "Processo",
    about: "Sobre",
    contact: "Contato",
    menuOpen: "Menu",
    menuClose: "Fechar",
  },
  footer: {
    label: "Rodapé",
    description: "Software sob medida, automação e IA prática para empresas.",
    navigateHeading: "Navegar",
    legalHeading: "Legal",
    privacy: "Política de Privacidade (rascunho)",
    tagline: "Desenhado à mão. Construído em código.",
    copyright: "© 2026 Rivelume Labs",
  },
  services: {
    eyebrow: "Serviços",
    headingLead: "Tecnologia para resolver",
    headingEmphasis: "problemas",
    headingTail: "reais.",
    intro:
      "Mantemos o trabalho focado no seu negócio: menos complexidade, operações mais claras e ferramentas em que as pessoas podem confiar.",
    items: [
      {
        title: "Desenvolvimento de Software Sob Medida",
        description:
          "Sites, aplicações e ferramentas internas sob medida, pensados a partir das necessidades do negócio.",
        application:
          "Painéis internos que reúnem a operação diária em um só lugar.",
        from: "leads.csv",
        to: "um painel",
      },
      {
        title: "Automação de Negócios",
        description:
          "Soluções que substituem etapas manuais repetitivas, conectam ferramentas isoladas e tornam os fluxos do dia a dia mais eficientes.",
        application:
          "Encaminhar automaticamente uma nova solicitação para a equipe e o sistema certos.",
        from: "nova_solicitacao",
        to: "equipe certa",
      },
      {
        title: "Soluções Práticas de IA",
        description:
          "Fluxos e ferramentas de IA úteis que ajudam equipes a lidar com informações, decisões e tarefas recorrentes.",
        application:
          "Um assistente privado que ajuda a equipe a encontrar e resumir documentos.",
        from: "documentos",
        to: "respostas",
      },
    ],
    applicationLabel: "Aplicação prática",
    benefitLabel: "Benefício para o negócio",
    benefit: "Mais tempo para o trabalho de maior valor.",
  },
  band: {
    label: "O rascunho e o final",
    files: [
      "planilha_FINAL_v3.xlsx",
      "copia_de_dados.csv",
      "Enc: Fwd: novo lead?",
      "anotacoes.txt",
      "exportacao (2).csv",
      "relatorio_segunda_v9.docx",
      "quem é dono desta planilha?",
    ],
    phraseLead: "Esse é o rascunho. Nós construímos",
    phraseEmphasis: "o final.",
    pause: "Pausar movimento",
    play: "Retomar movimento",
  },
  notFound: {
    eyebrow: "Página não encontrada",
    headingLead: "Esta página",
    headingEmphasis: "não existe.",
    body: "O endereço pode estar errado ou a página pode ter mudado de lugar. Volte à página inicial e comece por lá.",
    home: "Voltar ao início",
  },
  work: {
    eyebrow: "Trabalhos selecionados",
    headingLead: "Um portfólio",
    headingEmphasis: "em construção.",
    intro:
      "Um projeto real e dois conceitos mostram como apresentaremos os trabalhos selecionados. Explorando ideias práticas com software, automação e inteligência artificial.",
    problemLabel: "Problema do negócio",
    items: [
      {
        label: "Projeto 01",
        badge: "Projeto do fundador",
        placeholder: "[ ricardotour.com ]",
        title: "Ricardo Tour",
        problemLabel: "Sobre o projeto",
        problem:
          "Website multilíngue desenvolvido para o negócio de turismo do fundador, com apresentação de passeios guiados no Rio de Janeiro e uma experiência digital voltada a visitantes internacionais.",
        languages: "Português · Inglês · Espanhol",
        link: {
          label: "Ver site no ar",
          href: "https://www.ricardotour.com",
          ariaLabel: "Ver site no ar: Ricardo Tour (abre em nova aba)",
        },
      },
      {
        label: "Conceito 02",
        badge: "Conceito",
        placeholder: "[ fluxo / conceito ]",
        title: "Conceito: Automação de Processos",
        problem:
          "Este conceito explora como um fluxo automatizado poderia conectar ferramentas empresariais e reduzir tarefas manuais repetitivas.",
      },
      {
        label: "Conceito 03",
        badge: "Conceito",
        placeholder: "[ chat / conceito ]",
        title: "Conceito: Assistente de Chat",
        problem:
          "Encontrar uma resposta em uma pilha de documentos leva tempo. Este conceito mostra um assistente que ajuda a equipe a buscar e resumir os próprios documentos.",
      },
    ],
  },
  process: {
    eyebrow: "Como trabalhamos",
    headingLead: "Um processo simples, feito para ser",
    headingEmphasis: "compreendido.",
    flow: "entender → planejar → construir → entregar",
    steps: [
      {
        title: "Entender",
        description:
          "Começamos com uma conversa sobre o problema, não sobre a tecnologia.",
      },
      {
        title: "Planejar",
        description:
          "Traçamos como o trabalho flui hoje e onde o tempo se perde.",
      },
      {
        title: "Construir",
        description:
          "Construímos em etapas pequenas e utilizáveis, que você pode revisar ao longo do caminho.",
      },
      {
        title: "Entregar",
        description:
          "Revisamos com você o trabalho concluído e alinhamos os próximos passos.",
      },
    ],
  },
  about: {
    eyebrow: "Sobre a Rivelume Labs",
    headingLead: "Estúdio pequeno. Sério nos",
    headingEmphasis: "detalhes.",
    lead: "A Rivelume Labs é um pequeno estúdio independente de tecnologia, focado em resolver problemas empresariais com software sob medida, automação de processos e soluções úteis de inteligência artificial.",
    body: "Valorizamos comunicação clara, relacionamento direto com o cliente, transparência e soluções bem construídas, fáceis de manter.",
    values: [
      "Tecnologia prática",
      "Comunicação clara",
      "Código fácil de manter",
    ],
  },
  contact: {
    eyebrow: "Contato",
    headingLead: "Tem um problema de negócio",
    headingEmphasis: "que vale explorar?",
    intro:
      "Conte o que você quer melhorar. Começamos com uma conversa, não com um discurso de vendas.",
    note: "Bagunçado não tem problema. Comece por aí.",
    emailPending: "E-mail comercial: a ser divulgado.",
    demoNotice: "Formulário de demonstração: nada é enviado nem armazenado.",
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Seu nome",
      emailLabel: "E-mail",
      emailPlaceholder: "voce@empresa.com",
      topicsLabel: "O que você gostaria de melhorar?",
      topics: ["Software", "Automação", "IA", "Ainda não sei"],
      messageLabel: "Mensagem (opcional)",
      messagePlaceholder: "Algumas palavras sobre a situação",
      error: "Informe seu nome e um e-mail válido para que possamos responder.",
      submit: "Vamos conversar sobre o seu projeto",
    },
    preview: {
      status: "Status: prévia",
      title: "Apenas uma prévia. Nenhuma mensagem foi enviada.",
      body: "O formulário ainda não está conectado a um servidor, então nada foi enviado nem armazenado.",
      back: "Voltar ao formulário",
    },
  },
  privacy: {
    metaTitle: "Política de Privacidade (rascunho) — Rivelume Labs",
    metaDescription:
      "Página de rascunho da política de privacidade, a ser revisada antes da publicação.",
    draftNotice: "Rascunho: a ser revisado antes da publicação",
    title: "Política de Privacidade",
    intro:
      "Esta página é um rascunho provisório. Não é uma política final e não descreve práticas definitivas.",
    sections: [
      {
        heading: "O que esta política vai abordar",
        body: "A definir e revisar antes da publicação: quais dados pessoais podem ser coletados, por quê, por quanto tempo são mantidos, quem pode acessá-los e como as pessoas podem exercer seus direitos.",
      },
      {
        heading: "Situação atual deste site",
        body: "Este site é uma prévia. O formulário de contato é uma demonstração: não está conectado a um servidor, então nada do que você digitar é enviado nem armazenado.",
      },
      {
        heading: "Contato",
        body: "Um e-mail comercial para dúvidas de privacidade será divulgado antes da publicação.",
      },
    ],
    back: "Voltar ao início",
  },
};
