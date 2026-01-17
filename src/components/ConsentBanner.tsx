import { useState } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { useLanguage } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Cookie, Shield, ChevronDown, ChevronUp } from 'lucide-react';

// Translations for all 13 supported languages
const COOKIE_TRANSLATIONS = {
  en: {
    title: 'We value your privacy',
    description: 'We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    acceptAll: 'Accept All',
    denyAll: 'Reject All',
    customize: 'Customize',
    savePreferences: 'Save Preferences',
    necessary: 'Necessary',
    necessaryDesc: 'Essential for the website to function properly.',
    analytics: 'Analytics',
    analyticsDesc: 'Help us understand how visitors interact with our website.',
    advertising: 'Advertising',
    advertisingDesc: 'Used to show you relevant ads based on your interests.',
    personalization: 'Personalization',
    personalizationDesc: 'Remember your preferences and provide personalized content.',
    learnMore: 'Learn more in our',
    privacyPolicy: 'Privacy Policy',
    and: 'and',
    cookiePolicy: 'Cookie Policy',
  },
  fr: {
    title: 'Nous respectons votre vie privée',
    description: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, afficher des publicités personnalisées et analyser notre trafic. En cliquant sur "Tout accepter", vous consentez à notre utilisation des cookies.',
    acceptAll: 'Tout accepter',
    denyAll: 'Tout refuser',
    customize: 'Personnaliser',
    savePreferences: 'Enregistrer',
    necessary: 'Nécessaires',
    necessaryDesc: 'Essentiels au bon fonctionnement du site.',
    analytics: 'Analytiques',
    analyticsDesc: 'Nous aident à comprendre comment les visiteurs interagissent avec notre site.',
    advertising: 'Publicitaires',
    advertisingDesc: 'Utilisés pour vous montrer des publicités pertinentes.',
    personalization: 'Personnalisation',
    personalizationDesc: 'Mémorisent vos préférences pour un contenu personnalisé.',
    learnMore: 'En savoir plus dans notre',
    privacyPolicy: 'Politique de confidentialité',
    and: 'et',
    cookiePolicy: 'Politique des cookies',
  },
  es: {
    title: 'Valoramos tu privacidad',
    description: 'Utilizamos cookies para mejorar tu experiencia de navegación, mostrar anuncios personalizados y analizar nuestro tráfico. Al hacer clic en "Aceptar todo", aceptas nuestro uso de cookies.',
    acceptAll: 'Aceptar todo',
    denyAll: 'Rechazar todo',
    customize: 'Personalizar',
    savePreferences: 'Guardar',
    necessary: 'Necesarias',
    necessaryDesc: 'Esenciales para el funcionamiento del sitio web.',
    analytics: 'Analíticas',
    analyticsDesc: 'Nos ayudan a entender cómo interactúan los visitantes con nuestro sitio.',
    advertising: 'Publicitarias',
    advertisingDesc: 'Se utilizan para mostrarte anuncios relevantes.',
    personalization: 'Personalización',
    personalizationDesc: 'Recuerdan tus preferencias para contenido personalizado.',
    learnMore: 'Más información en nuestra',
    privacyPolicy: 'Política de privacidad',
    and: 'y',
    cookiePolicy: 'Política de cookies',
  },
  de: {
    title: 'Wir schätzen Ihre Privatsphäre',
    description: 'Wir verwenden Cookies, um Ihr Browsererlebnis zu verbessern, personalisierte Werbung anzuzeigen und unseren Traffic zu analysieren. Durch Klicken auf "Alle akzeptieren" stimmen Sie unserer Verwendung von Cookies zu.',
    acceptAll: 'Alle akzeptieren',
    denyAll: 'Alle ablehnen',
    customize: 'Anpassen',
    savePreferences: 'Speichern',
    necessary: 'Notwendig',
    necessaryDesc: 'Wesentlich für die ordnungsgemäße Funktion der Website.',
    analytics: 'Analytik',
    analyticsDesc: 'Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.',
    advertising: 'Werbung',
    advertisingDesc: 'Werden verwendet, um Ihnen relevante Anzeigen zu zeigen.',
    personalization: 'Personalisierung',
    personalizationDesc: 'Merken sich Ihre Präferenzen für personalisierte Inhalte.',
    learnMore: 'Mehr erfahren in unserer',
    privacyPolicy: 'Datenschutzerklärung',
    and: 'und',
    cookiePolicy: 'Cookie-Richtlinie',
  },
  it: {
    title: 'Apprezziamo la tua privacy',
    description: 'Utilizziamo i cookie per migliorare la tua esperienza di navigazione, mostrare annunci personalizzati e analizzare il nostro traffico. Cliccando su "Accetta tutto", acconsenti al nostro utilizzo dei cookie.',
    acceptAll: 'Accetta tutto',
    denyAll: 'Rifiuta tutto',
    customize: 'Personalizza',
    savePreferences: 'Salva',
    necessary: 'Necessari',
    necessaryDesc: 'Essenziali per il corretto funzionamento del sito web.',
    analytics: 'Analitici',
    analyticsDesc: 'Ci aiutano a capire come i visitatori interagiscono con il nostro sito.',
    advertising: 'Pubblicitari',
    advertisingDesc: 'Utilizzati per mostrarti annunci pertinenti.',
    personalization: 'Personalizzazione',
    personalizationDesc: 'Ricordano le tue preferenze per contenuti personalizzati.',
    learnMore: 'Scopri di più nella nostra',
    privacyPolicy: 'Informativa sulla privacy',
    and: 'e',
    cookiePolicy: 'Politica sui cookie',
  },
  pt: {
    title: 'Valorizamos sua privacidade',
    description: 'Usamos cookies para melhorar sua experiência de navegação, exibir anúncios personalizados e analisar nosso tráfego. Ao clicar em "Aceitar tudo", você concorda com nosso uso de cookies.',
    acceptAll: 'Aceitar tudo',
    denyAll: 'Rejeitar tudo',
    customize: 'Personalizar',
    savePreferences: 'Salvar',
    necessary: 'Necessários',
    necessaryDesc: 'Essenciais para o funcionamento adequado do site.',
    analytics: 'Analíticos',
    analyticsDesc: 'Nos ajudam a entender como os visitantes interagem com nosso site.',
    advertising: 'Publicitários',
    advertisingDesc: 'Usados para mostrar anúncios relevantes para você.',
    personalization: 'Personalização',
    personalizationDesc: 'Lembram suas preferências para conteúdo personalizado.',
    learnMore: 'Saiba mais em nossa',
    privacyPolicy: 'Política de Privacidade',
    and: 'e',
    cookiePolicy: 'Política de Cookies',
  },
  nl: {
    title: 'Wij waarderen uw privacy',
    description: 'Wij gebruiken cookies om uw browse-ervaring te verbeteren, gepersonaliseerde advertenties te tonen en ons verkeer te analyseren. Door op "Alles accepteren" te klikken, stemt u in met ons gebruik van cookies.',
    acceptAll: 'Alles accepteren',
    denyAll: 'Alles weigeren',
    customize: 'Aanpassen',
    savePreferences: 'Opslaan',
    necessary: 'Noodzakelijk',
    necessaryDesc: 'Essentieel voor de goede werking van de website.',
    analytics: 'Analytisch',
    analyticsDesc: 'Helpen ons begrijpen hoe bezoekers met onze website omgaan.',
    advertising: 'Reclame',
    advertisingDesc: 'Gebruikt om u relevante advertenties te tonen.',
    personalization: 'Personalisatie',
    personalizationDesc: 'Onthouden uw voorkeuren voor gepersonaliseerde inhoud.',
    learnMore: 'Meer informatie in ons',
    privacyPolicy: 'Privacybeleid',
    and: 'en',
    cookiePolicy: 'Cookiebeleid',
  },
  ja: {
    title: 'プライバシーを大切にしています',
    description: 'ブラウジング体験の向上、パーソナライズされた広告の表示、トラフィックの分析のためにCookieを使用しています。「すべて同意」をクリックすると、Cookieの使用に同意したことになります。',
    acceptAll: 'すべて同意',
    denyAll: 'すべて拒否',
    customize: 'カスタマイズ',
    savePreferences: '保存',
    necessary: '必須',
    necessaryDesc: 'ウェブサイトが正常に機能するために必要です。',
    analytics: '分析',
    analyticsDesc: '訪問者がウェブサイトとどのようにやり取りするかを理解するのに役立ちます。',
    advertising: '広告',
    advertisingDesc: '興味に基づいた関連広告を表示するために使用されます。',
    personalization: 'パーソナライゼーション',
    personalizationDesc: 'パーソナライズされたコンテンツのために設定を記憶します。',
    learnMore: '詳細は',
    privacyPolicy: 'プライバシーポリシー',
    and: 'と',
    cookiePolicy: 'Cookieポリシー',
  },
  ko: {
    title: '개인정보를 소중히 여깁니다',
    description: '브라우징 경험 향상, 맞춤형 광고 제공, 트래픽 분석을 위해 쿠키를 사용합니다. "모두 수락"을 클릭하면 쿠키 사용에 동의하게 됩니다.',
    acceptAll: '모두 수락',
    denyAll: '모두 거부',
    customize: '사용자 정의',
    savePreferences: '저장',
    necessary: '필수',
    necessaryDesc: '웹사이트가 제대로 작동하는 데 필수적입니다.',
    analytics: '분석',
    analyticsDesc: '방문자가 웹사이트와 어떻게 상호작용하는지 이해하는 데 도움이 됩니다.',
    advertising: '광고',
    advertisingDesc: '관심사에 따라 관련 광고를 표시하는 데 사용됩니다.',
    personalization: '개인화',
    personalizationDesc: '맞춤형 콘텐츠를 위해 기본 설정을 기억합니다.',
    learnMore: '자세한 내용은',
    privacyPolicy: '개인정보처리방침',
    and: '및',
    cookiePolicy: '쿠키 정책',
  },
  ar: {
    title: 'نحن نقدر خصوصيتك',
    description: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك وعرض الإعلانات المخصصة وتحليل حركة المرور لدينا. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
    acceptAll: 'قبول الكل',
    denyAll: 'رفض الكل',
    customize: 'تخصيص',
    savePreferences: 'حفظ',
    necessary: 'ضروري',
    necessaryDesc: 'ضروري لعمل الموقع بشكل صحيح.',
    analytics: 'التحليلات',
    analyticsDesc: 'تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا.',
    advertising: 'الإعلانات',
    advertisingDesc: 'تستخدم لعرض إعلانات ذات صلة بناءً على اهتماماتك.',
    personalization: 'التخصيص',
    personalizationDesc: 'تتذكر تفضيلاتك للمحتوى المخصص.',
    learnMore: 'اعرف المزيد في',
    privacyPolicy: 'سياسة الخصوصية',
    and: 'و',
    cookiePolicy: 'سياسة ملفات تعريف الارتباط',
  },
  hi: {
    title: 'हम आपकी गोपनीयता को महत्व देते हैं',
    description: 'हम आपके ब्राउज़िंग अनुभव को बेहतर बनाने, व्यक्तिगत विज्ञापन दिखाने और हमारे ट्रैफ़िक का विश्लेषण करने के लिए कुकीज़ का उपयोग करते हैं। "सभी स्वीकार करें" पर क्लिक करके, आप हमारी कुकीज़ के उपयोग के लिए सहमति देते हैं।',
    acceptAll: 'सभी स्वीकार करें',
    denyAll: 'सभी अस्वीकार करें',
    customize: 'अनुकूलित करें',
    savePreferences: 'सहेजें',
    necessary: 'आवश्यक',
    necessaryDesc: 'वेबसाइट के ठीक से काम करने के लिए आवश्यक।',
    analytics: 'विश्लेषण',
    analyticsDesc: 'यह समझने में मदद करें कि विज़िटर हमारी वेबसाइट के साथ कैसे इंटरैक्ट करते हैं।',
    advertising: 'विज्ञापन',
    advertisingDesc: 'आपकी रुचियों के आधार पर प्रासंगिक विज्ञापन दिखाने के लिए उपयोग किया जाता है।',
    personalization: 'वैयक्तिकरण',
    personalizationDesc: 'व्यक्तिगत सामग्री के लिए आपकी प्राथमिकताएं याद रखें।',
    learnMore: 'हमारी में और जानें',
    privacyPolicy: 'गोपनीयता नीति',
    and: 'और',
    cookiePolicy: 'कुकी नीति',
  },
  tr: {
    title: 'Gizliliğinize değer veriyoruz',
    description: 'Tarama deneyiminizi geliştirmek, kişiselleştirilmiş reklamlar sunmak ve trafiğimizi analiz etmek için çerezler kullanıyoruz. "Tümünü Kabul Et"e tıklayarak çerez kullanımımızı kabul etmiş olursunuz.',
    acceptAll: 'Tümünü Kabul Et',
    denyAll: 'Tümünü Reddet',
    customize: 'Özelleştir',
    savePreferences: 'Kaydet',
    necessary: 'Gerekli',
    necessaryDesc: 'Web sitesinin düzgün çalışması için gereklidir.',
    analytics: 'Analitik',
    analyticsDesc: 'Ziyaretçilerin web sitemizle nasıl etkileşime girdiğini anlamamıza yardımcı olur.',
    advertising: 'Reklamcılık',
    advertisingDesc: 'İlgi alanlarınıza göre size alakalı reklamlar göstermek için kullanılır.',
    personalization: 'Kişiselleştirme',
    personalizationDesc: 'Kişiselleştirilmiş içerik için tercihlerinizi hatırlar.',
    learnMore: 'Daha fazla bilgi için',
    privacyPolicy: 'Gizlilik Politikası',
    and: 've',
    cookiePolicy: 'Çerez Politikası',
  },
  id: {
    title: 'Kami menghargai privasi Anda',
    description: 'Kami menggunakan cookie untuk meningkatkan pengalaman penjelajahan Anda, menayangkan iklan yang dipersonalisasi, dan menganalisis lalu lintas kami. Dengan mengklik "Terima Semua", Anda menyetujui penggunaan cookie kami.',
    acceptAll: 'Terima Semua',
    denyAll: 'Tolak Semua',
    customize: 'Kustomisasi',
    savePreferences: 'Simpan',
    necessary: 'Diperlukan',
    necessaryDesc: 'Penting untuk situs web berfungsi dengan baik.',
    analytics: 'Analitik',
    analyticsDesc: 'Membantu kami memahami bagaimana pengunjung berinteraksi dengan situs kami.',
    advertising: 'Periklanan',
    advertisingDesc: 'Digunakan untuk menampilkan iklan yang relevan berdasarkan minat Anda.',
    personalization: 'Personalisasi',
    personalizationDesc: 'Mengingat preferensi Anda untuk konten yang dipersonalisasi.',
    learnMore: 'Pelajari lebih lanjut di',
    privacyPolicy: 'Kebijakan Privasi',
    and: 'dan',
    cookiePolicy: 'Kebijakan Cookie',
  },
};

type SupportedLang = keyof typeof COOKIE_TRANSLATIONS;

const ConsentBanner = () => {
  const { consent, isConsentKnown, acceptAll, denyAll, updateConsent } = useConsent();
  const { language, getLocalePath } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  // Don't show banner if consent is already known
  if (isConsentKnown) {
    return null;
  }

  // Get translations for current language, fallback to English
  const text = COOKIE_TRANSLATIONS[language as SupportedLang] || COOKIE_TRANSLATIONS.en;
  
  // Check if RTL language (Arabic)
  const isRTL = language === 'ar';

  const handleSavePreferences = () => {
    // If no changes made, treat as deny all
    if (consent.analytics === 'unknown' && consent.advertising === 'unknown') {
      denyAll();
    }
  };

  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-300"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative bg-card border border-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 p-2.5 bg-primary/10 rounded-xl">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {text.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {text.description}
                </p>
              </div>
            </div>

            {/* Expandable details */}
            {showDetails && (
              <div className="mb-6 space-y-4 pt-4 border-t border-border">
                {/* Necessary - always on */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{text.necessary}</p>
                      <p className="text-xs text-muted-foreground">{text.necessaryDesc}</p>
                    </div>
                  </div>
                  <Switch checked disabled className="data-[state=checked]:bg-primary" />
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{text.analytics}</p>
                    <p className="text-xs text-muted-foreground">{text.analyticsDesc}</p>
                  </div>
                  <Switch
                    checked={consent.analytics === 'granted'}
                    onCheckedChange={(checked) => updateConsent('analytics', checked ? 'granted' : 'denied')}
                  />
                </div>

                {/* Advertising */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{text.advertising}</p>
                    <p className="text-xs text-muted-foreground">{text.advertisingDesc}</p>
                  </div>
                  <Switch
                    checked={consent.advertising === 'granted'}
                    onCheckedChange={(checked) => updateConsent('advertising', checked ? 'granted' : 'denied')}
                  />
                </div>

                {/* Personalization */}
                <div className="flex items-center justify-between gap-4 p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">{text.personalization}</p>
                    <p className="text-xs text-muted-foreground">{text.personalizationDesc}</p>
                  </div>
                  <Switch
                    checked={consent.personalization === 'granted'}
                    onCheckedChange={(checked) => updateConsent('personalization', checked ? 'granted' : 'denied')}
                  />
                </div>
              </div>
            )}

            {/* Links */}
            <p className="text-xs text-muted-foreground mb-4">
              {text.learnMore}{' '}
              <a href={getLocalePath('/legal/privacy')} className="text-primary hover:underline">
                {text.privacyPolicy}
              </a>{' '}
              {text.and}{' '}
              <a href={getLocalePath('/legal/cookies')} className="text-primary hover:underline">
                {text.cookiePolicy}
              </a>.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="order-3 sm:order-1"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    {text.customize}
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    {text.customize}
                  </>
                )}
              </Button>
              
              <div className="flex-1" />
              
              {showDetails ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={denyAll}
                    className="order-2"
                  >
                    {text.denyAll}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="order-1 sm:order-3"
                  >
                    {text.savePreferences}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={denyAll}
                    className="order-2"
                  >
                    {text.denyAll}
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptAll}
                    className="order-1 sm:order-3"
                  >
                    {text.acceptAll}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
