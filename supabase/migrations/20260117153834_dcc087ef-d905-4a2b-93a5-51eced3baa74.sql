-- 1. Create a public view with only non-sensitive fields
CREATE VIEW public.site_settings_public
WITH (security_invoker = on) AS
SELECT 
  id,
  maintenance_mode,
  announcement_text,
  sprint_price,
  pro_price
FROM public.site_settings;

-- 2. Drop the existing public read policy
DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;

-- 3. Create new policy: only admins can read the full table
CREATE POLICY "Only admins can read site settings"
ON public.site_settings
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Grant SELECT on the public view to anon and authenticated
GRANT SELECT ON public.site_settings_public TO anon, authenticated;