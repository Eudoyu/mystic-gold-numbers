import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, ArrowRight, Loader2, RotateCcw, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertInsight from '@/components/ExpertInsight';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Compatibility calculation logic
const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const reduceToSingleDigit = (num: number): number => {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
};

const calculateNameNumber = (name: string): number => {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  let total = 0;
  for (const letter of cleanName) {
    total += PYTHAGOREAN_MAP[letter] || 0;
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
  const key2 = `${num1}-${num2}`;
  
  return compatibilityMatrix[key1] || compatibilityMatrix[key2] || { 
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

const Compatibility = () => {
  const [mode, setMode] = useState<'partner' | 'client'>('partner');
  const [entity1Type, setEntity1Type] = useState<'person' | 'corporate'>('person');
  const [entity2Type, setEntity2Type] = useState<'person' | 'corporate'>('person');
  const [person1Name, setPerson1Name] = useState('');
  const [person1Birthdate, setPerson1Birthdate] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2Birthdate, setPerson2Birthdate] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let num1: number, num2: number;
      
      // For persons with birthdate, use Life Path; for corporate or no birthdate, use Name Number
      if (entity1Type === 'person' && person1Birthdate) {
        num1 = calculateLifePath(person1Birthdate);
      } else {
        num1 = calculateNameNumber(person1Name);
      }
      
      if (entity2Type === 'person' && person2Birthdate) {
        num2 = calculateLifePath(person2Birthdate);
      } else {
        num2 = calculateNameNumber(person2Name);
      }
      
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
    setEntity1Type('person');
    setEntity2Type('person');
    setResult(null);
  };

  // Validation: name required for both; birthdate required only for person type
  const isEntity1Valid = entity1Type === 'corporate' ? person1Name : (person1Name && person1Birthdate);
  const isEntity2Valid = entity2Type === 'corporate' ? person2Name : (person2Name && person2Birthdate);
  const isValid = isEntity1Valid && isEntity2Valid;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-primary';
    if (score >= 55) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <>
      <Helmet>
        <title>Numerology Compatibility Calculator - Partner & Business Analysis</title>
        <meta 
          name="description" 
          content="Discover your compatibility with partners, clients, or business associates using numerology. Calculate relationship harmony and partnership potential." 
        />
        <link rel="canonical" href="https://numerologyhub.com/compatibility" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Compatibility Analysis</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
                Compatibility Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Analyze the numerological harmony between partners, business associates, 
                or clients to understand relationship dynamics.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Tabs value={mode} onValueChange={(v) => { setMode(v as 'partner' | 'client'); setResult(null); handleReset(); }}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="partner" className="gap-2">
                    <Users className="w-4 h-4" />
                    Business Partner
                  </TabsTrigger>
                  <TabsTrigger value="client" className="gap-2">
                    <Heart className="w-4 h-4" />
                    Business Client
                  </TabsTrigger>
                </TabsList>

                <div className="mystic-card p-6 md:p-8">
                  {/* Entity 1 Section */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-display font-semibold text-foreground">
                        {mode === 'partner' ? 'You / Your Company' : 'Your Business'}
                      </h3>
                      
                      {/* Entity Type Selector */}
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={entity1Type === 'person' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => { setEntity1Type('person'); setPerson1Birthdate(''); }}
                          className="flex-1"
                        >
                          Person
                        </Button>
                        <Button
                          type="button"
                          variant={entity1Type === 'corporate' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => { setEntity1Type('corporate'); setPerson1Birthdate(''); }}
                          className="flex-1"
                        >
                          Corporate
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="e1name">
                          {entity1Type === 'person' ? 'Full Name' : 'Company Name'}
                        </Label>
                        <Input
                          id="e1name"
                          placeholder={entity1Type === 'person' ? 'Enter full name' : 'Enter company name'}
                          value={person1Name}
                          onChange={(e) => setPerson1Name(e.target.value)}
                          className="bg-muted/50"
                        />
                      </div>

                      {entity1Type === 'person' && (
                        <div className="space-y-2">
                          <Label htmlFor="e1birth">Birth Date</Label>
                          <Input
                            id="e1birth"
                            type="date"
                            value={person1Birthdate}
                            onChange={(e) => setPerson1Birthdate(e.target.value)}
                            className="bg-muted/50"
                          />
                        </div>
                      )}
                    </div>

                    {/* Entity 2 Section */}
                    <div className="space-y-4">
                      <h3 className="font-display font-semibold text-foreground">
                        {mode === 'partner' ? 'Partner' : 'Client'}
                      </h3>
                      
                      {/* Entity Type Selector */}
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={entity2Type === 'person' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => { setEntity2Type('person'); setPerson2Birthdate(''); }}
                          className="flex-1"
                        >
                          Person
                        </Button>
                        <Button
                          type="button"
                          variant={entity2Type === 'corporate' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => { setEntity2Type('corporate'); setPerson2Birthdate(''); }}
                          className="flex-1"
                        >
                          Corporate
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="e2name">
                          {entity2Type === 'person' ? 'Full Name' : 'Company Name'}
                        </Label>
                        <Input
                          id="e2name"
                          placeholder={entity2Type === 'person' ? 'Enter full name' : 'Enter company name'}
                          value={person2Name}
                          onChange={(e) => setPerson2Name(e.target.value)}
                          className="bg-muted/50"
                        />
                      </div>

                      {entity2Type === 'person' && (
                        <div className="space-y-2">
                          <Label htmlFor="e2birth">Birth Date</Label>
                          <Input
                            id="e2birth"
                            type="date"
                            value={person2Birthdate}
                            onChange={(e) => setPerson2Birthdate(e.target.value)}
                            className="bg-muted/50"
                          />
                        </div>
                      )}
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
                          Calculate Compatibility
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

                  {result && (
                    <div className="mt-8 space-y-6 animate-fade-in">
                      <div className="text-center p-6 rounded-xl bg-background/50 border border-border">
                        <p className="text-sm text-muted-foreground mb-4">Compatibility Score</p>
                        <div className={`text-6xl font-display font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </div>
                        <p className="text-lg font-medium text-foreground mt-2">{result.level}</p>
                      </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">
                            {entity1Type === 'person' && person1Birthdate ? 'Life Path' : 'Name Number'}
                          </p>
                          <div className="number-orb mx-auto w-12 h-12 text-xl">
                            {result.person1Number}
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Combined</p>
                          <div className="number-orb mx-auto w-12 h-12 text-xl">
                            {result.combinedNumber}
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">
                            {entity2Type === 'person' && person2Birthdate ? 'Life Path' : 'Name Number'}
                          </p>
                          <div className="number-orb mx-auto w-12 h-12 text-xl">
                            {result.person2Number}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Relationship Dynamics
                        </h3>
                        <p className="text-sm text-muted-foreground">{result.description}</p>
                      </div>

                      <ExpertInsight 
                        method="pythagorean" 
                        number={result.combinedNumber} 
                        context="compatibility" 
                      />
                    </div>
                  )}
                </div>
              </Tabs>

              {/* Ad Placement */}
              <div className="mt-8">
                <div className="ad-placeholder h-[100px] flex items-center justify-center">
                  <span className="text-xs uppercase tracking-wider">AD-PLACEMENT-HIGH-CTR • In-Content 728x100</span>
                </div>
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
