import { useState } from 'react';
import { Sparkles, Calculator, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNumerology } from '@/hooks/useNumerology';
import ResultsDisplay from './ResultsDisplay';
import AdPlacement from '@/components/AdPlacement';

const HeroCalculator = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [system, setSystem] = useState<'pythagorean' | 'chaldean'>('pythagorean');
  
  const { result, isCalculating, calculatePersonalNumbers, clearResults } = useNumerology();

  const handleCalculate = () => {
    if (name && birthdate) {
      calculatePersonalNumbers(name, birthdate, system);
    }
  };

  const handleReset = () => {
    setName('');
    setBirthdate('');
    clearResults();
  };

  return (
    <section id="calculator" className="pt-40 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discover Your Numbers</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 gold-text">
            Unlock Your Numerology
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reveal the hidden meanings in your name and birthdate using ancient Chaldean 
            and modern Pythagorean numerology systems.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mystic-card p-6 md:p-8 animate-fade-in-up delay-200">
            <Tabs 
              value={system} 
              onValueChange={(v) => setSystem(v as 'pythagorean' | 'chaldean')}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger 
                  value="pythagorean"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Pythagorean
                </TabsTrigger>
                <TabsTrigger 
                  value="chaldean"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Chaldean
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pythagorean" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Modern Western system (1-9). Best for personal life path analysis.
                </p>
              </TabsContent>
              <TabsContent value="chaldean" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Ancient Babylonian system. Preferred for business names and deeper insights.
                </p>
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name as given at birth"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-foreground">Date of Birth</Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCalculate}
                  disabled={!name || !birthdate || isCalculating}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                
                {result && (
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-border hover:bg-muted/50"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          {result && (
            <div className="mt-8 animate-fade-in-up">
              <ResultsDisplay result={result} system={system} name={name} />
            </div>
          )}
        </div>

        {/* Side Ad Placement */}
        <div className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 w-[160px]">
          <AdPlacement height="h-[600px]" label="AD-PLACEMENT-SIDEBAR • 160x600" vertical />
        </div>
      </div>
    </section>
  );
};

export default HeroCalculator;
