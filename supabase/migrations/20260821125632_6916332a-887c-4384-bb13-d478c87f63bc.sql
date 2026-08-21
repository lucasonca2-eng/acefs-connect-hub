CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins manage roles" ON public.user_roles
FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text,
  logo_branca_url text,
  telefone text,
  whatsapp text,
  email text,
  endereco text,
  instagram_url text,
  facebook_url text,
  linkedin_url text,
  youtube_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are public" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.settings (logo_url, logo_branca_url, telefone, whatsapp, instagram_url)
VALUES ('/images/acefs-logo-green.png', '/images/acefs-logo-white.png', '(75) 3211-7446', '557532117446', 'https://instagram.com/acefsoficial');

CREATE TABLE public.banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  imagem_url text NOT NULL,
  link_destino text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.banners TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.banners TO authenticated;
GRANT ALL ON public.banners TO service_role;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active banners are public" ON public.banners FOR SELECT USING (ativo = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage banners" ON public.banners FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER banners_updated_at BEFORE UPDATE ON public.banners FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.banners (titulo, imagem_url, ordem) VALUES
('Prêmio Fama — Vem aí! O maior reconhecimento empresarial de Feira de Santana', '/images/banner-premio-fama.png', 1),
('Sede da ACEFS em Feira de Santana', '/images/acefs-predio.png', 2);

CREATE TABLE public.noticias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  titulo text NOT NULL,
  resumo text,
  conteudo text,
  categoria text NOT NULL DEFAULT 'Institucional',
  imagem_capa_url text,
  data_publicacao timestamptz NOT NULL DEFAULT now(),
  publicado boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.noticias TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.noticias TO authenticated;
GRANT ALL ON public.noticias TO service_role;
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published news are public" ON public.noticias FOR SELECT USING (publicado = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage news" ON public.noticias FOR ALL TO authenticated
USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER noticias_updated_at BEFORE UPDATE ON public.noticias FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.noticias (slug, titulo, resumo, conteudo, categoria, imagem_capa_url, data_publicacao) VALUES
('acefs-reune-liderancas-varejo', 'ACEFS reúne lideranças para debater o futuro do varejo regional', 'Mais de 200 empresários no auditório discutiram crédito, logística urbana e digitalização do comércio.', E'Mais de 200 empresários estiveram no auditório da ACEFS para debater os rumos do varejo em Feira de Santana.\n\nO encontro tratou de crédito, logística urbana e digitalização do comércio, com participação de lideranças setoriais e representantes do poder público.', 'Encontro', '/images/news/news-encontro.jpg', '2026-06-12'),
('cursos-gratuitos-julho', 'Novos cursos gratuitos de capacitação em julho', 'Programação de formação para associados com foco em gestão, vendas e finanças.', E'A ACEFS abre inscrições para uma nova rodada de cursos gratuitos voltados aos associados.\n\nA programação contempla gestão, vendas e finanças, com turmas presenciais na sede da associação.', 'Formação', '/images/news/news-formacao.jpg', '2026-06-04'),
('sebrae-acefs-consultoria', 'Parceria ACEFS e Sebrae amplia consultorias para associados', 'Empresas associadas passam a contar com atendimento técnico especializado.', E'A parceria entre ACEFS e Sebrae Bahia amplia o acesso a consultorias técnicas para empresas associadas.\n\nO atendimento cobre planejamento, formalização e estratégias de crescimento.', 'Parceria', '/images/news/news-parceria.jpg', '2026-05-22');

CREATE POLICY "Public read uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Admins upload files" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'uploads' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update files" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'uploads' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete files" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'uploads' AND public.has_role(auth.uid(),'admin'));