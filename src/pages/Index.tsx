import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import BusinessNameTool from '@/components/BusinessNameTool';
import HowItWorks from '@/components/HowItWorks';
import NumberMeanings from '@/components/NumberMeanings';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Business Numerology Calculator - Name, Compatibility & Slogan Analysis</title>
        <meta 
          name="description" 
          content="Free professional business numerology calculator using Pythagorean, Chaldean, and Gematria systems. Analyze business names, check partner compatibility, and evaluate slogans." 
        />
        <meta 
          name="keywords" 
          content="business numerology calculator, chaldean numerology, pythagorean numerology, gematria, business name analysis, partner compatibility, slogan analyzer" 
        />
        <link rel="canonical" href="https://numerologyhub.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Business Numerology Calculator" />
        <meta property="og:description" content="Professional business numerology tools for analyzing names, checking compatibility, and evaluating marketing slogans." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Business Numerology Calculator",
            "description": "Professional business numerology calculator for name analysis, partner compatibility, and slogan evaluation",
            "url": "https://numerologyhub.com",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Business Name Analyzer",
              "Partner Compatibility Check",
              "Slogan Analyzer",
              "Pythagorean System",
              "Chaldean System",
              "Gematria System"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main>
          <BusinessNameTool />
          <HowItWorks />
          <NumberMeanings />
          <FAQ />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
