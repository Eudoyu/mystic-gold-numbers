// AdSense Configuration
// Replace with your actual AdSense publisher ID
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with real ID
  enabled: true,
  
  // Slot configurations by placement type
  slots: {
    header: {
      slotId: 'XXXXXXXXXX',
      format: 'horizontal',
      minHeight: '90px',
      responsive: true,
    },
    inContent: {
      slotId: 'XXXXXXXXXX',
      format: 'rectangle',
      minHeight: '250px',
      responsive: true,
    },
    afterResults: {
      slotId: 'XXXXXXXXXX',
      format: 'rectangle',
      minHeight: '250px',
      responsive: true,
    },
    sidebar: {
      slotId: 'XXXXXXXXXX',
      format: 'vertical',
      minHeight: '600px',
      responsive: false,
    },
    footer: {
      slotId: 'XXXXXXXXXX',
      format: 'horizontal',
      minHeight: '90px',
      responsive: true,
    },
  },
  
  // Auto ads settings
  autoAds: {
    enabled: false, // Set to true to enable auto ads
    anchorAds: true,
    vignetteAds: false, // Disabled by default per requirements
  },
};

export type AdSlotType = keyof typeof ADSENSE_CONFIG.slots;
