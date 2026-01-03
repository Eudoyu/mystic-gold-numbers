import { Calculator, Download, Share2, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';

interface UsageLimitBannerProps {
  remainingCalculations: number;
  remainingDownloads: number;
  remainingShares: number;
  isPremium: boolean;
  maxCalculations: number;
  maxDownloads: number;
  maxShares: number;
}

export default function UsageLimitBanner({
  remainingCalculations,
  remainingDownloads,
  remainingShares,
  isPremium,
  maxCalculations,
  maxDownloads,
  maxShares,
}: UsageLimitBannerProps) {
  const navigate = useNavigate();
  const { getLocalePath } = useLanguage();

  if (isPremium) {
    return (
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20">
            <Crown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Premium Access Active</p>
            <p className="text-sm text-muted-foreground">
              Unlimited calculations, downloads, and shares
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isLow = remainingCalculations <= 1 || remainingDownloads === 0 || remainingShares === 0;

  return (
    <div className={`border rounded-lg p-4 mb-6 ${isLow ? 'bg-destructive/5 border-destructive/20' : 'bg-muted/30 border-border'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="font-medium text-foreground">Free Session Limits</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-muted-foreground" />
              <span className={remainingCalculations === 0 ? 'text-destructive' : 'text-foreground'}>
                {remainingCalculations}/{maxCalculations} calculations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-muted-foreground" />
              <span className={remainingDownloads === 0 ? 'text-destructive' : 'text-foreground'}>
                {remainingDownloads}/{maxDownloads} download
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-muted-foreground" />
              <span className={remainingShares === 0 ? 'text-destructive' : 'text-foreground'}>
                {remainingShares}/{maxShares} share
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate(getLocalePath('/auth'))}
          className="gap-2 shrink-0"
        >
          <Crown className="w-4 h-4" />
          Get Unlimited
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Create a free account to unlock unlimited calculations, PDF downloads, social sharing, and save your readings.
        </p>
      </div>
    </div>
  );
}
