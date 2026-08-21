ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'jornalista';

CREATE OR REPLACE FUNCTION public.has_role_name(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role::text = _role
  )
$$;

GRANT EXECUTE ON FUNCTION public.has_role_name(uuid, text) TO authenticated, anon, service_role;

DROP POLICY IF EXISTS "Admins manage news" ON public.noticias;
DROP POLICY IF EXISTS "Users read news" ON public.noticias;

CREATE POLICY "Editors manage news"
ON public.noticias
FOR ALL
TO authenticated
USING (public.has_role_name(auth.uid(), 'admin') OR public.has_role_name(auth.uid(), 'jornalista'))
WITH CHECK (public.has_role_name(auth.uid(), 'admin') OR public.has_role_name(auth.uid(), 'jornalista'));

CREATE POLICY "Users read news"
ON public.noticias
FOR SELECT
TO authenticated
USING (
  publicado = true
  OR public.has_role_name(auth.uid(), 'admin')
  OR public.has_role_name(auth.uid(), 'jornalista')
);