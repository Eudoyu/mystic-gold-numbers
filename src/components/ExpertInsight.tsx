import { BookOpen, Calculator, TrendingUp } from 'lucide-react';

interface ExpertInsightProps {
  method: 'pythagorean' | 'chaldean';
  number: number;
  context: 'personal' | 'business' | 'slogan' | 'compatibility';
}

const getMethodExplanation = (method: 'pythagorean' | 'chaldean'): string => {
  if (method === 'pythagorean') {
    return "The Pythagorean system, developed by the Greek philosopher Pythagoras around 500 BC, assigns numbers 1-9 to letters in sequential order (A=1, B=2... I=9, J=1...). This modern Western approach is widely used for personal name analysis and provides insight into personality traits and life purpose.";
  }
  return "The Chaldean system, originating from ancient Babylon, is considered the oldest and most accurate numerology system for business applications. Unlike Pythagorean, it assigns values 1-8 based on vibrational frequencies (no letter equals 9), making it especially powerful for analyzing business names and brand energy.";
};

const getBusinessMeaning = (num: number): string => {
  const meanings: Record<number, string> = {
    1: "Number 1 in business signifies pioneering leadership and innovation. Companies with this vibration often become industry leaders and are associated with originality and independence. This number attracts customers who value cutting-edge solutions.",
    2: "Number 2 represents partnership, diplomacy, and cooperation. Businesses with this energy excel in service industries, consulting, and relationship-based ventures. It builds trust and long-term client relationships.",
    3: "Number 3 carries creative and communicative energy. This vibration is ideal for marketing agencies, entertainment companies, and any business relying on expression and social engagement. It attracts joyful, optimistic customers.",
    4: "Number 4 embodies stability, structure, and reliability. This is the foundation number—perfect for construction, finance, and manufacturing. Customers associate this energy with trustworthiness and longevity.",
    5: "Number 5 vibrates with change, freedom, and adaptability. Ideal for travel companies, media, and dynamic startups. This energy attracts adventurous clients and thrives in rapidly evolving markets.",
    6: "Number 6 resonates with harmony, responsibility, and nurturing. Perfect for healthcare, hospitality, and family-oriented businesses. This vibration builds loyal customer bases through care and quality.",
    7: "Number 7 carries analytical and spiritual depth. Excellent for research institutions, technology companies, and consultancies. It attracts clients seeking expertise and wisdom.",
    8: "Number 8 is the power number—representing abundance, authority, and material success. Ideal for finance, real estate, and luxury brands. This vibration commands respect and attracts wealth-conscious clients.",
    9: "Number 9 embodies completion and humanitarian vision. Perfect for non-profits, global brands, and transformative companies. This energy attracts clients who value purpose-driven business.",
    11: "Master Number 11 carries heightened intuition and visionary energy. Rare and powerful for innovative tech companies and spiritual enterprises. It attracts forward-thinking clients and investors.",
    22: "Master Number 22 is the 'Master Builder'—representing large-scale achievements and global impact. Exceptional for construction empires, infrastructure, and international business ventures.",
    33: "Master Number 33 is the 'Master Teacher'—embodying compassion and transformative influence. Ideal for educational institutions, healing centers, and organizations focused on upliftment."
  };
  return meanings[num] || "This unique vibration carries special potential for your specific business niche.";
};

const ExpertInsight = ({ method, number, context }: ExpertInsightProps) => {
  return (
    <div className="mt-8 p-6 rounded-xl bg-card/60 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">Expert Insight</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm font-medium text-foreground">
              {method === 'pythagorean' ? 'Pythagorean Method' : 'Chaldean Method'}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getMethodExplanation(method)}
          </p>
        </div>

        {(context === 'business' || context === 'slogan') && (
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-medium text-foreground">What Number {number} Means for Business Success</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {getBusinessMeaning(number)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertInsight;
