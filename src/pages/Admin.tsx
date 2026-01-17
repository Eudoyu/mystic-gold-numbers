import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { Settings, Shield, Save, AlertTriangle, Info, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminRole } from '@/hooks/useAdminRole';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const { settings, loading: settingsLoading, updateSettings } = useSiteSettings();

  const [formData, setFormData] = useState({
    polar_product_sprint_id: '',
    polar_product_pro_id: '',
    sprint_price: 19,
    pro_price: 14.90,
    maintenance_mode: false,
    announcement_text: '',
  });
  const [saving, setSaving] = useState(false);

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        navigate('/en/auth');
      } else if (!isAdmin) {
        navigate('/en');
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
          variant: 'destructive',
        });
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate, toast]);

  // Load settings into form
  useEffect(() => {
    if (settings) {
      setFormData({
        polar_product_sprint_id: settings.polar_product_sprint_id || '',
        polar_product_pro_id: settings.polar_product_pro_id || '',
        sprint_price: settings.sprint_price,
        pro_price: settings.pro_price,
        maintenance_mode: settings.maintenance_mode,
        announcement_text: settings.announcement_text || '',
      });
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    const success = await updateSettings({
      polar_product_sprint_id: formData.polar_product_sprint_id || null,
      polar_product_pro_id: formData.polar_product_pro_id || null,
      sprint_price: formData.sprint_price,
      pro_price: formData.pro_price,
      maintenance_mode: formData.maintenance_mode,
      announcement_text: formData.announcement_text || null,
    });

    if (success) {
      toast({
        title: 'Settings Saved',
        description: 'Your changes have been saved successfully.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
    setSaving(false);
  };

  if (authLoading || roleLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Control Center - NumerologyForBiz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 pt-40">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">Admin Control Center</h1>
                <p className="text-muted-foreground">Manage site settings and configuration</p>
              </div>
              
              {/* Quick Links */}
              <Link to="/en/admin/seo-analytics">
                <Button variant="outline" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  SEO Analytics
                </Button>
              </Link>
            </div>

            {/* Setup Instructions */}
            <Alert className="border-primary/30 bg-primary/5">
              <Info className="w-4 h-4" />
              <AlertDescription>
                <strong>How to set yourself as Admin:</strong><br />
                Run this SQL in your database: <code className="bg-muted px-2 py-1 rounded text-xs">
                  INSERT INTO user_roles (user_id, role) VALUES ('YOUR_USER_ID', 'admin');
                </code>
              </AlertDescription>
            </Alert>

            {/* Products & Pricing Card */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Products & Pricing
                </CardTitle>
                <CardDescription>
                  Configure Polar product IDs and pricing display
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sprint_id">Polar Sprint Product ID</Label>
                    <Input
                      id="sprint_id"
                      placeholder="prod_..."
                      value={formData.polar_product_sprint_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, polar_product_sprint_id: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pro_id">Polar Pro Product ID</Label>
                    <Input
                      id="pro_id"
                      placeholder="prod_..."
                      value={formData.polar_product_pro_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, polar_product_pro_id: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sprint_price">Sprint Price ($)</Label>
                    <Input
                      id="sprint_price"
                      type="number"
                      step="0.01"
                      value={formData.sprint_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, sprint_price: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pro_price">Pro Price ($/month)</Label>
                    <Input
                      id="pro_price"
                      type="number"
                      step="0.01"
                      value={formData.pro_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, pro_price: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status Card */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  System Status
                </CardTitle>
                <CardDescription>
                  Maintenance mode and site announcements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, users will see a maintenance message
                    </p>
                  </div>
                  <Switch
                    checked={formData.maintenance_mode}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, maintenance_mode: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="announcement">Announcement Banner</Label>
                  <Textarea
                    id="announcement"
                    placeholder="Optional announcement text shown to all users..."
                    value={formData.announcement_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, announcement_text: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Admin;
