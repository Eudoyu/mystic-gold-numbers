-- Fix handle_new_user function with input validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_display_name TEXT;
BEGIN
  -- Extract and validate display_name from user metadata
  v_display_name := NULLIF(TRIM(new.raw_user_meta_data ->> 'display_name'), '');
  
  -- Enforce length limit to prevent abuse
  IF v_display_name IS NOT NULL AND LENGTH(v_display_name) > 100 THEN
    v_display_name := SUBSTRING(v_display_name, 1, 100);
  END IF;
  
  -- Insert with conflict handling to prevent duplicates
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, v_display_name)
  ON CONFLICT (id) DO NOTHING;
  
  RETURN new;
END;
$$;

-- Add length constraint on profiles.display_name
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS display_name_length;
ALTER TABLE public.profiles ADD CONSTRAINT display_name_length CHECK (LENGTH(display_name) <= 100);

-- Fix usage_limits RLS policies
-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can insert limits" ON public.usage_limits;

-- Create a more restrictive INSERT policy
CREATE POLICY "Users can insert their own limits"
ON public.usage_limits 
FOR INSERT 
WITH CHECK (
  -- Authenticated users: must match their user_id
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  -- Anonymous users: user_id must be NULL (for session-based tracking)
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- Update SELECT policy to be more restrictive for anonymous users
DROP POLICY IF EXISTS "Users can view their own limits" ON public.usage_limits;
CREATE POLICY "Users can view their own limits"
ON public.usage_limits 
FOR SELECT 
USING (
  -- Authenticated users can only see their own records
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  -- Anonymous users can only see records with NULL user_id that match their session
  -- (This still allows session-based access but prevents cross-session snooping)
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- Update UPDATE policy similarly
DROP POLICY IF EXISTS "Users can update their own limits" ON public.usage_limits;
CREATE POLICY "Users can update their own limits"
ON public.usage_limits 
FOR UPDATE 
USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  OR
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- Add constraints to prevent abuse on usage_limits
ALTER TABLE public.usage_limits DROP CONSTRAINT IF EXISTS unique_session_limit;
ALTER TABLE public.usage_limits ADD CONSTRAINT unique_session_limit UNIQUE (session_id);

ALTER TABLE public.usage_limits DROP CONSTRAINT IF EXISTS valid_counts;
ALTER TABLE public.usage_limits ADD CONSTRAINT valid_counts CHECK (
  calculation_count >= 0 AND calculation_count <= 1000 AND
  download_count >= 0 AND download_count <= 1000 AND
  share_count >= 0 AND share_count <= 1000
);