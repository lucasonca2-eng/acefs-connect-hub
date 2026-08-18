import encontro from "@/assets/news-encontro.jpg.asset.json";
import formacao from "@/assets/news-formacao.jpg.asset.json";
import parceria from "@/assets/news-parceria.jpg.asset.json";
import institucional from "@/assets/news-institucional.jpg.asset.json";
import evento from "@/assets/news-evento.jpg.asset.json";
import premio from "@/assets/news-premio.jpg.asset.json";
import padrao from "@/assets/news-default.jpg.asset.json";

/** Imagem institucional padrão da ACEFS — usada sempre que uma imagem falhar. */
export const DEFAULT_NEWS_IMAGE = padrao.url;

const BY_SLUG: Record<string, string> = {
  "acefs-reune-liderancas-varejo": encontro.url,
  "cursos-gratuitos-julho": formacao.url,
  "sebrae-acefs-consultoria": parceria.url,
  "assembleia-2026": institucional.url,
  "feira-negocios": evento.url,
  "premio-mercado": premio.url,
};

const BY_CATEGORY: Record<string, string> = {
  Encontro: encontro.url,
  "Formação": formacao.url,
  Parceria: parceria.url,
  Institucional: institucional.url,
  Evento: evento.url,
  Reconhecimento: premio.url,
};

export function newsImage(slug?: string, category?: string): string {
  return (
    (slug && BY_SLUG[slug]) ||
    (category && BY_CATEGORY[category]) ||
    DEFAULT_NEWS_IMAGE
  );
}
