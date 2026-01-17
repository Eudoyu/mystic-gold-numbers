import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Link2, 
  Gauge, 
  FileText, 
  Upload, 
  Save,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminRole } from '@/hooks/useAdminRole';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Simple CSV parser
const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n');
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
};

interface BacklinkData {
  totalBacklinks: number;
  topDomains: { domain: string; count: number }[];
}

interface SeoNotes {
  competitor_gaps: string;
  content_pillars: string;
  action_items: string;
}

const SeoAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useAdminRole();

  const [backlinkData, setBacklinkData] = useState<BacklinkData | null>(null);
  const [seoNotes, setSeoNotes] = useState<SeoNotes>({
    competitor_gaps: '',
    content_pillars: '',
    action_items: '',
  });
  const [savingNotes, setSavingNotes] = useState(false);

  // Mock Core Web Vitals data
  const coreWebVitals = {
    lcp: { value: 1.8, status: 'good' as const },
    cls: { value: 0.05, status: 'good' as const },
    mobile: { status: 'good' as const },
  };

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        navigate('/en/auth');
      } else if (!isAdmin) {
        navigate('/en');
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  // Load SEO notes from database
  useEffect(() => {
    const loadNotes = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('seo_notes')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle() as { data: any, error: any };

      if (data) {
        setSeoNotes({
          competitor_gaps: data.competitor_gaps || '',
          content_pillars: data.content_pillars || '',
          action_items: data.action_items || '',
        });
      }
    };

    loadNotes();
  }, [user]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const rows = parseCSV(csvText);
        
        // Count domains (assuming first column is referring domain)
        const domainCounts: Record<string, number> = {};
        rows.slice(1).forEach(row => {
          if (row[0]) {
            const domain = row[0].replace(/^https?:\/\//, '').split('/')[0];
            domainCounts[domain] = (domainCounts[domain] || 0) + 1;
          }
        });

        const topDomains = Object.entries(domainCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([domain, count]) => ({ domain, count }));

        setBacklinkData({
          totalBacklinks: rows.length - 1,
          topDomains,
        });

        toast({
          title: 'CSV Uploaded',
          description: `Processed ${rows.length - 1} backlinks from ${Object.keys(domainCounts).length} domains.`,
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to parse CSV file.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleSaveNotes = async () => {
    if (!user) return;
    
    setSavingNotes(true);
    
    // Check if notes exist
    const { data: existing } = await supabase
      .from('seo_notes')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle() as { data: any };

    let error;
    if (existing) {
      const result = await supabase
        .from('seo_notes')
        .update({
          competitor_gaps: seoNotes.competitor_gaps,
          content_pillars: seoNotes.content_pillars,
          action_items: seoNotes.action_items,
        } as any)
        .eq('user_id', user.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('seo_notes')
        .insert({
          user_id: user.id,
          competitor_gaps: seoNotes.competitor_gaps,
          content_pillars: seoNotes.content_pillars,
          action_items: seoNotes.action_items,
        } as any);
      error = result.error;
    }

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to save notes.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Saved',
        description: 'SEO notes saved successfully.',
      });
    }
    
    setSavingNotes(false);
  };

  const getStatusIcon = (status: 'good' | 'needs-improvement' | 'poor') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'needs-improvement':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'poor':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <>
      <Helmet>
        <title>SEO Analytics - NumerologyForBiz Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 pt-40">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/en/admin')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-display font-bold">SEO Analytics</h1>
                <p className="text-muted-foreground">Monitor traffic, backlinks, and technical SEO</p>
              </div>
            </div>

            <Tabs defaultValue="traffic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="traffic" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Traffic (GSC)
                </TabsTrigger>
                <TabsTrigger value="backlinks" className="gap-2">
                  <Link2 className="w-4 h-4" />
                  Backlinks
                </TabsTrigger>
                <TabsTrigger value="technical" className="gap-2">
                  <Gauge className="w-4 h-4" />
                  Technical
                </TabsTrigger>
                <TabsTrigger value="strategy" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Strategy
                </TabsTrigger>
              </TabsList>

              {/* Traffic Tab (GSC) */}
              <TabsContent value="traffic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Google Search Console</CardTitle>
                    <CardDescription>
                      Connect your Google Search Console to view traffic data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Connect Google Search Console</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        To view traffic data, configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment.
                      </p>
                      <Button variant="outline" asChild>
                        <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                          Open GSC Dashboard
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>

                    {/* Placeholder stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">--</div>
                        <div className="text-xs text-muted-foreground">Total Clicks</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">--</div>
                        <div className="text-xs text-muted-foreground">Impressions</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">--%</div>
                        <div className="text-xs text-muted-foreground">Avg CTR</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">--</div>
                        <div className="text-xs text-muted-foreground">Avg Position</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Backlinks Tab */}
              <TabsContent value="backlinks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Backlinks Monitoring</CardTitle>
                    <CardDescription>
                      Upload an Ahrefs export CSV to analyze your backlink profile.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="csv-upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg hover:bg-muted/30 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Upload Ahrefs CSV</span>
                        </div>
                        <input
                          id="csv-upload"
                          type="file"
                          accept=".csv"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </Label>
                    </div>

                    {backlinkData ? (
                      <div className="space-y-6">
                        <div className="p-6 bg-primary/5 rounded-lg text-center">
                          <div className="text-4xl font-bold text-primary">{backlinkData.totalBacklinks}</div>
                          <div className="text-sm text-muted-foreground">Total Backlinks</div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4">Top Referring Domains</h4>
                          <div className="space-y-2">
                            {backlinkData.topDomains.map((item, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <span className="font-mono text-sm">{item.domain}</span>
                                <span className="text-primary font-semibold">{item.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-muted/30 rounded-lg">
                        <Link2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Upload a CSV file to see your backlink analysis
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Technical Tab (Core Web Vitals) */}
              <TabsContent value="technical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Core Web Vitals</CardTitle>
                    <CardDescription>
                      Performance metrics that affect SEO rankings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-6 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium">LCP (Largest Contentful Paint)</span>
                          {getStatusIcon(coreWebVitals.lcp.status)}
                        </div>
                        <div className="text-3xl font-bold text-primary">{coreWebVitals.lcp.value}s</div>
                        <p className="text-xs text-muted-foreground mt-2">Target: &lt; 2.5s</p>
                      </div>

                      <div className="p-6 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium">CLS (Cumulative Layout Shift)</span>
                          {getStatusIcon(coreWebVitals.cls.status)}
                        </div>
                        <div className="text-3xl font-bold text-primary">{coreWebVitals.cls.value}</div>
                        <p className="text-xs text-muted-foreground mt-2">Target: &lt; 0.1</p>
                      </div>

                      <div className="p-6 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium">Mobile Usability</span>
                          {getStatusIcon(coreWebVitals.mobile.status)}
                        </div>
                        <div className="text-3xl font-bold text-green-500">Pass</div>
                        <p className="text-xs text-muted-foreground mt-2">Responsive design active</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Strategy Tab */}
              <TabsContent value="strategy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Strategy & Audit Notes</CardTitle>
                    <CardDescription>
                      Document your SEO strategy, competitor analysis, and action items.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="competitor_gaps">Competitor Gaps</Label>
                        <Textarea
                          id="competitor_gaps"
                          placeholder="Enter data from competitive analysis (SimilarWeb, SEMrush, etc.)"
                          value={seoNotes.competitor_gaps}
                          onChange={(e) => setSeoNotes(prev => ({ ...prev, competitor_gaps: e.target.value }))}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content_pillars">Content Pillars</Label>
                        <Textarea
                          id="content_pillars"
                          placeholder="Define main content topics and keywords clusters"
                          value={seoNotes.content_pillars}
                          onChange={(e) => setSeoNotes(prev => ({ ...prev, content_pillars: e.target.value }))}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="action_items">Action Items</Label>
                        <Textarea
                          id="action_items"
                          placeholder="- Check H-tags structure&#10;- Fix keyword cannibalization&#10;- Add internal links"
                          value={seoNotes.action_items}
                          onChange={(e) => setSeoNotes(prev => ({ ...prev, action_items: e.target.value }))}
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveNotes} disabled={savingNotes} className="gap-2">
                        <Save className="w-4 h-4" />
                        {savingNotes ? 'Saving...' : 'Save Notes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SeoAnalytics;
