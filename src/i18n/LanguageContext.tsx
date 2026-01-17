import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import en from './translations/en.json';
import fr from './translations/fr.json';
import es from './translations/es.json';
import de from './translations/de.json';
import pt from './translations/pt.json';
import ja from './translations/ja.json';
import ar from './translations/ar.json';
import it from './translations/it.json';
import hi from './translations/hi.json';
import ko from './translations/ko.json';
import nl from './translations/nl.json';
import tr from './translations/tr.json';
import id from './translations/id.json';

export type Language = 'en' | 'fr' | 'es' | 'de' | 'pt' | 'ja' | 'ar' | 'it' | 'hi' | 'ko' | 'nl' | 'tr' | 'id';

type TranslationValue = string | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

const translations: Record<Language, Translations> = { en, fr, es, de, pt, ja, ar, it, hi, ko, nl, tr, id };

export const languages: { code: Language; label: string; flag: string; locale: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', locale: 'en_US' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', locale: 'fr_FR' },
  { code: 'es', label: 'Español', flag: '🇪🇸', locale: 'es_ES' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', locale: 'de_DE' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', locale: 'pt_BR' },
  { code: 'ja', label: '日本語', flag: '🇯🇵', locale: 'ja_JP' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', locale: 'ar_SA' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', locale: 'it_IT' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', locale: 'hi_IN' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', locale: 'ko_KR' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', locale: 'nl_NL' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', locale: 'tr_TR' },
  { code: 'id', label: 'Bahasa', flag: '🇮🇩', locale: 'id_ID' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLocalePath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Get nested translation value
const getNestedValue = (obj: Translations, path: string): string => {
  const keys = path.split('.');
  let current: TranslationValue = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Return key if translation not found
    }
  }
  
  return typeof current === 'string' ? current : path;
};

// Detect browser language
const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'fr') return 'fr';
  if (browserLang === 'es') return 'es';
  return 'en';
};

// Extract language from URL path
const extractLanguageFromPath = (pathname: string): Language | null => {
  const match = pathname.match(/^\/(en|fr|es|de|pt|ja|ar|it|hi|ko|nl|tr|id)(\/|$)/);
  return match ? (match[1] as Language) : null;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize language from URL or browser
  const [language, setLanguageState] = useState<Language>(() => {
    const urlLang = extractLanguageFromPath(location.pathname);
    if (urlLang) return urlLang;
    
    const stored = localStorage.getItem('preferred-language') as Language;
    if (stored && ['en', 'fr', 'es'].includes(stored)) return stored;
    
    return detectBrowserLanguage();
  });

  // Update language when URL changes
  useEffect(() => {
    const urlLang = extractLanguageFromPath(location.pathname);
    if (urlLang && urlLang !== language) {
      setLanguageState(urlLang);
    }
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    
    // Update URL to reflect new language
    const currentPath = location.pathname;
    const urlLang = extractLanguageFromPath(currentPath);
    
    if (urlLang) {
      // Replace language prefix
      const newPath = currentPath.replace(/^\/(en|fr|es)/, `/${lang}`);
      navigate(newPath);
    } else {
      // Add language prefix
      navigate(`/${lang}${currentPath === '/' ? '' : currentPath}`);
    }
  };

  const t = (key: string): string => {
    return getNestedValue(translations[language], key);
  };

  const getLocalePath = (path: string): string => {
    // Ensure path starts with language prefix
    if (path.startsWith('/en/') || path.startsWith('/fr/') || path.startsWith('/es/')) {
      return path.replace(/^\/(en|fr|es)/, `/${language}`);
    }
    return `/${language}${path.startsWith('/') ? path : `/${path}`}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalePath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Hook to get current language info
export const useCurrentLanguage = () => {
  const { language } = useLanguage();
  return languages.find(l => l.code === language) || languages[0];
};