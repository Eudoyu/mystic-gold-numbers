import { Sparkles, Heart, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdPlacement from '@/components/AdPlacement';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    calculators: [
      { label: 'Life Path Calculator', href: '#calculator' },
      { label: 'Business Name Analyzer', href: '#business' },
      { label: 'Number Meanings', href: '#meanings' },
      { label: 'FAQ', href: '#faq' },
    ],
    resources: [
      { label: 'How Numerology Works', href: '#' },
      { label: 'Master Numbers Guide', href: '#' },
      { label: 'Chaldean vs Pythagorean', href: '#' },
      { label: 'Business Numerology', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display text-xl font-semibold gold-text">
                Numerology Hub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Unlock the mysteries of numbers with our professional-grade numerology 
              calculators. Discover your life path and find the perfect name for your business.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>contact@numerologyhub.com</span>
            </div>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Calculators</h4>
            <ul className="space-y-2">
              {footerLinks.calculators.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
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
              © {currentYear} Numerology Hub. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-destructive" /> for seekers of truth
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
