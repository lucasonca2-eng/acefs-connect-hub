export const NAV = [
  { label: "Início", to: "/" },
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Feira de Santana", to: "/feira-de-santana" },
  { label: "Serviços", to: "/servicos" },
  { label: "Notícias", to: "/noticias" },
  { label: "Contato", to: "/contato" },
] as const;

export const SERVICES = [
  {
    slug: "scpc",
    title: "SCPC · Boa Vista",
    short: "Consultas de crédito e proteção contra inadimplência.",
    desc: "Consultas de crédito, análise de risco e proteção contra inadimplência com a base do Serviço Central de Proteção ao Crédito.",
    icon: "shield",
  },
  {
    slug: "certificado-digital",
    title: "Certificado Digital",
    short: "Emissão de e-CPF e e-CNPJ com atendimento ágil.",
    desc: "Emissão presencial ou na sua empresa. Validade jurídica reconhecida e agilidade para obrigações fiscais.",
    icon: "certificate",
  },
  {
    slug: "cursos",
    title: "Cursos & Capacitação",
    short: "Formação contínua para empresários e equipes.",
    desc: "Programas em gestão, vendas, finanças e liderança, desenvolvidos em parceria com o Sebrae.",
    icon: "book",
  },
  {
    slug: "networking",
    title: "Networking & Eventos",
    short: "Conexões entre lideranças e representação institucional.",
    desc: "Encontros, rodadas de negócios e articulação junto ao poder público em defesa do empresariado local.",
    icon: "network",
  },
] as const;

export const NEWS = [
  {
    slug: "acefs-reune-liderancas-varejo",
    category: "Encontro",
    date: "12 Jun 2026",
    title: "ACEFS reúne lideranças para debater o futuro do varejo regional",
    excerpt: "Mais de 200 empresários no auditório discutiram crédito, logística urbana e digitalização do comércio.",
  },
  {
    slug: "cursos-gratuitos-julho",
    category: "Formação",
    date: "04 Jun 2026",
    title: "Nova rodada de cursos gratuitos para associados em julho",
    excerpt: "Inscrições abertas para capacitações em gestão financeira e marketing digital.",
  },
  {
    slug: "sebrae-acefs-consultoria",
    category: "Parceria",
    date: "28 Mai 2026",
    title: "Sebrae e ACEFS ampliam consultoria gratuita às MPEs",
    excerpt: "Atendimento semanal começa em junho na sede da associação.",
  },
  {
    slug: "assembleia-2026",
    category: "Institucional",
    date: "15 Mai 2026",
    title: "Assembleia geral aprova diretrizes para o próximo biênio",
    excerpt: "Associados definem prioridades em representação, formação e serviços digitais.",
  },
  {
    slug: "feira-negocios",
    category: "Evento",
    date: "02 Mai 2026",
    title: "Feira de Negócios ACEFS reúne 80 expositores no centro",
    excerpt: "Rodadas de compras conectaram indústrias locais a compradores de todo o Nordeste.",
  },
  {
    slug: "premio-mercado",
    category: "Reconhecimento",
    date: "22 Abr 2026",
    title: "Prêmio Mérito do Comércio homenageia 12 empresas centenárias",
    excerpt: "Cerimônia celebrou negócios que ajudaram a construir Feira de Santana.",
  },
] as const;

export const PARTNERS = [
  "CACB",
  "FACEB",
  "Sebrae Bahia",
  "Boa Vista",
  "ISO 9001",
  "Serasa Experian",
] as const;

export const STATS = [
  { n: "81", suffix: "anos", label: "de atuação contínua" },
  { n: "2.400", suffix: "+", label: "empresas associadas" },
  { n: "40", suffix: "+", label: "serviços e benefícios" },
  { n: "120", suffix: "", label: "eventos em 2025" },
] as const;