export const NAV = [
  { label: "Início", to: "/" },
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Feira de Santana", to: "/feira-de-santana" },
  { label: "Serviços", to: "/servicos" },
  { label: "Eventos", to: "/eventos" },
  { label: "Notícias", to: "/noticias" },
  { label: "Contato", to: "/contato" },
] as const;

export const SERVICES = [
  {
    slug: "juceb",
    title: "JUCEB · Junta Comercial",
    short: "Serviços da Junta Comercial do Estado da Bahia.",
    desc: "A ACEFS, através da Junta Comercial do Estado da Bahia, oferece uma diversidade de serviços essenciais para associados, empreendedores e empresas de Feira e região.",
    icon: "building",
  },
  {
    slug: "scpc",
    title: "Consultas e Negativações",
    short: "Análise de crédito e proteção contra inadimplência.",
    desc: "Através da Equifax Boa Vista, a ACEFS disponibiliza uma variedade de serviços, incluindo análise de crédito, gestão de risco, auxiliando na concessão de créditos e prevenção de fraudes.",
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
    slug: "assistencia-saude",
    title: "Assistência à Saúde",
    short: "Planos de saúde e odontológicos para associados.",
    desc: "Uma excelente opção para empresas que desejam um benefício com custo reduzido, restrito aos seus diretores e colaboradores, extensivo a dependentes.",
    icon: "health",
  },
  {
    slug: "auditorios",
    title: "Auditórios para Eventos",
    short: "Espaços climatizados para treinamentos e conferências.",
    desc: "Auditórios climatizados e equipados, específicos para receber grupos para apresentações, palestras e conferências corporativas.",
    icon: "auditorium",
  },
  {
    slug: "palestras",
    title: "Palestras & Workshops",
    short: "Capacitação técnica e motivacional em parceria com o Sebrae.",
    desc: "Em parceria com o Sebrae, universidades e outras entidades empresariais, a ACEFS realiza diversos eventos técnicos, motivacionais e workshops.",
    icon: "presentation",
  },
  {
    slug: "credito",
    title: "Acesso a Crédito",
    short: "Apoio na busca por linhas de crédito e financiamento.",
    desc: "Junto com instituições financeiras e cooperativas de crédito parceiras, a ACEFS auxilia o empresário na busca por apoio financeiro.",
    icon: "credit",
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
  {
    slug: "radio",
    title: "Programa de Rádio",
    short: "\"Negócios & Conexões\" — todo domingo, na Sociedade News FM.",
    desc: "Programa semanal apresentado por Genildo Melo e Danillo Freitas, com entrevistas e debates sobre empreendedorismo e o ambiente de negócios de Feira de Santana.",
    icon: "radio",
  },
  {
    slug: "mediacao",
    title: "Mediação e Arbitragem",
    short: "Resolução de conflitos empresariais fora do judiciário.",
    desc: "Câmara de mediação e arbitragem para resolução ágil e técnica de conflitos entre empresas associadas.",
    icon: "scale",
  },
] as const;

export const EVENTS = [
  {
    slug: "cafe-empresarial-acefs",
    title: "Café Empresarial ACEFS",
    date: "Mensal",
    time: "8h",
    location: "Sede da ACEFS",
    desc: "Encontro mensal de networking entre associados, com pauta aberta sobre o cenário econômico e as demandas do comércio local.",
    hasArt: false,
  },
  {
    slug: "premio-fama",
    title: "Prêmio Fama",
    date: "11 de setembro de 2026",
    time: "A confirmar",
    location: "A confirmar",
    desc: "Premiação que reconhece empresas e profissionais de destaque no comércio de Feira de Santana. Detalhes e inscrições em breve.",
    hasArt: false,
  },
  {
    slug: "caminhada-ame-se",
    title: "Caminhada Ame-se — Setembro Amarelo",
    date: "20 de setembro de 2026",
    time: "A confirmar",
    location: "A confirmar",
    desc: "Ação de conscientização sobre saúde mental e valorização da vida, em apoio à campanha Setembro Amarelo.",
    hasArt: false,
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
  "Prefeitura de Feira de Santana",
  "Sicomércio",
  "CDL Feira de Santana",
  "CIFS",
  "SEBRAE",
  "Convention Visitors & Bureau",
  "Instituto Pensar Feira",
  "Sindfeira de Santana"
] as const;

export const STATS = [
  { n: "81", suffix: "anos", label: "de atuação contínua" },
  { n: "2.400", suffix: "+", label: "empresas associadas" },
  { n: "40", suffix: "+", label: "serviços e benefícios" },
  { n: "120", suffix: "", label: "eventos em 2025" },
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
    group: "Diretoria ACEFS 2025/2027",
    people: [
      { name: "Genildo Melo", role: "Diretor", company: "" },
      { name: "Adauto Franco", role: "Vice-Diretor", company: "" },
      { name: "Tatiana Novaes", role: "Diretora Executiva", company: "" },
      { name: "Modezil Ferreira de Cerqueira", role: "Conselho/Diretoria", company: "" },
      { name: "Kleison Melo", role: "Comércio", company: "" },
      { name: "Edison Virgínio", role: "Indústria", company: "" },
      { name: "Ednelson Mendes Jr.", role: "Diretor de Exp. Social e Eventos", company: "" },
      { name: "Nathalia Oliveira", role: "Diretora de Relações Est. com Empresas e Entidades Empresariais", company: "" },
      { name: "Laémia Gondim", role: "Marketing", company: "" },
      { name: "Alexandre Brandão", role: "Diretor Jurídico", company: "" },
      { name: "Mauro Ricardo", role: "Financeiro", company: "" },
      { name: "Josemir Santos", role: "Financeiro", company: "" },
      { name: "Marco Silva", role: "Patrimônio", company: "" },
      { name: "Evaldo Pinto", role: "Diretor de Assuntos Comunitários", company: "" },
      { name: "Luis Mercês", role: "Diretor de Ass. Gov. e Políticas Públicas", company: "" },
      { name: "Maria José S. Silva", role: "Serviços", company: "" },
      { name: "Maria Cecília C. Branco", role: "Diretora ACEFS Mulheres", company: "" },
      { name: "Luize Arapiraca", role: "Desenv. Humano", company: "" },
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
