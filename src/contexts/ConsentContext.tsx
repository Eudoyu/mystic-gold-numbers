import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ConsentStatus = 'pending' | 'granted' | 'denied' | 'unknown';

interface ConsentState {
  analytics: ConsentStatus;
  advertising: ConsentStatus;
  personalization: ConsentStatus;
}

interface ConsentContextType {
  consent: ConsentState;
  isConsentKnown: boolean;
  canShowPersonalizedAds: boolean;
  canShowAnyAds: boolean;
  updateConsent: (type: keyof ConsentState, status: ConsentStatus) => void;
  acceptAll: () => void;
  denyAll: () => void;
  resetConsent: () => void;
}

const defaultConsent: ConsentState = {
  analytics: 'unknown',
  advertising: 'unknown',
  personalization: 'unknown',
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'user_consent_preferences';

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentState;
        setConsent(parsed);
      }
    } catch (error) {
      console.error('Error loading consent preferences:', error);
    }
  }, []);

  // Listen for Google CMP consent updates (Funding Choices)
  useEffect(() => {
    const handleConsentUpdate = () => {
      // Check for Google consent mode
      if (typeof window !== 'undefined' && (window as any).gtag) {
        // Google consent mode integration
        const gtagConsent = (window as any).gtagConsent;
        if (gtagConsent) {
          setConsent(prev => ({
            ...prev,
            analytics: gtagConsent.analytics_storage === 'granted' ? 'granted' : 'denied',
            advertising: gtagConsent.ad_storage === 'granted' ? 'granted' : 'denied',
            personalization: gtagConsent.ad_personalization === 'granted' ? 'granted' : 'denied',
          }));
        }
      }
    };

    // Listen for consent updates from Google CMP
    window.addEventListener('consentUpdate', handleConsentUpdate);
    
    return () => {
      window.removeEventListener('consentUpdate', handleConsentUpdate);
    };
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
      
      // Update Google consent mode if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': newConsent.analytics === 'granted' ? 'granted' : 'denied',
          'ad_storage': newConsent.advertising === 'granted' ? 'granted' : 'denied',
          'ad_personalization': newConsent.personalization === 'granted' ? 'granted' : 'denied',
        });
      }
    } catch (error) {
      console.error('Error saving consent preferences:', error);
    }
  }, []);

  const updateConsent = useCallback((type: keyof ConsentState, status: ConsentStatus) => {
    setConsent(prev => {
      const newConsent = { ...prev, [type]: status };
      saveConsent(newConsent);
      return newConsent;
    });
  }, [saveConsent]);

  const acceptAll = useCallback(() => {
    const newConsent: ConsentState = {
      analytics: 'granted',
      advertising: 'granted',
      personalization: 'granted',
    };
    setConsent(newConsent);
    saveConsent(newConsent);
  }, [saveConsent]);

  const denyAll = useCallback(() => {
    const newConsent: ConsentState = {
      analytics: 'denied',
      advertising: 'denied',
      personalization: 'denied',
    };
    setConsent(newConsent);
    saveConsent(newConsent);
  }, [saveConsent]);

  const resetConsent = useCallback(() => {
    setConsent(defaultConsent);
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  }, []);

  const isConsentKnown = consent.advertising !== 'unknown' && consent.advertising !== 'pending';
  const canShowPersonalizedAds = consent.advertising === 'granted' && consent.personalization === 'granted';
  const canShowAnyAds = consent.advertising === 'granted' || consent.advertising === 'unknown';

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isConsentKnown,
        canShowPersonalizedAds,
        canShowAnyAds,
        updateConsent,
        acceptAll,
        denyAll,
        resetConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = (): ConsentContextType => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
