import { Card, CardContent } from '@/components/ui/card';
import { AnimatedGauge, ScoreLevelBadge } from '@/components/ui/animated-gauge';
import type { DiagnosticResult } from '@/types/diagnostic';
import { getLevelColor } from '@/lib/scoring';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { Sparkles, TrendingUp, Target } from 'lucide-react';

interface ScoreDisplayProps {
  result: DiagnosticResult;
}

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const levelColor = getLevelColor(result.level);

  // Preparar datos para el radar chart
  const radarData = result.categoryScores.map((cat) => ({
    category: cat.categoryName.split(' ')[0], // Primera palabra para brevedad
    score: Math.round(cat.percentage),
    fullMark: 100,
  }));

  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-success/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />

      <Card className="overflow-hidden border-2 shadow-2xl hover-lift relative">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-success/20 pointer-events-none" />

        <CardContent className="p-0 relative">
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Score principal con gradiente vibrante */}
            <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-12 text-center overflow-hidden">
              {/* Animated background circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-success/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative z-10 space-y-6">
                {/* Icono decorativo */}
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-white/50">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-xs font-semibold text-primary">Tu Puntuación</span>
                  </div>
                </div>

                {/* Gauge con efecto de brillo */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/50 rounded-full blur-xl scale-110" />
                  <AnimatedGauge
                    value={result.totalScore}
                    size={220}
                    strokeWidth={16}
                    primaryColor={levelColor}
                    label="de 100"
                  />
                </div>

                {/* Badge con gradiente */}
                <div className="transform hover:scale-105 transition-transform">
                  <ScoreLevelBadge
                    label={result.levelLabel}
                    color={levelColor}
                  />
                </div>

                {/* Descripción con mejor tipografía */}
                <div className="glass max-w-xs mx-auto p-4 rounded-2xl">
                  <p className="text-sm leading-relaxed text-foreground/80 font-medium">
                    {result.levelDescription}
                  </p>
                </div>

                {/* Stats rápidas */}
                <div className="flex items-center justify-center gap-6 pt-2">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Target className="h-3 w-3" />
                      <span>Categorías</span>
                    </div>
                    <div className="text-lg font-bold gradient-text">
                      {result.categoryScores.length}
                    </div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Brechas</span>
                    </div>
                    <div className="text-lg font-bold gradient-text">
                      {result.gaps.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Radar chart mejorado */}
            <div className="p-8 bg-gradient-to-br from-white to-gray-50 relative">
              <div className="h-full flex flex-col">
                <div className="mb-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Perfil por Dimensión
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Visualiza tu puntuación en cada área clave
                  </p>
                </div>

                <div className="flex-1 min-h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <PolarGrid
                        stroke="hsl(var(--border))"
                        strokeOpacity={0.3}
                        strokeWidth={1.5}
                      />
                      <PolarAngleAxis
                        dataKey="category"
                        tick={{
                          fontSize: 12,
                          fill: 'hsl(var(--foreground))',
                          fontWeight: 600,
                        }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{
                          fontSize: 10,
                          fill: 'hsl(var(--muted-foreground))',
                        }}
                        tickCount={6}
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke={levelColor}
                        fill={levelColor}
                        fillOpacity={0.3}
                        strokeWidth={3}
                        filter="url(#glow)"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Category breakdown mejorado */}
          <div className="border-t bg-gradient-to-br from-white to-gray-50/50 p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-primary to-success rounded-full" />
              <h3 className="text-base font-bold text-foreground">Desglose por Categoría</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {result.categoryScores.map((cat, idx) => (
                <div
                  key={cat.category}
                  className="space-y-2 p-4 rounded-xl bg-white border border-gray-100 hover-lift"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{cat.categoryName}</span>
                    <span className="text-lg font-bold tabular-nums gradient-text">
                      {Math.round(cat.percentage)}%
                    </span>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out relative"
                      style={{
                        width: `${cat.percentage}%`,
                        background: `linear-gradient(90deg, ${getCategoryColor(cat.percentage)}, ${adjustColorBrightness(getCategoryColor(cat.percentage), 20)})`,
                      }}
                    >
                      <div className="absolute inset-0 shimmer opacity-30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function for category colors - más vibrante
function getCategoryColor(percentage: number): string {
  if (percentage <= 25) return 'hsl(0 84% 60%)';
  if (percentage <= 50) return 'hsl(38 92% 50%)';
  if (percentage <= 70) return 'hsl(48 96% 53%)';
  return 'hsl(142 76% 36%)';
}

// Helper para ajustar brillo del color
function adjustColorBrightness(color: string, percent: number): string {
  const match = color.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
  if (!match) return color;
  const [, h, s, l] = match;
  const newL = Math.min(100, parseInt(l) + percent);
  return `hsl(${h} ${s}% ${newL}%)`;
}
