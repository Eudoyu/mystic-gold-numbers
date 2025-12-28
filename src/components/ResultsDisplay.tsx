import { NumerologyResult } from '@/hooks/useNumerology';
import { Heart, Brain, User, Star, Compass, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import AdPlacement from '@/components/AdPlacement';

interface ResultsDisplayProps {
  result: NumerologyResult;
  system: 'pythagorean' | 'chaldean';
  name: string;
}

const numberMeanings: Record<number, { title: string; description: string }> = {
  1: { title: "The Leader", description: "Independence, originality, ambition, and determination" },
  2: { title: "The Diplomat", description: "Cooperation, sensitivity, balance, and partnership" },
  3: { title: "The Creative", description: "Expression, imagination, joy, and communication" },
  4: { title: "The Builder", description: "Stability, discipline, hard work, and practicality" },
  5: { title: "The Adventurer", description: "Freedom, change, versatility, and resourcefulness" },
  6: { title: "The Nurturer", description: "Responsibility, love, harmony, and domesticity" },
  7: { title: "The Seeker", description: "Wisdom, spirituality, introspection, and analysis" },
  8: { title: "The Powerhouse", description: "Achievement, abundance, authority, and material success" },
  9: { title: "The Humanitarian", description: "Compassion, universal love, wisdom, and completion" },
  11: { title: "Master Intuitive", description: "Spiritual insight, enlightenment, and visionary thinking" },
  22: { title: "Master Builder", description: "Turning dreams into reality, large-scale achievements" },
  33: { title: "Master Teacher", description: "Spiritual healing, blessing others, compassionate service" },
};

const ResultCard = ({ 
  icon: Icon, 
  title, 
  number, 
  breakdown,
  colorClass = "text-primary"
}: { 
  icon: React.ElementType; 
  title: string; 
  number: number; 
  breakdown: string;
  colorClass?: string;
}) => {
  const meaning = numberMeanings[number] || { title: "Unique", description: "A special vibration" };
  
  return (
    <div className="mystic-card p-5 group hover:border-primary/40 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="number-orb shrink-0 group-hover:animate-pulse-gold">
          {number}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Icon className={`w-4 h-4 ${colorClass}`} />
            <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="bg-card border-border max-w-xs">
                <p className="text-sm">{breakdown}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <p className="text-sm font-medium gold-text mb-1">{meaning.title}</p>
          <p className="text-xs text-muted-foreground">{meaning.description}</p>
        </div>
      </div>
    </div>
  );
};

const ResultsDisplay = ({ result, system, name }: ResultsDisplayProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold gold-text mb-2">
          Your Numerology Profile
        </h2>
        <p className="text-sm text-muted-foreground">
          Calculated using the {system === 'pythagorean' ? 'Pythagorean (Modern)' : 'Chaldean (Ancient)'} system for <span className="text-primary">{name}</span>
        </p>
      </div>

      {/* Ad Placement between results */}
      <AdPlacement height="h-[100px]" label="AD-PLACEMENT-HIGH-CTR • In-Content 728x100" />

      <div className="grid gap-4">
        <ResultCard 
          icon={Compass}
          title="Life Path Number"
          number={result.lifePath}
          breakdown={result.lifePathBreakdown}
          colorClass="text-primary"
        />
        
        <ResultCard 
          icon={Brain}
          title="Expression Number"
          number={result.expression}
          breakdown={result.expressionBreakdown}
          colorClass="text-accent"
        />
        
        <ResultCard 
          icon={Heart}
          title="Soul Urge Number"
          number={result.soulUrge}
          breakdown={result.soulUrgeBreakdown}
          colorClass="text-destructive"
        />
        
        <ResultCard 
          icon={User}
          title="Personality Number"
          number={result.personality}
          breakdown="Calculated from consonants in your name"
          colorClass="text-muted-foreground"
        />
        
        <ResultCard 
          icon={Star}
          title="Destiny Number"
          number={result.destiny}
          breakdown={`Life Path (${result.lifePath}) + Expression (${result.expression}) = ${result.destiny}`}
          colorClass="text-primary"
        />
      </div>

      {/* Bottom Ad Placement */}
      <AdPlacement height="h-[250px]" label="AD-PLACEMENT-HIGH-CTR • Medium Rectangle 300x250" />
    </div>
  );
};

export default ResultsDisplay;
