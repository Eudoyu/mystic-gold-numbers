import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const legalContent = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: December 2024',
    sections: [
      {
        heading: '1. Information We Collect',
        content: 'We collect information you provide directly to us, such as when you use our calculators or subscribe to our newsletter. This may include your email address and any business names you analyze. We do not store the names you analyze - calculations are performed client-side.'
      },
      {
        heading: '2. How We Use Your Information',
        content: 'We use the information we collect to: provide and improve our services, send you newsletters if you subscribe, respond to your inquiries, and comply with legal obligations.'
      },
      {
        heading: '3. Cookies and Tracking',
        content: 'We use cookies and similar technologies to analyze traffic and personalize content. You can control cookies through your browser settings. We use Google Analytics and Google AdSense which may set their own cookies.'
      },
      {
        heading: '4. Third-Party Services',
        content: 'We may share information with third-party service providers who perform services on our behalf, including Google (Analytics, AdSense), and our newsletter provider (Kit/ConvertKit).'
      },
      {
        heading: '5. Your Rights (GDPR)',
        content: 'If you are in the European Economic Area, you have the right to access, correct, delete, or port your personal data. You can also object to or restrict processing. Contact us to exercise these rights.'
      },
      {
        heading: '6. Data Retention',
        content: 'We retain personal data only as long as necessary to fulfill the purposes for which it was collected, or as required by law.'
      },
      {
        heading: '7. Contact Us',
        content: 'For privacy-related inquiries, contact us at: privacy@numerologyhub.com'
      }
    ]
  },
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : Décembre 2024',
    sections: [
      {
        heading: '1. Informations Collectées',
        content: 'Nous collectons les informations que vous nous fournissez directement, notamment lors de l\'utilisation de nos calculateurs ou de l\'inscription à notre newsletter. Cela peut inclure votre adresse email. Nous ne stockons pas les noms que vous analysez - les calculs sont effectués côté client.'
      },
      {
        heading: '2. Utilisation des Informations',
        content: 'Nous utilisons les informations collectées pour : fournir et améliorer nos services, vous envoyer des newsletters si vous êtes abonné, répondre à vos demandes, et respecter nos obligations légales.'
      },
      {
        heading: '3. Cookies et Suivi',
        content: 'Nous utilisons des cookies et technologies similaires pour analyser le trafic et personnaliser le contenu. Vous pouvez contrôler les cookies via les paramètres de votre navigateur. Nous utilisons Google Analytics et Google AdSense qui peuvent définir leurs propres cookies.'
      },
      {
        heading: '4. Services Tiers',
        content: 'Nous pouvons partager des informations avec des prestataires tiers qui effectuent des services en notre nom, notamment Google (Analytics, AdSense) et notre fournisseur de newsletter (Kit/ConvertKit).'
      },
      {
        heading: '5. Vos Droits (RGPD)',
        content: 'Si vous êtes dans l\'Espace Économique Européen, vous avez le droit d\'accéder, corriger, supprimer ou porter vos données personnelles. Vous pouvez également vous opposer au traitement ou le restreindre. Contactez-nous pour exercer ces droits.'
      },
      {
        heading: '6. Conservation des Données',
        content: 'Nous conservons les données personnelles uniquement aussi longtemps que nécessaire pour atteindre les objectifs pour lesquels elles ont été collectées, ou comme requis par la loi.'
      },
      {
        heading: '7. Nous Contacter',
        content: 'Pour toute question relative à la confidentialité, contactez-nous à : privacy@numerologyhub.com'
      }
    ]
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Diciembre 2024',
    sections: [
      {
        heading: '1. Información que Recopilamos',
        content: 'Recopilamos información que nos proporciona directamente, como cuando usa nuestras calculadoras o se suscribe a nuestro boletín. Esto puede incluir su dirección de correo electrónico. No almacenamos los nombres que analiza - los cálculos se realizan del lado del cliente.'
      },
      {
        heading: '2. Cómo Usamos su Información',
        content: 'Usamos la información que recopilamos para: proporcionar y mejorar nuestros servicios, enviarle boletines si está suscrito, responder a sus consultas y cumplir con obligaciones legales.'
      },
      {
        heading: '3. Cookies y Seguimiento',
        content: 'Usamos cookies y tecnologías similares para analizar el tráfico y personalizar contenido. Puede controlar las cookies a través de la configuración de su navegador. Usamos Google Analytics y Google AdSense que pueden establecer sus propias cookies.'
      },
      {
        heading: '4. Servicios de Terceros',
        content: 'Podemos compartir información con proveedores de servicios de terceros que realizan servicios en nuestro nombre, incluyendo Google (Analytics, AdSense) y nuestro proveedor de boletines (Kit/ConvertKit).'
      },
      {
        heading: '5. Sus Derechos (GDPR)',
        content: 'Si está en el Espacio Económico Europeo, tiene derecho a acceder, corregir, eliminar o portar sus datos personales. También puede oponerse o restringir el procesamiento. Contáctenos para ejercer estos derechos.'
      },
      {
        heading: '6. Retención de Datos',
        content: 'Retenemos datos personales solo mientras sea necesario para cumplir los propósitos para los cuales fueron recopilados, o según lo requiera la ley.'
      },
      {
        heading: '7. Contáctenos',
        content: 'Para consultas relacionadas con la privacidad, contáctenos en: privacy@numerologyhub.com'
      }
    ]
  }
};

const Privacy = () => {
  const { language } = useLanguage();
  const content = legalContent[language] || legalContent.en;

  return (
    <>
      <Helmet>
        <title>{content.title} | NumerologyHub</title>
        <meta name="description" content={`${content.title} for NumerologyHub - Business Numerology Calculator`} />
        <link rel="canonical" href={`https://numerologyhub.com/${language}/legal/privacy`} />
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