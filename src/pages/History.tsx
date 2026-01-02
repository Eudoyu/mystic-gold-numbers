import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { History as HistoryIcon, Trash2, Sparkles, Calendar, User, ArrowLeft } from 'lucide-react';

interface CalculationRecord {
  id: string;
  name: string;
  birthdate: string | null;
  system: string;
  life_path_number: number | null;
  expression_number: number | null;
  soul_urge_number: number | null;
  personality_number: number | null;
  destiny_number: number | null;
  created_at: string;
}

export default function History() {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate(`/${language}/auth`, { 
        state: { from: `/${language}/history` },
        replace: true 
      });
    }
  }, [user, loading, navigate, language]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('calculation_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your calculation history.',
        variant: 'destructive',
      });
    } else {
      setHistory(data || []);
    }
    setIsLoading(false);
  };

  const deleteRecord = async (id: string) => {
    const { error } = await supabase
      .from('calculation_history')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the record.',
        variant: 'destructive',
      });
    } else {
      setHistory(history.filter(h => h.id !== id));
      toast({
        title: 'Deleted',
        description: 'Calculation removed from history.',
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Sparkles className="h-8 w-8 animate-pulse text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Calculation History - Numerology Hub</title>
        <meta name="description" content="View your saved numerology calculation history." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/${language}`)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-full bg-primary/10">
                <HistoryIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold gold-text">Your Readings</h1>
                <p className="text-muted-foreground">Your saved numerology calculations</p>
              </div>
            </div>

            {history.length === 0 ? (
              <Card className="mystic-card border-primary/20 text-center py-12">
                <CardContent>
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No readings yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Calculate your first numerology reading to see it here.
                  </p>
                  <Button onClick={() => navigate(`/${language}`)} className="glow-effect">
                    Start a Reading
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {history.map((record) => (
                  <Card key={record.id} className="mystic-card border-primary/20 hover:border-primary/40 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            {record.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            {record.birthdate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(record.birthdate), 'MMM d, yyyy')}
                              </span>
                            )}
                            <span>
                              {format(new Date(record.created_at), 'MMM d, yyyy h:mm a')}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="capitalize">
                            {record.system}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteRecord(record.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-3">
                        {record.life_path_number && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                            <span className="text-xs text-muted-foreground">Life Path</span>
                            <span className="font-bold text-primary">{record.life_path_number}</span>
                          </div>
                        )}
                        {record.expression_number && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                            <span className="text-xs text-muted-foreground">Expression</span>
                            <span className="font-bold text-primary">{record.expression_number}</span>
                          </div>
                        )}
                        {record.soul_urge_number && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                            <span className="text-xs text-muted-foreground">Soul Urge</span>
                            <span className="font-bold text-primary">{record.soul_urge_number}</span>
                          </div>
                        )}
                        {record.personality_number && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                            <span className="text-xs text-muted-foreground">Personality</span>
                            <span className="font-bold text-primary">{record.personality_number}</span>
                          </div>
                        )}
                        {record.destiny_number && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
                            <span className="text-xs text-muted-foreground">Destiny</span>
                            <span className="font-bold text-primary">{record.destiny_number}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
