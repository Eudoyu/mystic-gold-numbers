import { useState } from 'react';
import { Mail, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/i18n';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface NewsletterProps {
  variant?: 'default' | 'compact';
}

const Newsletter = ({ variant = 'default' }: NewsletterProps) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t, getLocalePath } = useLanguage();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast({
        title: t('common.error'),
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!consent) {
      toast({
        title: t('common.error'),
        description: 'Please accept the marketing consent to subscribe.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call - will be replaced with Kit/ConvertKit integration
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);
    setEmail('');
    setConsent(false);

    toast({
      title: t('newsletter.success'),
      description: 'You will receive our weekly numerology insights.',
    });
  };

  if (isSuccess) {
    return (
      <div className="mystic-card p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {t('newsletter.success')}
        </h3>
        <p className="text-muted-foreground">
          Check your inbox to confirm your subscription.
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="mystic-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground">
              {t('newsletter.title')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('newsletter.subtitle')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder={t('newsletter.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/50 border-border"
          />
          
          <div className="flex items-start gap-2">
            <Checkbox
              id="consent-compact"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="consent-compact" className="text-xs text-muted-foreground cursor-pointer">
              {t('newsletter.consent')}
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('common.loading')}
              </>
            ) : (
              t('newsletter.subscribe')
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {t('newsletter.privacyNote')}{' '}
            <Link to={getLocalePath('/legal/privacy')} className="text-primary hover:underline">
              {t('legal.privacy')}
            </Link>
          </p>
        </form>
      </div>
    );
  }

  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mystic-card p-8 md:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold gold-text mb-3">
            {t('newsletter.title')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('newsletter.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder={t('newsletter.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background/50 border-border h-12"
              />
              <Button 
                type="submit" 
                size="lg"
                className="sm:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    {t('newsletter.subscribe')}
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-start gap-3 justify-center text-left max-w-md mx-auto">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm text-muted-foreground cursor-pointer">
                {t('newsletter.consent')}
              </label>
            </div>

            <p className="text-xs text-muted-foreground">
              {t('newsletter.privacyNote')}{' '}
              <Link to={getLocalePath('/legal/privacy')} className="text-primary hover:underline">
                {t('legal.privacy')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
