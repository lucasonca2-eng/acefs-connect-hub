export type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};

export const NAV: NavItem[] = [
  { label: "Início", to: "/" },
  {
    label: "Institucional",
    to: "/quem-somos",
    children: [
      { label: "Quem Somos", to: "/quem-somos" },
      { label: "Diretoria e Conselhos", to: "/diretoria" },
      { label: "Feira de Santana", to: "/feira-de-santana" },
      { label: "Parceiros", to: "/parceiros" },
    ],
  },
  { label: "Serviços", to: "/servicos" },
  {
    label: "Conteúdo",
    to: "/noticias",
    children: [
      { label: "Notícias", to: "/noticias" },
      { label: "Artigos", to: "/artigos" },
      { label: "Eventos", to: "/eventos" },
      { label: "Negócios & Conexões", to: "/negocios-e-conexoes" },
    ],
  },
  {
    label: "Empregos",
    to: "/empregos",
    children: [
      { label: "Vagas abertas", to: "/empregos" },
      { label: "Cadastre seu currículo", to: "/curriculo" },
    ],
  },
  { label: "Contato", to: "/contato" },
];

export const LINKS = {
  instagram: "https://www.instagram.com/acefsassociacao/",
  linktree: "https://linktr.ee/acefs",
  whatsapp: "https://wa.me/557532117446?text=Oii%2C%20vim%20do%20site%20da%20ACEFS",
} as const;

export const CONTACT = {
  address: "Largo São Francisco, nº 43 — Kalilândia",
  city: "Feira de Santana — BA · CEP 44.025-110",
  phone: "(75) 3211-7446",
  phoneHref: "tel:+557532117446",
  email: "acefs@acefs.com.br",
  mapEmbed:
    "https://www.google.com/maps?q=Largo+S%C3%A3o+Francisco,+43+-+Kalil%C3%A2ndia,+Feira+de+Santana+-+BA,+44025-110&output=embed",
} as const;

export const SERVICES = [
  { slug: "juceb", title: "Junta Comercial (JUCEB)", short: "Registro e alterações de empresas com apoio técnico.", desc: "Abertura, alteração e baixa de empresas junto à Junta Comercial do Estado da Bahia, com orientação em toda a documentação.", icon: "certificate" },
  { slug: "mediacao-arbitragem", title: "Câmara de Mediação e Arbitragem", short: "Solução de conflitos empresariais sem judicialização.", desc: "Mediação, conciliação e arbitragem com rapidez, sigilo e custo reduzido para resolver conflitos entre empresas e pessoas.", icon: "balance" },
  { slug: "certificacao-digital", title: "Certificado Digital e de Origem", short: "e-CPF, e-CNPJ e certificados de origem.", desc: "Emissão e renovação de certificados digitais com validade jurídica, além de certificados de origem para exportação.", icon: "shield" },
  { slug: "auditorio", title: "Auditório para Eventos e Treinamentos", short: "Espaço equipado no centro da cidade.", desc: "Auditório e salas para reuniões, treinamentos e eventos corporativos, com estrutura audiovisual e condições especiais para associados.", icon: "building" },
  { slug: "palestras", title: "Palestras Técnicas e Motivacionais", short: "Conteúdo prático para equipes e lideranças.", desc: "Programação contínua de palestras técnicas e motivacionais com especialistas convidados.", icon: "mic" },
  { slug: "contabilidade", title: "Contabilidade Empresarial", short: "Orientação contábil e fiscal para associados.", desc: "Apoio contábil, fiscal e tributário por meio da rede de escritórios parceiros da associação.", icon: "chart" },
  { slug: "credito", title: "Acesso a Crédito", short: "Linhas de crédito com condições diferenciadas.", desc: "Intermediação junto a instituições financeiras e fundos de aval para capital de giro e investimento.", icon: "coins" },
  { slug: "consorcios", title: "Administração e Vendas de Consórcios", short: "Planos para veículos, imóveis e equipamentos.", desc: "Consórcios administrados por parceiros credenciados, com atendimento na sede da ACEFS.", icon: "coins" },
  { slug: "boa-vista", title: "Consultas e Negativações (Boa Vista)", short: "Análise de crédito e proteção contra inadimplência.", desc: "Consultas de CPF/CNPJ, análise de risco, negativação e recuperação de crédito com a base Boa Vista SCPC.", icon: "shield" },
  { slug: "plano-saude", title: "Plano de Saúde Empresarial", short: "Condições coletivas para associados.", desc: "Planos de saúde e odontológicos empresariais com tabelas negociadas para as empresas associadas.", icon: "heart" },
  { slug: "encontros-negocios", title: "Encontros de Negócios", short: "Rodadas e networking entre associados.", desc: "Rodadas de negócios, cafés empresariais e encontros que aproximam fornecedores e compradores da região.", icon: "network" },
  { slug: "radio", title: "Programa de Rádio", short: "A voz do empresariado feirense no ar.", desc: "Programa semanal com pautas do comércio, entrevistas e informação de serviço para o empresariado.", icon: "mic" },
  { slug: "mle", title: "MLE — Mercado Livre de Energia", short: "Redução de custos com energia elétrica.", desc: "Assessoria para migração ao Mercado Livre de Energia e negociação coletiva de contratos.", icon: "bolt" },
  { slug: "cmec", title: "CMEC — Conselho da Mulher Empreendedora e da Cultura", short: "Protagonismo feminino nos negócios.", desc: "Conselho voltado ao fortalecimento da mulher empreendedora e à valorização da cultura local.", icon: "network" },
  { slug: "juridico", title: "Assessoria Jurídica", short: "Orientação jurídica empresarial.", desc: "Consultoria jurídica preventiva em temas trabalhistas, tributários e contratuais para associados.", icon: "balance" },
  { slug: "empreender", title: "Programa Empreender", short: "Núcleos setoriais de desenvolvimento.", desc: "Metodologia de núcleos setoriais que reúne empresas do mesmo segmento para resolver desafios comuns.", icon: "book" },
  { slug: "marcas-patentes", title: "Registro de Marcas e Patentes", short: "Proteção da sua marca com a Vilage.", desc: "Registro de marcas, patentes e desenhos industriais em parceria com a Vilage Marcas e Patentes.", icon: "certificate" },
] as const;

export const DIRECTORY: { group: string; people: { name: string; role?: string; company?: string }[] }[] = [
  {
    group: "Diretoria Executiva",
    people: [
      { name: "Adauto Franco", role: "Vice-Diretor" },
      { name: "Tatiana Novaes", role: "Diretora Executiva" },
      { name: "Modezil Ferreira de Cerqueira", role: "Conselho / Diretoria" },
      { name: "Kleison Melo", role: "Comércio" },
      { name: "Edison Virgínio", role: "Indústria" },
      { name: "Ednelson Mendes Jr.", role: "Diretor de Exp. Social e Eventos" },
      { name: "Genildo Melo", role: "Diretor de Relações Est. com Empresas e Entidades" },
      { name: "Nathalia Oliveira", role: "Diretora Empresarial" },
      { name: "Laémia Gondim", role: "Marketing" },
      { name: "Alexandre Brandão", role: "Diretor Jurídico" },
      { name: "Mauro Ricardo", role: "Financeiro" },
      { name: "Josemir Santos", role: "Financeiro" },
      { name: "Marco Silva", role: "Patrimônio" },
      { name: "Evaldo Pinto", role: "Diretor de Assuntos Comunitários" },
      { name: "Luis Mercês", role: "Diretor de Ass. Gov. e Políticas Públicas" },
      { name: "Maria José S. Silva", role: "Serviços" },
      { name: "Maria Cecília C. Branco", role: "Diretora ACEFS Mulheres" },
      { name: "Luize Arapiraca", role: "Desenvolvimento Humano" },
    ],
  },
  {
    group: "Conselho Diretor",
    people: [
      { name: "Marcelo Augusto Alexandrino A. Souza", role: "Presidente", company: "Ville Gourmet" },
      { name: "Edson Rener Rolim dos Santos", company: "Rede Erguer" },
      { name: "Roberto de Lima e Silva", company: "Associação de Arquitetos" },
      { name: "Armando Luiz Sampaio Silva", company: "Artour Turismo" },
      { name: "Alan Oliveira Brito", company: "4MBR" },
      { name: "Cledinéia Ribeiro Ferreira", company: "FS Corretora e Adm. de Seguros" },
      { name: "Adson Silva Marques", company: "Travale" },
      { name: "Fernando Antônio Ribeiro", company: "Tecnolens" },
      { name: "Noide Cerqueira Júnior", company: "China Home & Nova Brasa" },
      { name: "Melque Zedeque de S. Pinto", company: "Agência Mérito" },
      { name: "Antônio Edson Freitas de Almeida", company: "Sedecar Auto Center" },
      { name: "Jamilly Barbosa da Silva", company: "Veromundo Viagens e Turismo" },
      { name: "Sheila Cristina Silva", company: "Coelba" },
      { name: "Edson Piaggio de Oliveira", company: "EPP Emp. Imobiliários" },
      { name: "Davi Silva Miranda", company: "Lopes e Miranda" },
    ],
  },
  {
    group: "Conselho Fiscal",
    people: [
      { name: "José Alberto de Araújo", company: "Josbel" },
      { name: "Jorge Morais", company: "Rede Erguer" },
      { name: "Wilson Oliveira Pereira", company: "Donelisa Cons. e Incorporações" },
    ],
  },
  {
    group: "Suplentes",
    people: [
      { name: "Danillo Santos de Freitas" },
      { name: "Valter Vieira", company: "Sucesso Cia" },
      { name: "Pedro Costa" },
    ],
  },
  {
    group: "Conselho Superior",
    people: [
      { name: "Armando Sampaio Luis Silva" },
      { name: "Adauto Alves Franco", company: "Comol" },
      { name: "Osvaldo Ottan S. de Souza", company: "Mirante Imobiliária" },
      { name: "Wilson Martins Prado", company: "Próton Sistemas" },
      { name: "Modezil Rodrigues F. Cerqueira", company: "Norauto Veículos" },
      { name: "Cloves Lopes Cedraz", company: "FACEB / Folha do Estado" },
      { name: "Marcelo Augusto Alexandrino A. de Souza" },
      { name: "Humberto Lopes Cedraz", company: "Jornal Folha do Estado" },
    ],
  },
];

export const EVENTS = [
  { slug: "cafe-empresarial-agosto", date: "14 Ago 2026", time: "08h30", title: "Café Empresarial ACEFS", place: "Auditório ACEFS · Kalilândia", excerpt: "Encontro mensal de networking entre associados com pauta sobre crédito e expansão." },
  { slug: "rodada-negocios-2026", date: "05 Set 2026", time: "14h00", title: "Rodada de Negócios do Comércio", place: "Auditório ACEFS", excerpt: "Compradores e fornecedores regionais em reuniões rápidas agendadas." },
  { slug: "seminario-mle", date: "23 Set 2026", time: "19h00", title: "Seminário: Mercado Livre de Energia", place: "Auditório ACEFS", excerpt: "Como reduzir custos de energia migrando para o mercado livre." },
] as const;

export const JOBS = [
  { slug: "vendedor-interno", title: "Vendedor(a) Interno", company: "Empresa associada · Comércio", area: "Comercial", type: "CLT · Presencial", city: "Feira de Santana — BA", date: "28 Jul 2026" },
  { slug: "auxiliar-administrativo", title: "Auxiliar Administrativo", company: "Empresa associada · Serviços", area: "Administrativo", type: "CLT · Presencial", city: "Feira de Santana — BA", date: "24 Jul 2026" },
  { slug: "analista-contabil", title: "Analista Contábil Júnior", company: "Escritório parceiro", area: "Contabilidade", type: "CLT · Híbrido", city: "Feira de Santana — BA", date: "18 Jul 2026" },
  { slug: "estagio-marketing", title: "Estágio em Marketing", company: "Empresa associada · Indústria", area: "Marketing", type: "Estágio", city: "Feira de Santana — BA", date: "10 Jul 2026" },
] as const;

export const ARTICLES = [
  { slug: "reforma-tributaria-comercio", category: "Tributário", date: "20 Jul 2026", author: "Assessoria Jurídica ACEFS", title: "Reforma tributária: o que muda para o comércio de Feira de Santana", excerpt: "Um guia objetivo sobre os principais impactos da transição para o novo modelo de tributos sobre consumo." },
  { slug: "credito-para-pequenas-empresas", category: "Finanças", date: "08 Jul 2026", author: "Diretoria Financeira", title: "Como preparar sua empresa para conseguir crédito", excerpt: "Organização contábil, garantias e histórico: os pontos que os bancos avaliam antes de aprovar uma linha." },
  { slug: "mediacao-conflitos", category: "Jurídico", date: "26 Jun 2026", author: "Câmara de Mediação e Arbitragem", title: "Mediação e arbitragem: resolver conflitos sem ir ao Judiciário", excerpt: "Prazos menores, sigilo e custo reduzido tornam a via extrajudicial atrativa para o setor produtivo." },
  { slug: "energia-livre-economia", category: "Gestão", date: "12 Jun 2026", author: "Núcleo MLE", title: "Mercado livre de energia pode reduzir até 30% da conta", excerpt: "Entenda os requisitos de consumo e o passo a passo para migrar com segurança." },
] as const;

export const NEWS = [
  { slug: "acefs-reune-liderancas-varejo", category: "Encontro", date: "12 Jun 2026", title: "ACEFS reúne lideranças para debater o futuro do varejo regional", excerpt: "Mais de 200 empresários no auditório discutiram crédito, logística urbana e digitalização do comércio." },
  { slug: "cursos-gratuitos-julho", category: "Formação", date: "04 Jun 2026", title: "Nova rodada de cursos gratuitos para associados em julho", excerpt: "Inscrições abertas para capacitações em gestão financeira e marketing digital." },
  { slug: "sebrae-acefs-consultoria", category: "Parceria", date: "28 Mai 2026", title: "Sebrae e ACEFS ampliam consultoria gratuita às MPEs", excerpt: "Atendimento semanal começa em junho na sede da associação." },
  { slug: "assembleia-2026", category: "Institucional", date: "15 Mai 2026", title: "Assembleia geral aprova diretrizes para o próximo biênio", excerpt: "Associados definem prioridades em representação, formação e serviços digitais." },
  { slug: "feira-negocios", category: "Evento", date: "02 Mai 2026", title: "Feira de Negócios ACEFS reúne 80 expositores no centro", excerpt: "Rodadas de compras conectaram indústrias locais a compradores de todo o Nordeste." },
  { slug: "premio-mercado", category: "Institucional", date: "22 Abr 2026", title: "Prêmio Mérito do Comércio homenageia 12 empresas centenárias", excerpt: "Cerimônia celebrou negócios que ajudaram a construir Feira de Santana." },
  { slug: "negocios-conexoes-estreia", category: "Evento", date: "10 Abr 2026", title: "Programa Negócios & Conexões estreia na Sociedade News FM 102.1", excerpt: "Aos domingos, das 13h às 15h, o programa debate o ambiente de negócios da região." },
  { slug: "mle-economia-energia", category: "Parceria", date: "28 Mar 2026", title: "Associados economizam com migração para o mercado livre de energia", excerpt: "Grupo de empresas negocia contratos coletivos com apoio técnico da ACEFS." },
  { slug: "acefs-mulher-encontro", category: "Encontro", date: "14 Mar 2026", title: "ACEFS Mulher promove encontro de empreendedoras", excerpt: "Painéis sobre liderança, crédito e sucessão reuniram empresárias da cidade." },
  { slug: "certificado-digital-recorde", category: "Institucional", date: "01 Mar 2026", title: "Posto de certificação digital bate recorde de emissões", excerpt: "Demanda por e-CNPJ cresceu com a digitalização das obrigações fiscais." },
  { slug: "reforma-tributaria-seminario", category: "Formação", date: "18 Fev 2026", title: "Seminário esclarece impactos da reforma tributária no comércio", excerpt: "Especialistas detalharam a transição para o novo modelo de tributos." },
  { slug: "caravana-cacb", category: "Parceria", date: "05 Fev 2026", title: "Caravana da CACB visita Feira de Santana", excerpt: "Confederação apresentou programas de crédito e associativismo às lideranças locais." },
  { slug: "balanco-natal-2025", category: "Institucional", date: "20 Jan 2026", title: "Comércio feirense registra alta nas vendas de fim de ano", excerpt: "Levantamento da ACEFS aponta crescimento em vestuário, calçados e eletrônicos." },
  { slug: "empreender-nucleos", category: "Formação", date: "08 Jan 2026", title: "Programa Empreender abre novos núcleos setoriais", excerpt: "Segmentos de alimentação, moda e serviços iniciam ciclos de reuniões." },
  { slug: "acefs-prefeitura-mobilidade", category: "Institucional", date: "12 Dez 2025", title: "ACEFS discute mobilidade do centro com a Prefeitura", excerpt: "Pauta incluiu estacionamento rotativo, carga e descarga e acessibilidade." },
  { slug: "expofeira-parceria", category: "Evento", date: "28 Nov 2025", title: "ACEFS apoia a EXPOFEIRA com espaço para associados", excerpt: "Estandes coletivos ampliaram a visibilidade de pequenas indústrias." },
  { slug: "mediacao-camara-balanco", category: "Institucional", date: "10 Nov 2025", title: "Câmara de Mediação resolve 9 em cada 10 casos sem Judiciário", excerpt: "Balanço anual mostra prazo médio de 45 dias para acordo." },
  { slug: "cdl-sicomercio-acordo", category: "Parceria", date: "22 Out 2025", title: "ACEFS, CDL e Sicomércio firmam agenda conjunta", excerpt: "Entidades unem esforços em representação e capacitação empresarial." },
  { slug: "posse-diretoria", category: "Institucional", date: "05 Out 2025", title: "Nova diretoria toma posse em solenidade na sede", excerpt: "Gestão apresenta plano de trabalho com foco em serviços e formação." },
  { slug: "rodada-credito-bancos", category: "Encontro", date: "18 Set 2025", title: "Rodada de crédito conecta associados a cinco instituições financeiras", excerpt: "Empresas negociaram capital de giro com condições diferenciadas." },
] as const;

export const NEWS_CATEGORIES = ["Todas", "Institucional", "Encontro", "Formação", "Parceria", "Evento"] as const;

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