import { useState } from 'react';
import { useUserPlan, type PlanType } from '@/hooks/useUserPlan';
import { useAuth } from '@/contexts/AuthContext';
import LockedFeature from './LockedFeature';
import PricingModal from './PricingModal';
import { useLanguage } from '@/i18n';
import { useNavigate } from 'react-router-dom';

interface TieredAccessWrapperProps {
  children: React.ReactNode;
  requiredPlan: 'sprint' | 'pro';
  featureName: string;
}

const TieredAccessWrapper = ({ children, requiredPlan, featureName }: TieredAccessWrapperProps) => {
  const { user } = useAuth();
  const { planType, loading } = useUserPlan();
  const { getLocalePath } = useLanguage();
  const navigate = useNavigate();
  const [showPricing, setShowPricing] = useState(false);

  if (loading) {
    return (
      <div className="animate-pulse bg-muted/30 rounded-xl h-48 flex items-center justify-center">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  const hasAccess = () => {
    if (requiredPlan === 'sprint') {
      return planType === 'sprint' || planType === 'pro';
    }
    if (requiredPlan === 'pro') {
      return planType === 'pro';
    }
    return true;
  };

  const handleUnlock = () => {
    if (!user) {
      navigate(getLocalePath('/auth'));
    } else {
      setShowPricing(true);
    }
  };

  if (!hasAccess()) {
    return (
      <>
        <LockedFeature 
          featureName={featureName} 
          requiredPlan={requiredPlan} 
          onUnlock={handleUnlock} 
        />
        <PricingModal 
          open={showPricing} 
          onClose={() => setShowPricing(false)} 
          highlightPlan={requiredPlan}
        />
      </>
    );
  }

  return <>{children}</>;
};

export default TieredAccessWrapper;
