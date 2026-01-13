import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, LogOut, History } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import AdPlacement from '@/components/AdPlacement';
import { useLanguage, languages, type Language } from '@/i18n';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, getLocalePath } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { href: getLocalePath('/tools/business-name'), labelKey: 'nav.businessName' },
    { href: getLocalePath('/tools/compatibility'), labelKey: 'nav.compatibility' },
    { href: getLocalePath('/tools/slogan-analyzer'), labelKey: 'nav.sloganAnalyzer' },
    { href: getLocalePath('/tools/partner-check'), labelKey: 'nav.partnerCheck' },
    { href: getLocalePath('/tools/name-comparison'), labelKey: 'nav.nameComparison' },
    { href: getLocalePath('/blog'), labelKey: 'nav.blog' },
  ];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate(getLocalePath('/'));
  };

  const currentLangData = languages.find(l => l.code === language);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      {/* Top Ad Placement */}
      <div className="w-full bg-muted/50 py-2">
        <div className="container mx-auto px-4">
          <AdPlacement height="h-[90px]" label="AD-PLACEMENT-HIGH-CTR • Leaderboard 728x90" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={getLocalePath('/')}>
            <Logo variant="full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {t(link.labelKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Language Selector, Auth & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLangData?.label}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`cursor-pointer ${lang.code === language ? 'bg-primary/10' : ''}`}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline max-w-[100px] truncate">
                      {user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem
                    onClick={() => navigate(getLocalePath('/history'))}
                    className="cursor-pointer gap-2"
                  >
                    <History className="w-4 h-4" />
                    My Readings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer gap-2 text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(getLocalePath('/auth'))}
                className="gap-2 border-primary/30 hover:bg-primary/10"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              {user && (
                <Link
                  to={getLocalePath('/history')}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <History className="w-4 h-4" />
                  My Readings
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
