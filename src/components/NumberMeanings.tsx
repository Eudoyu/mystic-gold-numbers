import { Star, Sparkles } from 'lucide-react';

const numbers = [
  {
    number: 1,
    title: "The Leader",
    keywords: ["Independence", "Innovation", "Ambition", "Pioneering"],
    description: "Number 1 represents new beginnings, leadership, and self-reliance. Those influenced by this number are natural trailblazers who forge their own path. They possess strong willpower and the drive to succeed in any endeavor they pursue.",
    careers: "Entrepreneurs, CEOs, Innovators, Military Leaders",
    challenges: "Can be too aggressive or domineering"
  },
  {
    number: 2,
    title: "The Diplomat",
    keywords: ["Partnership", "Balance", "Sensitivity", "Cooperation"],
    description: "Number 2 embodies duality, partnership, and harmony. People with this number excel at bringing others together and finding common ground. They are natural mediators with deep intuition and emotional intelligence.",
    careers: "Counselors, Diplomats, Artists, Healers",
    challenges: "May be overly sensitive or indecisive"
  },
  {
    number: 3,
    title: "The Creative",
    keywords: ["Expression", "Joy", "Imagination", "Communication"],
    description: "Number 3 vibrates with creativity, self-expression, and optimism. Those aligned with this number are natural entertainers and communicators who bring joy to others through their artistic talents and social charm.",
    careers: "Writers, Performers, Designers, Teachers",
    challenges: "Can scatter energy or be superficial"
  },
  {
    number: 4,
    title: "The Builder",
    keywords: ["Stability", "Discipline", "Order", "Practicality"],
    description: "Number 4 represents the foundation, structure, and hard work. Those influenced by this number are dependable, practical, and excellent at turning ideas into reality through methodical effort and determination.",
    careers: "Engineers, Architects, Accountants, Project Managers",
    challenges: "May be too rigid or resistant to change"
  },
  {
    number: 5,
    title: "The Adventurer",
    keywords: ["Freedom", "Change", "Adventure", "Versatility"],
    description: "Number 5 embodies freedom, change, and dynamic energy. People with this number crave variety and new experiences. They are adaptable, curious, and thrive in environments that offer constant stimulation.",
    careers: "Travel Writers, Sales, Marketing, Journalists",
    challenges: "Can be restless or irresponsible"
  },
  {
    number: 6,
    title: "The Nurturer",
    keywords: ["Love", "Responsibility", "Harmony", "Family"],
    description: "Number 6 represents love, responsibility, and domestic harmony. Those aligned with this number are natural caregivers who create beauty and comfort in their environments while supporting those they love.",
    careers: "Healthcare, Teaching, Interior Design, Social Work",
    challenges: "May be overly controlling or self-sacrificing"
  },
  {
    number: 7,
    title: "The Seeker",
    keywords: ["Wisdom", "Spirituality", "Analysis", "Introspection"],
    description: "Number 7 vibrates with spiritual wisdom, intellectual depth, and introspection. Those influenced by this number are natural researchers and philosophers who seek truth and understanding beyond the surface.",
    careers: "Scientists, Researchers, Spiritual Leaders, Analysts",
    challenges: "Can be too withdrawn or skeptical"
  },
  {
    number: 8,
    title: "The Powerhouse",
    keywords: ["Success", "Abundance", "Authority", "Achievement"],
    description: "Number 8 represents material success, power, and karmic balance. People with this number possess natural business acumen and the ability to manifest abundance through focused determination and strategic thinking.",
    careers: "Business Executives, Financiers, Lawyers, Athletes",
    challenges: "May be too materialistic or authoritarian"
  },
  {
    number: 9,
    title: "The Humanitarian",
    keywords: ["Compassion", "Completion", "Wisdom", "Universal Love"],
    description: "Number 9 embodies completion, universal love, and humanitarian service. Those aligned with this number are old souls who seek to make the world better through selfless service and enlightened leadership.",
    careers: "Humanitarians, Artists, Philosophers, Healers",
    challenges: "Can be too idealistic or emotionally detached"
  }
];

const masterNumbers = [
  {
    number: 11,
    title: "Master Intuitive",
    description: "The Master Number 11 is the first of the master numbers, representing spiritual insight, intuition, and enlightenment. Those with this number are often visionaries with heightened psychic abilities and the potential to inspire humanity.",
  },
  {
    number: 22,
    title: "Master Builder",
    description: "The Master Number 22 is the most powerful number, combining the vision of 11 with the practicality of 4. Those blessed with this number have the potential to achieve lasting greatness and turn the largest dreams into reality.",
  },
  {
    number: 33,
    title: "Master Teacher",
    description: "The Master Number 33 represents the pinnacle of spiritual enlightenment and compassionate service. Those with this rare number are master teachers who uplift humanity through their wisdom, healing, and unconditional love.",
  }
];

const NumberMeanings = () => {
  return (
    <section id="meanings" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Number Meanings</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 gold-text">
            The Meaning of Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each number carries its own unique vibration and energy. Understanding these 
            meanings can help you align with your true purpose and potential.
          </p>
        </div>

        {/* Core Numbers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {numbers.map((num) => (
            <div 
              key={num.number} 
              className="mystic-card p-6 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="number-orb shrink-0 group-hover:animate-pulse-gold">
                  {num.number}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">{num.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {num.keywords.map((keyword) => (
                      <span 
                        key={keyword} 
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{num.description}</p>
              
              <div className="space-y-2 pt-4 border-t border-border">
                <p className="text-xs">
                  <span className="text-muted-foreground">Careers: </span>
                  <span className="text-foreground">{num.careers}</span>
                </p>
                <p className="text-xs">
                  <span className="text-muted-foreground">Challenges: </span>
                  <span className="text-foreground">{num.challenges}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Placement */}
        <div className="ad-placeholder h-[100px] flex items-center justify-center mb-16">
          <span className="text-xs uppercase tracking-wider">AD-PLACEMENT-HIGH-CTR • In-Content 728x100</span>
        </div>

        {/* Master Numbers */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Master Numbers</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold gold-text">
            The Sacred Master Numbers
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {masterNumbers.map((num) => (
            <div 
              key={num.number} 
              className="mystic-card p-6 border-primary/30 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              <div className="relative">
                <div className="number-orb mx-auto mb-4 w-20 h-20 text-3xl group-hover:animate-pulse-gold">
                  {num.number}
                </div>
                
                <h4 className="font-display text-xl font-bold text-center gold-text mb-3">
                  {num.title}
                </h4>
                
                <p className="text-sm text-muted-foreground text-center">
                  {num.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumberMeanings;
