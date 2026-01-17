import { Helmet } from 'react-helmet-async';
import { Building2, MapPin, FileText, Mail, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const COMPANY_NAME = 'NumerologyForBiz.com';
const COMPANY_EMAIL = 'contact@numerologyforbiz.com';
const SITE_URL = 'https://numerologyforbiz.com';

// Legal entity operating this website
const OPERATOR_INFO = {
  name: 'EUDOYU SARL-S',
  legalForm: 'Société à responsabilité limitée simplifiée',
  address: '303 rue de Neudorf',
  city: 'Luxembourg',
  country: 'Luxembourg',
  authorization: '10151674 / 0',
  rcs: 'B123456', // Replace with actual RCS number if available
};

const legalContent = {
  en: {
    title: 'Legal Notice',
    subtitle: 'Impressum',
    lastUpdated: 'Last updated: January 2025',
    sections: {
      operator: {
        title: 'Website Operator',
        intro: `This website (${COMPANY_NAME}) is operated by:`,
      },
      company: {
        title: 'Company Information',
        name: 'Company Name',
        legalForm: 'Legal Form',
        address: 'Registered Address',
        authorization: 'Authorization Number',
        country: 'Country',
      },
      contact: {
        title: 'Contact Information',
        email: 'Email',
        website: 'Website',
      },
      responsibility: {
        title: 'Editorial Responsibility',
        content: `The person responsible for the content of this website in accordance with applicable laws is ${OPERATOR_INFO.name}, represented by its management.`,
      },
      hosting: {
        title: 'Hosting Provider',
        content: 'This website is hosted by Lovable Technologies (Cloud Infrastructure). For technical inquiries related to hosting, please contact the website operator.',
      },
      intellectual: {
        title: 'Intellectual Property',
        content: `All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of ${OPERATOR_INFO.name} or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of ${OPERATOR_INFO.name}.`,
      },
      liability: {
        title: 'Limitation of Liability',
        content: `The information provided on this website is for general informational and entertainment purposes only. ${OPERATOR_INFO.name} makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website. Any reliance you place on such information is strictly at your own risk.`,
      },
      links: {
        title: 'External Links',
        content: 'This website may contain links to external websites that are not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies or content.',
      },
      dispute: {
        title: 'Dispute Resolution',
        content: 'The European Commission provides an online dispute resolution platform at: https://ec.europa.eu/consumers/odr. We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.',
      },
      gdpr: {
        title: 'Data Protection',
        content: `For information about how we collect and process personal data, please refer to our Privacy Policy. The data controller for this website is ${OPERATOR_INFO.name}. You can exercise your rights under the General Data Protection Regulation (GDPR) by contacting us at ${COMPANY_EMAIL}.`,
      },
      jurisdiction: {
        title: 'Applicable Law & Jurisdiction',
        content: 'This legal notice and any disputes arising from or in connection with this website shall be governed by and construed in accordance with the laws of Luxembourg. The courts of Luxembourg shall have exclusive jurisdiction over any disputes.',
      },
    },
  },
  fr: {
    title: 'Mentions Légales',
    subtitle: 'Impressum',
    lastUpdated: 'Dernière mise à jour : Janvier 2025',
    sections: {
      operator: {
        title: 'Éditeur du Site',
        intro: `Ce site web (${COMPANY_NAME}) est exploité par :`,
      },
      company: {
        title: 'Informations sur la Société',
        name: 'Raison Sociale',
        legalForm: 'Forme Juridique',
        address: 'Siège Social',
        authorization: 'Numéro d\'Autorisation',
        country: 'Pays',
      },
      contact: {
        title: 'Coordonnées',
        email: 'Email',
        website: 'Site Web',
      },
      responsibility: {
        title: 'Responsabilité Éditoriale',
        content: `Le responsable de la publication du contenu de ce site conformément aux lois applicables est ${OPERATOR_INFO.name}, représentée par sa direction.`,
      },
      hosting: {
        title: 'Hébergeur',
        content: 'Ce site web est hébergé par Lovable Technologies (Infrastructure Cloud). Pour toute question technique liée à l\'hébergement, veuillez contacter l\'éditeur du site.',
      },
      intellectual: {
        title: 'Propriété Intellectuelle',
        content: `Tout le contenu de ce site web, y compris, mais sans s'y limiter, les textes, graphiques, logos, images, clips audio, téléchargements numériques et logiciels, est la propriété de ${OPERATOR_INFO.name} ou de ses fournisseurs de contenu et est protégé par les lois internationales sur le droit d'auteur. La compilation de tout le contenu de ce site est la propriété exclusive de ${OPERATOR_INFO.name}.`,
      },
      liability: {
        title: 'Limitation de Responsabilité',
        content: `Les informations fournies sur ce site web sont uniquement à des fins d'information générale et de divertissement. ${OPERATOR_INFO.name} ne fait aucune déclaration ni garantie d'aucune sorte, expresse ou implicite, concernant l'exhaustivité, l'exactitude, la fiabilité, l'adéquation ou la disponibilité des informations, produits, services ou graphiques connexes contenus sur le site web. Toute confiance que vous accordez à ces informations est strictement à vos propres risques.`,
      },
      links: {
        title: 'Liens Externes',
        content: 'Ce site web peut contenir des liens vers des sites externes qui ne sont pas exploités par nous. Nous n\'avons aucun contrôle sur le contenu et les pratiques de ces sites et ne pouvons accepter aucune responsabilité pour leurs politiques de confidentialité ou leur contenu respectifs.',
      },
      dispute: {
        title: 'Règlement des Litiges',
        content: 'La Commission européenne met à disposition une plateforme de règlement en ligne des litiges à l\'adresse : https://ec.europa.eu/consumers/odr. Nous ne sommes ni obligés ni disposés à participer à des procédures de règlement des litiges devant un conseil d\'arbitrage des consommateurs.',
      },
      gdpr: {
        title: 'Protection des Données',
        content: `Pour plus d'informations sur la façon dont nous collectons et traitons les données personnelles, veuillez consulter notre Politique de Confidentialité. Le responsable du traitement des données pour ce site web est ${OPERATOR_INFO.name}. Vous pouvez exercer vos droits en vertu du Règlement Général sur la Protection des Données (RGPD) en nous contactant à ${COMPANY_EMAIL}.`,
      },
      jurisdiction: {
        title: 'Droit Applicable & Juridiction',
        content: 'Les présentes mentions légales et tout litige découlant de ou en relation avec ce site web seront régis et interprétés conformément aux lois du Luxembourg. Les tribunaux du Luxembourg auront compétence exclusive sur tout litige.',
      },
    },
  },
  es: {
    title: 'Aviso Legal',
    subtitle: 'Impressum',
    lastUpdated: 'Última actualización: Enero 2025',
    sections: {
      operator: {
        title: 'Operador del Sitio Web',
        intro: `Este sitio web (${COMPANY_NAME}) es operado por:`,
      },
      company: {
        title: 'Información de la Empresa',
        name: 'Nombre de la Empresa',
        legalForm: 'Forma Jurídica',
        address: 'Domicilio Social',
        authorization: 'Número de Autorización',
        country: 'País',
      },
      contact: {
        title: 'Información de Contacto',
        email: 'Correo Electrónico',
        website: 'Sitio Web',
      },
      responsibility: {
        title: 'Responsabilidad Editorial',
        content: `El responsable del contenido de este sitio web de acuerdo con las leyes aplicables es ${OPERATOR_INFO.name}, representada por su dirección.`,
      },
      hosting: {
        title: 'Proveedor de Alojamiento',
        content: 'Este sitio web está alojado en Lovable Technologies (Infraestructura Cloud). Para consultas técnicas relacionadas con el alojamiento, contacte al operador del sitio web.',
      },
      intellectual: {
        title: 'Propiedad Intelectual',
        content: `Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, clips de audio, descargas digitales y software, es propiedad de ${OPERATOR_INFO.name} o sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor. La compilación de todo el contenido de este sitio es propiedad exclusiva de ${OPERATOR_INFO.name}.`,
      },
      liability: {
        title: 'Limitación de Responsabilidad',
        content: `La información proporcionada en este sitio web es solo para fines informativos generales y de entretenimiento. ${OPERATOR_INFO.name} no hace representaciones ni garantías de ningún tipo, expresas o implícitas, sobre la integridad, exactitud, fiabilidad, idoneidad o disponibilidad de la información, productos, servicios o gráficos relacionados contenidos en el sitio web. Cualquier confianza que deposite en dicha información es estrictamente bajo su propio riesgo.`,
      },
      links: {
        title: 'Enlaces Externos',
        content: 'Este sitio web puede contener enlaces a sitios web externos que no son operados por nosotros. No tenemos control sobre el contenido y las prácticas de estos sitios y no podemos aceptar responsabilidad por sus respectivas políticas de privacidad o contenido.',
      },
      dispute: {
        title: 'Resolución de Disputas',
        content: 'La Comisión Europea proporciona una plataforma de resolución de disputas en línea en: https://ec.europa.eu/consumers/odr. No estamos obligados ni dispuestos a participar en procedimientos de resolución de disputas ante una junta de arbitraje de consumidores.',
      },
      gdpr: {
        title: 'Protección de Datos',
        content: `Para información sobre cómo recopilamos y procesamos datos personales, consulte nuestra Política de Privacidad. El responsable del tratamiento de datos de este sitio web es ${OPERATOR_INFO.name}. Puede ejercer sus derechos bajo el Reglamento General de Protección de Datos (RGPD) contactándonos en ${COMPANY_EMAIL}.`,
      },
      jurisdiction: {
        title: 'Ley Aplicable y Jurisdicción',
        content: 'Este aviso legal y cualquier disputa que surja de o en conexión con este sitio web se regirán e interpretarán de acuerdo con las leyes de Luxemburgo. Los tribunales de Luxemburgo tendrán jurisdicción exclusiva sobre cualquier disputa.',
      },
    },
  },
  de: {
    title: 'Impressum',
    subtitle: 'Rechtliche Hinweise',
    lastUpdated: 'Zuletzt aktualisiert: Januar 2025',
    sections: {
      operator: {
        title: 'Betreiber der Website',
        intro: `Diese Website (${COMPANY_NAME}) wird betrieben von:`,
      },
      company: {
        title: 'Unternehmensangaben',
        name: 'Firmenname',
        legalForm: 'Rechtsform',
        address: 'Geschäftsadresse',
        authorization: 'Genehmigungsnummer',
        country: 'Land',
      },
      contact: {
        title: 'Kontaktinformationen',
        email: 'E-Mail',
        website: 'Website',
      },
      responsibility: {
        title: 'Redaktionelle Verantwortung',
        content: `Die für den Inhalt dieser Website verantwortliche Person gemäß den geltenden Gesetzen ist ${OPERATOR_INFO.name}, vertreten durch ihre Geschäftsführung.`,
      },
      hosting: {
        title: 'Hosting-Anbieter',
        content: 'Diese Website wird von Lovable Technologies (Cloud-Infrastruktur) gehostet. Für technische Anfragen zum Hosting wenden Sie sich bitte an den Website-Betreiber.',
      },
      intellectual: {
        title: 'Geistiges Eigentum',
        content: `Alle Inhalte auf dieser Website, einschließlich, aber nicht beschränkt auf Texte, Grafiken, Logos, Bilder, Audioclips, digitale Downloads und Software, sind Eigentum von ${OPERATOR_INFO.name} oder deren Inhaltsanbietern und durch internationale Urheberrechtsgesetze geschützt. Die Zusammenstellung aller Inhalte auf dieser Website ist das ausschließliche Eigentum von ${OPERATOR_INFO.name}.`,
      },
      liability: {
        title: 'Haftungsbeschränkung',
        content: `Die auf dieser Website bereitgestellten Informationen dienen nur allgemeinen Informations- und Unterhaltungszwecken. ${OPERATOR_INFO.name} gibt keine Zusicherungen oder Gewährleistungen jeglicher Art, weder ausdrücklich noch stillschweigend, hinsichtlich der Vollständigkeit, Genauigkeit, Zuverlässigkeit, Eignung oder Verfügbarkeit der Informationen, Produkte, Dienstleistungen oder zugehörigen Grafiken auf der Website. Jedes Vertrauen, das Sie in solche Informationen setzen, erfolgt strikt auf eigenes Risiko.`,
      },
      links: {
        title: 'Externe Links',
        content: 'Diese Website kann Links zu externen Websites enthalten, die nicht von uns betrieben werden. Wir haben keine Kontrolle über den Inhalt und die Praktiken dieser Websites und können keine Verantwortung für deren jeweilige Datenschutzrichtlinien oder Inhalte übernehmen.',
      },
      dispute: {
        title: 'Streitbeilegung',
        content: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit unter: https://ec.europa.eu/consumers/odr. Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      },
      gdpr: {
        title: 'Datenschutz',
        content: `Informationen darüber, wie wir personenbezogene Daten erheben und verarbeiten, finden Sie in unserer Datenschutzerklärung. Der Verantwortliche für diese Website ist ${OPERATOR_INFO.name}. Sie können Ihre Rechte gemäß der Datenschutz-Grundverordnung (DSGVO) ausüben, indem Sie uns unter ${COMPANY_EMAIL} kontaktieren.`,
      },
      jurisdiction: {
        title: 'Anwendbares Recht & Gerichtsstand',
        content: 'Dieses Impressum und alle Streitigkeiten, die sich aus oder im Zusammenhang mit dieser Website ergeben, unterliegen dem Recht Luxemburgs und werden entsprechend ausgelegt. Die Gerichte in Luxemburg haben die ausschließliche Zuständigkeit für alle Streitigkeiten.',
      },
    },
  },
};

type SupportedLang = keyof typeof legalContent;

const LegalNotice = () => {
  const { language } = useLanguage();
  const content = legalContent[language as SupportedLang] || legalContent.en;
  const sections = content.sections;

  return (
    <>
      <Helmet>
        <title>{content.title} | {COMPANY_NAME}</title>
        <meta name="description" content={`${content.title} - Legal information about ${COMPANY_NAME} operated by ${OPERATOR_INFO.name}`} />
        <link rel="canonical" href={`${SITE_URL}/${language}/legal/notice`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 gold-text">
              {content.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">{content.subtitle}</p>
            <p className="text-muted-foreground mb-8">{content.lastUpdated}</p>

            {/* Website Operator Box */}
            <div className="mystic-card p-6 mb-8 border-primary/50">
              <div className="flex items-start gap-4">
                <Building2 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-semibold text-primary mb-2">
                    {sections.operator.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {sections.operator.intro}
                  </p>
                  <div className="text-lg font-semibold text-foreground">
                    {OPERATOR_INFO.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Company Information */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {sections.company.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{sections.company.name}</p>
                    <p className="font-medium text-foreground">{OPERATOR_INFO.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{sections.company.legalForm}</p>
                    <p className="font-medium text-foreground">{OPERATOR_INFO.legalForm}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{sections.company.address}</p>
                    <p className="font-medium text-foreground">
                      {OPERATOR_INFO.address}<br />
                      {OPERATOR_INFO.city}, {OPERATOR_INFO.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{sections.company.authorization}</p>
                    <p className="font-medium text-foreground">{OPERATOR_INFO.authorization}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  {sections.contact.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{sections.contact.email}</p>
                    <a href={`mailto:${COMPANY_EMAIL}`} className="font-medium text-primary hover:underline">
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{sections.contact.website}</p>
                    <a href={SITE_URL} className="font-medium text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {SITE_URL}
                    </a>
                  </div>
                </div>
              </div>

              {/* Editorial Responsibility */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {sections.responsibility.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.responsibility.content}
                </p>
              </div>

              {/* Hosting Provider */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  {sections.hosting.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.hosting.content}
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {sections.intellectual.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.intellectual.content}
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {sections.liability.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.liability.content}
                </p>
              </div>

              {/* External Links */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {sections.links.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.links.content}
                </p>
              </div>

              {/* Data Protection (GDPR) */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  {sections.gdpr.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.gdpr.content}
                </p>
              </div>

              {/* Dispute Resolution */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {sections.dispute.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.dispute.content}
                </p>
              </div>

              {/* Applicable Law */}
              <div className="mystic-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {sections.jurisdiction.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {sections.jurisdiction.content}
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LegalNotice;
