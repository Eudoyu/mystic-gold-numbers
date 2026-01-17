-- Create enum for user plan types
CREATE TYPE public.plan_type AS ENUM ('free', 'sprint', 'pro');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Add new columns to profiles table for SaaS features
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS plan_type public.plan_type DEFAULT 'free',
ADD COLUMN IF NOT EXISTS sprint_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS polar_customer_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS polar_subscription_id TEXT;

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table for admin configuration
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    polar_product_sprint_id TEXT,
    polar_product_pro_id TEXT,
    sprint_price NUMERIC DEFAULT 19,
    pro_price NUMERIC DEFAULT 14.90,
    maintenance_mode BOOLEAN DEFAULT false,
    announcement_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read site_settings (for pricing display, maintenance mode check)
CREATE POLICY "Anyone can read site settings"
ON public.site_settings
FOR SELECT
TO authenticated
USING (true);

-- Only admins can update site_settings
CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site settings"
ON public.site_settings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default site settings row
INSERT INTO public.site_settings (id, sprint_price, pro_price, maintenance_mode)
VALUES (gen_random_uuid(), 19, 14.90, false);

-- Create trigger for updated_at on site_settings
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create SEO notes table for admin analytics
CREATE TABLE public.seo_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    competitor_gaps TEXT,
    content_pillars TEXT,
    action_items TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on seo_notes
ALTER TABLE public.seo_notes ENABLE ROW LEVEL SECURITY;

-- Only admins can manage SEO notes
CREATE POLICY "Admins can manage SEO notes"
ON public.seo_notes
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at on seo_notes
CREATE TRIGGER update_seo_notes_updated_at
BEFORE UPDATE ON public.seo_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();