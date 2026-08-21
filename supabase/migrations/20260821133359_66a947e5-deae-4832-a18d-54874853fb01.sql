CREATE TABLE public.servicos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  titulo text NOT NULL,
  descricao_curta text,
  conteudo_detalhado text,
  imagem_url text,
  link_externo text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.servicos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.servicos TO authenticated;
GRANT ALL ON public.servicos TO service_role;

ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon reads active servicos" ON public.servicos
  FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Users read servicos" ON public.servicos
  FOR SELECT TO authenticated USING (ativo = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage servicos" ON public.servicos
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER servicos_updated_at BEFORE UPDATE ON public.servicos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.eventos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  titulo text NOT NULL,
  data_evento timestamptz NOT NULL DEFAULT now(),
  local text,
  descricao text,
  conteudo_detalhado text,
  imagem_url text,
  link_inscricao text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.eventos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.eventos TO authenticated;
GRANT ALL ON public.eventos TO service_role;

ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon reads active eventos" ON public.eventos
  FOR SELECT TO anon USING (ativo = true);
CREATE POLICY "Users read eventos" ON public.eventos
  FOR SELECT TO authenticated USING (ativo = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage eventos" ON public.eventos
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER eventos_updated_at BEFORE UPDATE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();