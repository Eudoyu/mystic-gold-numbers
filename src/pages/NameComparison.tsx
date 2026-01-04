import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Trash2, BarChart3, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/i18n';
import { 
  calculateNameNumber, 
  getVibrationMeaning, 
  getVibrationType,
  SYSTEM_INFO,
  type CalculationSystem 
} from '@/lib/numerology';

interface ComparisonResult {
  name: string;
  pythagorean: { number: number; breakdown: string };
  chaldean: { number: number; breakdown: string };
  gematria: { number: number; breakdown: string };
}

const NameComparison = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [names, setNames] = useState<string[]>(['', '']);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const isPremium = !!user;

  const addName = () => {
    if (names.length < 5) {
      setNames([...names, '']);
    }
  };

  const removeName = (index: number) => {
    if (names.length > 2) {
      const newNames = names.filter((_, i) => i !== index);
      setNames(newNames);
    }
  };

  const updateName = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleCompare = () => {
    const validNames = names.filter(n => n.trim().length > 0);
    if (validNames.length < 2) return;

    setIsCalculating(true);
    
    setTimeout(() => {
      const comparisonResults: ComparisonResult[] = validNames.map(name => ({
        name,
        pythagorean: calculateNameNumber(name, 'pythagorean'),
        chaldean: calculateNameNumber(name, 'chaldean'),
        gematria: calculateNameNumber(name, 'gematria')
      }));
      
      setResults(comparisonResults);
      setIsCalculating(false);
    }, 600);
  };

  const handleReset = () => {
    setNames(['', '']);
    setResults([]);
  };

  const getNumberBadgeClass = (type: 'excellent' | 'good' | 'neutral') => {
    switch (type) {
      case 'excellent':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'good':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  if (!isPremium) {
    return (
      <>
        <Helmet>
          <title>Name Comparison Tool - Premium Feature | Business Numerology</title>
          <meta name="description" content="Compare multiple business names across Pythagorean, Chaldean, and Gematria systems. Premium feature for registered users." />
        </Helmet>
        <Header />
        <main className="min-h-screen bg-background py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Premium Feature</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  The Name Comparison tool allows you to analyze multiple names across all three numerology systems simultaneously. 
                  Create a free account to unlock this feature.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Compare up to 5 names at once</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>See Pythagorean, Chaldean & Gematria side by side</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Detailed vibration meanings for each result</span>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate(`/${language}/auth`)}
                  className="w-full"
                  size="lg"
                >
                  Create Free Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Name Comparison Tool - Compare Across All Systems | Business Numerology</title>
        <meta name="description" content="Compare multiple business names across Pythagorean, Chaldean, and Gematria numerology systems side by side." />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <BarChart3 className="w-3 h-3 mr-1" />
              Premium Feature
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Name Comparison Tool
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare multiple business names or brands across all three numerology systems to find the best option.
            </p>
          </div>

          {/* Input Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Enter Names to Compare</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {names.map((name, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Name ${index + 1}`}
                    value={name}
                    onChange={(e) => updateName(index, e.target.value)}
                    className="flex-1 bg-background/50"
                  />
                  {names.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeName(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <div className="flex gap-3 pt-2">
                {names.length < 5 && (
                  <Button
                    variant="outline"
                    onClick={addName}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Name
                  </Button>
                )}
                <Button
                  onClick={handleCompare}
                  disabled={isCalculating || names.filter(n => n.trim()).length < 2}
                  className="flex-1"
                >
                  {isCalculating ? 'Analyzing...' : 'Compare Names'}
                </Button>
                {results.length > 0 && (
                  <Button variant="ghost" onClick={handleReset}>
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Table */}
          {results.length > 0 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">Comparison Results</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                        {(['pythagorean', 'chaldean', 'gematria'] as CalculationSystem[]).map(system => (
                          <th key={system} className="text-center p-4">
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="font-medium text-foreground">{SYSTEM_INFO[system].title}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{SYSTEM_INFO[system].description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-b border-border/30 last:border-0">
                          <td className="p-4">
                            <span className="font-medium text-foreground">{result.name}</span>
                          </td>
                          {(['pythagorean', 'chaldean', 'gematria'] as CalculationSystem[]).map(system => {
                            const data = result[system];
                            const vibrationType = getVibrationType(data.number);
                            return (
                              <td key={system} className="p-4 text-center">
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge 
                                      variant="outline" 
                                      className={`text-lg px-3 py-1 ${getNumberBadgeClass(vibrationType)}`}
                                    >
                                      {data.number}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" className="max-w-sm">
                                    <p className="font-medium mb-1">{getVibrationMeaning(data.number)}</p>
                                    <p className="text-xs text-muted-foreground">{data.breakdown}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legend */}
          {results.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getNumberBadgeClass('excellent')}>●</Badge>
                <span className="text-muted-foreground">Excellent for business</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getNumberBadgeClass('good')}>●</Badge>
                <span className="text-muted-foreground">Good vibration</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getNumberBadgeClass('neutral')}>●</Badge>
                <span className="text-muted-foreground">Neutral energy</span>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NameComparison;
