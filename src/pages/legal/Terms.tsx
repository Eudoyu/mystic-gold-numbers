import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const COMPANY_NAME = 'NumerologyForBiz.com';
const COMPANY_EMAIL = 'contact@numerologyforbiz.com';
const SITE_URL = 'https://numerologyforbiz.com';

// Legal entity operating this website
const OPERATOR_INFO = {
  name: 'EUDOYU SARL-S',
  address: '303 rue de Neudorf, Luxembourg',
  authorization: '10151674 / 0'
};

const legalContent = {
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: January 2025',
    operatorTitle: 'Website Operator',
    operatorText: `This website (${COMPANY_NAME}) is operated by: ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}. Authorization Number: ${OPERATOR_INFO.authorization}. Contact: ${COMPANY_EMAIL}`,
    sections: [
      {
        heading: '1. Acceptance of Terms',
        content: `By accessing and using ${COMPANY_NAME}, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.`
      },
      {
        heading: '2. Service Provider',
        content: `This website is operated by ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}, Authorization Number: ${OPERATOR_INFO.authorization}. For any inquiries, please contact us at: ${COMPANY_EMAIL}`
      },
      {
        heading: '3. Description of Service',
        content: `${COMPANY_NAME} provides online numerology calculators for business name analysis, slogan analysis, and compatibility checks. All calculations are performed in your browser and are for entertainment and informational purposes only.`
      },
      {
        heading: '4. Disclaimer of Accuracy',
        content: 'Numerology is a belief system and should not be used as the sole basis for business decisions. We make no claims about the accuracy or effectiveness of numerological analysis. Results are provided "as is" without any warranties.'
      },
      {
        heading: '5. User Conduct',
        content: 'You agree to use our services only for lawful purposes and not to: attempt to gain unauthorized access, interfere with the service, or use automated tools to access the site excessively.'
      },
      {
        heading: '6. Intellectual Property',
        content: `All content on ${COMPANY_NAME}, including text, graphics, logos, and software, is the exclusive property of ${COMPANY_NAME}. Any total or partial reproduction without express authorization is prohibited.`
      },
      {
        heading: '7. Third-Party Links and Advertising',
        content: 'Our site may contain links to third-party websites and advertisements (including Google AdSense). We are not responsible for the content or practices of these third parties.'
      },
      {
        heading: '8. Limitation of Liability',
        content: `${COMPANY_NAME} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.`
      },
      {
        heading: '9. Changes to Terms',
        content: 'We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.'
      },
      {
        heading: '10. Governing Law',
        content: 'These terms are governed by applicable law. Any disputes shall be resolved in the appropriate courts.'
      },
      {
        heading: '11. Contact',
        content: `For any questions regarding these terms, contact us at: ${COMPANY_EMAIL}`
      }
    ]
  },
  fr: {
    title: 'Conditions d\'Utilisation',
    lastUpdated: 'Dernière mise à jour : Janvier 2025',
    operatorTitle: 'Exploitant du Site',
    operatorText: `Ce site web (${COMPANY_NAME}) est exploité par : ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}. Numéro d'autorisation : ${OPERATOR_INFO.authorization}. Contact : ${COMPANY_EMAIL}`,
    sections: [
      {
        heading: '1. Acceptation des Conditions',
        content: `En accédant et utilisant ${COMPANY_NAME}, vous acceptez d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord, veuillez ne pas utiliser nos services.`
      },
      {
        heading: '2. Éditeur du Service',
        content: `Ce site est exploité par ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}, Numéro d'autorisation : ${OPERATOR_INFO.authorization}. Pour toute demande, veuillez nous contacter à : ${COMPANY_EMAIL}`
      },
      {
        heading: '3. Description du Service',
        content: `${COMPANY_NAME} fournit des calculateurs de numérologie en ligne pour l'analyse de noms d'entreprise, slogans et compatibilité. Tous les calculs sont effectués dans votre navigateur et sont uniquement à des fins de divertissement et d'information.`
      },
      {
        heading: '4. Avertissement sur l\'Exactitude',
        content: 'La numérologie est un système de croyances et ne doit pas être utilisée comme seule base pour les décisions commerciales. Nous ne faisons aucune affirmation sur l\'exactitude ou l\'efficacité de l\'analyse numérologique. Les résultats sont fournis "tels quels" sans aucune garantie.'
      },
      {
        heading: '5. Conduite de l\'Utilisateur',
        content: 'Vous acceptez d\'utiliser nos services uniquement à des fins légales et de ne pas : tenter d\'obtenir un accès non autorisé, interférer avec le service, ou utiliser des outils automatisés pour accéder au site de manière excessive.'
      },
      {
        heading: '6. Propriété Intellectuelle',
        content: `L'ensemble du contenu sur ${COMPANY_NAME}, y compris les textes, graphiques, logos et logiciels, est la propriété exclusive de ${COMPANY_NAME}. Toute reproduction totale ou partielle sans autorisation expresse est interdite.`
      },
      {
        heading: '7. Liens et Publicités Tiers',
        content: 'Notre site peut contenir des liens vers des sites tiers et des publicités (y compris Google AdSense). Nous ne sommes pas responsables du contenu ou des pratiques de ces tiers.'
      },
      {
        heading: '8. Limitation de Responsabilité',
        content: `${COMPANY_NAME} ne sera pas responsable des dommages indirects, accessoires, spéciaux ou consécutifs découlant de votre utilisation de nos services.`
      },
      {
        heading: '9. Modifications des Conditions',
        content: 'Nous pouvons modifier ces conditions à tout moment. L\'utilisation continue du service après les modifications constitue une acceptation des nouvelles conditions.'
      },
      {
        heading: '10. Droit Applicable',
        content: 'Ces conditions sont régies par le droit applicable. Tout litige sera résolu devant les tribunaux compétents.'
      },
      {
        heading: '11. Contact',
        content: `Pour toute question concernant ces conditions, contactez-nous à : ${COMPANY_EMAIL}`
      }
    ]
  },
  es: {
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: Enero 2025',
    operatorTitle: 'Operador del Sitio Web',
    operatorText: `Este sitio web (${COMPANY_NAME}) es operado por: ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}. Número de Autorización: ${OPERATOR_INFO.authorization}. Contacto: ${COMPANY_EMAIL}`,
    sections: [
      {
        heading: '1. Aceptación de Términos',
        content: `Al acceder y usar ${COMPANY_NAME}, acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo, por favor no use nuestros servicios.`
      },
      {
        heading: '2. Proveedor del Servicio',
        content: `Este sitio web es operado por ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}, Número de Autorización: ${OPERATOR_INFO.authorization}. Para cualquier consulta, contáctenos en: ${COMPANY_EMAIL}`
      },
      {
        heading: '3. Descripción del Servicio',
        content: `${COMPANY_NAME} proporciona calculadoras de numerología en línea para análisis de nombres de empresas, eslóganes y compatibilidad. Todos los cálculos se realizan en su navegador y son solo para entretenimiento e información.`
      },
      {
        heading: '4. Descargo de Exactitud',
        content: 'La numerología es un sistema de creencias y no debe usarse como única base para decisiones comerciales. No hacemos afirmaciones sobre la exactitud o efectividad del análisis numerológico. Los resultados se proporcionan "tal cual" sin garantías.'
      },
      {
        heading: '5. Conducta del Usuario',
        content: 'Acepta usar nuestros servicios solo para propósitos legales y no: intentar obtener acceso no autorizado, interferir con el servicio, o usar herramientas automatizadas para acceder al sitio excesivamente.'
      },
      {
        heading: '6. Propiedad Intelectual',
        content: `Todo el contenido en ${COMPANY_NAME}, incluyendo texto, gráficos, logotipos y software, es propiedad exclusiva de ${COMPANY_NAME}. Cualquier reproducción total o parcial sin autorización expresa está prohibida.`
      },
      {
        heading: '7. Enlaces y Publicidad de Terceros',
        content: 'Nuestro sitio puede contener enlaces a sitios web de terceros y anuncios (incluyendo Google AdSense). No somos responsables del contenido o prácticas de estos terceros.'
      },
      {
        heading: '8. Limitación de Responsabilidad',
        content: `${COMPANY_NAME} no será responsable de daños indirectos, incidentales, especiales o consecuentes que surjan de su uso de nuestros servicios.`
      },
      {
        heading: '9. Cambios en los Términos',
        content: 'Podemos modificar estos términos en cualquier momento. El uso continuo del servicio después de los cambios constituye aceptación de los nuevos términos.'
      },
      {
        heading: '10. Ley Aplicable',
        content: 'Estos términos se rigen por la ley aplicable. Cualquier disputa se resolverá en los tribunales apropiados.'
      },
      {
        heading: '11. Contacto',
        content: `Para cualquier pregunta sobre estos términos, contáctenos en: ${COMPANY_EMAIL}`
      }
    ]
  }
};

type SupportedLang = keyof typeof legalContent;

const Terms = () => {
  const { language } = useLanguage();
  const content = legalContent[language as SupportedLang] || legalContent.en;

  return (
    <>
      <Helmet>
        <title>{content.title} | {COMPANY_NAME}</title>
        <meta name="description" content={`${content.title} for ${COMPANY_NAME} - Business Numerology Calculator`} />
        <link rel="canonical" href={`${SITE_URL}/${language}/legal/terms`} />
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

            {/* Website Operator Info */}
            <div className="mystic-card p-6 mb-8 bg-muted/30">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                {content.operatorTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {content.operatorText}
              </p>
            </div>
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
