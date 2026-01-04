import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import BusinessNameTool from '@/components/BusinessNameTool';
import HowItWorks from '@/components/HowItWorks';
import NumberMeanings from '@/components/NumberMeanings';
import BlogPreview from '@/components/BlogPreview';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import { useLanguage } from '@/i18n';

const Index = () => {
  const { t, language } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <link rel="canonical" href={`https://numerologyhub.com/${language}`} />
        
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Business Numerology Calculator",
            "description": t('meta.description'),
            "url": `https://numerologyhub.com/${language}`,
            "applicationCategory": "BusinessApplication",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Ad slot: below header, before main content */}
          <div className="container mx-auto px-4 py-4">
            <AdSlot type="header" className="mb-4" />
          </div>
          
          <BusinessNameTool />
          
          {/* Ad slot: after calculator, before how it works */}
          <div className="container mx-auto px-4">
            <AdSlot type="inContent" className="my-8" />
          </div>
          
          <HowItWorks />
          <NumberMeanings />
          
          {/* Ad slot: after content, before blog */}
          <div className="container mx-auto px-4">
            <AdSlot type="afterResults" className="my-8" />
          </div>
          
          <BlogPreview />
          
          <FAQ />
          <Newsletter />
          
          {/* Ad slot: footer area */}
          <div className="container mx-auto px-4 py-4">
            <AdSlot type="footer" />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
