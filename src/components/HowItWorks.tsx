import { Wand2, Calculator, Lightbulb, Target } from 'lucide-react';

const steps = [
  {
    icon: Wand2,
    title: "Enter Your Details",
    description: "Input your full birth name and date of birth. For business analysis, simply enter the company name or slogan you want to test."
  },
  {
    icon: Calculator,
    title: "Choose Your System",
    description: "Select between Pythagorean (modern) for general readings or Chaldean (ancient) for business names and deeper analysis."
  },
  {
    icon: Lightbulb,
    title: "Get Your Numbers",
    description: "Instantly receive your Life Path, Expression, Soul Urge, and other core numbers with detailed breakdowns of each calculation."
  },
  {
    icon: Target,
    title: "Apply Your Insights",
    description: "Use your numerology profile to make informed decisions about career, relationships, and business ventures aligned with your true vibration."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 gold-text">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the power of numbers in four simple steps. Our calculators provide 
            instant, accurate results using both ancient and modern numerology systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="mystic-card p-8 md:p-12">
            <h3 className="font-display text-2xl md:text-3xl font-bold gold-text mb-6">
              The Ancient Science of Numerology
            </h3>
            
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p>
                Numerology is an ancient metaphysical science that explores the mystical relationship between 
                numbers and living things. Dating back thousands of years to civilizations like Babylon, 
                Egypt, and Greece, numerology posits that the universe is a system that can be broken down 
                into basic elements—numbers.
              </p>
              
              <p>
                The great Greek philosopher Pythagoras, often called the father of Western numerology, 
                believed that "all things are numbers" and that numerical relationships explained the 
                physical world. His work laid the foundation for what we now call Pythagorean numerology, 
                which assigns letters values 1-9 in sequential order.
              </p>

              <h4 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
                Understanding Core Numbers
              </h4>
              
              <p>
                <strong className="text-foreground">Life Path Number:</strong> This is your most important number, 
                revealing your life's purpose and the path you're meant to walk. Derived from your birth date, 
                it indicates your natural talents, challenges, and opportunities.
              </p>
              
              <p>
                <strong className="text-foreground">Expression Number:</strong> Calculated from your full birth name, 
                this number reveals your natural abilities and personal goals. It shows what you came here to do 
                and the energy you radiate.
              </p>
              
              <p>
                <strong className="text-foreground">Soul Urge Number:</strong> Found in the vowels of your name, 
                this number exposes your inner desires and motivations—what truly drives you at a soul level.
              </p>

              <h4 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
                Numerology for Business Success
              </h4>
              
              <p>
                In the business world, numerology has been used by entrepreneurs and corporations alike to 
                choose auspicious names, launch dates, and brand identities. The Chaldean system, in particular, 
                is favored for business numerology as it assigns values based on sound vibrations rather than 
                alphabetical order.
              </p>
              
              <p>
                Numbers like 1 (leadership), 5 (dynamic energy), 6 (harmony), 8 (material success), and 
                9 (completion) are considered particularly favorable for business names. Meanwhile, 
                Master Numbers 11, 22, and 33 carry powerful vibrations suitable for transformative 
                or spiritual enterprises.
              </p>

              <h4 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
                Why Use Our Calculator?
              </h4>
              
              <p>
                Our numerology calculator offers both Pythagorean and Chaldean systems in one powerful tool. 
                Whether you're seeking personal insights or testing potential business names, our calculator 
                provides accurate results with detailed breakdowns of each calculation. We show you exactly 
                how each number is derived, empowering you to understand and apply numerology in your daily life.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Placement */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="ad-placeholder h-[90px] flex items-center justify-center">
            <span className="text-xs uppercase tracking-wider">AD-PLACEMENT-HIGH-CTR • Leaderboard 728x90</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
