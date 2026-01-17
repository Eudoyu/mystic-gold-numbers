import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const COMPANY_NAME = 'NumerologyForBiz.com';
const COMPANY_EMAIL = 'contact@numerologyforbiz.com';
const SITE_URL = 'https://numerologyforbiz.com';

const legalContent = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2025',
    sections: [
      {
        heading: '1. Data Controller',
        content: `The data controller for this website is ${COMPANY_NAME}. For any privacy-related inquiries, please contact us at: ${COMPANY_EMAIL}`
      },
      {
        heading: '2. Information We Collect',
        content: 'We collect information you provide directly to us, such as when you use our calculators or subscribe to our newsletter. This may include your email address and any business names you analyze. We do not store the names you analyze - calculations are performed client-side in your browser.'
      },
      {
        heading: '3. How We Use Your Information',
        content: 'We use the information we collect to: provide and improve our services, send you newsletters if you subscribe, respond to your inquiries, and comply with legal obligations.'
      },
      {
        heading: '4. Google AdSense & Advertising Cookies',
        content: 'This site uses the Google AdSense program which uses cookies to serve ads based on a user\'s prior visits to your website or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ad Settings (https://adssettings.google.com).'
      },
      {
        heading: '5. Cookies and Tracking',
        content: 'We use cookies and similar technologies to analyze traffic and personalize content. You can control cookies through your browser settings and our consent banner. We use Google Analytics and Google AdSense which may set their own cookies.'
      },
      {
        heading: '6. Third-Party Services',
        content: 'We may share information with third-party service providers who perform services on our behalf, including Google (Analytics, AdSense), and our newsletter provider (Kit/ConvertKit). For more information about Google\'s privacy practices, visit: https://policies.google.com/privacy'
      },
      {
        heading: '7. Your Rights (GDPR)',
        content: `If you are in the European Economic Area, you have the right to access, correct, delete, or port your personal data. You can also object to or restrict processing. Contact us at ${COMPANY_EMAIL} to exercise these rights.`
      },
      {
        heading: '8. Data Retention',
        content: 'We retain personal data only as long as necessary to fulfill the purposes for which it was collected, or as required by law.'
      },
      {
        heading: '9. Contact Us',
        content: `For privacy-related inquiries, contact us at: ${COMPANY_EMAIL}`
      }
    ]
  },
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : Janvier 2025',
    sections: [
      {
        heading: '1. Responsable du Traitement',
        content: `Le responsable du traitement des données pour ce site est ${COMPANY_NAME}. Pour toute question relative à la confidentialité, veuillez nous contacter à : ${COMPANY_EMAIL}`
      },
      {
        heading: '2. Informations Collectées',
        content: 'Nous collectons les informations que vous nous fournissez directement, notamment lors de l\'utilisation de nos calculateurs ou de l\'inscription à notre newsletter. Cela peut inclure votre adresse email. Nous ne stockons pas les noms que vous analysez - les calculs sont effectués côté client dans votre navigateur.'
      },
      {
        heading: '3. Utilisation des Informations',
        content: 'Nous utilisons les informations collectées pour : fournir et améliorer nos services, vous envoyer des newsletters si vous êtes abonné, répondre à vos demandes, et respecter nos obligations légales.'
      },
      {
        heading: '4. Google AdSense & Cookies Publicitaires',
        content: 'Ce site utilise le programme Google AdSense qui utilise des cookies pour diffuser des annonces basées sur les visites précédentes de l\'utilisateur sur ce site ou d\'autres sites. L\'utilisation par Google des cookies publicitaires permet à Google et ses partenaires de diffuser des annonces basées sur la visite des utilisateurs sur vos sites et/ou d\'autres sites Internet. Les utilisateurs peuvent refuser la publicité personnalisée en visitant les Paramètres des annonces Google (https://adssettings.google.com).'
      },
      {
        heading: '5. Cookies et Suivi',
        content: 'Nous utilisons des cookies et technologies similaires pour analyser le trafic et personnaliser le contenu. Vous pouvez contrôler les cookies via les paramètres de votre navigateur et notre bannière de consentement. Nous utilisons Google Analytics et Google AdSense qui peuvent définir leurs propres cookies.'
      },
      {
        heading: '6. Services Tiers',
        content: 'Nous pouvons partager des informations avec des prestataires tiers qui effectuent des services en notre nom, notamment Google (Analytics, AdSense) et notre fournisseur de newsletter (Kit/ConvertKit). Pour plus d\'informations sur les pratiques de confidentialité de Google, visitez : https://policies.google.com/privacy'
      },
      {
        heading: '7. Vos Droits (RGPD)',
        content: `Si vous êtes dans l'Espace Économique Européen, vous avez le droit d'accéder, corriger, supprimer ou porter vos données personnelles. Vous pouvez également vous opposer au traitement ou le restreindre. Contactez-nous à ${COMPANY_EMAIL} pour exercer ces droits.`
      },
      {
        heading: '8. Conservation des Données',
        content: 'Nous conservons les données personnelles uniquement aussi longtemps que nécessaire pour atteindre les objectifs pour lesquels elles ont été collectées, ou comme requis par la loi.'
      },
      {
        heading: '9. Nous Contacter',
        content: `Pour toute question relative à la confidentialité, contactez-nous à : ${COMPANY_EMAIL}`
      }
    ]
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Enero 2025',
    sections: [
      {
        heading: '1. Responsable del Tratamiento',
        content: `El responsable del tratamiento de datos para este sitio web es ${COMPANY_NAME}. Para cualquier consulta relacionada con la privacidad, contáctenos en: ${COMPANY_EMAIL}`
      },
      {
        heading: '2. Información que Recopilamos',
        content: 'Recopilamos información que nos proporciona directamente, como cuando usa nuestras calculadoras o se suscribe a nuestro boletín. Esto puede incluir su dirección de correo electrónico. No almacenamos los nombres que analiza - los cálculos se realizan del lado del cliente en su navegador.'
      },
      {
        heading: '3. Cómo Usamos su Información',
        content: 'Usamos la información que recopilamos para: proporcionar y mejorar nuestros servicios, enviarle boletines si está suscrito, responder a sus consultas y cumplir con obligaciones legales.'
      },
      {
        heading: '4. Google AdSense y Cookies Publicitarias',
        content: 'Este sitio utiliza el programa Google AdSense que usa cookies para servir anuncios basados en las visitas previas del usuario a este sitio web u otros sitios web. El uso de cookies publicitarias por parte de Google permite a Google y sus socios servir anuncios basados en la visita de los usuarios a sus sitios y/o otros sitios en Internet. Los usuarios pueden optar por no recibir publicidad personalizada visitando la Configuración de Anuncios de Google (https://adssettings.google.com).'
      },
      {
        heading: '5. Cookies y Seguimiento',
        content: 'Usamos cookies y tecnologías similares para analizar el tráfico y personalizar contenido. Puede controlar las cookies a través de la configuración de su navegador y nuestro banner de consentimiento. Usamos Google Analytics y Google AdSense que pueden establecer sus propias cookies.'
      },
      {
        heading: '6. Servicios de Terceros',
        content: 'Podemos compartir información con proveedores de servicios de terceros que realizan servicios en nuestro nombre, incluyendo Google (Analytics, AdSense) y nuestro proveedor de boletines (Kit/ConvertKit). Para más información sobre las prácticas de privacidad de Google, visite: https://policies.google.com/privacy'
      },
      {
        heading: '7. Sus Derechos (GDPR)',
        content: `Si está en el Espacio Económico Europeo, tiene derecho a acceder, corregir, eliminar o portar sus datos personales. También puede oponerse o restringir el procesamiento. Contáctenos en ${COMPANY_EMAIL} para ejercer estos derechos.`
      },
      {
        heading: '8. Retención de Datos',
        content: 'Retenemos datos personales solo mientras sea necesario para cumplir los propósitos para los cuales fueron recopilados, o según lo requiera la ley.'
      },
      {
        heading: '9. Contáctenos',
        content: `Para consultas relacionadas con la privacidad, contáctenos en: ${COMPANY_EMAIL}`
      }
    ]
  }
};

type SupportedLang = keyof typeof legalContent;

const Privacy = () => {
  const { language } = useLanguage();
  const content = legalContent[language as SupportedLang] || legalContent.en;

  return (
    <>
      <Helmet>
        <title>{content.title} | {COMPANY_NAME}</title>
        <meta name="description" content={`${content.title} for ${COMPANY_NAME} - Business Numerology Calculator`} />
        <link rel="canonical" href={`${SITE_URL}/${language}/legal/privacy`} />
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

export default Privacy;
