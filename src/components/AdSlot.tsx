import { useEffect, useRef, useState } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { ADSENSE_CONFIG, AdSlotType } from '@/config/adsense';

interface AdSlotProps {
  type: AdSlotType;
  className?: string;
  fallbackContent?: React.ReactNode;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSlot = ({ type, className = '', fallbackContent }: AdSlotProps) => {
  const { canShowAnyAds, canShowPersonalizedAds, isConsentKnown } = useConsent();
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const slotConfig = ADSENSE_CONFIG.slots[type];
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    // Don't load ads in development or if disabled
    if (isDev || !ADSENSE_CONFIG.enabled || !canShowAnyAds) {
      return;
    }

    // Wait for consent to be known before loading ads
    if (!isConsentKnown) {
      return;
    }

    // Prevent duplicate ad loading
    if (adLoaded || !adRef.current) {
      return;
    }

    try {
      // Initialize adsbygoogle array if not exists
      window.adsbygoogle = window.adsbygoogle || [];
      
      // Push ad request
      window.adsbygoogle.push({});
      setAdLoaded(true);
    } catch (error) {
      console.error('AdSense error:', error);
      setAdError(true);
    }
  }, [canShowAnyAds, isConsentKnown, adLoaded, isDev]);

  // Reserved space styles to prevent CLS
  const reservedStyles = {
    minHeight: slotConfig.minHeight,
    width: '100%',
  };

  // Development placeholder
  if (isDev) {
    return (
      <div
        className={`ad-slot ad-slot-${type} bg-muted/30 border border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center ${className}`}
        style={reservedStyles}
      >
        <div className="text-center text-muted-foreground/50">
          <span className="text-xs uppercase tracking-wider font-medium">
            Ad: {type}
          </span>
          <span className="block text-[10px] mt-1">
            {slotConfig.format} • {slotConfig.minHeight}
          </span>
        </div>
      </div>
    );
  }

  // Ads disabled or consent denied
  if (!ADSENSE_CONFIG.enabled || !canShowAnyAds) {
    if (fallbackContent) {
      return <div className={className}>{fallbackContent}</div>;
    }
    return null;
  }

  // Error state
  if (adError && fallbackContent) {
    return <div className={className}>{fallbackContent}</div>;
  }

  return (
    <div
      className={`ad-slot ad-slot-${type} overflow-hidden ${className}`}
      style={reservedStyles}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: slotConfig.minHeight,
        }}
        data-ad-client={ADSENSE_CONFIG.publisherId}
        data-ad-slot={slotConfig.slotId}
        data-ad-format={slotConfig.responsive ? 'auto' : undefined}
        data-full-width-responsive={slotConfig.responsive ? 'true' : undefined}
        data-adtest={isDev ? 'on' : undefined}
        {...(!canShowPersonalizedAds && { 'data-npa': '1' })}
      />
    </div>
  );
};

export default AdSlot;
