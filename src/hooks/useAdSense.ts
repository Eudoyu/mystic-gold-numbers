import { useEffect, useState } from 'react';
import { ADSENSE_CONFIG } from '@/config/adsense';

let scriptLoaded = false;
let scriptLoading = false;

export const useAdSense = () => {
  const [isReady, setIsReady] = useState(scriptLoaded);
  const [error, setError] = useState<Error | null>(null);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    // Don't load in development or if disabled
    if (isDev || !ADSENSE_CONFIG.enabled) {
      return;
    }

    // Already loaded
    if (scriptLoaded) {
      setIsReady(true);
      return;
    }

    // Currently loading
    if (scriptLoading) {
      const checkLoaded = setInterval(() => {
        if (scriptLoaded) {
          setIsReady(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      return () => clearInterval(checkLoaded);
    }

    // Start loading
    scriptLoading = true;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      setIsReady(true);

      // Enable auto ads if configured
      if (ADSENSE_CONFIG.autoAds.enabled) {
        try {
          (window as any).adsbygoogle = (window as any).adsbygoogle || [];
          (window as any).adsbygoogle.push({
            google_ad_client: ADSENSE_CONFIG.publisherId,
            enable_page_level_ads: true,
            overlays: {
              bottom: ADSENSE_CONFIG.autoAds.anchorAds,
            },
          });
        } catch (e) {
          console.error('Auto ads initialization error:', e);
        }
      }
    };

    script.onerror = () => {
      scriptLoading = false;
      setError(new Error('Failed to load AdSense script'));
    };

    // Check if script already exists
    const existingScript = document.querySelector(
      `script[src*="pagead2.googlesyndication.com"]`
    );

    if (!existingScript) {
      document.head.appendChild(script);
    } else {
      scriptLoaded = true;
      setIsReady(true);
    }

    return () => {
      // Don't remove script on unmount as it should persist
    };
  }, [isDev]);

  return { isReady, error };
};
