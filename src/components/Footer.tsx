import { Sparkles, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdPlacement from '@/components/AdPlacement';
import { useLanguage, languages, type Language } from '@/i18n';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language, setLanguage, getLocalePath } = useLanguage();

  const footerLinks = {
    calculators: [
      { labelKey: 'nav.businessName', href: getLocalePath('/tools/business-name') },
      { labelKey: 'nav.sloganAnalyzer', href: getLocalePath('/tools/slogan-analyzer') },
      { labelKey: 'nav.compatibility', href: getLocalePath('/tools/compatibility') },
      { labelKey: 'nav.partnerCheck', href: getLocalePath('/tools/partner-check') },
    ],
    resources: [
      { labelKey: 'systems.pythagorean', href: getLocalePath('/methods/pythagorean') },
      { labelKey: 'systems.chaldean', href: getLocalePath('/methods/chaldean') },
      { labelKey: 'systems.gematria', href: getLocalePath('/methods/gematria') },
    ],
    legal: [
      { labelKey: 'legal.notice', href: getLocalePath('/legal/notice') },
      { labelKey: 'legal.privacy', href: getLocalePath('/legal/privacy') },
      { labelKey: 'legal.terms', href: getLocalePath('/legal/terms') },
      { labelKey: 'legal.cookies', href: getLocalePath('/legal/cookies') },
      { labelKey: 'legal.disclaimer', href: getLocalePath('/legal/disclaimer') },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to={getLocalePath('/')} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display text-xl font-semibold gold-text">
                NumerologyForBiz
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Mail className="w-4 h-4" />
              <span>contact@numerologyforbiz.com</span>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 mt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    lang.code === language 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              {t('footer.calculators')}
            </h4>
            <ul className="space-y-2">
              {footerLinks.calculators.map((link) => (
                <li key={link.labelKey}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              {t('footer.resources')}
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.labelKey}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.labelKey}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} NumerologyForBiz.com. {t('footer.copyright')}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {t('footer.madeWith')} <Heart className="w-3 h-3 text-destructive" />
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Ad Placement */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <AdPlacement height="h-[90px]" label="AD-PLACEMENT-HIGH-CTR • Footer Leaderboard 728x90" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
