import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n';

interface LockedFeatureProps {
  featureName: string;
  requiredPlan: 'sprint' | 'pro';
  onUnlock: () => void;
}

const LockedFeature = ({ featureName, requiredPlan, onUnlock }: LockedFeatureProps) => {
  const { t } = useLanguage();
  
  const planLabels = {
    sprint: t('locked.sprintPlan') || 'Sprint 72H ($19)',
    pro: t('locked.proPlan') || 'Pro ($14.90/mo)',
  };

  const unlockText = (t('locked.unlockWith') || 'Unlock this feature with {plan} to access advanced numerology systems.')
    .replace('{plan}', planLabels[requiredPlan]);

  return (
    <Card className="border-dashed border-2 border-primary/30 bg-card/50">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{featureName}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          {unlockText}
        </p>
        <Button onClick={onUnlock} className="gap-2">
          <Lock className="w-4 h-4" />
          {t('locked.unlockNow') || 'Unlock Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LockedFeature;
