export type Highlight = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  tools: readonly string[];
};

export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  note?: string;
  summary: string;
  points: readonly string[];
};

export type SkillGroup = {
  title: string;
  items: readonly string[];
};

export type Study = {
  place: string;
  detail: string;
};

export const profile = {
  name: "Matheus Patrick Tavares",
  brand: "Matheus Patrick",
  role: "Desenvolvedor Full Stack",
  location: "Brasil",
  email: "mathtg2@gmail.com",
  github: "https://github.com/MatheusTavaresz",
  githubLabel: "MatheusTavaresz",
  lead: "Construo e sustento sistemas que processam pagamento, cobrança e documento.",
  support:
    "O centro do trabalho é backend, em NestJS e PHP. Next.js cobre os fluxos de pagamento de alto volume. Desde julho de 2024 estou na Neo Crédito, numa plataforma com milhares de usuários ativos e um volume financeiro expressivo por mês.",
  stackLine: "NestJS · PHP · Next.js · PostgreSQL · SFTP",
} as const;

export const highlights: readonly Highlight[] = [
  {
    value: "≤ 20s",
    label: "Preenchimento de boleto que antes passava de um minuto.",
  },
  {
    value: "Sem tarifa",
    label: "Extração própria no lugar de um serviço cobrado por página.",
  },
  {
    value: "SFTP",
    label: "Remessa posicional e arquivo de retorno na cobrança com o Serasa.",
  },
];

export const cases: readonly CaseStudy[] = [
  {
    id: "boletos",
    index: "01",
    title: "Extração de boletos e faturas",
    problem:
      "A operação pagava um serviço por página processada e ainda levava mais de um minuto para preencher cada documento no sistema.",
    approach:
      "A leitura usa o texto do PDF e valida o conteúdo pelas regras da FEBRABAN. Documento escaneado ou imagem cai no Tesseract.js, só como fallback.",
    result:
      "O custo ficou previsível e o preenchimento passou a levar no máximo 20 segundos.",
    tools: ["PHP", "PDF", "FEBRABAN", "Tesseract.js"],
  },
  {
    id: "serasa",
    index: "02",
    title: "Cobrança via Serasa Experian",
    problem:
      "A gestão de cobrança precisava sair do sistema em arquivo de remessa e voltar pelo retorno, no layout que o bureau espera.",
    approach:
      "Implementei a geração do arquivo posicional e o processamento do retorno recebido por SFTP.",
    result:
      "A troca de arquivo entrou no fluxo da cobrança, com remessa e retorno tratados pelo sistema.",
    tools: ["SFTP", "Arquivo posicional", "Serasa Experian"],
  },
  {
    id: "baas",
    index: "03",
    title: "BaaS e análise automatizada",
    problem:
      "O Banking as a Service precisava de capacidade nova, e parte da análise ainda dependia de processo manual.",
    approach:
      "Participei da expansão do produto e da automação desses fluxos por API, para a decisão acontecer no sistema.",
    result:
      "Menos espera entre setores e mais capacidade disponível no BaaS.",
    tools: ["NestJS", "APIs", "BaaS"],
  },
];

export const roles: readonly Role[] = [
  {
    id: "neo-credito",
    company: "Neo Crédito",
    title: "Desenvolvedor Full Stack",
    period: "Julho 2024 — presente",
    summary:
      "Atuo na plataforma de crédito e na expansão do BaaS. O legado está em PHP 7, os serviços em NestJS e as telas de pagamento em Next.js.",
    points: [
      "Sustento o PHP 7 e entrego feature no mesmo sistema, numa modernização gradual da plataforma.",
      "No NestJS, aplico injeção de dependência, middlewares, interceptors, buffers, workers e filesystem.",
      "Containerizo com Docker para o artefato ser o mesmo entre os ambientes. O planejamento segue Scrum e Kanban.",
      "Escrevo documentação em Markdown para virar contexto de LLM a partir dos fluxos da operação.",
    ],
  },
  {
    id: "ezok",
    company: "Ezok",
    title: "Desenvolvedor Full Stack",
    period: "Agosto 2023 — dezembro 2023",
    note: "Contrato",
    summary:
      "Contrato para colocar API e interface no ar, e para coletar dado que não tinha endpoint.",
    points: [
      "Desenvolvi APIs em NestJS e PostgreSQL, com orientação a objetos e código organizado para a próxima alteração.",
      "Construí interfaces responsivas em Vue.js e Nuxt.js.",
      "Criei rotinas de web scraping para coletar dado estruturado.",
    ],
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Linguagens",
    items: ["TypeScript", "JavaScript", "PHP", "Go", "SQL"],
  },
  {
    title: "Backend",
    items: ["NestJS", "Node.js", "REST", "Microsserviços"],
  },
  {
    title: "Interface",
    items: ["React", "Next.js", "Vue", "Nuxt", "AngularJS"],
  },
  {
    title: "Dados",
    items: ["PostgreSQL", "MariaDB", "Prisma", "TypeORM"],
  },
  {
    title: "Plataforma",
    items: ["Docker", "GitLab CI/CD", "AWS", "Azure", "SFTP"],
  },
  {
    title: "Prática",
    items: ["Clean Code", "Scrum", "Kanban", "Code review", "Contexto para LLMs"],
  },
];

export const education: readonly Study[] = [
  {
    place: "UniAmerica",
    detail: "Análise e Desenvolvimento de Sistemas · 2025–2028",
  },
  {
    place: "OneBitCode",
    detail: "Desenvolvedor Web Full Stack · 2021–2022",
  },
];

export const studies: readonly Study[] = [
  {
    place: "Udemy",
    detail:
      "NestJS com TypeORM, Prisma e Swagger. Clean Code com JavaScript. JavaScript e TypeScript avançado.",
  },
  {
    place: "Alura",
    detail:
      "Engenharia de software, desenvolvimento com Golang e boas práticas de code review.",
  },
  {
    place: "TDC Floripa",
    detail: "Gen AI, LLMs e engenharia de IA.",
  },
];
