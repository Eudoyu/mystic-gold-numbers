import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  className?: string;
}

const Logo = ({ variant = 'full', className }: LogoProps) => {
  return (
    <div className={cn('flex items-center gap-3 group', className)}>
      {/* Mystical Symbol */}
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500" />
        
        <svg
          viewBox="0 0 80 80"
          className={cn(
            'relative z-10 transition-transform duration-300 group-hover:scale-105',
            variant === 'icon' ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'
          )}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions for gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(45 100% 65%)" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
            <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer mystical circle */}
          <circle
            cx="40"
            cy="40"
            r="38"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-[spin_60s_linear_infinite]"
            strokeDasharray="4 6"
          />

          {/* Inner circle */}
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            fill="url(#innerGradient)"
            filter="url(#glow)"
          />

          {/* Sacred triangle pointing up */}
          <path
            d="M40 15 L60 55 L20 55 Z"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow)"
          />

          {/* Inverted triangle */}
          <path
            d="M40 65 L55 30 L25 30 Z"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            strokeOpacity="0.5"
            fill="none"
          />

          {/* Central eye symbol */}
          <ellipse
            cx="40"
            cy="40"
            rx="10"
            ry="6"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            fill="none"
          />
          
          {/* Eye pupil with glow */}
          <circle
            cx="40"
            cy="40"
            r="3"
            fill="url(#goldGradient)"
            filter="url(#glow)"
            className="animate-[pulse_3s_ease-in-out_infinite]"
          />

          {/* 9 sacred dots representing numerology numbers */}
          {[...Array(9)].map((_, i) => {
            const angle = (i * 40 - 90) * (Math.PI / 180);
            const x = 40 + 26 * Math.cos(angle);
            const y = 40 + 26 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill="url(#goldGradient)"
                opacity={0.6 + (i * 0.04)}
                className="animate-[pulse_2s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            );
          })}

          {/* Crescent moon accent */}
          <path
            d="M60 20 Q 65 25, 62 32 Q 58 28, 60 20"
            fill="url(#goldGradient)"
            opacity="0.8"
          />

          {/* Small star */}
          <path
            d="M22 22 L23 25 L26 25 L24 27 L25 30 L22 28 L19 30 L20 27 L18 25 L21 25 Z"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Text */}
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <span 
            className={cn(
              'font-display font-bold tracking-[0.2em] bg-gradient-to-r from-primary via-gold-400 to-primary bg-clip-text text-transparent',
              'transition-all duration-300 group-hover:tracking-[0.25em]',
              variant === 'compact' ? 'text-lg' : 'text-xl sm:text-2xl'
            )}
          >
            NUMEROLOGY
          </span>
          {variant === 'full' && (
            <span className="text-[10px] sm:text-xs text-muted-foreground tracking-[0.3em] uppercase font-light">
              Sacred Numbers
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
