import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UsageLimits {
  calculationCount: number;
  downloadCount: number;
  shareCount: number;
}

const FREE_LIMITS = {
  calculations: 3,
  downloads: 1,
  shares: 1,
};

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('numerology_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('numerology_session_id', sessionId);
  }
  return sessionId;
};

export function useUsageLimits() {
  const { user } = useAuth();
  const [limits, setLimits] = useState<UsageLimits>({
    calculationCount: 0,
    downloadCount: 0,
    shareCount: 0,
  });

  const isLoggedIn = !!user;
  const isPremium = isLoggedIn; // All registered users get premium access

  // Load limits from sessionStorage for free users
  useEffect(() => {
    if (!isPremium) {
      const sessionId = getSessionId();
      const storedLimits = sessionStorage.getItem(`usage_limits_${sessionId}`);
      if (storedLimits) {
        setLimits(JSON.parse(storedLimits));
      }
    } else {
      // Premium users have unlimited access
      setLimits({ calculationCount: 0, downloadCount: 0, shareCount: 0 });
    }
  }, [isPremium]);

  const saveLimits = useCallback((newLimits: UsageLimits) => {
    if (!isPremium) {
      const sessionId = getSessionId();
      sessionStorage.setItem(`usage_limits_${sessionId}`, JSON.stringify(newLimits));
    }
    setLimits(newLimits);
  }, [isPremium]);

  const canCalculate = isPremium || limits.calculationCount < FREE_LIMITS.calculations;
  const canDownload = isPremium || limits.downloadCount < FREE_LIMITS.downloads;
  const canShare = isPremium || limits.shareCount < FREE_LIMITS.shares;

  const remainingCalculations = isPremium ? Infinity : FREE_LIMITS.calculations - limits.calculationCount;
  const remainingDownloads = isPremium ? Infinity : FREE_LIMITS.downloads - limits.downloadCount;
  const remainingShares = isPremium ? Infinity : FREE_LIMITS.shares - limits.shareCount;

  const incrementCalculation = useCallback(() => {
    if (!isPremium) {
      const newLimits = { ...limits, calculationCount: limits.calculationCount + 1 };
      saveLimits(newLimits);
    }
  }, [isPremium, limits, saveLimits]);

  const incrementDownload = useCallback(() => {
    if (!isPremium) {
      const newLimits = { ...limits, downloadCount: limits.downloadCount + 1 };
      saveLimits(newLimits);
    }
  }, [isPremium, limits, saveLimits]);

  const incrementShare = useCallback(() => {
    if (!isPremium) {
      const newLimits = { ...limits, shareCount: limits.shareCount + 1 };
      saveLimits(newLimits);
    }
  }, [isPremium, limits, saveLimits]);

  return {
    isPremium,
    canCalculate,
    canDownload,
    canShare,
    remainingCalculations,
    remainingDownloads,
    remainingShares,
    incrementCalculation,
    incrementDownload,
    incrementShare,
    limits: FREE_LIMITS,
  };
}
