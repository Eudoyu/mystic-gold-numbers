import { useState } from 'react';
import { Check, Zap, Crown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/i18n';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
  highlightPlan?: 'sprint' | 'pro';
}

const PricingModal = ({ open, onClose, highlightPlan }: PricingModalProps) => {
  const { settings } = useSiteSettings();
  const { user } = useAuth();
  const { t, getLocalePath, language } = useLanguage();
  const [loading, setLoading] = useState<'sprint' | 'pro' | null>(null);

  const handleCheckout = async (plan: 'sprint' | 'pro') => {
    if (!user) {
      window.location.href = getLocalePath('/auth');
      return;
    }

    setLoading(plan);
    
    try {
      const successUrl = `${window.location.origin}/${language}?checkout=success`;
      const cancelUrl = `${window.location.origin}/${language}?checkout=cancel`;

      const { data, error } = await supabase.functions.invoke('polar-checkout', {
        body: { plan, successUrl, cancelUrl },
      });

      if (error) {
        console.error('Checkout error:', error);
        toast.error(t('pricing.checkoutFailed') || 'Failed to start checkout. Please try again.');
        return;
      }

      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.error(t('pricing.checkoutNotAvailable') || 'Checkout not available. Please contact support.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error(t('pricing.checkoutError') || 'An error occurred. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const sprintPrice = settings?.sprint_price || 19;
  const proPrice = settings?.pro_price || 14.90;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center">
            {t('pricing.title') || 'Unlock Premium Features'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Sprint Plan */}
          <div className={`relative p-6 rounded-xl border-2 transition-all ${
            highlightPlan === 'sprint' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('pricing.sprint') || 'Sprint 72H'}</h3>
                <p className="text-sm text-muted-foreground">{t('pricing.sprintDesc') || 'One-time purchase'}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">${sprintPrice}</span>
              <span className="text-muted-foreground"> {t('pricing.perHours') || '/ 72 hours'}</span>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {t('pricing.chaldeanNumerology') || 'Chaldean Numerology'}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {t('pricing.hebrewGematria') || 'Hebrew Gematria'}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {t('pricing.unlimitedCalculations') || 'Unlimited calculations'}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <X className="w-4 h-4" />
                {t('pricing.matrixOfConvergence') || 'Matrix of Convergence'}
              </li>
            </ul>

            <Button 
              className="w-full" 
              variant={highlightPlan === 'sprint' ? 'default' : 'outline'}
              onClick={() => handleCheckout('sprint')}
              disabled={loading !== null}
            >
              {loading === 'sprint' ? (t('common.loading') || 'Loading...') : (t('pricing.getSprintAccess') || 'Get Sprint Access')}
            </Button>
          </div>

          {/* Pro Plan */}
          <div className={`relative p-6 rounded-xl border-2 transition-all ${
            highlightPlan === 'pro' 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}>
            {highlightPlan !== 'sprint' && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                {t('pricing.mostPopular') || 'Most Popular'}
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('pricing.pro') || 'Pro'}</h3>
                <p className="text-sm text-muted-foreground">{t('pricing.proDesc') || 'Monthly subscription'}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">${proPrice}</span>
              <span className="text-muted-foreground"> {t('pricing.perMonth') || '/ month'}</span>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {t('pricing.allSprintFeatures') || 'All Sprint features'}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {t('pricing.matrixOfConvergence') || 'Matrix of Convergence'}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {t('pricing.partnerCompatibility') || 'Partner Compatibility'}
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                {t('pricing.aiGeneratedReports') || 'AI-Generated Reports'}
              </li>
            </ul>

            <Button 
              className="w-full" 
              onClick={() => handleCheckout('pro')}
              disabled={loading !== null}
            >
              {loading === 'pro' ? (t('common.loading') || 'Loading...') : (t('pricing.subscribeToPro') || 'Subscribe to Pro')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
