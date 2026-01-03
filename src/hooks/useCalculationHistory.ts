import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  destiny: number;
}

export function useCalculationHistory() {
  const { user } = useAuth();

  const saveCalculation = async (
    name: string,
    birthdate: string | null,
    system: 'pythagorean' | 'chaldean',
    result: NumerologyResult
  ) => {
    if (!user) return { success: false };

    const { error } = await supabase.from('calculation_history').insert({
      user_id: user.id,
      name,
      birthdate,
      system,
      life_path_number: result.lifePath,
      expression_number: result.expression,
      soul_urge_number: result.soulUrge,
      personality_number: result.personality,
      destiny_number: result.destiny,
    });

    if (error) {
      console.error('Error saving calculation:', error);
      return { success: false, error };
    }

    toast({
      title: 'Saved!',
      description: 'Reading saved to your history.',
    });

    return { success: true };
  };

  return { saveCalculation, isLoggedIn: !!user };
}
