// Shared numerology calculation utilities

export type CalculationSystem = 'pythagorean' | 'chaldean' | 'gematria';

// Pythagorean number mapping (Modern Western)
export const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

// Chaldean number mapping (Ancient/Business)
export const CHALDEAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
};

// Hebrew Gematria mapping
export const GEMATRIA_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 10, k: 20, l: 30, m: 40, n: 50, o: 60, p: 70, q: 80, r: 90,
  s: 100, t: 200, u: 300, v: 400, w: 500, x: 600, y: 700, z: 800
};

export const reduceToSingleDigit = (num: number): number => {
  // Master numbers 11, 22, 33 are preserved
  if (num === 11 || num === 22 || num === 33) return num;
  
  while (num > 9) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
};

export const calculateNameNumber = (
  name: string, 
  system: CalculationSystem
): { number: number; breakdown: string; rawTotal: number } => {
  const maps: Record<CalculationSystem, Record<string, number>> = {
    pythagorean: PYTHAGOREAN_MAP,
    chaldean: CHALDEAN_MAP,
    gematria: GEMATRIA_MAP
  };
  
  const map = maps[system];
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  
  const breakdown: string[] = [];
  let total = 0;
  
  for (const letter of cleanName) {
    const value = map[letter] || 0;
    if (value > 0) {
      breakdown.push(`${letter.toUpperCase()}(${value})`);
      total += value;
    }
  }
  
  const finalNumber = reduceToSingleDigit(total);
  
  return {
    number: finalNumber,
    breakdown: `${breakdown.join(' + ')} = ${total} → ${finalNumber}`,
    rawTotal: total
  };
};

export const getVibrationMeaning = (num: number): string => {
  const meanings: Record<number, string> = {
    1: "Leadership, independence, innovation, new beginnings",
    2: "Partnership, diplomacy, balance, cooperation",
    3: "Creativity, expression, joy, communication",
    4: "Stability, foundation, hard work, practicality",
    5: "Change, freedom, adventure, versatility",
    6: "Harmony, responsibility, love, nurturing",
    7: "Wisdom, spirituality, analysis, introspection",
    8: "Power, abundance, success, material wealth",
    9: "Completion, humanitarianism, wisdom, universal love",
    11: "Master Number: Intuition, spiritual insight, enlightenment",
    22: "Master Number: Master builder, large-scale achievements",
    33: "Master Number: Master teacher, compassion, blessing"
  };
  return meanings[num] || "Unique vibration with special significance";
};

export const getBusinessRecommendation = (num: number): string => {
  const recommendations: Record<number, string> = {
    1: "Excellent for startups, tech companies, and innovative ventures.",
    2: "Perfect for partnerships, consulting firms, and service-based businesses.",
    3: "Ideal for creative agencies, entertainment, marketing firms.",
    4: "Great for construction, manufacturing, financial services.",
    5: "Suited for travel, media, and dynamic industries.",
    6: "Perfect for healthcare, hospitality, family businesses.",
    7: "Excellent for research, technology, spiritual services.",
    8: "Powerful for finance, real estate, large corporations.",
    9: "Ideal for non-profits, global brands, humanitarian causes.",
    11: "Masterful for spiritual enterprises, innovative tech, visionary companies.",
    22: "Supreme for large-scale construction, international business.",
    33: "Perfect for educational institutions, healing centers."
  };
  return recommendations[num] || "This vibration carries unique business potential.";
};

export const getVibrationType = (num: number): 'excellent' | 'good' | 'neutral' => {
  if ([1, 3, 5, 8, 11, 22, 33].includes(num)) return 'excellent';
  if ([2, 6, 9].includes(num)) return 'good';
  return 'neutral';
};

export const SYSTEM_INFO: Record<CalculationSystem, { title: string; description: string }> = {
  pythagorean: {
    title: 'Pythagorean',
    description: 'Modern Western system based on sequential letter values (1-9)'
  },
  chaldean: {
    title: 'Chaldean',
    description: 'Ancient Babylonian system preferred for business names'
  },
  gematria: {
    title: 'Gematria',
    description: 'Hebrew mystical tradition with larger number values'
  }
};
