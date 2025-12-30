import { Helmet } from 'react-helmet-async';
import { Calculator, ArrowRight, Hash, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import AdPlacement from '@/components/AdPlacement';

const content = {
  en: {
    title: 'Chaldean Numerology System',
    metaTitle: 'Chaldean Numerology - Ancient Babylonian System Guide',
    metaDesc: 'Master Chaldean numerology: the ancient Babylonian system preferred for business names. Learn why 9 is not assigned to letters and how to calculate.',
    intro: 'Chaldean numerology is the oldest known numerology system, originating from ancient Babylon (modern-day Iraq). Unlike the Pythagorean system, Chaldean numerology assigns values based on the vibrational quality of sounds, making it particularly powerful for analyzing names and their energetic influence.',
    howItWorks: 'How Chaldean Numerology Works',
    howItWorksDesc: 'The Chaldean system assigns numbers 1-8 to letters based on their sound vibrations. The number 9 is considered sacred and is never assigned to any letter—it can only appear as a result of calculations.',
    nineNote: 'Important: The number 9 is not assigned to any letter in Chaldean numerology. It is considered sacred and only appears in final calculations.',
    chartTitle: 'Chaldean Letter Chart',
    calculationTitle: 'Calculation Method',
    calculationSteps: [
      'Convert each letter using the Chaldean chart (1-8 only)',
      'Add all numbers together',
      'Reduce compound numbers by adding digits',
      'Continue until reaching a single digit (1-9) or Master Number'
    ],
    exampleTitle: 'Example Calculation',
    exampleName: 'BUSINESS',
    exampleBreakdown: 'B(2) + U(6) + S(3) + I(1) + N(5) + E(5) + S(3) + S(3) = 28 → 2+8 = 10 → 1+0 = 1',
    compoundNumbers: 'Compound Numbers',
    compoundNumbersDesc: 'In Chaldean numerology, compound numbers (10-52) carry special meanings before reduction. For example, 28 is the "Promise of Favor" before reducing to 1.',
    strengths: 'Why Choose Chaldean',
    strengthsList: [
      'Most accurate for name analysis',
      'Based on sound vibrations, not alphabet order',
      'Preferred by professional numerologists',
      'Excellent for business name selection',
      'Reveals hidden compound number meanings'
    ],
    businessUse: 'Business Name Analysis',
    businessUseDesc: 'Chaldean numerology is considered the gold standard for business name analysis. The vibrational accuracy makes it ideal for ensuring your business name projects the right energy. Numbers 1 (independence), 5 (versatility), 6 (responsibility), and 8 (material success) are highly favorable.',
    tryCalculator: 'Try Our Calculator',
    relatedMethods: 'Related Methods'
  },
  fr: {
    title: 'Système de Numérologie Chaldéenne',
    metaTitle: 'Numérologie Chaldéenne - Guide du Système Babylonien Ancien',
    metaDesc: 'Maîtrisez la numérologie chaldéenne : le système babylonien ancien préféré pour les noms d\'entreprise. Apprenez pourquoi le 9 n\'est assigné à aucune lettre.',
    intro: 'La numérologie chaldéenne est le plus ancien système de numérologie connu, originaire de l\'ancienne Babylone (l\'Irak moderne). Contrairement au système pythagoricien, la numérologie chaldéenne attribue des valeurs basées sur la qualité vibratoire des sons, ce qui la rend particulièrement puissante pour analyser les noms et leur influence énergétique.',
    howItWorks: 'Comment Fonctionne la Numérologie Chaldéenne',
    howItWorksDesc: 'Le système chaldéen attribue les nombres 1-8 aux lettres en fonction de leurs vibrations sonores. Le nombre 9 est considéré comme sacré et n\'est jamais attribué à une lettre—il ne peut apparaître que comme résultat de calculs.',
    nineNote: 'Important : Le nombre 9 n\'est attribué à aucune lettre en numérologie chaldéenne. Il est considéré comme sacré et n\'apparaît que dans les calculs finaux.',
    chartTitle: 'Table des Lettres Chaldéenne',
    calculationTitle: 'Méthode de Calcul',
    calculationSteps: [
      'Convertir chaque lettre en utilisant la table chaldéenne (1-8 uniquement)',
      'Additionner tous les nombres',
      'Réduire les nombres composés en additionnant les chiffres',
      'Continuer jusqu\'à obtenir un seul chiffre (1-9) ou un Nombre Maître'
    ],
    exampleTitle: 'Exemple de Calcul',
    exampleName: 'ENTREPRISE',
    exampleBreakdown: 'E(5) + N(5) + T(4) + R(2) + E(5) + P(8) + R(2) + I(1) + S(3) + E(5) = 40 → 4+0 = 4',
    compoundNumbers: 'Nombres Composés',
    compoundNumbersDesc: 'En numérologie chaldéenne, les nombres composés (10-52) portent des significations spéciales avant réduction. Par exemple, 28 est la "Promesse de Faveur" avant de se réduire à 1.',
    strengths: 'Pourquoi Choisir le Chaldéen',
    strengthsList: [
      'Le plus précis pour l\'analyse des noms',
      'Basé sur les vibrations sonores, pas l\'ordre alphabétique',
      'Préféré par les numérologues professionnels',
      'Excellent pour le choix de noms d\'entreprise',
      'Révèle les significations cachées des nombres composés'
    ],
    businessUse: 'Analyse de Nom d\'Entreprise',
    businessUseDesc: 'La numérologie chaldéenne est considérée comme la référence pour l\'analyse des noms d\'entreprise. La précision vibratoire la rend idéale pour s\'assurer que le nom de votre entreprise projette la bonne énergie.',
    tryCalculator: 'Essayez Notre Calculateur',
    relatedMethods: 'Méthodes Connexes'
  },
  es: {
    title: 'Sistema de Numerología Caldea',
    metaTitle: 'Numerología Caldea - Guía del Sistema Babilónico Antiguo',
    metaDesc: 'Domina la numerología caldea: el antiguo sistema babilónico preferido para nombres de empresas. Aprende por qué el 9 no se asigna a ninguna letra.',
    intro: 'La numerología caldea es el sistema de numerología más antiguo conocido, originario de la antigua Babilonia (el Irak moderno). A diferencia del sistema pitagórico, la numerología caldea asigna valores basados en la calidad vibratoria de los sonidos, lo que la hace particularmente poderosa para analizar nombres y su influencia energética.',
    howItWorks: 'Cómo Funciona la Numerología Caldea',
    howItWorksDesc: 'El sistema caldeo asigna números del 1 al 8 a las letras según sus vibraciones sonoras. El número 9 se considera sagrado y nunca se asigna a ninguna letra—solo puede aparecer como resultado de cálculos.',
    nineNote: 'Importante: El número 9 no se asigna a ninguna letra en la numerología caldea. Se considera sagrado y solo aparece en los cálculos finales.',
    chartTitle: 'Tabla de Letras Caldea',
    calculationTitle: 'Método de Cálculo',
    calculationSteps: [
      'Convertir cada letra usando la tabla caldea (solo 1-8)',
      'Sumar todos los números',
      'Reducir números compuestos sumando dígitos',
      'Continuar hasta obtener un solo dígito (1-9) o Número Maestro'
    ],
    exampleTitle: 'Ejemplo de Cálculo',
    exampleName: 'NEGOCIO',
    exampleBreakdown: 'N(5) + E(5) + G(3) + O(7) + C(3) + I(1) + O(7) = 31 → 3+1 = 4',
    compoundNumbers: 'Números Compuestos',
    compoundNumbersDesc: 'En la numerología caldea, los números compuestos (10-52) tienen significados especiales antes de la reducción. Por ejemplo, 28 es la "Promesa de Favor" antes de reducirse a 1.',
    strengths: 'Por Qué Elegir el Caldeo',
    strengthsList: [
      'El más preciso para análisis de nombres',
      'Basado en vibraciones sonoras, no orden alfabético',
      'Preferido por numerólogos profesionales',
      'Excelente para selección de nombres de empresas',
      'Revela significados ocultos de números compuestos'
    ],
    businessUse: 'Análisis de Nombres de Empresas',
    businessUseDesc: 'La numerología caldea se considera el estándar de oro para el análisis de nombres de empresas. La precisión vibratoria la hace ideal para asegurar que tu nombre de empresa proyecte la energía correcta.',
    tryCalculator: 'Prueba Nuestra Calculadora',
    relatedMethods: 'Métodos Relacionados'
  }
};

const chaldeanChart = [
  { num: 1, letters: ['A', 'I', 'J', 'Q', 'Y'] },
  { num: 2, letters: ['B', 'K', 'R'] },
  { num: 3, letters: ['C', 'G', 'L', 'S'] },
  { num: 4, letters: ['D', 'M', 'T'] },
  { num: 5, letters: ['E', 'H', 'N', 'X'] },
  { num: 6, letters: ['U', 'V', 'W'] },
  { num: 7, letters: ['O', 'Z'] },
  { num: 8, letters: ['F', 'P'] },
];

const Chaldean = () => {
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
        <link rel="canonical" href={`https://numerologyhub.com/${language}/methods/chaldean`} />
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
                  <Calculator className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Chaldean</span>
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
                <p className="text-muted-foreground mb-6">{c.howItWorksDesc}</p>

                {/* Important Note about 9 */}
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3 mb-8">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{c.nineNote}</p>
                </div>

                {/* Chart */}
                <div className="mystic-card p-6 mb-8">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    {c.chartTitle}
                  </h3>
                  <div className="grid grid-cols-8 gap-2">
                    {chaldeanChart.map((item) => (
                      <div key={item.num} className="text-center">
                        <div className="w-full aspect-square rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                          <span className="font-display text-xl font-bold text-primary">{item.num}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.letters.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
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

              {/* Compound Numbers */}
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.compoundNumbers}
                </h2>
                <p className="text-muted-foreground">{c.compoundNumbersDesc}</p>
              </section>

              {/* Strengths */}
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.strengths}
                </h2>
                <ul className="space-y-2">
                  {c.strengthsList.map((item, index) => (
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
                  to={getLocalePath('/tools/business-name')}
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
                  <Link to={getLocalePath('/methods/gematria')} className="mystic-card p-6 hover:border-primary/50 transition-colors group">
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary mb-2">
                      Gematria
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Hebrew mystical tradition of letter-number correspondence
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

export default Chaldean;
