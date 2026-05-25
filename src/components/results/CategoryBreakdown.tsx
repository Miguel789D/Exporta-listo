import type { CategoryScore } from '@/types/diagnostic';
import { getCategoryLevelColor } from '@/lib/scoring';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface CategoryBreakdownProps {
  categoryScores: CategoryScore[];
}

export function CategoryBreakdown({ categoryScores }: CategoryBreakdownProps) {
  const getStatusIcon = (level: CategoryScore['level']) => {
    switch (level) {
      case 'excellent':
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'developing':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'needs_work':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getLevelLabel = (level: CategoryScore['level']) => {
    const labels: Record<CategoryScore['level'], string> = {
      excellent: 'Excelente',
      ready: 'Listo',
      developing: 'En desarrollo',
      needs_work: 'Necesita trabajo',
      critical: 'Crítico',
    };
    return labels[level];
  };

  const getLevelGradient = (level: CategoryScore['level']) => {
    const color = getCategoryLevelColor(level);
    return `linear-gradient(90deg, ${color}, ${adjustBrightness(color, 15)})`;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categoryScores.map((cat, idx) => (
        <div
          key={cat.category}
          className="group relative p-5 rounded-xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 hover:border-primary/30 transition-all hover-lift"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          {/* Accent border */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
            style={{
              background: getLevelGradient(cat.level)
            }}
          />

          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 flex-1">
                <div className="mt-0.5">
                  {getStatusIcon(cat.level)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-foreground leading-tight">
                    {cat.categoryName}
                  </h4>
                </div>
              </div>
            </div>

            {/* Score display */}
            <div className="flex items-end justify-between">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${getCategoryLevelColor(cat.level)}20`,
                  color: getCategoryLevelColor(cat.level),
                }}
              >
                {getLevelLabel(cat.level)}
              </span>
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">
                  {Math.round(cat.percentage)}%
                </div>
              </div>
            </div>

            {/* Progress bar mejorada */}
            <div className="relative">
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out relative group-hover:scale-x-105 origin-left"
                  style={{
                    width: `${cat.percentage}%`,
                    background: getLevelGradient(cat.level),
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 shimmer opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper para ajustar brillo
function adjustBrightness(color: string, percent: number): string {
  const match = color.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
  if (!match) return color;
  const [, h, s, l] = match;
  const newL = Math.min(100, parseInt(l) + percent);
  return `hsl(${h} ${s}% ${newL}%)`;
}
