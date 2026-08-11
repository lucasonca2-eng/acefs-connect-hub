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

export const EVENTS = [
  {
    slug: "cafe-empresarial-julho",
    date: "18 Jul",
    title: "Café Empresarial: Crédito e Financiamento para MPEs",
    excerpt: "Encontro com gerentes de bancos regionais para esclarecer linhas de crédito, garantias e prazos para micro e pequenas empresas.",
    time: "08h às 10h",
    place: "Auditório da ACEFS",
  },
  {
    slug: "seminario-gestao-fiscal",
    date: "25 Jul",
    title: "Seminário de Gestão Fiscal e Tributária",
    excerpt: "Especialistas debatem mudanças tributárias, planejamento fiscal e impactos da reforma para o comércio regional.",
    time: "14h às 18h",
    place: "Auditório da ACEFS",
  },
  {
    slug: "rodada-negocios-agosto",
    date: "08 Ago",
    title: "Rodada de Negócios ACEFS × Sicomércio",
    excerpt: "Compradores de grandes redes conhecem fornecedores locais em encontros de negócios cronometrados.",
    time: "09h às 13h",
    place: "Sede da ACEFS",
  },
  {
    slug: "feira-mulher-empreendedora",
    date: "22 Ago",
    title: "Feira da Mulher Empreendedora",
    excerpt: "Expositores e palestras destacam a participação feminina na economia de Feira de Santana.",
    time: "10h às 17h",
    place: "Centro de Convenções",
  },
] as const;

export const JOBS = [
  {
    slug: "vendedor-interno",
    area: "Comércio",
    date: "10 Jun 2026",
    title: "Vendedor interno",
    company: "Comercial Ferreira Ltda.",
    type: "CLT",
    city: "Feira de Santana",
  },
  {
    slug: "auxiliar-contabil",
    area: "Administrativo",
    date: "08 Jun 2026",
    title: "Auxiliar contábil",
    company: "Escritório Saraiva Contabilidade",
    type: "CLT",
    city: "Feira de Santana",
  },
  {
    slug: "logista-estoquista",
    area: "Logística",
    date: "05 Jun 2026",
    title: "Estoquista / Conferente",
    company: "Distribuidora Norte BA",
    type: "CLT",
    city: "Feira de Santana",
  },
  {
    slug: "marketing-digital",
    area: "Marketing",
    date: "02 Jun 2026",
    title: "Analista de marketing digital",
    company: "Agência Ideia Viva",
    type: "PJ",
    city: "Feira de Santana",
  },
] as const;

export const DIRECTORY = [
  {
    group: "Diretoria Executiva",
    people: [
      { name: "Genildo Melo", role: "Presidente", company: "Sicomércio BA" },
      { name: "Danillo Freitas", role: "Vice-Presidente", company: "Grupo DF Comunicação" },
      { name: "Carla Ribeiro", role: "Diretora Administrativa", company: "Ribeiro Assessoria" },
      { name: "Marcos Antônio", role: "Diretor Financeiro", company: "Contabilidade Antônio" },
      { name: "Patrícia Sales", role: "Diretora de Marketing", company: "Sales Marketing" },
      { name: "Ronaldo Carneiro", role: "Diretor de Associados", company: "Carneiro & Cia" },
    ],
  },
  {
    group: "Conselho Diretor",
    people: [
      { name: "José Bonfim", role: "Conselheiro", company: "Bonfim Distribuidora" },
      { name: "Ana Lúcia Tavares", role: "Conselheira", company: "Tavares Advogados" },
      { name: "Edson Mascarenhas", role: "Conselheiro", company: "Mascarenhas & Filhos" },
      { name: "Lúcia Helena", role: "Conselheira", company: "Helena Cosméticos" },
      { name: "Paulo Afonso", role: "Conselheiro", company: "Afonso Construção" },
    ],
  },
  {
    group: "Conselho Fiscal",
    people: [
      { name: "Roberto Lima", role: "Presidente", company: "Lima Contabilidade" },
      { name: "Sandra Mota", role: "Membro", company: "Mota Eventos" },
      { name: "Fábio Cardoso", role: "Membro", company: "Cardoso Representações" },
    ],
  },
  {
    group: "Conselho Superior",
    people: [
      { name: "Dr. Heber Lopes", role: "Conselheiro", company: "Lopes Advocacia" },
      { name: "Economista Regina Paz", role: "Conselheira", company: "Paz Consultoria" },
      { name: "Contador Adilson Reis", role: "Conselheiro", company: "Reis Contábil" },
    ],
  },
] as const;

export const ARTICLES = [
  {
    slug: "reforma-tributaria-mpe",
    category: "Tributário",
    date: "10 Jun 2026",
    title: "O que a reforma tributária muda para a micro e pequena empresa",
    excerpt: "Entenda os principais pontos da reforma e como o Simples Nacional, o CBS e o IBS afetam o dia a dia do empresário regional.",
    author: "Conselho Fiscal ACEFS",
  },
  {
    slug: "credito-garantias",
    category: "Crédito",
    date: "30 Mai 2026",
    title: "Garantias de crédito: como melhorar o seu score e acessar melhores linhas",
    excerpt: "Dicas práticas para regularizar pendências, manter o nome limpo e negociar condições mais vantajosas com os bancos.",
    author: "Diretoria Administrativa ACEFS",
  },
  {
    slug: "digitalizacao-varejo",
    category: "Gestão",
    date: "18 Mai 2026",
    title: "Digitalização do varejo: por onde começar sem perder vendas",
    excerpt: "Passos simples para integrar e-commerce, redes sociais e gestão de estoque sem interromper a operação da loja física.",
    author: "Sebrae × ACEFS",
  },
  {
    slug: "direito-empresarial-sociedades",
    category: "Jurídico",
    date: "02 Mai 2026",
    title: "Sociedades em conflito: como evitar a dissolução indesejada",
    excerpt: "Acordos de sócios, capitalização e governança interna como instrumentos de prevenção de litígios empresariais.",
    author: "Dr. Heber Lopes — Conselho Superior ACEFS",
  },
] as const;