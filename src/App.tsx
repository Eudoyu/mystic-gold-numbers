import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/i18n";
import Index from "./pages/Index";
import BusinessNames from "./pages/BusinessNames";
import Compatibility from "./pages/Compatibility";
import SloganAnalyzer from "./pages/SloganAnalyzer";
import PartnerCheck from "./pages/PartnerCheck";
import NotFound from "./pages/NotFound";
import { Privacy, Terms, Cookies, Disclaimer } from "./pages/legal";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <Routes>
              {/* Root redirect to English */}
              <Route path="/" element={<Navigate to="/en" replace />} />
              
              {/* English routes */}
              <Route path="/en" element={<Index />} />
              <Route path="/en/tools/business-name" element={<BusinessNames />} />
              <Route path="/en/tools/slogan-analyzer" element={<SloganAnalyzer />} />
              <Route path="/en/tools/compatibility" element={<Compatibility />} />
              <Route path="/en/tools/partner-check" element={<PartnerCheck />} />
              <Route path="/en/legal/privacy" element={<Privacy />} />
              <Route path="/en/legal/terms" element={<Terms />} />
              <Route path="/en/legal/cookies" element={<Cookies />} />
              <Route path="/en/legal/disclaimer" element={<Disclaimer />} />
              
              {/* French routes */}
              <Route path="/fr" element={<Index />} />
              <Route path="/fr/tools/business-name" element={<BusinessNames />} />
              <Route path="/fr/tools/slogan-analyzer" element={<SloganAnalyzer />} />
              <Route path="/fr/tools/compatibility" element={<Compatibility />} />
              <Route path="/fr/tools/partner-check" element={<PartnerCheck />} />
              <Route path="/fr/legal/privacy" element={<Privacy />} />
              <Route path="/fr/legal/terms" element={<Terms />} />
              <Route path="/fr/legal/cookies" element={<Cookies />} />
              <Route path="/fr/legal/disclaimer" element={<Disclaimer />} />
              
              {/* Spanish routes */}
              <Route path="/es" element={<Index />} />
              <Route path="/es/tools/business-name" element={<BusinessNames />} />
              <Route path="/es/tools/slogan-analyzer" element={<SloganAnalyzer />} />
              <Route path="/es/tools/compatibility" element={<Compatibility />} />
              <Route path="/es/tools/partner-check" element={<PartnerCheck />} />
              <Route path="/es/legal/privacy" element={<Privacy />} />
              <Route path="/es/legal/terms" element={<Terms />} />
              <Route path="/es/legal/cookies" element={<Cookies />} />
              <Route path="/es/legal/disclaimer" element={<Disclaimer />} />
              
              {/* Legacy routes redirect */}
              <Route path="/business-names" element={<Navigate to="/en/tools/business-name" replace />} />
              <Route path="/slogan-analyzer" element={<Navigate to="/en/tools/slogan-analyzer" replace />} />
              <Route path="/compatibility" element={<Navigate to="/en/tools/compatibility" replace />} />
              <Route path="/partner-check" element={<Navigate to="/en/tools/partner-check" replace />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
