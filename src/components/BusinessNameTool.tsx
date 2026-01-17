import { useState } from 'react';
import { Building2, Sparkles, ArrowRight, Loader2, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdPlacement from '@/components/AdPlacement';
import TieredAccessWrapper from '@/components/TieredAccessWrapper';
import { useUserPlan } from '@/hooks/useUserPlan';

type CalculationSystem = 'pythagorean' | 'chaldean' | 'gematria';

const PYTHAGOREAN_MAP: { [key: string]: number } = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const CHALDEAN_MAP: { [key: string]: number } = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 8, g: 3, h: 5, i: 1,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 7, p: 8, q: 1, r: 2,
  s: 3, t: 4, u: 6, v: 6, w: 6, x: 5, y: 1, z: 7
};

const GEMATRIA_MAP: { [key: string]: number } = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 10, k: 20, l: 30, m: 40, n: 50, o: 60, p: 70, q: 80, r: 90,
  s: 100, t: 200, u: 300, v: 400, w: 500, x: 600, y: 700, z: 800
};

const reduceToSingleDigit = (num: number): number => {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
};

const calculateNameNumber = (name: string, system: CalculationSystem): { number: number; breakdown: string } => {
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : system === 'chaldean' ? CHALDEAN_MAP : GEMATRIA_MAP;
  const letters = name.toLowerCase().replace(/[^a-z]/g, '').split('');
  const values = letters.map(l => map[l] || 0);
  const total = values.reduce((sum, v) => sum + v, 0);
  const breakdown = letters.map((l, i) => `${l.toUpperCase()}(${values[i]})`).join(' + ') + ` = ${total}`;
  return { number: reduceToSingleDigit(total), breakdown: breakdown + ` → ${reduceToSingleDigit(total)}` };
};

const getVibrationMeaning = (num: number): { vibration: string; recommendation: string } => {
  const meanings: { [key: number]: { vibration: string; recommendation: string } } = {
    1: { vibration: "Leadership, independence, and pioneering energy. This number represents new beginnings and self-reliance.", recommendation: "Excellent for startups, solo ventures, and brands that want to be seen as innovative leaders in their field." },
    2: { vibration: "Partnership, diplomacy, and cooperation. This number brings harmony and balance.", recommendation: "Great for consulting firms, partnerships, and businesses focused on relationships and collaboration." },
    3: { vibration: "Creativity, communication, and expression. This number inspires joy and artistic energy.", recommendation: "Perfect for creative agencies, entertainment, marketing, and any business involving self-expression." },
    4: { vibration: "Stability, structure, and hard work. This number represents solid foundations.", recommendation: "Ideal for construction, manufacturing, financial services, and businesses requiring trust and reliability." },
    5: { vibration: "Change, freedom, and adventure. This number brings dynamic energy and versatility.", recommendation: "Excellent for travel, tech startups, media companies, and businesses embracing innovation and change." },
    6: { vibration: "Nurturing, responsibility, and service. This number represents care and community.", recommendation: "Perfect for healthcare, hospitality, family businesses, and service-oriented companies." },
    7: { vibration: "Wisdom, spirituality, and analysis. This number brings depth and introspection.", recommendation: "Great for research, education, spiritual services, and businesses requiring expertise and knowledge." },
    8: { vibration: "Abundance, power, and material success. This number represents achievement and authority.", recommendation: "Excellent for finance, real estate, corporate enterprises, and ambitious ventures seeking growth." },
    9: { vibration: "Humanitarianism, completion, and universal love. This number represents global impact.", recommendation: "Perfect for nonprofits, international businesses, and companies with a mission to serve humanity." },
    11: { vibration: "Master Number - Intuition, inspiration, and spiritual insight. Highly charged energy.", recommendation: "Ideal for visionary companies, spiritual businesses, and brands seeking to inspire and illuminate." },
    22: { vibration: "Master Number - Master Builder, turning dreams into reality. Powerful manifestation energy.", recommendation: "Excellent for large-scale projects, architecture, and businesses with ambitious global goals." },
    33: { vibration: "Master Number - Master Teacher, compassion and healing. The highest vibration.", recommendation: "Perfect for healing practices, educational institutions, and businesses dedicated to uplifting humanity." }
  };
  return meanings[num] || meanings[reduceToSingleDigit(num)];
};

const systemInfo: { [key in CalculationSystem]: { title: string; description: string } } = {
  pythagorean: { title: "Pythagorean Business Analysis", description: "Modern Western numerology system based on sequential letter values" },
  chaldean: { title: "Chaldean Business Analysis", description: "Ancient Babylonian system preferred for business and brand names" },
  gematria: { title: "Gematria Business Analysis", description: "Hebrew mystical tradition assigning values to letters" }
};

interface BusinessResult {
  number: number;
  vibration: string;
  recommendation: string;
  breakdown: string;
}

const BusinessNameTool = () => {
  const [businessName, setBusinessName] = useState('');
  const [system, setSystem] = useState<CalculationSystem>('pythagorean');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<BusinessResult | null>(null);
  const { canAccessChaldean, canAccessGematria, dailyCalculationsRemaining, planType } = useUserPlan();

  const handleAnalyze = () => {
    if (businessName.trim()) {
      setIsCalculating(true);
      setTimeout(() => {
        const { number, breakdown } = calculateNameNumber(businessName, system);
        const { vibration, recommendation } = getVibrationMeaning(number);
        setResult({ number, vibration, recommendation, breakdown });
        setIsCalculating(false);
      }, 500);
    }
  };

  const getVibrationType = (num: number): 'excellent' | 'good' | 'neutral' => {
    if ([1, 5, 6, 8, 9].includes(num)) return 'excellent';
    if ([2, 3, 11, 22, 33].includes(num)) return 'good';
    return 'neutral';
  };

  const canUseSystem = (sys: CalculationSystem) => {
    if (sys === 'pythagorean') return true;
    if (sys === 'chaldean') return canAccessChaldean;
    if (sys === 'gematria') return canAccessGematria;
    return false;
  };

  const handleSystemChange = (newSystem: string) => {
    const sys = newSystem as CalculationSystem;
    if (canUseSystem(sys)) {
      setSystem(sys);
      setResult(null);
    }
  };

  return (
    <section id="business" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Building2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Business Numerology</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 gold-text">
            Analyze Your Business Name
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your company name or brand against numerological vibrations 
            to ensure maximum success and alignment.
          </p>
        </div>

        {/* System Selection Tabs */}
        <div className="max-w-2xl mx-auto mb-6">
          <Tabs value={system} onValueChange={handleSystemChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="pythagorean" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Pythagorean
              </TabsTrigger>
              <TabsTrigger 
                value="chaldean" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
                disabled={!canAccessChaldean}
              >
                Chaldean
                {!canAccessChaldean && <Lock className="w-3 h-3 ml-1 opacity-60" />}
              </TabsTrigger>
              <TabsTrigger 
                value="gematria" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
                disabled={!canAccessGematria}
              >
                Gematria
                {!canAccessGematria && <Lock className="w-3 h-3 ml-1 opacity-60" />}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {planType === 'free' && dailyCalculationsRemaining <= 0 && (
            <p className="text-center text-sm text-amber-500 mt-2">
              Daily limit reached. Upgrade for unlimited calculations.
            </p>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mystic-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">{systemInfo[system].title}</h3>
                <p className="text-xs text-muted-foreground">{systemInfo[system].description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-foreground">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Enter your company name or brand"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-muted/50 border-border focus:border-accent focus:ring-accent/20"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!businessName.trim() || isCalculating}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-effect"
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
            </div>

            {result && (
              <div className="mt-8 space-y-6 animate-fade-in">
                <div className="text-center p-6 rounded-xl bg-background/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-2 capitalize">{system} Number</p>
                  <div className="number-orb mx-auto mb-3 w-20 h-20 text-3xl">
                    {result.number}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Vibration Energy
                    </h4>
                    <p className="text-sm text-muted-foreground">{result.vibration}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                      {getVibrationType(result.number) === 'excellent' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-accent" />
                      )}
                      Business Recommendation
                    </h4>
                    <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-display font-semibold text-foreground mb-2">Calculation Breakdown</h4>
                    <p className="text-xs text-muted-foreground font-mono">{result.breakdown}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ad Placement */}
        <div className="max-w-2xl mx-auto mt-8">
          <AdPlacement height="h-[100px]" label="AD-PLACEMENT-HIGH-CTR • In-Content 728x100" />
        </div>
      </div>
    </section>
  );
};

export default BusinessNameTool;
