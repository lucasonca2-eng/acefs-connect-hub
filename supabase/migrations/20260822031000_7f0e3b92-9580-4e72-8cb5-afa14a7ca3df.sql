CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tabela text NOT NULL,
  acao text NOT NULL,
  registro_id uuid,
  titulo text,
  ator_id uuid,
  ator_email text,
  campos text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read audit log" ON public.audit_log
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX audit_log_created_at_idx ON public.audit_log (created_at DESC);

CREATE OR REPLACE FUNCTION public.log_audit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_acao text;
  v_rec jsonb;
  v_old jsonb;
  v_titulo text;
  v_campos text[] := '{}';
  v_email text;
  k text;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_acao := 'criou'; v_rec := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    v_acao := 'editou'; v_rec := to_jsonb(NEW); v_old := to_jsonb(OLD);
  ELSE
    v_acao := 'excluiu'; v_rec := to_jsonb(OLD);
  END IF;

  v_titulo := COALESCE(v_rec->>'titulo', v_rec->>'slug', TG_TABLE_NAME);

  IF v_old IS NOT NULL THEN
    FOR k IN SELECT jsonb_object_keys(v_rec) LOOP
      IF k NOT IN ('updated_at','created_at') AND (v_rec->k) IS DISTINCT FROM (v_old->k) THEN
        v_campos := array_append(v_campos, k);
      END IF;
    END LOOP;
    IF array_length(v_campos, 1) IS NULL THEN
      RETURN COALESCE(NEW, OLD);
    END IF;
  END IF;

  SELECT email INTO v_email FROM auth.users WHERE id = auth.uid();

  INSERT INTO public.audit_log (tabela, acao, registro_id, titulo, ator_id, ator_email, campos)
  VALUES (TG_TABLE_NAME, v_acao, (v_rec->>'id')::uuid, v_titulo, auth.uid(), v_email, v_campos);

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER audit_noticias AFTER INSERT OR UPDATE OR DELETE ON public.noticias
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();
CREATE TRIGGER audit_eventos AFTER INSERT OR UPDATE OR DELETE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();
CREATE TRIGGER audit_servicos AFTER INSERT OR UPDATE OR DELETE ON public.servicos
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();
CREATE TRIGGER audit_settings AFTER INSERT OR UPDATE OR DELETE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();
CREATE TRIGGER audit_banners AFTER INSERT OR UPDATE OR DELETE ON public.banners
  FOR EACH ROW EXECUTE FUNCTION public.log_audit();