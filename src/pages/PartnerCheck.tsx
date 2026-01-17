import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, ArrowRight, Loader2, RotateCcw, Sparkles, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertInsight from '@/components/ExpertInsight';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserPlan } from '@/hooks/useUserPlan';

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

const calculateLifePath = (birthdate: string): number => {
  const [year, month, day] = birthdate.split('-').map(Number);
  const dayReduced = reduceToSingleDigit(day);
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(String(year).split('').reduce((sum, d) => sum + parseInt(d), 0));
  return reduceToSingleDigit(dayReduced + monthReduced + yearReduced);
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
  person1Number: number;
  person2Number: number;
  score: number;
  level: string;
  description: string;
  combinedNumber: number;
}

const PartnerCheck = () => {
  const [system, setSystem] = useState<CalculationSystem>('pythagorean');
  const [partnerType, setPartnerType] = useState<'associate' | 'client'>('associate');
  const [person1Name, setPerson1Name] = useState('');
  const [person1Birthdate, setPerson1Birthdate] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2Birthdate, setPerson2Birthdate] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const { canAccessChaldean, canAccessGematria } = useUserPlan();

  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Use Life Path for person compatibility
      const num1 = calculateLifePath(person1Birthdate);
      const num2 = calculateLifePath(person2Birthdate);
      
      const compatibility = getCompatibilityScore(num1, num2);
      const combined = reduceToSingleDigit(num1 + num2);
      
      setResult({
        person1Number: num1,
        person2Number: num2,
        score: compatibility.score,
        level: compatibility.level,
        description: compatibility.description,
        combinedNumber: combined
      });
      
      setIsCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setPerson1Name('');
    setPerson1Birthdate('');
    setPerson2Name('');
    setPerson2Birthdate('');
    setResult(null);
  };

  const isValid = person1Name && person1Birthdate && person2Name && person2Birthdate;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-primary';
    if (score >= 55) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <>
      <Helmet>
        <title>Partner Check - Business Partner & Client Compatibility</title>
        <meta 
          name="description" 
          content="Check numerological compatibility between business partners or with clients. Person to person analysis using birthdate and name." 
        />
        <link rel="canonical" href="https://numerologyhub.com/partner-check" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Partner Check</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
                Partner Compatibility
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Analyze numerological compatibility between you and your business partner or client.
                Person to person analysis using Life Path numbers.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* System Selection */}
              <Tabs value={system} onValueChange={(v) => setSystem(v as CalculationSystem)} className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pythagorean">Pythagorean</TabsTrigger>
                  <TabsTrigger value="chaldean" disabled={!canAccessChaldean}>
                    Chaldean
                    {!canAccessChaldean && <Lock className="w-3 h-3 ml-1 opacity-60" />}
                  </TabsTrigger>
                  <TabsTrigger value="gematria" disabled={!canAccessGematria}>
                    Gematria
                    {!canAccessGematria && <Lock className="w-3 h-3 ml-1 opacity-60" />}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Partner Type Selection */}
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={partnerType === 'associate' ? 'default' : 'outline'}
                  onClick={() => setPartnerType('associate')}
                  className="flex-1"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Business Associate
                </Button>
                <Button
                  type="button"
                  variant={partnerType === 'client' ? 'default' : 'outline'}
                  onClick={() => setPartnerType('client')}
                  className="flex-1"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Client
                </Button>
              </div>

              <div className="mystic-card p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Person 1 */}
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-foreground">You</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="p1name">Full Name</Label>
                      <Input
                        id="p1name"
                        placeholder="Enter your full name"
                        value={person1Name}
                        onChange={(e) => setPerson1Name(e.target.value)}
                        className="bg-muted/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="p1birth">Birth Date</Label>
                      <Input
                        id="p1birth"
                        type="date"
                        value={person1Birthdate}
                        onChange={(e) => setPerson1Birthdate(e.target.value)}
                        className="bg-muted/50"
                      />
                    </div>
                  </div>

                  {/* Person 2 */}
                  <div className="space-y-4">
                    <h3 className="font-display font-semibold text-foreground">
                      {partnerType === 'associate' ? 'Business Associate' : 'Client'}
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="p2name">Full Name</Label>
                      <Input
                        id="p2name"
                        placeholder={`Enter ${partnerType === 'associate' ? 'partner' : 'client'}'s name`}
                        value={person2Name}
                        onChange={(e) => setPerson2Name(e.target.value)}
                        className="bg-muted/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="p2birth">Birth Date</Label>
                      <Input
                        id="p2birth"
                        type="date"
                        value={person2Birthdate}
                        onChange={(e) => setPerson2Birthdate(e.target.value)}
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
                  
                  {(person1Name || person2Name || result) && (
                    <Button variant="outline" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Results */}
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
                        <div className="text-2xl font-bold text-primary">{result.person1Number}</div>
                        <div className="text-xs text-muted-foreground">Your Number</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary">{result.combinedNumber}</div>
                        <div className="text-xs text-muted-foreground">Combined</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary">{result.person2Number}</div>
                        <div className="text-xs text-muted-foreground">{partnerType === 'associate' ? 'Partner' : 'Client'}'s Number</div>
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
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PartnerCheck;
