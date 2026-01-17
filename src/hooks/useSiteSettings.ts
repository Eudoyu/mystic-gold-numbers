import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  id: string;
  polar_product_sprint_id: string | null;
  polar_product_pro_id: string | null;
  sprint_price: number;
  pro_price: number;
  maintenance_mode: boolean;
  announcement_text: string | null;
}

interface UseSiteSettings {
  settings: SiteSettings | null;
  loading: boolean;
  error: string | null;
  updateSettings: (updates: Partial<SiteSettings>) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export const useSiteSettings = (): UseSiteSettings => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      // Fetch from site_settings table - using raw query since types aren't generated yet
      const { data, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle() as { data: SiteSettings | null, error: any };

      if (fetchError) throw fetchError;
      
      setSettings(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching site settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (updates: Partial<SiteSettings>): Promise<boolean> => {
    if (!settings?.id) return false;

    try {
      const { error: updateError } = await supabase
        .from('site_settings')
        .update(updates as any)
        .eq('id', settings.id);

      if (updateError) throw updateError;

      setSettings(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (err) {
      console.error('Error updating settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      return false;
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    refetch: fetchSettings,
  };
};
