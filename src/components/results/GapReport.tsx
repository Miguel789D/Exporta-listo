import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Gap } from '@/types/diagnostic';
import { getSeverityLabel, getSeverityColor, getEffortLabel } from '@/lib/gapAnalysis';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GapReportProps {
  gaps: Gap[];
}

export function GapReport({ gaps }: GapReportProps) {
  const [expandedGaps, setExpandedGaps] = useState<Set<string>>(
    new Set(gaps.slice(0, 3).map((g) => g.id)) // Expandir los primeros 3
  );

  const toggleGap = (id: string) => {
    setExpandedGaps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getSeverityIcon = (severity: Gap['severity']) => {
    const config = {
      critical: { icon: AlertCircle, className: 'text-red-500' },
      high: { icon: AlertCircle, className: 'text-orange-500' },
      medium: { icon: Target, className: 'text-yellow-500' },
      low: { icon: CheckCircle2, className: 'text-green-500' },
    };
    const Icon = config[severity].icon;
    return <Icon className={cn('h-5 w-5', config[severity].className)} />;
  };

  const getSeverityBadgeVariant = (severity: Gap['severity']) => {
    const variants: Record<Gap['severity'], 'destructive' | 'warning' | 'secondary' | 'success'> = {
      critical: 'destructive',
      high: 'warning',
      medium: 'secondary',
      low: 'success',
    };
    return variants[severity];
  };

  return (
    <div className="space-y-4">
      {/* Summary header */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border bg-muted/30 p-4">
        <span className="text-sm font-medium text-muted-foreground">
          {gaps.length} brechas identificadas:
        </span>
        <div className="flex flex-wrap gap-2">
          {['critical', 'high', 'medium', 'low'].map((severity) => {
            const count = gaps.filter((g) => g.severity === severity).length;
            if (count === 0) return null;
            return (
              <Badge
                key={severity}
                variant={getSeverityBadgeVariant(severity as Gap['severity'])}
                className="text-xs"
              >
                {count} {getSeverityLabel(severity as Gap['severity'])}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Gap cards */}
      {gaps.map((gap, index) => {
        const isExpanded = expandedGaps.has(gap.id);
        const severityColor = getSeverityColor(gap.severity);

        return (
          <Card
            key={gap.id}
            className={cn(
              'overflow-hidden transition-all duration-300',
              isExpanded && 'shadow-md'
            )}
            style={{
              borderLeftWidth: '4px',
              borderLeftColor: severityColor,
            }}
          >
            {/* Header */}
            <button
              className="flex w-full items-start justify-between p-5 text-left transition-colors hover:bg-muted/30"
              onClick={() => toggleGap(gap.id)}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  {getSeverityIcon(gap.severity)}
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={getSeverityBadgeVariant(gap.severity)}
                      className="text-xs"
                    >
                      {getSeverityLabel(gap.severity)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {gap.categoryName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      #{index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{gap.title}</h3>
                </div>
              </div>

              <div className="ml-4 shrink-0">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <CardContent className="border-t bg-muted/10 px-5 pb-5 pt-4">
                <div className="space-y-5">
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {gap.description}
                  </p>

                  {/* Current vs Target state */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-4 shadow-md">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-white/80" />
                        <span className="text-xs font-bold text-white/90">
                          Estado actual
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {gap.currentState}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-4 shadow-md">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-white/80" />
                        <span className="text-xs font-bold text-white/90">
                          Estado objetivo
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">
                        {gap.targetState}
                      </p>
                    </div>
                  </div>

                  {/* Effort estimate */}
                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Esfuerzo estimado:
                    </span>
                    <span className="font-medium">
                      {getEffortLabel(gap.estimatedEffort)}
                    </span>
                  </div>

                  {/* Recommendations */}
                  {gap.recommendations.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        Acciones recomendadas
                      </h4>
                      <div className="space-y-2">
                        {gap.recommendations.map((rec, idx) => (
                          <div
                            key={idx}
                            className="group flex items-start gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">
                                {rec.action}
                              </p>
                              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {rec.timeframe}
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {gap.recommendations[0]?.resources &&
                    gap.recommendations[0].resources.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          Recursos útiles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {gap.recommendations[0].resources.map((resource) => (
                            <a
                              key={resource.url}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                            >
                              {resource.name}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
