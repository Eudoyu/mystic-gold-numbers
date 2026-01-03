-- Add newsletter subscription field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN newsletter_subscribed boolean DEFAULT false;

-- Create usage_limits table to track per-session/per-user limits
CREATE TABLE public.usage_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text NOT NULL,
  calculation_count integer DEFAULT 0,
  download_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.usage_limits ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own limits
CREATE POLICY "Users can view their own limits" 
ON public.usage_limits 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow inserting limits
CREATE POLICY "Anyone can insert limits" 
ON public.usage_limits 
FOR INSERT 
WITH CHECK (true);

-- Allow updating own limits
CREATE POLICY "Users can update their own limits" 
ON public.usage_limits 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_usage_limits_updated_at
BEFORE UPDATE ON public.usage_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();