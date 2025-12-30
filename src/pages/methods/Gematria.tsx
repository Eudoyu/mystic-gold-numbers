import { Helmet } from 'react-helmet-async';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import AdPlacement from '@/components/AdPlacement';

const content = {
  en: {
    title: 'Gematria - Hebrew Letter Numerology',
    metaTitle: 'Gematria Calculator & Guide - Hebrew Numerology System',
    metaDesc: 'Learn Gematria: the ancient Hebrew system of assigning numerical values to letters. Perfect for slogan analysis and discovering hidden meanings.',
    intro: 'Gematria is an ancient Hebrew numerological system that assigns numerical values to letters, words, and phrases. Used in Jewish mysticism (Kabbalah) for millennia, it reveals hidden connections between words that share the same numerical value, making it powerful for analyzing business names and marketing slogans.',
    howItWorks: 'How Gematria Works',
    howItWorksDesc: 'In traditional Hebrew Gematria, each of the 22 Hebrew letters has a specific numerical value. For English applications, we use an adapted system that assigns values based on the English alphabet, enabling powerful word analysis.',
    chartTitle: 'English Gematria Chart',
    calculationTitle: 'Calculation Method',
    calculationSteps: [
      'Assign each letter its Gematria value',
      'Add all values together',
      'The total reveals the word\'s numerical essence',
      'Words with the same value share hidden connections'
    ],
    exampleTitle: 'Example Calculation',
    exampleName: 'SUCCESS',
    exampleBreakdown: 'S(19) + U(21) + C(3) + C(3) + E(5) + S(19) + S(19) = 89',
    sloganAnalysis: 'Gematria for Slogans',
    sloganAnalysisDesc: 'Gematria is exceptionally powerful for analyzing marketing slogans. Famous slogans often have harmonious Gematria values that contribute to their memorability. Discover hidden numerical patterns in your advertising copy.',
    keyPrinciples: 'Key Principles',
    principlesList: [
      'Words with equal values share energetic connections',
      'Reduction to single digits reveals core vibration',
      'Compound numbers carry layered meanings',
      'Phrases can be analyzed as wholes or word-by-word'
    ],
    famousSlogans: 'Famous Slogan Analysis',
    famousSlogansDesc: 'Many iconic slogans have been analyzed using Gematria, revealing why certain phrases resonate deeply with audiences. The numerical harmony creates subconscious appeal.',
    businessUse: 'Business Applications',
    businessUseDesc: 'Use Gematria to craft slogans that resonate, analyze competitor taglines, and ensure your brand messaging carries the right vibrational signature. This ancient wisdom applied to modern marketing can give you an edge.',
    tryCalculator: 'Analyze Your Slogan',
    relatedMethods: 'Related Methods'
  },
  fr: {
    title: 'Gematria - Numérologie des Lettres Hébraïques',
    metaTitle: 'Calculateur Gematria & Guide - Système de Numérologie Hébraïque',
    metaDesc: 'Apprenez la Gematria : l\'ancien système hébreu d\'attribution de valeurs numériques aux lettres. Parfait pour l\'analyse de slogans et la découverte de significations cachées.',
    intro: 'La Gematria est un ancien système numérologique hébreu qui attribue des valeurs numériques aux lettres, mots et phrases. Utilisée dans le mysticisme juif (Kabbale) depuis des millénaires, elle révèle des connexions cachées entre les mots qui partagent la même valeur numérique, ce qui la rend puissante pour analyser les noms d\'entreprise et les slogans marketing.',
    howItWorks: 'Comment Fonctionne la Gematria',
    howItWorksDesc: 'Dans la Gematria hébraïque traditionnelle, chacune des 22 lettres hébraïques a une valeur numérique spécifique. Pour les applications en anglais, nous utilisons un système adapté qui attribue des valeurs basées sur l\'alphabet anglais, permettant une analyse de mots puissante.',
    chartTitle: 'Table de Gematria Anglaise',
    calculationTitle: 'Méthode de Calcul',
    calculationSteps: [
      'Attribuer à chaque lettre sa valeur Gematria',
      'Additionner toutes les valeurs',
      'Le total révèle l\'essence numérique du mot',
      'Les mots avec la même valeur partagent des connexions cachées'
    ],
    exampleTitle: 'Exemple de Calcul',
    exampleName: 'SUCCÈS',
    exampleBreakdown: 'S(19) + U(21) + C(3) + C(3) + È(5) + S(19) = 70',
    sloganAnalysis: 'Gematria pour les Slogans',
    sloganAnalysisDesc: 'La Gematria est exceptionnellement puissante pour analyser les slogans marketing. Les slogans célèbres ont souvent des valeurs Gematria harmonieuses qui contribuent à leur mémorabilité.',
    keyPrinciples: 'Principes Clés',
    principlesList: [
      'Les mots avec des valeurs égales partagent des connexions énergétiques',
      'La réduction à un seul chiffre révèle la vibration fondamentale',
      'Les nombres composés portent des significations en couches',
      'Les phrases peuvent être analysées entièrement ou mot par mot'
    ],
    famousSlogans: 'Analyse de Slogans Célèbres',
    famousSlogansDesc: 'De nombreux slogans iconiques ont été analysés en utilisant la Gematria, révélant pourquoi certaines phrases résonnent profondément avec le public.',
    businessUse: 'Applications Commerciales',
    businessUseDesc: 'Utilisez la Gematria pour créer des slogans qui résonnent, analyser les slogans des concurrents et vous assurer que votre message de marque porte la bonne signature vibratoire.',
    tryCalculator: 'Analysez Votre Slogan',
    relatedMethods: 'Méthodes Connexes'
  },
  es: {
    title: 'Gematría - Numerología de Letras Hebreas',
    metaTitle: 'Calculadora de Gematría & Guía - Sistema de Numerología Hebrea',
    metaDesc: 'Aprende Gematría: el antiguo sistema hebreo de asignar valores numéricos a las letras. Perfecto para análisis de eslóganes y descubrir significados ocultos.',
    intro: 'La Gematría es un antiguo sistema numerológico hebreo que asigna valores numéricos a letras, palabras y frases. Usada en el misticismo judío (Cábala) durante milenios, revela conexiones ocultas entre palabras que comparten el mismo valor numérico, lo que la hace poderosa para analizar nombres de empresas y eslóganes de marketing.',
    howItWorks: 'Cómo Funciona la Gematría',
    howItWorksDesc: 'En la Gematría hebrea tradicional, cada una de las 22 letras hebreas tiene un valor numérico específico. Para aplicaciones en inglés, usamos un sistema adaptado que asigna valores basados en el alfabeto inglés, permitiendo un análisis de palabras poderoso.',
    chartTitle: 'Tabla de Gematría Inglesa',
    calculationTitle: 'Método de Cálculo',
    calculationSteps: [
      'Asignar a cada letra su valor de Gematría',
      'Sumar todos los valores',
      'El total revela la esencia numérica de la palabra',
      'Las palabras con el mismo valor comparten conexiones ocultas'
    ],
    exampleTitle: 'Ejemplo de Cálculo',
    exampleName: 'ÉXITO',
    exampleBreakdown: 'É(5) + X(24) + I(9) + T(20) + O(15) = 73',
    sloganAnalysis: 'Gematría para Eslóganes',
    sloganAnalysisDesc: 'La Gematría es excepcionalmente poderosa para analizar eslóganes de marketing. Los eslóganes famosos a menudo tienen valores de Gematría armoniosos que contribuyen a su memorabilidad.',
    keyPrinciples: 'Principios Clave',
    principlesList: [
      'Las palabras con valores iguales comparten conexiones energéticas',
      'La reducción a un solo dígito revela la vibración central',
      'Los números compuestos llevan significados en capas',
      'Las frases pueden analizarse como un todo o palabra por palabra'
    ],
    famousSlogans: 'Análisis de Eslóganes Famosos',
    famousSlogansDesc: 'Muchos eslóganes icónicos han sido analizados usando Gematría, revelando por qué ciertas frases resuenan profundamente con las audiencias.',
    businessUse: 'Aplicaciones Comerciales',
    businessUseDesc: 'Usa la Gematría para crear eslóganes que resuenen, analizar eslóganes de competidores y asegurar que tu mensaje de marca lleve la firma vibratoria correcta.',
    tryCalculator: 'Analiza Tu Eslogan',
    relatedMethods: 'Métodos Relacionados'
  }
};

const gematriaChart = [
  { letters: 'A-I', values: '1-9' },
  { letters: 'J-R', values: '10-90' },
  { letters: 'S-Z', values: '100-800' },
];

const Gematria = () => {
  const { language, getLocalePath } = useLanguage();
  const c = content[language as keyof typeof content] || content.en;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": c.metaTitle,
    "description": c.metaDesc,
    "author": {
      "@type": "Organization",
      "name": "Numerology Hub"
    }
  };

  return (
    <>
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDesc} />
        <link rel="canonical" href={`https://numerologyhub.com/${language}/methods/gematria`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main className="pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Gematria</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold gold-text mb-6">
                  {c.title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {c.intro}
                </p>
              </div>

              <AdPlacement height="h-[90px]" label="AD • Leaderboard" />

              {/* How It Works */}
              <section className="mt-16">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.howItWorks}
                </h2>
                <p className="text-muted-foreground mb-8">{c.howItWorksDesc}</p>

                {/* Chart */}
                <div className="mystic-card p-6 mb-8">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    {c.chartTitle}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {gematriaChart.map((item) => (
                      <div key={item.letters} className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="font-display text-lg font-bold text-primary mb-1">
                          {item.letters}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.values}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    A=1, B=2, C=3... I=9, J=10, K=20... S=100, T=200...
                  </p>
                </div>
              </section>

              {/* Calculation Method */}
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.calculationTitle}
                </h2>
                <ol className="space-y-3 mb-8">
                  {c.calculationSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-sm font-medium text-primary">{index + 1}</span>
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>

                {/* Example */}
                <div className="mystic-card p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {c.exampleTitle}: "{c.exampleName}"
                  </h3>
                  <code className="text-sm text-primary bg-primary/10 px-3 py-2 rounded block">
                    {c.exampleBreakdown}
                  </code>
                </div>
              </section>

              <AdPlacement height="h-[250px]" label="AD • Rectangle" className="my-12" />

              {/* Slogan Analysis */}
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.sloganAnalysis}
                </h2>
                <p className="text-muted-foreground mb-6">{c.sloganAnalysisDesc}</p>
              </section>

              {/* Key Principles */}
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.keyPrinciples}
                </h2>
                <ul className="space-y-2">
                  {c.principlesList.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Business Use */}
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.businessUse}
                </h2>
                <p className="text-muted-foreground mb-6">{c.businessUseDesc}</p>
                <Link 
                  to={getLocalePath('/tools/slogan-analyzer')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {c.tryCalculator}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </section>

              {/* Related Methods */}
              <section className="mt-16">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {c.relatedMethods}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to={getLocalePath('/methods/pythagorean')} className="mystic-card p-6 hover:border-primary/50 transition-colors group">
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary mb-2">
                      Pythagorean Numerology
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Modern Western system with sequential letter values
                    </p>
                  </Link>
                  <Link to={getLocalePath('/methods/chaldean')} className="mystic-card p-6 hover:border-primary/50 transition-colors group">
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary mb-2">
                      Chaldean Numerology
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ancient Babylonian system based on sound vibrations
                    </p>
                  </Link>
                </div>
              </section>
            </div>
          </div>

          <Newsletter />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Gematria;
