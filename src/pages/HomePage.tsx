import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroGridSection } from '@/components/ui/hero-grid-section';
import {
  CheckCircle,
  FileText,
  Target,
  Clock,
  ArrowRight,
  Package,
  Settings,
  DollarSign,
  Globe,
  Users,
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'En 10 minutos',
    description: 'Diagnóstico rápido que evalúa 6 dimensiones clave de tu empresa',
  },
  {
    icon: Target,
    title: 'Score inmediato',
    description: 'Conoce tu nivel de preparación para exportar de 0 a 100',
  },
  {
    icon: CheckCircle,
    title: 'Brechas priorizadas',
    description: 'Identifica exactamente qué debes mejorar y en qué orden',
  },
  {
    icon: FileText,
    title: 'Reporte descargable',
    description: 'PDF con tu diagnóstico completo y recomendaciones personalizadas',
  },
];

const categories = [
  { name: 'Producto y Propuesta de Valor', weight: '20%', icon: Package },
  { name: 'Capacidad Operativa', weight: '18%', icon: Settings },
  { name: 'Documentación y Cumplimiento', weight: '20%', icon: FileText },
  { name: 'Capacidad Financiera', weight: '15%', icon: DollarSign },
  { name: 'Conocimiento de Mercado', weight: '15%', icon: Globe },
  { name: 'Recursos Humanos', weight: '12%', icon: Users },
];

export function HomePage() {
  return (
    <Layout>
      {/* Hero Section - New Grid Component */}
      <HeroGridSection />

      {/* Benefits Section - Improved */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              ¿Qué obtendrás?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Un diagnóstico completo de tu preparación exportadora
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute -right-px -top-px h-8 w-8 overflow-hidden">
                  <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/0 transition-colors group-hover:border-primary/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we evaluate - Improved */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              ¿Qué evaluamos?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Analizamos 6 dimensiones clave que determinan tu preparación para exportar
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-foreground">{category.name}</span>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {category.weight}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Improved */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center text-primary-foreground md:p-12">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative">
              <h2 className="text-2xl font-bold md:text-3xl">
                Empieza tu camino exportador hoy
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                28 preguntas. 10 minutos. Un plan de acción claro
                para dar el primer paso hacia mercados internacionales.
              </p>
              <div className="mt-8">
                <Link to="/diagnostic">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 gap-2 px-8 text-base font-semibold shadow-lg"
                  >
                    Comenzar Diagnóstico
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
