import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const legalContent = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: December 2024',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content: 'By accessing and using NumerologyHub, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.'
      },
      {
        heading: '2. Description of Service',
        content: 'NumerologyHub provides free online numerology calculators for business name analysis, slogan analysis, and compatibility checks. All calculations are performed in your browser and are for entertainment and informational purposes only.'
      },
      {
        heading: '3. Disclaimer of Accuracy',
        content: 'Numerology is a belief system and should not be used as the sole basis for business decisions. We make no claims about the accuracy or effectiveness of numerological analysis. Results are provided "as is" without any warranties.'
      },
      {
        heading: '4. User Conduct',
        content: 'You agree to use our services only for lawful purposes and not to: attempt to gain unauthorized access, interfere with the service, or use automated tools to access the site excessively.'
      },
      {
        heading: '5. Intellectual Property',
        content: 'All content on NumerologyHub, including text, graphics, logos, and software, is our property or licensed to us and is protected by copyright and trademark laws.'
      },
      {
        heading: '6. Third-Party Links and Advertising',
        content: 'Our site may contain links to third-party websites and advertisements (including Google AdSense). We are not responsible for the content or practices of these third parties.'
      },
      {
        heading: '7. Limitation of Liability',
        content: 'NumerologyHub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.'
      },
      {
        heading: '8. Changes to Terms',
        content: 'We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.'
      },
      {
        heading: '9. Governing Law',
        content: 'These terms are governed by applicable law. Any disputes shall be resolved in the appropriate courts.'
      }
    ]
  },
  fr: {
    title: 'Conditions d\'Utilisation',
    lastUpdated: 'Dernière mise à jour : Décembre 2024',
    sections: [
      {
        heading: '1. Acceptation des Conditions',
        content: 'En accédant et utilisant NumerologyHub, vous acceptez d\'être lié par ces Conditions d\'Utilisation. Si vous n\'êtes pas d\'accord, veuillez ne pas utiliser nos services.'
      },
      {
        heading: '2. Description du Service',
        content: 'NumerologyHub fournit des calculateurs de numérologie en ligne gratuits pour l\'analyse de noms d\'entreprise, slogans et compatibilité. Tous les calculs sont effectués dans votre navigateur et sont uniquement à des fins de divertissement et d\'information.'
      },
      {
        heading: '3. Avertissement sur l\'Exactitude',
        content: 'La numérologie est un système de croyances et ne doit pas être utilisée comme seule base pour les décisions commerciales. Nous ne faisons aucune affirmation sur l\'exactitude ou l\'efficacité de l\'analyse numérologique. Les résultats sont fournis "tels quels" sans aucune garantie.'
      },
      {
        heading: '4. Conduite de l\'Utilisateur',
        content: 'Vous acceptez d\'utiliser nos services uniquement à des fins légales et de ne pas : tenter d\'obtenir un accès non autorisé, interférer avec le service, ou utiliser des outils automatisés pour accéder au site de manière excessive.'
      },
      {
        heading: '5. Propriété Intellectuelle',
        content: 'Tout le contenu sur NumerologyHub, y compris les textes, graphiques, logos et logiciels, est notre propriété ou nous est licencié et est protégé par les lois sur le droit d\'auteur et les marques.'
      },
      {
        heading: '6. Liens et Publicités Tiers',
        content: 'Notre site peut contenir des liens vers des sites tiers et des publicités (y compris Google AdSense). Nous ne sommes pas responsables du contenu ou des pratiques de ces tiers.'
      },
      {
        heading: '7. Limitation de Responsabilité',
        content: 'NumerologyHub ne sera pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs découlant de votre utilisation de nos services.'
      },
      {
        heading: '8. Modifications des Conditions',
        content: 'Nous pouvons modifier ces conditions à tout moment. L\'utilisation continue du service après les modifications constitue une acceptation des nouvelles conditions.'
      },
      {
        heading: '9. Droit Applicable',
        content: 'Ces conditions sont régies par le droit applicable. Tout litige sera résolu devant les tribunaux compétents.'
      }
    ]
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: Diciembre 2024',
    sections: [
      {
        heading: '1. Aceptación de Términos',
        content: 'Al acceder y usar NumerologyHub, acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo, por favor no use nuestros servicios.'
      },
      {
        heading: '2. Descripción del Servicio',
        content: 'NumerologyHub proporciona calculadoras de numerología en línea gratuitas para análisis de nombres de empresas, eslóganes y compatibilidad. Todos los cálculos se realizan en su navegador y son solo para entretenimiento e información.'
      },
      {
        heading: '3. Descargo de Exactitud',
        content: 'La numerología es un sistema de creencias y no debe usarse como única base para decisiones comerciales. No hacemos afirmaciones sobre la exactitud o efectividad del análisis numerológico. Los resultados se proporcionan "tal cual" sin garantías.'
      },
      {
        heading: '4. Conducta del Usuario',
        content: 'Acepta usar nuestros servicios solo para propósitos legales y no: intentar obtener acceso no autorizado, interferir con el servicio, o usar herramientas automatizadas para acceder al sitio excesivamente.'
      },
      {
        heading: '5. Propiedad Intelectual',
        content: 'Todo el contenido en NumerologyHub, incluyendo texto, gráficos, logotipos y software, es nuestra propiedad o está licenciado a nosotros y está protegido por leyes de derechos de autor y marcas.'
      },
      {
        heading: '6. Enlaces y Publicidad de Terceros',
        content: 'Nuestro sitio puede contener enlaces a sitios web de terceros y anuncios (incluyendo Google AdSense). No somos responsables del contenido o prácticas de estos terceros.'
      },
      {
        heading: '7. Limitación de Responsabilidad',
        content: 'NumerologyHub no será responsable de daños indirectos, incidentales, especiales o consecuentes que surjan de su uso de nuestros servicios.'
      },
      {
        heading: '8. Cambios en los Términos',
        content: 'Podemos modificar estos términos en cualquier momento. El uso continuo del servicio después de los cambios constituye aceptación de los nuevos términos.'
      },
      {
        heading: '9. Ley Aplicable',
        content: 'Estos términos se rigen por la ley aplicable. Cualquier disputa se resolverá en los tribunales apropiados.'
      }
    ]
  }
};

const Terms = () => {
  const { language } = useLanguage();
  const content = legalContent[language] || legalContent.en;

  return (
    <>
      <Helmet>
        <title>{content.title} | NumerologyHub</title>
        <meta name="description" content={`${content.title} for NumerologyHub - Business Numerology Calculator`} />
        <link rel="canonical" href={`https://numerologyhub.com/${language}/legal/terms`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
              {content.title}
            </h1>
            <p className="text-muted-foreground mb-12">{content.lastUpdated}</p>

            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={index} className="mystic-card p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Terms;