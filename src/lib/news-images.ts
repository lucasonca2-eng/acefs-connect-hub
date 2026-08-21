/** Imagem institucional padrão da ACEFS — usada sempre que uma imagem falhar. */
export const DEFAULT_NEWS_IMAGE = "/images/news/news-default.jpg";

const encontro = "/images/news/news-encontro.jpg";
const formacao = "/images/news/news-formacao.jpg";
const parceria = "/images/news/news-parceria.jpg";
const institucional = "/images/news/news-institucional.jpg";
const evento = "/images/news/news-evento.jpg";
const premio = "/images/news/news-premio.jpg";

const BY_SLUG: Record<string, string> = {
  "acefs-reune-liderancas-varejo": encontro,
  "cursos-gratuitos-julho": formacao,
  "sebrae-acefs-consultoria": parceria,
  "assembleia-2026": institucional,
  "feira-negocios": evento,
  "premio-mercado": premio,
};

const BY_CATEGORY: Record<string, string> = {
  Encontro: encontro,
  "Formação": formacao,
  Parceria: parceria,
  Institucional: institucional,
  Evento: evento,
  Reconhecimento: premio,
};

export function newsImage(slug?: string, category?: string): string {
  return (
    (slug && BY_SLUG[slug]) ||
    (category && BY_CATEGORY[category]) ||
    DEFAULT_NEWS_IMAGE
  );
}
