-- Add RLS policies to block anonymous access on sensitive tables

-- Profiles: Require authentication for all operations
CREATE POLICY "Block anonymous access on profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- Calculation history: Block anonymous access
CREATE POLICY "Block anonymous access on calculation_history"
ON public.calculation_history
FOR SELECT
TO anon
USING (false);

-- Usage limits: Block anonymous access
CREATE POLICY "Block anonymous access on usage_limits"
ON public.usage_limits
FOR SELECT
TO anon
USING (false);

-- User roles: Block anonymous access
CREATE POLICY "Block anonymous access on user_roles"
ON public.user_roles
FOR SELECT
TO anon
USING (false);

-- SEO notes: Block anonymous access
CREATE POLICY "Block anonymous access on seo_notes"
ON public.seo_notes
FOR SELECT
TO anon
USING (false);