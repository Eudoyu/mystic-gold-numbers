import { useState, useCallback } from 'react';

// Pythagorean number mapping (Modern Western)
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

// Chaldean number mapping (Ancient/Business - more accurate for names)
const CHALDEAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
};

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  destiny: number;
  lifePathBreakdown: string;
  expressionBreakdown: string;
  soulUrgeBreakdown: string;
}

export interface BusinessNameResult {
  chaldeanNumber: number;
  pythagoreanNumber: number;
  vibration: string;
  breakdown: string;
  recommendation: string;
}

const reduceToSingleDigit = (num: number): number => {
  // Master numbers 11, 22, 33 are preserved
  if (num === 11 || num === 22 || num === 33) return num;
  
  while (num > 9) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
};

const calculateLifePath = (birthdate: string): { number: number; breakdown: string } => {
  const [year, month, day] = birthdate.split('-').map(Number);
  
  const dayReduced = reduceToSingleDigit(day);
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(String(year).split('').reduce((sum, d) => sum + parseInt(d), 0));
  
  const total = dayReduced + monthReduced + yearReduced;
  const lifePath = reduceToSingleDigit(total);
  
  return {
    number: lifePath,
    breakdown: `${month}/${day}/${year} → ${monthReduced} + ${dayReduced} + ${yearReduced} = ${total} → ${lifePath}`
  };
};

const calculateNameNumber = (
  name: string, 
  system: 'pythagorean' | 'chaldean',
  letterFilter?: (letter: string) => boolean
): { number: number; breakdown: string } => {
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : CHALDEAN_MAP;
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  
  let breakdown: string[] = [];
  let total = 0;
  
  for (const letter of cleanName) {
    if (letterFilter && !letterFilter(letter)) continue;
    const value = map[letter] || 0;
    if (value > 0) {
      breakdown.push(`${letter.toUpperCase()}(${value})`);
      total += value;
    }
  }
  
  const finalNumber = reduceToSingleDigit(total);
  
  return {
    number: finalNumber,
    breakdown: `${breakdown.join(' + ')} = ${total} → ${finalNumber}`
  };
};

const getVibrationMeaning = (num: number): string => {
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

const getBusinessRecommendation = (num: number): string => {
  const recommendations: Record<number, string> = {
    1: "Excellent for startups, tech companies, and innovative ventures. Projects leadership and uniqueness.",
    2: "Perfect for partnerships, consulting firms, and service-based businesses. Emphasizes collaboration.",
    3: "Ideal for creative agencies, entertainment, marketing firms. Radiates creativity and communication.",
    4: "Great for construction, manufacturing, financial services. Conveys reliability and structure.",
    5: "Suited for travel, media, and dynamic industries. Suggests adaptability and excitement.",
    6: "Perfect for healthcare, hospitality, family businesses. Projects care and responsibility.",
    7: "Excellent for research, technology, spiritual services. Implies depth and expertise.",
    8: "Powerful for finance, real estate, large corporations. Commands authority and success.",
    9: "Ideal for non-profits, global brands, humanitarian causes. Suggests completion and wisdom.",
    11: "Masterful for spiritual enterprises, innovative tech, visionary companies.",
    22: "Supreme for large-scale construction, international business, infrastructure.",
    33: "Perfect for educational institutions, healing centers, transformative organizations."
  };
  return recommendations[num] || "This vibration carries unique business potential.";
};

export const useNumerology = () => {
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [businessResult, setBusinessResult] = useState<BusinessNameResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculatePersonalNumbers = useCallback((
    name: string, 
    birthdate: string, 
    system: 'pythagorean' | 'chaldean' = 'pythagorean'
  ) => {
    setIsCalculating(true);
    
    // Simulate calculation delay for UX
    setTimeout(() => {
      const lifePath = calculateLifePath(birthdate);
      const expression = calculateNameNumber(name, system);
      const soulUrge = calculateNameNumber(name, system, (letter) => VOWELS.includes(letter));
      const personality = calculateNameNumber(name, system, (letter) => !VOWELS.includes(letter));
      
      // Destiny is combination of life path and expression
      const destinyTotal = lifePath.number + expression.number;
      const destiny = reduceToSingleDigit(destinyTotal);

      setResult({
        lifePath: lifePath.number,
        expression: expression.number,
        soulUrge: soulUrge.number,
        personality: personality.number,
        destiny,
        lifePathBreakdown: lifePath.breakdown,
        expressionBreakdown: expression.breakdown,
        soulUrgeBreakdown: soulUrge.breakdown
      });
      
      setIsCalculating(false);
    }, 800);
  }, []);

  const calculateBusinessName = useCallback((businessName: string) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const chaldean = calculateNameNumber(businessName, 'chaldean');
      const pythagorean = calculateNameNumber(businessName, 'pythagorean');
      
      setBusinessResult({
        chaldeanNumber: chaldean.number,
        pythagoreanNumber: pythagorean.number,
        vibration: getVibrationMeaning(chaldean.number),
        breakdown: chaldean.breakdown,
        recommendation: getBusinessRecommendation(chaldean.number)
      });
      
      setIsCalculating(false);
    }, 600);
  }, []);

  const clearResults = useCallback(() => {
    setResult(null);
    setBusinessResult(null);
  }, []);

  return {
    result,
    businessResult,
    isCalculating,
    calculatePersonalNumbers,
    calculateBusinessName,
    clearResults,
    getVibrationMeaning
  };
};

export default useNumerology;
