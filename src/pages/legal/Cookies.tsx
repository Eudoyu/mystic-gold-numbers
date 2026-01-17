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
    title: 'Cookie Policy',
    lastUpdated: 'Last updated: January 2025',
    operatorTitle: 'Website Operator',
    operatorText: `This website (${COMPANY_NAME}) is operated by: ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}. Authorization Number: ${OPERATOR_INFO.authorization}. Contact: ${COMPANY_EMAIL}`,
    sections: [
      {
        heading: 'What Are Cookies?',
        content: 'Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.'
      },
      {
        heading: 'Essential Cookies',
        content: 'These cookies are necessary for the website to function properly. They enable basic features like language preferences and session management. You cannot opt out of essential cookies.'
      },
      {
        heading: 'Analytics Cookies',
        content: 'We use Google Analytics to understand how visitors interact with our website. These cookies collect information about page visits, time spent, and navigation patterns. This data is anonymized and aggregated.'
      },
      {
        heading: 'Advertising Cookies',
        content: `We use Google AdSense to display advertisements. These cookies may track your browsing activity across websites to show you relevant ads. You can opt out of personalized advertising through the consent banner or Google's Ad Settings (https://adssettings.google.com).`
      },
      {
        heading: 'Managing Cookies',
        content: `You can control cookies through: our consent banner (shown on first visit), your browser settings (to block or delete cookies), and Google's privacy tools at https://adssettings.google.com`
      },
      {
        heading: 'Cookie List',
        content: '_ga, _gid (Google Analytics - 2 years / 24 hours): Used for analytics. __gads, __gpi (Google AdSense - 13 months): Used for advertising. lang_pref (Local - 1 year): Stores your language preference. user_consent_preferences (Local): Stores your cookie consent choices.'
      },
      {
        heading: 'Updates to This Policy',
        content: 'We may update this Cookie Policy periodically. Check the "last updated" date for the most current version.'
      },
      {
        heading: 'Contact',
        content: `For any questions about our use of cookies, contact us at: ${COMPANY_EMAIL}`
      }
    ]
  },
  fr: {
    title: 'Politique des Cookies',
    lastUpdated: 'Dernière mise à jour : Janvier 2025',
    operatorTitle: 'Exploitant du Site',
    operatorText: `Ce site web (${COMPANY_NAME}) est exploité par : ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}. Numéro d'autorisation : ${OPERATOR_INFO.authorization}. Contact : ${COMPANY_EMAIL}`,
    sections: [
      {
        heading: 'Qu\'est-ce qu\'un Cookie ?',
        content: 'Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils aident les sites à mémoriser vos préférences et améliorer votre expérience.'
      },
      {
        heading: 'Cookies Essentiels',
        content: 'Ces cookies sont nécessaires au bon fonctionnement du site. Ils activent des fonctionnalités de base comme les préférences de langue et la gestion de session. Vous ne pouvez pas refuser les cookies essentiels.'
      },
      {
        heading: 'Cookies Analytiques',
        content: 'Nous utilisons Google Analytics pour comprendre comment les visiteurs interagissent avec notre site. Ces cookies collectent des informations sur les visites, le temps passé et les schémas de navigation. Ces données sont anonymisées et agrégées.'
      },
      {
        heading: 'Cookies Publicitaires',
        content: 'Nous utilisons Google AdSense pour afficher des publicités. Ces cookies peuvent suivre votre activité de navigation sur les sites pour vous montrer des publicités pertinentes. Vous pouvez refuser la publicité personnalisée via la bannière de consentement ou les paramètres publicitaires de Google (https://adssettings.google.com).'
      },
      {
        heading: 'Gestion des Cookies',
        content: 'Vous pouvez contrôler les cookies via : notre bannière de consentement (affichée à la première visite), les paramètres de votre navigateur (pour bloquer ou supprimer les cookies), et les outils de confidentialité Google à https://adssettings.google.com'
      },
      {
        heading: 'Liste des Cookies',
        content: '_ga, _gid (Google Analytics - 2 ans / 24 heures) : Utilisés pour l\'analyse. __gads, __gpi (Google AdSense - 13 mois) : Utilisés pour la publicité. lang_pref (Local - 1 an) : Stocke votre préférence de langue. user_consent_preferences (Local) : Stocke vos choix de consentement aux cookies.'
      },
      {
        heading: 'Mises à Jour de cette Politique',
        content: 'Nous pouvons mettre à jour cette Politique des Cookies périodiquement. Vérifiez la date de "dernière mise à jour" pour la version la plus récente.'
      },
      {
        heading: 'Contact',
        content: `Pour toute question sur notre utilisation des cookies, contactez-nous à : ${COMPANY_EMAIL}`
      }
    ]
  },
  es: {
    title: 'Política de Cookies',
    lastUpdated: 'Última actualización: Enero 2025',
    operatorTitle: 'Operador del Sitio Web',
    operatorText: `Este sitio web (${COMPANY_NAME}) es operado por: ${OPERATOR_INFO.name}, ${OPERATOR_INFO.address}. Número de Autorización: ${OPERATOR_INFO.authorization}. Contacto: ${COMPANY_EMAIL}`,
    sections: [
      {
        heading: '¿Qué son las Cookies?',
        content: 'Las cookies son pequeños archivos de texto almacenados en su dispositivo cuando visita un sitio web. Ayudan a los sitios a recordar sus preferencias y mejorar su experiencia.'
      },
      {
        heading: 'Cookies Esenciales',
        content: 'Estas cookies son necesarias para que el sitio web funcione correctamente. Habilitan funciones básicas como preferencias de idioma y gestión de sesión. No puede optar por no recibir cookies esenciales.'
      },
      {
        heading: 'Cookies de Análisis',
        content: 'Usamos Google Analytics para entender cómo los visitantes interactúan con nuestro sitio. Estas cookies recopilan información sobre visitas, tiempo de permanencia y patrones de navegación. Estos datos son anónimos y agregados.'
      },
      {
        heading: 'Cookies de Publicidad',
        content: 'Usamos Google AdSense para mostrar anuncios. Estas cookies pueden rastrear su actividad de navegación en sitios web para mostrarle anuncios relevantes. Puede optar por no recibir publicidad personalizada a través del banner de consentimiento o la Configuración de Anuncios de Google (https://adssettings.google.com).'
      },
      {
        heading: 'Gestión de Cookies',
        content: 'Puede controlar las cookies a través de: nuestro banner de consentimiento (mostrado en la primera visita), la configuración de su navegador (para bloquear o eliminar cookies), y las herramientas de privacidad de Google en https://adssettings.google.com'
      },
      {
        heading: 'Lista de Cookies',
        content: '_ga, _gid (Google Analytics - 2 años / 24 horas): Usadas para análisis. __gads, __gpi (Google AdSense - 13 meses): Usadas para publicidad. lang_pref (Local - 1 año): Almacena su preferencia de idioma. user_consent_preferences (Local): Almacena sus elecciones de consentimiento de cookies.'
      },
      {
        heading: 'Actualizaciones de esta Política',
        content: 'Podemos actualizar esta Política de Cookies periódicamente. Verifique la fecha de "última actualización" para la versión más reciente.'
      },
      {
        heading: 'Contacto',
        content: `Para cualquier pregunta sobre nuestro uso de cookies, contáctenos en: ${COMPANY_EMAIL}`
      }
    ]
  }
};

type SupportedLang = keyof typeof legalContent;

const Cookies = () => {
  const { language } = useLanguage();
  const content = legalContent[language as SupportedLang] || legalContent.en;

  return (
    <>
      <Helmet>
        <title>{content.title} | {COMPANY_NAME}</title>
        <meta name="description" content={`${content.title} for ${COMPANY_NAME} - Business Numerology Calculator`} />
        <link rel="canonical" href={`${SITE_URL}/${language}/legal/cookies`} />
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

export default Cookies;
