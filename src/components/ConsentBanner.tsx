import { useState } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { useLanguage } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Cookie, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const ConsentBanner = () => {
  const { consent, isConsentKnown, acceptAll, denyAll, updateConsent } = useConsent();
  const { t, getLocalePath } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  // Don't show banner if consent is already known
  if (isConsentKnown) {
    return null;
  }

  const translations = {
    en: {
      title: 'We value your privacy',
      description: 'We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
      acceptAll: 'Accept All',
      denyAll: 'Reject All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      necessary: 'Necessary',
      necessaryDesc: 'Essential for the website to function properly.',
      analytics: 'Analytics',
      analyticsDesc: 'Help us understand how visitors interact with our website.',
      advertising: 'Advertising',
      advertisingDesc: 'Used to show you relevant ads based on your interests.',
      personalization: 'Personalization',
      personalizationDesc: 'Remember your preferences and provide personalized content.',
      learnMore: 'Learn more in our',
      privacyPolicy: 'Privacy Policy',
      and: 'and',
      cookiePolicy: 'Cookie Policy',
    },
    fr: {
      title: 'Nous respectons votre vie privée',
      description: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, afficher des publicités personnalisées et analyser notre trafic. En cliquant sur "Tout accepter", vous consentez à notre utilisation des cookies.',
      acceptAll: 'Tout accepter',
      denyAll: 'Tout refuser',
      customize: 'Personnaliser',
      savePreferences: 'Enregistrer',
      necessary: 'Nécessaires',
      necessaryDesc: 'Essentiels au bon fonctionnement du site.',
      analytics: 'Analytiques',
      analyticsDesc: 'Nous aident à comprendre comment les visiteurs interagissent avec notre site.',
      advertising: 'Publicitaires',
      advertisingDesc: 'Utilisés pour vous montrer des publicités pertinentes.',
      personalization: 'Personnalisation',
      personalizationDesc: 'Mémorisent vos préférences pour un contenu personnalisé.',
      learnMore: 'En savoir plus dans notre',
      privacyPolicy: 'Politique de confidentialité',
      and: 'et',
      cookiePolicy: 'Politique des cookies',
    },
    es: {
      title: 'Valoramos tu privacidad',
      description: 'Utilizamos cookies para mejorar tu experiencia de navegación, mostrar anuncios personalizados y analizar nuestro tráfico. Al hacer clic en "Aceptar todo", aceptas nuestro uso de cookies.',
      acceptAll: 'Aceptar todo',
      denyAll: 'Rechazar todo',
      customize: 'Personalizar',
      savePreferences: 'Guardar',
      necessary: 'Necesarias',
      necessaryDesc: 'Esenciales para el funcionamiento del sitio web.',
      analytics: 'Analíticas',
      analyticsDesc: 'Nos ayudan a entender cómo interactúan los visitantes con nuestro sitio.',
      advertising: 'Publicitarias',
      advertisingDesc: 'Se utilizan para mostrarte anuncios relevantes.',
      personalization: 'Personalización',
      personalizationDesc: 'Recuerdan tus preferencias para contenido personalizado.',
      learnMore: 'Más información en nuestra',
      privacyPolicy: 'Política de privacidad',
      and: 'y',
      cookiePolicy: 'Política de cookies',
    },
  };

  const lang = (t('common.language') as 'en' | 'fr' | 'es') || 'en';
  const text = translations[lang] || translations.en;

  const handleSavePreferences = () => {
    // If no changes made, treat as deny all
    if (consent.analytics === 'unknown' && consent.advertising === 'unknown') {
      denyAll();
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-4xl">
        <div className="relative bg-card border border-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 p-2.5 bg-primary/10 rounded-xl">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {text.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {text.description}
                </p>
              </div>
            </div>

            {/* Expandable details */}
            {showDetails && (
              <div className="mb-6 space-y-4 pt-4 border-t border-border">
                {/* Necessary - always on */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{text.necessary}</p>
                      <p className="text-xs text-muted-foreground">{text.necessaryDesc}</p>
                    </div>
                  </div>
                  <Switch checked disabled className="data-[state=checked]:bg-primary" />
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{text.analytics}</p>
                    <p className="text-xs text-muted-foreground">{text.analyticsDesc}</p>
                  </div>
                  <Switch
                    checked={consent.analytics === 'granted'}
                    onCheckedChange={(checked) => updateConsent('analytics', checked ? 'granted' : 'denied')}
                  />
                </div>

                {/* Advertising */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{text.advertising}</p>
                    <p className="text-xs text-muted-foreground">{text.advertisingDesc}</p>
                  </div>
                  <Switch
                    checked={consent.advertising === 'granted'}
                    onCheckedChange={(checked) => updateConsent('advertising', checked ? 'granted' : 'denied')}
                  />
                </div>

                {/* Personalization */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{text.personalization}</p>
                    <p className="text-xs text-muted-foreground">{text.personalizationDesc}</p>
                  </div>
                  <Switch
                    checked={consent.personalization === 'granted'}
                    onCheckedChange={(checked) => updateConsent('personalization', checked ? 'granted' : 'denied')}
                  />
                </div>
              </div>
            )}

            {/* Links */}
            <p className="text-xs text-muted-foreground mb-4">
              {text.learnMore}{' '}
              <a href={getLocalePath('/legal/privacy')} className="text-primary hover:underline">
                {text.privacyPolicy}
              </a>{' '}
              {text.and}{' '}
              <a href={getLocalePath('/legal/cookies')} className="text-primary hover:underline">
                {text.cookiePolicy}
              </a>.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="order-3 sm:order-1"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    {text.customize}
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    {text.customize}
                  </>
                )}
              </Button>
              
              <div className="flex-1" />
              
              {showDetails ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={denyAll}
                    className="order-2"
                  >
                    {text.denyAll}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="order-1 sm:order-3"
                  >
                    {text.savePreferences}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={denyAll}
                    className="order-2"
                  >
                    {text.denyAll}
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="order-1 sm:order-3"
                  >
                    {text.acceptAll}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
