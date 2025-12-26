import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, Sparkles, ArrowRight, Loader2, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExpertInsight from '@/components/ExpertInsight';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNumerology } from '@/hooks/useNumerology';

const BusinessNames = () => {
  const [businessName, setBusinessName] = useState('');
  const { businessResult, isCalculating, calculateBusinessName, clearResults } = useNumerology();

  const handleAnalyze = () => {
    if (businessName.trim()) {
      calculateBusinessName(businessName);
    }
  };

  const handleReset = () => {
    setBusinessName('');
    clearResults();
  };

  const getVibrationType = (num: number): 'excellent' | 'good' | 'neutral' => {
    if ([1, 5, 6, 8, 9].includes(num)) return 'excellent';
    if ([2, 3, 11, 22, 33].includes(num)) return 'good';
    return 'neutral';
  };

  return (
    <>
      <Helmet>
        <title>Business Name Numerology Calculator - Chaldean Analysis</title>
        <meta 
          name="description" 
          content="Analyze your business name using ancient Chaldean numerology. Discover the vibrational energy of your company name and get expert recommendations for success." 
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
                <span className="text-sm font-medium text-accent">Chaldean Business Numerology</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
                Business Name Analyzer
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Test your company name, brand, or product name against ancient Chaldean vibrations 
                to ensure maximum success and market alignment.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="mystic-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground">Chaldean Business Analysis</h2>
                    <p className="text-xs text-muted-foreground">The preferred system for business and brand names</p>
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
                    {businessResult && (
                      <Button variant="outline" onClick={handleReset} className="border-border">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {businessResult && (
                  <div className="mt-8 space-y-6 animate-fade-in">
                    <div className="text-center p-6 rounded-xl bg-background/50 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">Chaldean Number</p>
                      <div className="number-orb mx-auto mb-3 w-20 h-20 text-3xl">
                        {businessResult.chaldeanNumber}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pythagorean: <span className="text-foreground">{businessResult.pythagoreanNumber}</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          Vibration Energy
                        </h3>
                        <p className="text-sm text-muted-foreground">{businessResult.vibration}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                          {getVibrationType(businessResult.chaldeanNumber) === 'excellent' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-accent" />
                          )}
                          Business Recommendation
                        </h3>
                        <p className="text-sm text-muted-foreground">{businessResult.recommendation}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <h3 className="font-display font-semibold text-foreground mb-2">Calculation Breakdown</h3>
                        <p className="text-xs text-muted-foreground font-mono">{businessResult.breakdown}</p>
                      </div>
                    </div>

                    <ExpertInsight 
                      method="chaldean" 
                      number={businessResult.chaldeanNumber} 
                      context="business" 
                    />
                  </div>
                )}
              </div>

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

export default BusinessNames;
