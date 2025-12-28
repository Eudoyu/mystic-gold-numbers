import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Sparkles, ArrowRight, Loader2, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertInsight from '@/components/ExpertInsight';
import AdPlacement from '@/components/AdPlacement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Numerology calculation maps
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const CHALDEAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
};

const GEMATRIA_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 10, k: 20, l: 30, m: 40, n: 50, o: 60, p: 70, q: 80, r: 90,
  s: 100, t: 200, u: 300, v: 400, w: 500, x: 600, y: 700, z: 800
};

type CalculationSystem = 'pythagorean' | 'chaldean' | 'gematria';

const reduceToSingleDigit = (num: number): number => {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
};

const calculateNameNumber = (name: string, system: CalculationSystem): { number: number; breakdown: string } => {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : system === 'chaldean' ? CHALDEAN_MAP : GEMATRIA_MAP;
  
  let total = 0;
  const letterValues: string[] = [];
  
  for (const letter of cleanName) {
    const value = map[letter] || 0;
    total += value;
    letterValues.push(`${letter.toUpperCase()}=${value}`);
  }
  
  const finalNumber = reduceToSingleDigit(total);
  const breakdown = `${letterValues.join(' + ')} = ${total} → ${finalNumber}`;
  
  return { number: finalNumber, breakdown };
};

const getVibrationMeaning = (num: number): { vibration: string; recommendation: string } => {
  const meanings: Record<number, { vibration: string; recommendation: string }> = {
    1: {
      vibration: "Leadership, independence, and pioneering energy. This name attracts innovation and first-mover advantage.",
      recommendation: "Excellent for startups, tech companies, and brands positioning themselves as industry leaders."
    },
    2: {
      vibration: "Partnership, diplomacy, and cooperation. This name builds trust and fosters relationships.",
      recommendation: "Ideal for consulting firms, partnerships, and service-oriented businesses."
    },
    3: {
      vibration: "Creativity, communication, and social engagement. This name sparks joy and conversation.",
      recommendation: "Perfect for creative agencies, entertainment, and social media brands."
    },
    4: {
      vibration: "Stability, structure, and reliability. This name conveys trustworthiness and longevity.",
      recommendation: "Great for financial institutions, construction, and established brands."
    },
    5: {
      vibration: "Freedom, change, and dynamism. This name attracts adventurous and progressive customers.",
      recommendation: "Suited for travel, media, and innovation-driven companies."
    },
    6: {
      vibration: "Harmony, nurturing, and responsibility. This name creates emotional connections.",
      recommendation: "Ideal for healthcare, hospitality, and family-oriented businesses."
    },
    7: {
      vibration: "Analysis, wisdom, and depth. This name suggests expertise and thoughtfulness.",
      recommendation: "Perfect for research firms, technology, and premium consulting."
    },
    8: {
      vibration: "Power, ambition, and material success. This name commands respect and authority.",
      recommendation: "Excellent for finance, luxury brands, and enterprise businesses."
    },
    9: {
      vibration: "Completion, humanitarianism, and global vision. This name inspires transformation.",
      recommendation: "Suited for non-profits, global brands, and purpose-driven companies."
    },
    11: {
      vibration: "Master Number: Intuition, inspiration, and visionary energy. Highly spiritual vibration.",
      recommendation: "Rare and powerful for innovative tech, spiritual enterprises, and thought leaders."
    },
    22: {
      vibration: "Master Builder: Large-scale achievements and practical idealism. Creates lasting impact.",
      recommendation: "Exceptional for construction empires, infrastructure, and global corporations."
    },
    33: {
      vibration: "Master Teacher: Compassion, healing, and transformative influence.",
      recommendation: "Ideal for educational institutions, healing centers, and humanitarian organizations."
    }
  };

  return meanings[num] || {
    vibration: "This unique vibration carries special potential for your business.",
    recommendation: "Analyze the context to maximize its impact."
  };
};

interface BusinessResult {
  name: string;
  number: number;
  breakdown: string;
  vibration: string;
  recommendation: string;
  system: CalculationSystem;
}

const BusinessNames = () => {
  const [system, setSystem] = useState<CalculationSystem>('chaldean');
  const [businessName, setBusinessName] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<BusinessResult | null>(null);

  const handleAnalyze = () => {
    if (!businessName.trim()) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const calc = calculateNameNumber(businessName, system);
      const meaning = getVibrationMeaning(calc.number);
      
      setResult({
        name: businessName.trim(),
        number: calc.number,
        breakdown: calc.breakdown,
        vibration: meaning.vibration,
        recommendation: meaning.recommendation,
        system
      });
      
      setIsCalculating(false);
    }, 600);
  };

  const handleReset = () => {
    setBusinessName('');
    setResult(null);
  };

  const getVibrationType = (num: number): 'excellent' | 'good' | 'neutral' => {
    if ([1, 5, 6, 8, 9].includes(num)) return 'excellent';
    if ([2, 3, 11, 22, 33].includes(num)) return 'good';
    return 'neutral';
  };

  return (
    <>
      <Helmet>
        <title>Business Name Numerology Calculator - Pythagorean, Chaldean & Gematria</title>
        <meta 
          name="description" 
          content="Analyze your business name using Pythagorean, Chaldean, or Gematria numerology. Discover the vibrational energy of your company name." 
        />
        <link rel="canonical" href="https://numerologyhub.com/business-names" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Business Numerology</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
                Business Name Analyzer
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Test your company name, brand, or product name against ancient numerological 
                vibrations to ensure maximum success.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* System Selection */}
              <Tabs value={system} onValueChange={(v) => { setSystem(v as CalculationSystem); setResult(null); }} className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pythagorean">Pythagorean</TabsTrigger>
                  <TabsTrigger value="chaldean">Chaldean</TabsTrigger>
                  <TabsTrigger value="gematria">Gematria</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mystic-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground">
                      {system === 'pythagorean' ? 'Pythagorean' : system === 'chaldean' ? 'Chaldean' : 'Gematria'} Analysis
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {system === 'pythagorean' && 'Modern Western system based on sequential letter values'}
                      {system === 'chaldean' && 'Ancient Babylonian system preferred for business names'}
                      {system === 'gematria' && 'Hebrew-based system with expanded numerical values'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-foreground">Business Name</Label>
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Enter your company name, brand, or product"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                      className="bg-muted/50 border-border focus:border-accent focus:ring-accent/20"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleAnalyze}
                      disabled={!businessName.trim() || isCalculating}
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 glow-effect"
                    >
                      {isCalculating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Name
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    {result && (
                      <Button variant="outline" onClick={handleReset} className="border-border">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {result && (
                  <div className="mt-8 space-y-6 animate-fade-in">
                    <div className="text-center p-6 rounded-xl bg-background/50 border border-border">
                      <p className="text-sm text-muted-foreground mb-2 capitalize">{result.system} Number</p>
                      <div className="number-orb mx-auto mb-3 w-20 h-20 text-3xl">
                        {result.number}
                      </div>
                      <p className="text-lg font-display font-medium text-foreground">
                        "{result.name}"
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Vibration Energy
                        </h3>
                        <p className="text-sm text-muted-foreground">{result.vibration}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                          {getVibrationType(result.number) === 'excellent' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-accent" />
                          )}
                          Business Recommendation
                        </h3>
                        <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2">Calculation Breakdown</h3>
                        <p className="text-xs text-muted-foreground font-mono break-all">{result.breakdown}</p>
                      </div>
                    </div>

                    <ExpertInsight 
                      method={system === 'gematria' ? 'pythagorean' : system} 
                      number={result.number} 
                      context="business" 
                    />
                  </div>
                )}
              </div>

              {/* Ad Placement */}
              <div className="mt-8">
                <AdPlacement height="h-[100px]" label="AD-PLACEMENT-HIGH-CTR • In-Content 728x100" />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BusinessNames;
