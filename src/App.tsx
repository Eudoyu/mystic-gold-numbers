import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import BusinessNames from "./pages/BusinessNames";
import Compatibility from "./pages/Compatibility";
import SloganAnalyzer from "./pages/SloganAnalyzer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/business-names" element={<BusinessNames />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/slogan-analyzer" element={<SloganAnalyzer />} />
            
            {/* Multilingual routes */}
            <Route path="/en/*" element={<Index />} />
            <Route path="/fr/*" element={<Index />} />
            <Route path="/es/*" element={<Index />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
