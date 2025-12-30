import { HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AdPlacement from '@/components/AdPlacement';
import { useLanguage } from '@/i18n';

const faqsByLang: Record<string, Array<{ question: string; answer: string }>> = {
  en: [
    {
      question: "What is the difference between Pythagorean and Chaldean numerology?",
      answer: "Pythagorean numerology is the modern Western system that assigns numbers 1-9 to letters sequentially (A=1, B=2, etc.). Chaldean numerology is the ancient Babylonian system where numbers are assigned based on sound vibrations, making it more accurate for names. The Chaldean system doesn't use the number 9 for any letter, considering it sacred. For personal readings, both work well, but Chaldean is often preferred for business names and deeper spiritual insights."
    },
    {
      question: "How accurate is numerology for business name selection?",
      answer: "Many successful businesses have names that align with favorable numerological vibrations. Numbers like 1 (leadership), 5 (dynamic growth), 6 (harmony), 8 (prosperity), and 9 (completion) are particularly auspicious for business names. While numerology shouldn't be the only factor in choosing a business name, it can provide valuable insights into the energy your brand projects to the world."
    },
    {
      question: "What is a Life Path Number and how is it calculated?",
      answer: "Your Life Path Number is the most important number in your numerology chart, representing your life's journey and purpose. It's calculated by reducing your birth date to a single digit (or master number 11, 22, 33). For example, if born on December 25, 1990: 1+2+2+5+1+9+9+0 = 29 → 2+9 = 11 (Master Number)."
    },
    {
      question: "What are Master Numbers and why are they significant?",
      answer: "Master Numbers are 11, 22, and 33. They carry higher spiritual vibrations and greater potential—but also greater challenges. Number 11 is the intuitive master, 22 is the master builder capable of turning dreams into reality, and 33 is the master teacher of unconditional love. These numbers are not reduced during calculations and indicate souls with special missions."
    },
    {
      question: "Should I use my birth name or current name for calculations?",
      answer: "For the most accurate reading, use your full birth name as it appears on your birth certificate. This name carries your original soul vibration. However, if you've legally changed your name or use a different name consistently, that name also influences your current energy. Many numerologists recommend calculating both to see how your energy has evolved."
    },
    {
      question: "What is the Expression Number?",
      answer: "Your Expression Number (also called Destiny Number) is calculated from all the letters in your full birth name. It reveals your natural abilities, talents, and the goals you're meant to achieve in life. This number shows what you came here to do and the energy you radiate to others."
    },
    {
      question: "What is the Soul Urge Number?",
      answer: "The Soul Urge Number (also called Heart's Desire) is calculated from only the vowels in your name. It reveals your innermost desires, motivations, and what truly makes you happy. This is your private inner self—what you yearn for when no one is watching."
    },
    {
      question: "Can numerology predict the future?",
      answer: "Numerology doesn't predict specific events but reveals patterns, cycles, and tendencies in your life. Personal Year numbers can indicate the general theme of a year (beginnings, partnership, creativity, etc.), and Pinnacle cycles show major life phases. Think of it as a roadmap showing the terrain rather than telling you where to go."
    },
    {
      question: "Is numerology compatible with my religion?",
      answer: "Numerology is a metaphysical tool, not a religion. Many people of various faiths use numerology for self-discovery and guidance alongside their religious beliefs. However, if your faith prohibits such practices, it's important to honor your beliefs. Numerology is ultimately about understanding patterns and making empowered choices."
    },
    {
      question: "How often should I check my numerology readings?",
      answer: "Your core numbers (Life Path, Expression, Soul Urge) remain constant throughout life. However, Personal Year and Month cycles change annually and monthly. Many people calculate their Personal Year at the start of each year to understand upcoming themes. For business decisions, checking the numerology before major launches or name changes is recommended."
    }
  ],
  fr: [
    {
      question: "Quelle est la différence entre la numérologie pythagoricienne et chaldéenne ?",
      answer: "La numérologie pythagoricienne est le système occidental moderne qui attribue les chiffres 1-9 aux lettres de manière séquentielle (A=1, B=2, etc.). La numérologie chaldéenne est l'ancien système babylonien où les nombres sont attribués en fonction des vibrations sonores, ce qui la rend plus précise pour les noms. Le système chaldéen n'utilise pas le chiffre 9 pour les lettres, le considérant comme sacré."
    },
    {
      question: "Quelle est la précision de la numérologie pour le choix d'un nom d'entreprise ?",
      answer: "De nombreuses entreprises prospères ont des noms qui s'alignent avec des vibrations numériques favorables. Les chiffres comme 1 (leadership), 5 (croissance dynamique), 6 (harmonie), 8 (prospérité) et 9 (accomplissement) sont particulièrement propices pour les noms d'entreprise."
    },
    {
      question: "Qu'est-ce qu'un numéro de chemin de vie et comment est-il calculé ?",
      answer: "Votre numéro de chemin de vie est le nombre le plus important de votre thème numérologique, représentant le voyage et le but de votre vie. Il est calculé en réduisant votre date de naissance à un seul chiffre (ou nombre maître 11, 22, 33)."
    },
    {
      question: "Que sont les nombres maîtres et pourquoi sont-ils significatifs ?",
      answer: "Les nombres maîtres sont 11, 22 et 33. Ils portent des vibrations spirituelles plus élevées et un plus grand potentiel, mais aussi de plus grands défis. Le nombre 11 est le maître intuitif, 22 est le maître bâtisseur capable de transformer les rêves en réalité, et 33 est le maître enseignant de l'amour inconditionnel."
    },
    {
      question: "Dois-je utiliser mon nom de naissance ou mon nom actuel pour les calculs ?",
      answer: "Pour la lecture la plus précise, utilisez votre nom complet de naissance tel qu'il apparaît sur votre acte de naissance. Ce nom porte votre vibration d'âme originelle. Cependant, si vous avez légalement changé de nom ou utilisez un nom différent de manière constante, ce nom influence également votre énergie actuelle."
    },
    {
      question: "La numérologie peut-elle prédire l'avenir ?",
      answer: "La numérologie ne prédit pas des événements spécifiques mais révèle des schémas, des cycles et des tendances dans votre vie. Les numéros d'année personnelle peuvent indiquer le thème général d'une année (commencements, partenariat, créativité, etc.), et les cycles de pinacle montrent les phases majeures de la vie."
    }
  ],
  es: [
    {
      question: "¿Cuál es la diferencia entre la numerología pitagórica y caldea?",
      answer: "La numerología pitagórica es el sistema occidental moderno que asigna números del 1 al 9 a las letras de forma secuencial (A=1, B=2, etc.). La numerología caldea es el antiguo sistema babilónico donde los números se asignan según las vibraciones del sonido, haciéndola más precisa para los nombres. El sistema caldeo no usa el número 9 para ninguna letra, considerándolo sagrado."
    },
    {
      question: "¿Qué tan precisa es la numerología para seleccionar nombres de empresas?",
      answer: "Muchas empresas exitosas tienen nombres que se alinean con vibraciones numerológicas favorables. Números como 1 (liderazgo), 5 (crecimiento dinámico), 6 (armonía), 8 (prosperidad) y 9 (realización) son particularmente propicios para nombres de empresas."
    },
    {
      question: "¿Qué es el número de camino de vida y cómo se calcula?",
      answer: "Tu número de camino de vida es el número más importante en tu carta numerológica, representando el viaje y propósito de tu vida. Se calcula reduciendo tu fecha de nacimiento a un solo dígito (o número maestro 11, 22, 33)."
    },
    {
      question: "¿Qué son los números maestros y por qué son significativos?",
      answer: "Los números maestros son 11, 22 y 33. Llevan vibraciones espirituales más altas y mayor potencial, pero también mayores desafíos. El número 11 es el maestro intuitivo, 22 es el maestro constructor capaz de convertir sueños en realidad, y 33 es el maestro del amor incondicional."
    },
    {
      question: "¿Debo usar mi nombre de nacimiento o mi nombre actual para los cálculos?",
      answer: "Para la lectura más precisa, usa tu nombre completo de nacimiento tal como aparece en tu certificado de nacimiento. Este nombre lleva tu vibración del alma original. Sin embargo, si has cambiado legalmente tu nombre o usas un nombre diferente constantemente, ese nombre también influye en tu energía actual."
    },
    {
      question: "¿Puede la numerología predecir el futuro?",
      answer: "La numerología no predice eventos específicos sino que revela patrones, ciclos y tendencias en tu vida. Los números de año personal pueden indicar el tema general de un año (comienzos, asociación, creatividad, etc.), y los ciclos pináculo muestran fases importantes de la vida."
    }
  ]
};

const FAQ = () => {
  const { t, language } = useLanguage();
  const faqs = faqsByLang[language] || faqsByLang.en;

  // Generate JSON-LD FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 bg-muted/20">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('faq.badge')}</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 gold-text">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="mystic-card px-6 border-none"
              >
                <AccordionTrigger className="text-left font-display font-medium text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Ad Placement */}
        <div className="max-w-3xl mx-auto mt-12">
          <AdPlacement height="h-[250px]" label="AD-PLACEMENT-HIGH-CTR • Medium Rectangle 300x250" />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
