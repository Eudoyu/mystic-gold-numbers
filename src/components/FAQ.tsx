import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
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
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 gold-text">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about numerology and how to use our calculators 
            for personal and business insights.
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
          <div className="ad-placeholder h-[250px] flex items-center justify-center">
            <span className="text-xs uppercase tracking-wider">AD-PLACEMENT-HIGH-CTR • Medium Rectangle 300x250</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
