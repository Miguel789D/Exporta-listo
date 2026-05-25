import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { ScoreDisplay } from '@/components/results/ScoreDisplay';
import { CategoryBreakdown } from '@/components/results/CategoryBreakdown';
import { GapReport } from '@/components/results/GapReport';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedGlowBorder } from '@/components/ui/animated-glow-border';
import { Download, RotateCcw, Share2, CheckCircle2, Lightbulb, Target } from 'lucide-react';
import { generatePDF } from '@/lib/pdfGenerator';

export function ResultsPage() {
  const navigate = useNavigate();
  const { result, reset } = useDiagnosticStore();

  useEffect(() => {
    if (!result) {
      navigate('/diagnostic');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const handleDownloadPDF = async () => {
    await generatePDF(result);
  };

  const handleNewDiagnostic = () => {
    reset();
    navigate('/diagnostic');
  };

  const handleShare = async () => {
    const text = `Mi empresa obtuvo ${Math.round(result.totalScore)}/100 en el diagnóstico de Export Readiness de ExportaListo. ¿Estás listo para exportar? Descúbrelo en: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Diagnóstico Export Readiness',
          text,
          url: window.location.origin,
        });
      } catch (error) {
        // Solo mostrar error si no fue cancelación del usuario
        if ((error as Error).name !== 'AbortError') {
          toast.error('No se pudo compartir');
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(text);
        toast.success('Enlace copiado al portapapeles');
      } catch {
        toast.error('No se pudo copiar al portapapeles');
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header mejorado */}
        <div className="mb-8 text-center fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            Diagnóstico Completado
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">
            Tu Diagnóstico de Export Readiness
          </h1>
          {result.companyInfo.name && (
            <p className="text-lg text-muted-foreground font-medium">
              {result.companyInfo.name}
            </p>
          )}
        </div>

        {/* Acciones principales - ARRIBA para visibilidad inmediata */}
        <div className="mb-10 fade-in" style={{ animationDelay: '50ms' }}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              onClick={handleDownloadPDF}
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-primary/90"
            >
              <Download className="h-5 w-5" />
              <span className="font-semibold">Descargar PDF</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              size="lg"
              className="gap-2 hover-lift border-2 hover:border-primary/50"
            >
              <Share2 className="h-5 w-5" />
              <span className="font-semibold">Compartir</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleNewDiagnostic}
              size="lg"
              className="gap-2 hover-lift border-2 hover:border-success/50 hover:text-success"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="font-semibold">Nuevo Diagnóstico</span>
            </Button>
          </div>
        </div>

        {/* Score principal */}
        <div className="mb-12 fade-in" style={{ animationDelay: '150ms' }}>
          <ScoreDisplay result={result} />
        </div>

        {/* Desglose por categoría */}
        <div className="mb-12 fade-in" style={{ animationDelay: '250ms' }}>
          <Card className="shadow-xl hover-lift border-2 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-warning to-success" />
            <CardHeader className="bg-gradient-to-br from-white to-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">Desglose por Categoría</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              <CategoryBreakdown categoryScores={result.categoryScores} />
            </CardContent>
          </Card>
        </div>

        {/* Brechas con diseño mejorado */}
        {result.gaps.length > 0 && (
          <div className="mb-12 fade-in" style={{ animationDelay: '400ms' }}>
            <Card className="shadow-xl hover-lift border-2 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
              <CardHeader className="bg-gradient-to-br from-white to-red-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-100">
                      <Target className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">Brechas Prioritarias</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {result.gaps.length} {result.gaps.length === 1 ? 'brecha identificada' : 'brechas identificadas'}
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-bold text-lg">
                    {result.gaps.length}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <GapReport gaps={result.gaps} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Siguientes pasos con diseño premium */}
        <div className="mb-8 fade-in" style={{ animationDelay: '500ms' }}>
          <Card className="shadow-xl border-2 overflow-hidden relative">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-success" />

            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">¿Qué sigue?</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pasos recomendados para tu camino exportador
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 relative">
              <p className="text-muted-foreground leading-relaxed">
                Este diagnóstico es el primer paso de tu camino exportador. Te recomendamos:
              </p>
              <div className="grid gap-3">
                {[
                  'Descarga el PDF y compártelo con tu equipo',
                  'Prioriza las brechas críticas identificadas',
                  'Revisa los recursos sugeridos en cada brecha',
                  'Vuelve a hacer el diagnóstico en 3 meses para medir tu progreso'
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 hover-lift">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {idx + 1}
                    </div>
                    <p className="text-sm font-medium text-foreground pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA para contactar por WhatsApp */}
        <div className="mb-8 fade-in" style={{ animationDelay: '550ms' }}>
          <AnimatedGlowBorder variant="green">
            <Card className="shadow-xl border-0 overflow-hidden relative bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* WhatsApp Icon */}
                  <div className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
                    <svg
                      className="h-10 w-10 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      ¡Para ponerte en marcha!
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Puedes contactar con nosotros a través de WhatsApp y te ayudaremos a dar los siguientes pasos en tu camino exportador.
                    </p>
                    <a
                      href="https://wa.link/wa04mn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        className="gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 font-semibold"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Contáctanos por WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedGlowBorder>
        </div>

      </div>
    </Layout>
  );
}
