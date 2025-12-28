import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageSquare, Sparkles, ArrowRight, Loader2, RotateCcw, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertInsight from '@/components/ExpertInsight';
import AdPlacement from '@/components/AdPlacement';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

const calculateSloganVibration = (slogan: string, system: CalculationSystem): { number: number; breakdown: string; wordBreakdown: string[] } => {
  const words = slogan.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const wordBreakdown: string[] = [];
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : system === 'chaldean' ? CHALDEAN_MAP : GEMATRIA_MAP;
  let totalSum = 0;

  for (const word of words) {
    const cleanWord = word.replace(/[^a-z]/g, '');
    let wordSum = 0;
    for (const letter of cleanWord) {
      wordSum += map[letter] || 0;
    }
    const reducedWord = reduceToSingleDigit(wordSum);
    wordBreakdown.push(`"${word}" = ${wordSum} → ${reducedWord}`);
    totalSum += wordSum;
  }

  const finalNumber = reduceToSingleDigit(totalSum);
  const breakdown = `Total: ${totalSum} → ${finalNumber}`;

  return { number: finalNumber, breakdown, wordBreakdown };
};

const getSloganMeaning = (num: number): { energy: string; marketingPower: string; bestFor: string[] } => {
  const meanings: Record<number, { energy: string; marketingPower: string; bestFor: string[] }> = {
    1: {
      energy: "Bold, pioneering, and attention-grabbing. This slogan commands immediate notice.",
      marketingPower: "Excellent for launch campaigns and brand positioning. Creates strong first impressions.",
      bestFor: ["Tech startups", "Innovative products", "Leadership brands", "First-to-market campaigns"]
    },
    2: {
      energy: "Collaborative, trustworthy, and relationship-focused. This slogan builds connection.",
      marketingPower: "Perfect for B2B marketing and partnership messaging. Builds long-term trust.",
      bestFor: ["Service businesses", "Consulting firms", "Partnership announcements", "Customer loyalty"]
    },
    3: {
      energy: "Creative, joyful, and socially engaging. This slogan sparks conversation.",
      marketingPower: "Ideal for social media campaigns and viral potential. Memorable and shareable.",
      bestFor: ["Entertainment brands", "Social campaigns", "Youth marketing", "Creative agencies"]
    },
    4: {
      energy: "Reliable, structured, and trustworthy. This slogan conveys stability.",
      marketingPower: "Strong for financial services and B2B. Builds credibility and confidence.",
      bestFor: ["Banks", "Insurance", "Construction", "Traditional industries"]
    },
    5: {
      energy: "Dynamic, exciting, and freedom-inspiring. This slogan creates urgency.",
      marketingPower: "Excellent for limited-time offers and adventure brands. Drives action.",
      bestFor: ["Travel companies", "Flash sales", "Adventure brands", "Media companies"]
    },
    6: {
      energy: "Nurturing, harmonious, and family-oriented. This slogan creates warmth.",
      marketingPower: "Perfect for lifestyle brands and family products. Builds emotional connection.",
      bestFor: ["Home goods", "Healthcare", "Family products", "Community brands"]
    },
    7: {
      energy: "Thoughtful, expert, and sophisticated. This slogan conveys wisdom.",
      marketingPower: "Ideal for premium positioning and thought leadership. Attracts discerning customers.",
      bestFor: ["Research firms", "Premium products", "Educational brands", "Tech consulting"]
    },
    8: {
      energy: "Powerful, ambitious, and success-oriented. This slogan commands respect.",
      marketingPower: "Exceptional for luxury brands and B2B enterprise. Projects authority.",
      bestFor: ["Luxury goods", "Enterprise software", "Financial services", "Real estate"]
    },
    9: {
      energy: "Inspirational, humanitarian, and visionary. This slogan moves people.",
      marketingPower: "Powerful for cause marketing and global brands. Creates emotional impact.",
      bestFor: ["Non-profits", "Global campaigns", "Sustainability brands", "Social enterprises"]
    },
    11: {
      energy: "Visionary, intuitive, and spiritually resonant. This slogan inspires transformation.",
      marketingPower: "Rare vibrational power for breakthrough campaigns. Creates lasting impression.",
      bestFor: ["Innovation brands", "Spiritual products", "Transformative services", "Thought leaders"]
    },
    22: {
      energy: "Masterful, large-scale, and transformative. This slogan suggests world-changing impact.",
      marketingPower: "Ultimate power for global campaigns and infrastructure brands.",
      bestFor: ["Global corporations", "Infrastructure projects", "International campaigns", "Legacy brands"]
    },
    33: {
      energy: "Compassionate, uplifting, and universally healing. This slogan touches hearts.",
      marketingPower: "Exceptional for healing and educational brands. Creates deep emotional resonance.",
      bestFor: ["Healthcare", "Education", "Wellness brands", "Humanitarian organizations"]
    }
  };

  return meanings[num] || {
    energy: "This unique vibration carries special marketing potential.",
    marketingPower: "Analyze the context to maximize its impact.",
    bestFor: ["Various applications depending on industry"]
  };
};

interface SloganResult {
  slogan: string;
  number: number;
  breakdown: string;
  wordBreakdown: string[];
  meaning: { energy: string; marketingPower: string; bestFor: string[] };
  system: CalculationSystem;
}

const SloganAnalyzer = () => {
  const [system, setSystem] = useState<CalculationSystem>('chaldean');
  const [slogan, setSlogan] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<SloganResult | null>(null);
  const [savedSlogans, setSavedSlogans] = useState<SloganResult[]>([]);

  const handleAnalyze = () => {
    if (!slogan.trim()) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const vibration = calculateSloganVibration(slogan, system);
      const meaning = getSloganMeaning(vibration.number);
      
      const newResult: SloganResult = {
        slogan: slogan.trim(),
        number: vibration.number,
        breakdown: vibration.breakdown,
        wordBreakdown: vibration.wordBreakdown,
        meaning,
        system
      };
      
      setResult(newResult);
      setIsCalculating(false);
    }, 600);
  };

  const handleSave = () => {
    if (result && !savedSlogans.some(s => s.slogan === result.slogan)) {
      setSavedSlogans([...savedSlogans, result]);
    }
  };

  const handleReset = () => {
    setSlogan('');
    setResult(null);
  };

  return (
    <>
      <Helmet>
        <title>Slogan Analyzer - Marketing Phrase Numerology Calculator</title>
        <meta 
          name="description" 
          content="Analyze the vibrational energy of your marketing slogans and taglines using Pythagorean, Chaldean, or Gematria numerology." 
        />
        <link rel="canonical" href="https://numerologyhub.com/slogan-analyzer" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Marketing Numerology</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
                Slogan Analyzer
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate the vibrational energy of your marketing phrases and taglines 
                to maximize their impact.
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
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground">
                      {system === 'pythagorean' ? 'Pythagorean' : system === 'chaldean' ? 'Chaldean' : 'Gematria'} Slogan Analysis
                    </h2>
                    <p className="text-xs text-muted-foreground">Analyze the vibrational power of marketing phrases</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="slogan" className="text-foreground">Your Slogan or Tagline</Label>
                    <Textarea
                      id="slogan"
                      placeholder="Enter your marketing slogan, tagline, or phrase..."
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      className="bg-muted/50 border-border min-h-[80px] resize-none"
                      maxLength={150}
                    />
                    <p className="text-xs text-muted-foreground text-right">{slogan.length}/150</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleAnalyze}
                      disabled={!slogan.trim() || isCalculating}
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 glow-effect"
                    >
                      {isCalculating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Slogan
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
                      <p className="text-lg font-display font-medium text-foreground mt-2">
                        "{result.slogan}"
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Energy Profile
                        </h3>
                        <p className="text-sm text-muted-foreground">{result.meaning.energy}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-accent" />
                          Marketing Power
                        </h3>
                        <p className="text-sm text-muted-foreground">{result.meaning.marketingPower}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2">Best For</h3>
                        <div className="flex flex-wrap gap-2">
                          {result.meaning.bestFor.map((item, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2">Word-by-Word Breakdown</h3>
                        <div className="space-y-1">
                          {result.wordBreakdown.map((item, index) => (
                            <p key={index} className="text-xs text-muted-foreground font-mono">{item}</p>
                          ))}
                          <p className="text-xs text-primary font-mono font-semibold mt-2">{result.breakdown}</p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={handleSave}
                        disabled={savedSlogans.some(s => s.slogan === result.slogan)}
                        className="w-full border-border"
                      >
                        {savedSlogans.some(s => s.slogan === result.slogan) ? 'Saved!' : 'Save for Comparison'}
                      </Button>
                    </div>

                    <ExpertInsight 
                      method={system === 'gematria' ? 'pythagorean' : system} 
                      number={result.number} 
                      context="slogan" 
                    />
                  </div>
                )}
              </div>

              {savedSlogans.length > 0 && (
                <div className="mt-8 mystic-card p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">Saved Slogans</h3>
                  <div className="space-y-3">
                    {savedSlogans.map((saved, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                        <div>
                          <span className="text-sm text-foreground">"{saved.slogan}"</span>
                          <span className="text-xs text-muted-foreground ml-2 capitalize">({saved.system})</span>
                        </div>
                        <div className="number-orb w-8 h-8 text-sm">
                          {saved.number}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

export default SloganAnalyzer;
