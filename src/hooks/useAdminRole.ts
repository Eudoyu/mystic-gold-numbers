import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRole {
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

export const useAdminRole = (): AdminRole => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user has admin role using the secure has_role function
        const { data, error: rpcError } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin'
        });

        if (rpcError) throw rpcError;
        
        setIsAdmin(data === true);
      } catch (err) {
        console.error('Error checking admin role:', err);
        setError(err instanceof Error ? err.message : 'Failed to check admin status');
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  return { isAdmin, loading, error };
};
