import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function AnimatedGauge({
  value,
  max = 100,
  size = 180,
  strokeWidth = 12,
  primaryColor,
  secondaryColor = 'hsl(var(--muted))',
  label,
  showValue = true,
  className,
}: AnimatedGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedValue / max) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Get color based on value if not provided
  const getColor = () => {
    if (primaryColor) return primaryColor;
    if (value <= 25) return 'hsl(0 84.2% 60.2%)'; // red
    if (value <= 50) return 'hsl(38 92% 50%)'; // amber
    if (value <= 70) return 'hsl(48 96% 53%)'; // yellow
    if (value <= 85) return 'hsl(142 76% 36%)'; // green
    return 'hsl(142 76% 36%)'; // green for expert
  };

  const color = getColor();

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={secondaryColor}
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${color}40)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span
            className="text-4xl font-bold tabular-nums transition-colors duration-500"
            style={{ color }}
          >
            {Math.round(animatedValue)}
          </span>
        )}
        {label && (
          <span className="text-sm text-muted-foreground mt-1">{label}</span>
        )}
      </div>
    </div>
  );
}

// Score level indicator component
interface ScoreLevelBadgeProps {
  label: string;
  color: string;
}

export function ScoreLevelBadge({ label, color }: ScoreLevelBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </div>
  );
}
