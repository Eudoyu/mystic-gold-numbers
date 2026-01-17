import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type PlanType = 'free' | 'sprint' | 'pro';

interface UserPlan {
  planType: PlanType;
  sprintExpiresAt: Date | null;
  isSprintActive: boolean;
  canAccessChaldean: boolean;
  canAccessGematria: boolean;
  canAccessMatrix: boolean;
  canAccessPartnerCheck: boolean;
  dailyCalculationsRemaining: number;
  loading: boolean;
}

const FREE_DAILY_LIMIT = 1;

export const useUserPlan = (): UserPlan => {
  const { user } = useAuth();
  const [planType, setPlanType] = useState<PlanType>('free');
  const [sprintExpiresAt, setSprintExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) {
        setPlanType('free');
        setSprintExpiresAt(null);
        setLoading(false);
        return;
      }

      try {
        // Fetch profile with plan info - need to cast due to new columns
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (profile) {
          // Access the new columns (they exist in DB but not in generated types yet)
          const profileData = profile as any;
          setPlanType(profileData.plan_type || 'free');
          setSprintExpiresAt(profileData.sprint_expires_at ? new Date(profileData.sprint_expires_at) : null);
        }

        // Fetch today's calculation count
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { count } = await supabase
          .from('calculation_history')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', today.toISOString());

        setDailyCount(count || 0);
      } catch (error) {
        console.error('Error fetching user plan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [user]);

  const now = new Date();
  const isSprintActive = sprintExpiresAt ? sprintExpiresAt > now : false;
  const effectivePlan = isSprintActive && planType === 'free' ? 'sprint' : planType;

  return {
    planType: effectivePlan,
    sprintExpiresAt,
    isSprintActive,
    canAccessChaldean: effectivePlan === 'sprint' || effectivePlan === 'pro',
    canAccessGematria: effectivePlan === 'sprint' || effectivePlan === 'pro',
    canAccessMatrix: effectivePlan === 'pro',
    canAccessPartnerCheck: effectivePlan === 'pro',
    dailyCalculationsRemaining: effectivePlan === 'free' ? Math.max(0, FREE_DAILY_LIMIT - dailyCount) : Infinity,
    loading,
  };
};
