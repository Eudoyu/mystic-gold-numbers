import { Helmet } from 'react-helmet-async';
import { Calculator, ArrowRight, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import AdPlacement from '@/components/AdPlacement';

const content = {
  en: {
    title: 'Pythagorean Numerology System',
    metaTitle: 'Pythagorean Numerology - Complete Guide & Calculator',
    metaDesc: 'Learn Pythagorean numerology: the modern Western system using sequential letter values. Free calculator and complete guide.',
    intro: 'Pythagorean numerology, also known as Western or Modern numerology, is the most widely used system in the Western world. Named after the Greek mathematician Pythagoras (570-495 BCE), this system assigns numerical values to letters based on their sequential position in the alphabet.',
    howItWorks: 'How Pythagorean Numerology Works',
    howItWorksDesc: 'In the Pythagorean system, each letter of the alphabet is assigned a number from 1 to 9 in sequential order. After reaching 9, the cycle repeats.',
    chartTitle: 'Pythagorean Letter Chart',
    calculationTitle: 'Calculation Method',
    calculationSteps: [
      'Convert each letter to its corresponding number',
      'Add all numbers together',
      'If the sum is greater than 9 (and not a Master Number), reduce by adding digits',
      'Continue until you reach a single digit or Master Number (11, 22, 33)'
    ],
    exampleTitle: 'Example Calculation',
    exampleName: 'BUSINESS',
    exampleBreakdown: 'B(2) + U(3) + S(1) + I(9) + N(5) + E(5) + S(1) + S(1) = 27 → 2+7 = 9',
    masterNumbers: 'Master Numbers',
    masterNumbersDesc: 'In Pythagorean numerology, Master Numbers (11, 22, 33) are not reduced to single digits. They carry higher spiritual vibrations and greater potential.',
    strengths: 'Strengths of This System',
    strengthsList: [
      'Easy to learn and calculate',
      'Widely recognized and documented',
      'Consistent sequential assignment',
      'Works well for personal readings'
    ],
    businessUse: 'Using for Business Names',
    businessUseDesc: 'Pythagorean numerology is excellent for analyzing business names, especially when seeking clarity and simplicity. Numbers like 1 (leadership), 5 (change/growth), and 8 (abundance) are particularly favorable for business success.',
    tryCalculator: 'Try Our Calculator',
    relatedMethods: 'Related Methods'
  },
  fr: {
    title: 'Système de Numérologie Pythagoricienne',
    metaTitle: 'Numérologie Pythagoricienne - Guide Complet & Calculateur',
    metaDesc: 'Apprenez la numérologie pythagoricienne : le système occidental moderne utilisant des valeurs de lettres séquentielles. Calculateur gratuit et guide complet.',
    intro: 'La numérologie pythagoricienne, également connue sous le nom de numérologie occidentale ou moderne, est le système le plus utilisé dans le monde occidental. Nommé d\'après le mathématicien grec Pythagore (570-495 av. J.-C.), ce système attribue des valeurs numériques aux lettres en fonction de leur position séquentielle dans l\'alphabet.',
    howItWorks: 'Comment Fonctionne la Numérologie Pythagoricienne',
    howItWorksDesc: 'Dans le système pythagoricien, chaque lettre de l\'alphabet se voit attribuer un nombre de 1 à 9 dans l\'ordre séquentiel. Après avoir atteint 9, le cycle se répète.',
    chartTitle: 'Table des Lettres Pythagoricienne',
    calculationTitle: 'Méthode de Calcul',
    calculationSteps: [
      'Convertir chaque lettre en son nombre correspondant',
      'Additionner tous les nombres',
      'Si la somme est supérieure à 9 (et n\'est pas un Nombre Maître), réduire en additionnant les chiffres',
      'Continuer jusqu\'à obtenir un seul chiffre ou un Nombre Maître (11, 22, 33)'
    ],
    exampleTitle: 'Exemple de Calcul',
    exampleName: 'ENTREPRISE',
    exampleBreakdown: 'E(5) + N(5) + T(2) + R(9) + E(5) + P(7) + R(9) + I(9) + S(1) + E(5) = 57 → 5+7 = 12 → 1+2 = 3',
    masterNumbers: 'Nombres Maîtres',
    masterNumbersDesc: 'En numérologie pythagoricienne, les Nombres Maîtres (11, 22, 33) ne sont pas réduits à un seul chiffre. Ils portent des vibrations spirituelles plus élevées et un plus grand potentiel.',
    strengths: 'Forces de ce Système',
    strengthsList: [
      'Facile à apprendre et à calculer',
      'Largement reconnu et documenté',
      'Attribution séquentielle cohérente',
      'Fonctionne bien pour les lectures personnelles'
    ],
    businessUse: 'Utilisation pour les Noms d\'Entreprise',
    businessUseDesc: 'La numérologie pythagoricienne est excellente pour analyser les noms d\'entreprise, surtout lorsqu\'on recherche clarté et simplicité. Les nombres comme 1 (leadership), 5 (changement/croissance) et 8 (abondance) sont particulièrement favorables au succès commercial.',
    tryCalculator: 'Essayez Notre Calculateur',
    relatedMethods: 'Méthodes Connexes'
  },
  es: {
    title: 'Sistema de Numerología Pitagórica',
    metaTitle: 'Numerología Pitagórica - Guía Completa y Calculadora',
    metaDesc: 'Aprende numerología pitagórica: el sistema occidental moderno usando valores de letras secuenciales. Calculadora gratuita y guía completa.',
    intro: 'La numerología pitagórica, también conocida como numerología occidental o moderna, es el sistema más utilizado en el mundo occidental. Nombrado en honor al matemático griego Pitágoras (570-495 a.C.), este sistema asigna valores numéricos a las letras según su posición secuencial en el alfabeto.',
    howItWorks: 'Cómo Funciona la Numerología Pitagórica',
    howItWorksDesc: 'En el sistema pitagórico, a cada letra del alfabeto se le asigna un número del 1 al 9 en orden secuencial. Después de llegar al 9, el ciclo se repite.',
    chartTitle: 'Tabla de Letras Pitagórica',
    calculationTitle: 'Método de Cálculo',
    calculationSteps: [
      'Convertir cada letra a su número correspondiente',
      'Sumar todos los números',
      'Si la suma es mayor que 9 (y no es un Número Maestro), reducir sumando dígitos',
      'Continuar hasta obtener un solo dígito o Número Maestro (11, 22, 33)'
    ],
    exampleTitle: 'Ejemplo de Cálculo',
    exampleName: 'NEGOCIO',
    exampleBreakdown: 'N(5) + E(5) + G(7) + O(6) + C(3) + I(9) + O(6) = 41 → 4+1 = 5',
    masterNumbers: 'Números Maestros',
    masterNumbersDesc: 'En la numerología pitagórica, los Números Maestros (11, 22, 33) no se reducen a un solo dígito. Llevan vibraciones espirituales más altas y mayor potencial.',
    strengths: 'Fortalezas de Este Sistema',
    strengthsList: [
      'Fácil de aprender y calcular',
      'Ampliamente reconocido y documentado',
      'Asignación secuencial consistente',
      'Funciona bien para lecturas personales'
    ],
    businessUse: 'Uso para Nombres de Empresas',
    businessUseDesc: 'La numerología pitagórica es excelente para analizar nombres de empresas, especialmente cuando se busca claridad y simplicidad. Números como 1 (liderazgo), 5 (cambio/crecimiento) y 8 (abundancia) son particularmente favorables para el éxito empresarial.',
    tryCalculator: 'Prueba Nuestra Calculadora',
    relatedMethods: 'Métodos Relacionados'
  }
};

const pythagoreanChart = [
  { num: 1, letters: ['A', 'J', 'S'] },
  { num: 2, letters: ['B', 'K', 'T'] },
  { num: 3, letters: ['C', 'L', 'U'] },
  { num: 4, letters: ['D', 'M', 'V'] },
  { num: 5, letters: ['E', 'N', 'W'] },
  { num: 6, letters: ['F', 'O', 'X'] },
  { num: 7, letters: ['G', 'P', 'Y'] },
  { num: 8, letters: ['H', 'Q', 'Z'] },
  { num: 9, letters: ['I', 'R'] },
];

const Pythagorean = () => {
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
        <link rel="canonical" href={`https://numerologyhub.com/${language}/methods/pythagorean`} />
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
                  <span className="text-sm font-medium text-primary">Pythagorean</span>
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
                  <div className="grid grid-cols-9 gap-2">
                    {pythagoreanChart.map((item) => (
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

              {/* Master Numbers */}
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.masterNumbers}
                </h2>
                <p className="text-muted-foreground mb-6">{c.masterNumbersDesc}</p>
                <div className="grid grid-cols-3 gap-4">
                  {[11, 22, 33].map((num) => (
                    <div key={num} className="mystic-card p-4 text-center">
                      <Hash className="w-5 h-5 text-primary mx-auto mb-2" />
                      <span className="font-display text-2xl font-bold gold-text">{num}</span>
                    </div>
                  ))}
                </div>
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
                  <Link to={getLocalePath('/methods/chaldean')} className="mystic-card p-6 hover:border-primary/50 transition-colors group">
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary mb-2">
                      Chaldean Numerology
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ancient Babylonian system based on sound vibrations
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

export default Pythagorean;
