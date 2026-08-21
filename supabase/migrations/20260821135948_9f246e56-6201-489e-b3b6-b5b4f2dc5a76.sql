ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS sobre_nos_texto text,
  ADD COLUMN IF NOT EXISTS feira_de_santana_texto text,
  ADD COLUMN IF NOT EXISTS rodape_descricao text,
  ADD COLUMN IF NOT EXISTS rodape_links_institucionais jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS menu_links jsonb NOT NULL DEFAULT '[]'::jsonb;