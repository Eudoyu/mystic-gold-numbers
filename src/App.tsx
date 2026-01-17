import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/i18n";
import { ConsentProvider, AuthProvider } from "@/contexts";
import { useAdSense } from "@/hooks/useAdSense";
import ConsentBanner from "@/components/ConsentBanner";
import Index from "./pages/Index";
import BusinessNames from "./pages/BusinessNames";
import Compatibility from "./pages/Compatibility";
import NameComparison from "./pages/NameComparison";
import SloganAnalyzer from "./pages/SloganAnalyzer";
import PartnerCheck from "./pages/PartnerCheck";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import History from "./pages/History";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import { Privacy, Terms, Cookies, Disclaimer } from "./pages/legal";
import { Pythagorean, Chaldean, Gematria } from "./pages/methods";
import Admin from "./pages/Admin";
import SeoAnalytics from "./pages/admin/SeoAnalytics";

const queryClient = new QueryClient();

// AdSense loader component
const AdSenseLoader = ({ children }: { children: React.ReactNode }) => {
  useAdSense();
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ConsentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LanguageProvider>
              <AuthProvider>
                <AdSenseLoader>
                  <Routes>
                    {/* Root redirect to English */}
                    <Route path="/" element={<Navigate to="/en" replace />} />
                    
                    {/* English routes */}
                    <Route path="/en" element={<Index />} />
                    <Route path="/en/auth" element={<Auth />} />
                    <Route path="/en/history" element={<History />} />
                    <Route path="/en/blog" element={<Blog />} />
                    <Route path="/en/blog/:slug" element={<BlogArticle />} />
                    <Route path="/en/tools/business-name" element={<BusinessNames />} />
                    <Route path="/en/tools/slogan-analyzer" element={<SloganAnalyzer />} />
                    <Route path="/en/tools/compatibility" element={<Compatibility />} />
                    <Route path="/en/tools/name-comparison" element={<NameComparison />} />
                    <Route path="/en/tools/partner-check" element={<PartnerCheck />} />
                    <Route path="/en/methods/pythagorean" element={<Pythagorean />} />
                    <Route path="/en/methods/chaldean" element={<Chaldean />} />
                    <Route path="/en/methods/gematria" element={<Gematria />} />
                    <Route path="/en/legal/privacy" element={<Privacy />} />
                    <Route path="/en/legal/terms" element={<Terms />} />
                    <Route path="/en/legal/disclaimer" element={<Disclaimer />} />
                    <Route path="/en/legal/cookies" element={<Cookies />} />
                    <Route path="/en/admin" element={<Admin />} />
                    <Route path="/en/admin/seo-analytics" element={<SeoAnalytics />} />
                    
                    {/* French routes */}
                    <Route path="/fr" element={<Index />} />
                    <Route path="/fr/auth" element={<Auth />} />
                    <Route path="/fr/history" element={<History />} />
                    <Route path="/fr/blog" element={<Blog />} />
                    <Route path="/fr/blog/:slug" element={<BlogArticle />} />
                    <Route path="/fr/tools/business-name" element={<BusinessNames />} />
                    <Route path="/fr/tools/slogan-analyzer" element={<SloganAnalyzer />} />
                    <Route path="/fr/tools/compatibility" element={<Compatibility />} />
                    <Route path="/fr/tools/name-comparison" element={<NameComparison />} />
                    <Route path="/fr/tools/partner-check" element={<PartnerCheck />} />
                    <Route path="/fr/methods/pythagorean" element={<Pythagorean />} />
                    <Route path="/fr/methods/chaldean" element={<Chaldean />} />
                    <Route path="/fr/methods/gematria" element={<Gematria />} />
                    <Route path="/fr/legal/privacy" element={<Privacy />} />
                    <Route path="/fr/legal/terms" element={<Terms />} />
                    <Route path="/fr/legal/cookies" element={<Cookies />} />
                    <Route path="/fr/legal/disclaimer" element={<Disclaimer />} />
                    
                    {/* Spanish routes */}
                    <Route path="/es" element={<Index />} />
                    <Route path="/es/auth" element={<Auth />} />
                    <Route path="/es/history" element={<History />} />
                    <Route path="/es/blog" element={<Blog />} />
                    <Route path="/es/blog/:slug" element={<BlogArticle />} />
                    <Route path="/es/tools/business-name" element={<BusinessNames />} />
                    <Route path="/es/tools/slogan-analyzer" element={<SloganAnalyzer />} />
                    <Route path="/es/tools/compatibility" element={<Compatibility />} />
                    <Route path="/es/tools/name-comparison" element={<NameComparison />} />
                    <Route path="/es/tools/partner-check" element={<PartnerCheck />} />
                    <Route path="/es/methods/pythagorean" element={<Pythagorean />} />
                    <Route path="/es/methods/chaldean" element={<Chaldean />} />
                    <Route path="/es/methods/gematria" element={<Gematria />} />
                    <Route path="/es/legal/privacy" element={<Privacy />} />
                    <Route path="/es/legal/terms" element={<Terms />} />
                    <Route path="/es/legal/cookies" element={<Cookies />} />
                    <Route path="/es/legal/disclaimer" element={<Disclaimer />} />
                    
                    {/* German routes */}
                    <Route path="/de" element={<Index />} />
                    <Route path="/de/auth" element={<Auth />} />
                    <Route path="/de/tools/business-name" element={<BusinessNames />} />
                    <Route path="/de/tools/compatibility" element={<Compatibility />} />
                    <Route path="/de/tools/partner-check" element={<PartnerCheck />} />
                    <Route path="/de/admin" element={<Admin />} />
                    
                    {/* Portuguese routes */}
                    <Route path="/pt" element={<Index />} />
                    <Route path="/pt/auth" element={<Auth />} />
                    <Route path="/pt/tools/business-name" element={<BusinessNames />} />
                    <Route path="/pt/tools/compatibility" element={<Compatibility />} />
                    <Route path="/pt/tools/partner-check" element={<PartnerCheck />} />
                    <Route path="/pt/admin" element={<Admin />} />
                    
                    {/* Japanese routes */}
                    <Route path="/ja" element={<Index />} />
                    <Route path="/ja/auth" element={<Auth />} />
                    <Route path="/ja/tools/business-name" element={<BusinessNames />} />
                    <Route path="/ja/tools/compatibility" element={<Compatibility />} />
                    <Route path="/ja/admin" element={<Admin />} />
                    
                    {/* Arabic routes */}
                    <Route path="/ar" element={<Index />} />
                    <Route path="/ar/auth" element={<Auth />} />
                    <Route path="/ar/tools/business-name" element={<BusinessNames />} />
                    <Route path="/ar/admin" element={<Admin />} />
                    
                    {/* Italian routes */}
                    <Route path="/it" element={<Index />} />
                    <Route path="/it/auth" element={<Auth />} />
                    <Route path="/it/tools/business-name" element={<BusinessNames />} />
                    <Route path="/it/admin" element={<Admin />} />
                    
                    {/* Hindi routes */}
                    <Route path="/hi" element={<Index />} />
                    <Route path="/hi/auth" element={<Auth />} />
                    <Route path="/hi/tools/business-name" element={<BusinessNames />} />
                    <Route path="/hi/admin" element={<Admin />} />
                    
                    {/* Korean routes */}
                    <Route path="/ko" element={<Index />} />
                    <Route path="/ko/auth" element={<Auth />} />
                    <Route path="/ko/tools/business-name" element={<BusinessNames />} />
                    <Route path="/ko/admin" element={<Admin />} />
                    
                    {/* Dutch routes */}
                    <Route path="/nl" element={<Index />} />
                    <Route path="/nl/auth" element={<Auth />} />
                    <Route path="/nl/tools/business-name" element={<BusinessNames />} />
                    <Route path="/nl/admin" element={<Admin />} />
                    
                    {/* Turkish routes */}
                    <Route path="/tr" element={<Index />} />
                    <Route path="/tr/auth" element={<Auth />} />
                    <Route path="/tr/tools/business-name" element={<BusinessNames />} />
                    <Route path="/tr/admin" element={<Admin />} />
                    
                    {/* Indonesian routes */}
                    <Route path="/id" element={<Index />} />
                    <Route path="/id/auth" element={<Auth />} />
                    <Route path="/id/tools/business-name" element={<BusinessNames />} />
                    <Route path="/id/admin" element={<Admin />} />
                    
                    {/* Legacy routes redirect */}
                    <Route path="/business-names" element={<Navigate to="/en/tools/business-name" replace />} />
                    <Route path="/slogan-analyzer" element={<Navigate to="/en/tools/slogan-analyzer" replace />} />
                    <Route path="/compatibility" element={<Navigate to="/en/tools/compatibility" replace />} />
                    <Route path="/partner-check" element={<Navigate to="/en/tools/partner-check" replace />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ConsentBanner />
                </AdSenseLoader>
              </AuthProvider>
            </LanguageProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ConsentProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
