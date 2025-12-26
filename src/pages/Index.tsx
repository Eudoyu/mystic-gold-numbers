import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroCalculator from '@/components/HeroCalculator';
import BusinessNameTool from '@/components/BusinessNameTool';
import HowItWorks from '@/components/HowItWorks';
import NumberMeanings from '@/components/NumberMeanings';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Numerology Calculator - Life Path, Expression & Business Name Analysis</title>
        <meta 
          name="description" 
          content="Free professional numerology calculator using Pythagorean and Chaldean systems. Calculate your Life Path, Expression, Soul Urge numbers and analyze business names for success." 
        />
        <meta 
          name="keywords" 
          content="numerology calculator, life path number, expression number, soul urge, chaldean numerology, pythagorean numerology, business name numerology, name analysis" 
        />
        <link rel="canonical" href="https://numerologyhub.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Numerology Calculator - Discover Your Numbers" />
        <meta property="og:description" content="Unlock the mysteries of numbers with our professional numerology calculator. Calculate Life Path, Expression, and analyze business names." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Numerology Hub Calculator",
            "description": "Professional numerology calculator for Life Path, Expression, Soul Urge numbers and business name analysis",
            "url": "https://numerologyhub.com",
            "applicationCategory": "LifestyleApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Life Path Number Calculator",
              "Expression Number Calculator", 
              "Soul Urge Number Calculator",
              "Business Name Analyzer",
              "Pythagorean System",
              "Chaldean System"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main>
          <HeroCalculator />
          <HowItWorks />
          <BusinessNameTool />
          <NumberMeanings />
          <FAQ />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
