import { Helmet } from 'react-helmet-async';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const disclaimerContent = {
  en: {
    title: 'Disclaimer',
    lastUpdated: 'Last updated: December 2024',
    importantNotice: 'Important Notice',
    sections: [
      {
        heading: 'Entertainment and Informational Purposes Only',
        content: 'All numerology readings, analyses, and results provided by NumerologyHub are for entertainment and informational purposes only. Numerology is a belief system based on the mystical relationship between numbers and events. It is not a science and should not be treated as such.'
      },
      {
        heading: 'Not Professional Advice',
        content: 'The information provided on this website does not constitute professional business, financial, legal, or investment advice. You should not make important business decisions based solely on numerology readings. Always consult qualified professionals for business, legal, and financial matters.'
      },
      {
        heading: 'No Guarantees',
        content: 'We make no guarantees, representations, or warranties about the accuracy, completeness, or reliability of the numerology calculations or interpretations. The "meaning" or "vibration" associated with numbers is based on traditional numerology beliefs and is subjective.'
      },
      {
        heading: 'Individual Responsibility',
        content: 'You are solely responsible for any decisions you make based on the information provided by our tools. NumerologyHub and its operators will not be held liable for any outcomes resulting from the use of our services.'
      },
      {
        heading: 'Cultural and Personal Beliefs',
        content: 'Numerology has different traditions and interpretations across cultures. Our calculations are based on Western numerology systems (Pythagorean, Chaldean) and Hebrew Gematria. Results may differ based on the system used and individual interpretation.'
      },
      {
        heading: 'Third-Party Content',
        content: 'This website may contain advertisements and links to third-party websites. We are not responsible for the content, accuracy, or opinions expressed on these external sites.'
      }
    ]
  },
  fr: {
    title: 'Avertissement',
    lastUpdated: 'Dernière mise à jour : Décembre 2024',
    importantNotice: 'Avis Important',
    sections: [
      {
        heading: 'Divertissement et Information Uniquement',
        content: 'Toutes les lectures, analyses et résultats de numérologie fournis par NumerologyHub sont uniquement à des fins de divertissement et d\'information. La numérologie est un système de croyances basé sur la relation mystique entre les nombres et les événements. Ce n\'est pas une science et ne doit pas être traitée comme telle.'
      },
      {
        heading: 'Pas de Conseil Professionnel',
        content: 'Les informations fournies sur ce site ne constituent pas des conseils professionnels commerciaux, financiers, juridiques ou d\'investissement. Vous ne devez pas prendre de décisions commerciales importantes uniquement sur la base de lectures de numérologie. Consultez toujours des professionnels qualifiés pour les questions commerciales, juridiques et financières.'
      },
      {
        heading: 'Aucune Garantie',
        content: 'Nous ne faisons aucune garantie, représentation ou assurance concernant l\'exactitude, l\'exhaustivité ou la fiabilité des calculs ou interprétations numérologiques. La "signification" ou "vibration" associée aux nombres est basée sur les croyances traditionnelles de la numérologie et est subjective.'
      },
      {
        heading: 'Responsabilité Individuelle',
        content: 'Vous êtes seul responsable de toutes les décisions que vous prenez sur la base des informations fournies par nos outils. NumerologyHub et ses opérateurs ne seront pas tenus responsables des résultats découlant de l\'utilisation de nos services.'
      },
      {
        heading: 'Croyances Culturelles et Personnelles',
        content: 'La numérologie a différentes traditions et interprétations selon les cultures. Nos calculs sont basés sur les systèmes de numérologie occidentaux (Pythagoricien, Chaldéen) et la Gématria hébraïque. Les résultats peuvent différer selon le système utilisé et l\'interprétation individuelle.'
      },
      {
        heading: 'Contenu Tiers',
        content: 'Ce site peut contenir des publicités et des liens vers des sites tiers. Nous ne sommes pas responsables du contenu, de l\'exactitude ou des opinions exprimées sur ces sites externes.'
      }
    ]
  },
  es: {
    title: 'Aviso Legal',
    lastUpdated: 'Última actualización: Diciembre 2024',
    importantNotice: 'Aviso Importante',
    sections: [
      {
        heading: 'Solo para Entretenimiento e Información',
        content: 'Todas las lecturas, análisis y resultados de numerología proporcionados por NumerologyHub son solo para entretenimiento e información. La numerología es un sistema de creencias basado en la relación mística entre números y eventos. No es una ciencia y no debe tratarse como tal.'
      },
      {
        heading: 'No es Asesoramiento Profesional',
        content: 'La información proporcionada en este sitio web no constituye asesoramiento profesional comercial, financiero, legal o de inversión. No debe tomar decisiones comerciales importantes basándose únicamente en lecturas de numerología. Siempre consulte a profesionales calificados para asuntos comerciales, legales y financieros.'
      },
      {
        heading: 'Sin Garantías',
        content: 'No hacemos garantías, representaciones ni afirmaciones sobre la exactitud, integridad o confiabilidad de los cálculos o interpretaciones numerológicas. El "significado" o "vibración" asociado con los números se basa en creencias tradicionales de numerología y es subjetivo.'
      },
      {
        heading: 'Responsabilidad Individual',
        content: 'Usted es el único responsable de cualquier decisión que tome basándose en la información proporcionada por nuestras herramientas. NumerologyHub y sus operadores no serán responsables de ningún resultado derivado del uso de nuestros servicios.'
      },
      {
        heading: 'Creencias Culturales y Personales',
        content: 'La numerología tiene diferentes tradiciones e interpretaciones según las culturas. Nuestros cálculos se basan en sistemas de numerología occidentales (Pitagórico, Caldeo) y Gematría hebrea. Los resultados pueden diferir según el sistema utilizado y la interpretación individual.'
      },
      {
        heading: 'Contenido de Terceros',
        content: 'Este sitio web puede contener anuncios y enlaces a sitios web de terceros. No somos responsables del contenido, exactitud u opiniones expresadas en estos sitios externos.'
      }
    ]
  }
};

const Disclaimer = () => {
  const { language } = useLanguage();
  const content = disclaimerContent[language] || disclaimerContent.en;

  return (
    <>
      <Helmet>
        <title>{content.title} | NumerologyHub</title>
        <meta name="description" content={`${content.title} for NumerologyHub - Numerology is for entertainment purposes only`} />
        <link rel="canonical" href={`https://numerologyhub.com/${language}/legal/disclaimer`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 gold-text">
              {content.title}
            </h1>
            <p className="text-muted-foreground mb-8">{content.lastUpdated}</p>

            {/* Important Notice Box */}
            <div className="mystic-card p-6 mb-8 border-primary/50">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-semibold text-primary mb-2">
                    {content.importantNotice}
                  </h2>
                  <p className="text-muted-foreground">
                    {content.sections[0].content}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {content.sections.slice(1).map((section, index) => (
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

export default Disclaimer;