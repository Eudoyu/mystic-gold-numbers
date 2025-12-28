import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Users, ArrowRight, Loader2, RotateCcw, Sparkles } from 'lucide-react';
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

const calculateNameNumber = (name: string, system: CalculationSystem): number => {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const map = system === 'pythagorean' ? PYTHAGOREAN_MAP : system === 'chaldean' ? CHALDEAN_MAP : GEMATRIA_MAP;
  let total = 0;
  for (const letter of cleanName) {
    total += map[letter] || 0;
  }
  return reduceToSingleDigit(total);
};

const getCompatibilityScore = (num1: number, num2: number): { score: number; level: string; description: string } => {
  const compatibilityMatrix: Record<string, { score: number; level: string; description: string }> = {
    '1-1': { score: 75, level: 'Good', description: 'Two leaders who must learn to share the spotlight. Powerful when aligned on goals.' },
    '1-2': { score: 85, level: 'Excellent', description: 'Leader and diplomat complement each other beautifully. Great business partnership.' },
    '1-3': { score: 80, level: 'Great', description: 'Dynamic and creative combination. The leader inspires, the creative executes.' },
    '1-4': { score: 65, level: 'Moderate', description: 'Different approaches—innovation vs. tradition. Requires mutual respect.' },
    '1-5': { score: 90, level: 'Excellent', description: 'Both love independence and adventure. Exciting, dynamic partnership.' },
    '1-6': { score: 70, level: 'Good', description: 'Leader and nurturer can thrive if roles are clearly defined.' },
    '1-7': { score: 60, level: 'Moderate', description: 'Action vs. analysis. Can work with patience and understanding.' },
    '1-8': { score: 95, level: 'Outstanding', description: 'Power couple! Leadership meets ambition. Unstoppable in business.' },
    '1-9': { score: 75, level: 'Good', description: 'Pioneer meets visionary. Strong when focused on shared purpose.' },
    '2-2': { score: 80, level: 'Great', description: 'Harmonious and diplomatic. May need a third party to make decisions.' },
    '2-3': { score: 85, level: 'Excellent', description: 'Creativity flows when supported by diplomacy. Beautiful creative partnership.' },
    '2-4': { score: 75, level: 'Good', description: 'Stability meets sensitivity. Reliable and nurturing combination.' },
    '2-5': { score: 55, level: 'Challenging', description: 'Stability vs. change. Requires compromise and flexibility.' },
    '2-6': { score: 95, level: 'Outstanding', description: 'Both value harmony and relationships. Natural partners.' },
    '2-7': { score: 70, level: 'Good', description: 'Intuition meets analysis. Spiritually aligned when open.' },
    '2-8': { score: 65, level: 'Moderate', description: 'Diplomacy meets power. Balance is key.' },
    '2-9': { score: 80, level: 'Great', description: 'Service-oriented combination. Both care about others.' },
    '3-3': { score: 85, level: 'Excellent', description: 'Double creativity! Inspiring but may lack grounding.' },
    '3-4': { score: 60, level: 'Moderate', description: 'Free spirit meets structured thinker. Challenging but possible.' },
    '3-5': { score: 90, level: 'Excellent', description: 'Dynamic, exciting, and adventurous. Never a dull moment.' },
    '3-6': { score: 85, level: 'Excellent', description: 'Creative expression meets nurturing support. Harmonious.' },
    '3-7': { score: 65, level: 'Moderate', description: 'Social butterfly meets introvert. Requires understanding.' },
    '3-8': { score: 75, level: 'Good', description: 'Creativity supported by ambition. Good for creative business.' },
    '3-9': { score: 90, level: 'Excellent', description: 'Both creative and expressive. Inspiring partnership.' },
    '4-4': { score: 70, level: 'Good', description: 'Very stable but may lack spontaneity. Strong foundation.' },
    '4-5': { score: 45, level: 'Challenging', description: 'Order vs. chaos. Opposites that struggle to harmonize.' },
    '4-6': { score: 90, level: 'Excellent', description: 'Both value stability and family. Excellent long-term.' },
    '4-7': { score: 75, level: 'Good', description: 'Practical meets analytical. Solid intellectual connection.' },
    '4-8': { score: 95, level: 'Outstanding', description: 'Hard work meets ambition. Powerful business partnership.' },
    '4-9': { score: 60, level: 'Moderate', description: 'Detail-oriented meets big picture. Learning opportunity.' },
    '5-5': { score: 80, level: 'Great', description: 'Double adventure! Exciting but may lack stability.' },
    '5-6': { score: 55, level: 'Challenging', description: 'Freedom vs. responsibility. Requires negotiation.' },
    '5-7': { score: 70, level: 'Good', description: 'Adventure meets wisdom. Interesting intellectual dynamic.' },
    '5-8': { score: 75, level: 'Good', description: 'Risk-taker meets strategist. Can build empires together.' },
    '5-9': { score: 85, level: 'Excellent', description: 'Both love freedom and growth. Expansive partnership.' },
    '6-6': { score: 85, level: 'Excellent', description: 'Double nurturing. May over-give. Beautiful harmony.' },
    '6-7': { score: 65, level: 'Moderate', description: 'Heart meets mind. Balance needed.' },
    '6-8': { score: 80, level: 'Great', description: 'Family values meet ambition. Strong provider dynamic.' },
    '6-9': { score: 90, level: 'Excellent', description: 'Both service-oriented. Humanitarian partnership.' },
    '7-7': { score: 75, level: 'Good', description: 'Deep thinkers together. May lack action.' },
    '7-8': { score: 70, level: 'Good', description: 'Wisdom meets power. Strategic partnership.' },
    '7-9': { score: 85, level: 'Excellent', description: 'Spiritual alignment. Wisdom and vision combined.' },
    '8-8': { score: 80, level: 'Great', description: 'Double ambition! Powerful but competitive.' },
    '8-9': { score: 75, level: 'Good', description: 'Material success meets spiritual purpose. Balance needed.' },
    '9-9': { score: 85, level: 'Excellent', description: 'Double visionaries. Can change the world together.' },
  };

  const key1 = `${Math.min(num1, num2)}-${Math.max(num1, num2)}`;
  return compatibilityMatrix[key1] || { 
    score: 70, 
    level: 'Good', 
    description: 'This unique combination carries special potential. Focus on shared values and clear communication.' 
  };
};

interface CompatibilityResult {
  entity1Number: number;
  entity2Number: number;
  score: number;
  level: string;
  description: string;
  combinedNumber: number;
}

const Compatibility = () => {
  const [system, setSystem] = useState<CalculationSystem>('chaldean');
  const [entity1Name, setEntity1Name] = useState('');
  const [entity2Name, setEntity2Name] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const num1 = calculateNameNumber(entity1Name, system);
      const num2 = calculateNameNumber(entity2Name, system);
      
      const compatibility = getCompatibilityScore(num1, num2);
      const combined = reduceToSingleDigit(num1 + num2);
      
      setResult({
        entity1Number: num1,
        entity2Number: num2,
        score: compatibility.score,
        level: compatibility.level,
        description: compatibility.description,
        combinedNumber: combined
      });
      
      setIsCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setEntity1Name('');
    setEntity2Name('');
    setResult(null);
  };

  const isValid = entity1Name.trim() && entity2Name.trim();

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-primary';
    if (score >= 55) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <>
      <Helmet>
        <title>Business Compatibility Check - Company Name Numerology</title>
        <meta 
          name="description" 
          content="Check numerological compatibility between two business names, brands, or companies. Analyze partnership potential using Pythagorean, Chaldean, or Gematria systems." 
        />
        <link rel="canonical" href="https://numerologyhub.com/compatibility" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Business Compatibility</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
                Compatibility Check
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Analyze numerological compatibility between two business names, brands, 
                or companies to evaluate partnership potential.
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
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground">
                      {system === 'pythagorean' ? 'Pythagorean' : system === 'chaldean' ? 'Chaldean' : 'Gematria'} Compatibility
                    </h2>
                    <p className="text-xs text-muted-foreground">Compare two business or brand names</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-foreground">Business 1</h3>
                    <div className="space-y-2">
                      <Label htmlFor="entity1">Company / Brand Name</Label>
                      <Input
                        id="entity1"
                        placeholder="Enter first business name"
                        value={entity1Name}
                        onChange={(e) => setEntity1Name(e.target.value)}
                        className="bg-muted/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-foreground">Business 2</h3>
                    <div className="space-y-2">
                      <Label htmlFor="entity2">Company / Brand Name</Label>
                      <Input
                        id="entity2"
                        placeholder="Enter second business name"
                        value={entity2Name}
                        onChange={(e) => setEntity2Name(e.target.value)}
                        className="bg-muted/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleCalculate}
                    disabled={!isValid || isCalculating}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        Check Compatibility
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  {(entity1Name || entity2Name || result) && (
                    <Button variant="outline" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {result && (
                  <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 animate-fade-in">
                    <div className="text-center mb-6">
                      <div className="text-6xl font-display font-bold mb-2">
                        <span className={getScoreColor(result.score)}>{result.score}%</span>
                      </div>
                      <div className="text-xl font-semibold text-foreground">{result.level} Compatibility</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary">{result.entity1Number}</div>
                        <div className="text-xs text-muted-foreground">Business 1</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary">{result.combinedNumber}</div>
                        <div className="text-xs text-muted-foreground">Combined</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary">{result.entity2Number}</div>
                        <div className="text-xs text-muted-foreground">Business 2</div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-center">{result.description}</p>
                  </div>
                )}
              </div>

              {result && (
                <ExpertInsight
                  method={system === 'gematria' ? 'pythagorean' : system}
                  number={result.combinedNumber}
                  context="compatibility"
                />
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

export default Compatibility;
