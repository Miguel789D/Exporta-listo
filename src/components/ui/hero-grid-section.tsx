import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles, Globe, TrendingUp, CheckCircle } from 'lucide-react';

interface TrustIndicator {
    id: number;
    icon: typeof Globe;
    label: string;
}

const TRUST_INDICATORS: TrustIndicator[] = [
    { id: 1, icon: Globe, label: '500+ empresas diagnosticadas' },
    { id: 2, icon: TrendingUp, label: '6 dimensiones evaluadas' },
    { id: 3, icon: CheckCircle, label: '100% gratuito' },
];

interface HeroGridSectionProps {
    title?: ReactNode | string;
    highlightedText?: string;
    subtitle?: ReactNode | string;
    primaryCtaText?: string;
    primaryCtaLink?: string;
    trustIndicators?: TrustIndicator[];
    className?: string;
}

export function HeroGridSection({
    title = '¿Tu empresa está lista',
    highlightedText = 'para exportar?',
    subtitle = 'Descúbrelo en 10 minutos con nuestro diagnóstico gratuito. Obtén un plan de acción personalizado para iniciar tu camino exportador.',
    primaryCtaText = 'Iniciar Diagnóstico Gratuito',
    primaryCtaLink = '/diagnostic',
    trustIndicators = TRUST_INDICATORS,
    className,
}: HeroGridSectionProps) {
    return (
        <section
            className={cn(
                'relative min-h-[calc(100vh-80px)] overflow-hidden',
                className
            )}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 z-0">
                {/* Vertical grid lines */}
                <div className="absolute inset-0 grid grid-cols-[1fr_minmax(300px,1200px)_1fr]">
                    <div className="border-r border-border/30" />
                    <div className="grid grid-cols-3">
                        <div className="border-r border-border/20" />
                        <div className="border-r border-border/20" />
                        <div />
                    </div>
                    <div className="border-l border-border/30" />
                </div>

                {/* Decorative gradients */}
                <figure className="pointer-events-none absolute -bottom-[40%] left-1/2 z-0 aspect-square w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[150px]" />
                <figure className="pointer-events-none absolute left-[5%] top-[10%] z-0 aspect-square w-[400px] rounded-full bg-primary/10 blur-[120px]" />
                <figure className="pointer-events-none absolute bottom-[10%] right-[5%] z-0 aspect-square w-[350px] rounded-full bg-orange-500/10 blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col">
                {/* Trust indicators bar */}
                <div className="flex items-center justify-center border-b border-border/30 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 px-4">
                        {trustIndicators.map((indicator) => (
                            <div
                                key={indicator.id}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <indicator.icon className="h-4 w-4 text-primary" />
                                <span>{indicator.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                    {/* Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span>Diagnóstico en 28 preguntas, resultados al instante</span>
                    </div>

                    {/* Title */}
                    <h1 className="max-w-4xl text-center text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                        {title}{' '}
                        <span className="bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
                            {highlightedText}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
                        {subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="mt-10">
                        <Link to={primaryCtaLink}>
                            <Button
                                size="lg"
                                className="h-14 gap-2 px-8 text-base font-semibold shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-105"
                            >
                                {primaryCtaText}
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Bottom decoration line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
        </section>
    );
}
