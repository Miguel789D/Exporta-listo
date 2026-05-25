import type {
  Answer,
  CategoryScore,
  Gap,
  GapSeverity,
  EffortLevel,
  Recommendation,
} from '@/types/diagnostic';
import { getQuestionById } from '@/data/questions';
import { getCategoryName } from '@/data/categories';
import { getResourcesForCategory, getRecommendationsForGap } from '@/data/recommendations';

interface GapTemplate {
  id: string;
  questionId: string;
  threshold: number; // Si el valor es <= threshold, es una brecha
  gapType: string;
  title: string;
  description: string;
  currentStateByValue: Record<number, string>;
  targetState: string;
  severity: GapSeverity;
  effort: EffortLevel;
}

// Plantillas de gaps basadas en preguntas críticas
const GAP_TEMPLATES: GapTemplate[] = [
  // Documentación - Formalización (CRÍTICO)
  {
    id: 'gap_doc_formalization',
    questionId: 'doc_01',
    threshold: 2,
    gapType: 'not_formalized',
    title: 'Formalización Empresarial Incompleta',
    description: 'La empresa no está completamente formalizada o tiene obligaciones tributarias pendientes.',
    currentStateByValue: {
      0: 'Opera informalmente',
      1: 'En proceso de formalización',
      2: 'Registrada pero con obligaciones atrasadas',
    },
    targetState: 'Empresa 100% formal, RUC activo, obligaciones al día con SUNAT',
    severity: 'critical',
    effort: 'short_term',
  },
  // RRHH - Compromiso gerencial (CRÍTICO)
  {
    id: 'gap_hr_commitment',
    questionId: 'hr_01',
    threshold: 1,
    gapType: 'no_commitment',
    title: 'Falta Compromiso Gerencial',
    description: 'No hay compromiso claro de la gerencia para iniciar exportaciones.',
    currentStateByValue: {
      0: 'Exportar no es prioridad',
      1: 'Interés bajo, enfocados en mercado local',
    },
    targetState: 'Exportación como prioridad estratégica con recursos asignados',
    severity: 'critical',
    effort: 'quick_win',
  },
  // Producto - Diferenciación
  {
    id: 'gap_prod_differentiation',
    questionId: 'prod_02',
    threshold: 1,
    gapType: 'low_differentiation',
    title: 'Baja Diferenciación del Producto',
    description: 'El producto no tiene clara diferenciación frente a competencia internacional.',
    currentStateByValue: {
      0: 'No sabe cómo se diferencia',
      1: 'Similar a competencia, solo compite por precio',
    },
    targetState: 'Propuesta de valor clara y diferenciada',
    severity: 'high',
    effort: 'medium_term',
  },
  // Producto - Marca
  {
    id: 'gap_prod_brand',
    questionId: 'prod_05',
    threshold: 1,
    gapType: 'no_brand',
    title: 'Sin Marca Registrada',
    description: 'La empresa no tiene marca registrada o definida.',
    currentStateByValue: {
      0: 'No tiene marca definida',
      1: 'Tiene marca comercial pero no registrada',
    },
    targetState: 'Marca registrada en INDECOPI (mínimo local)',
    severity: 'medium',
    effort: 'medium_term',
  },
  // Operaciones - Capacidad
  {
    id: 'gap_ops_capacity',
    questionId: 'ops_01',
    threshold: 1,
    gapType: 'low_capacity',
    title: 'Capacidad de Producción Limitada',
    description: 'No podría cumplir con pedidos de exportación significativos.',
    currentStateByValue: {
      0: 'No podría cumplir pedidos duplicados',
      1: 'Requeriría inversión significativa',
    },
    targetState: 'Capacidad para escalar producción con ajustes menores',
    severity: 'high',
    effort: 'long_term',
  },
  // Operaciones - Control de calidad
  {
    id: 'gap_ops_quality',
    questionId: 'ops_03',
    threshold: 1,
    gapType: 'no_quality_control',
    title: 'Sin Control de Calidad Documentado',
    description: 'No tiene sistemas de control de calidad documentados.',
    currentStateByValue: {
      0: 'No tiene controles de calidad',
      1: 'Controles básicos esporádicos',
    },
    targetState: 'Controles de calidad documentados (idealmente certificados)',
    severity: 'high',
    effort: 'medium_term',
  },
  // Operaciones - Logística
  {
    id: 'gap_ops_logistics',
    questionId: 'ops_05',
    threshold: 1,
    gapType: 'no_logistics_experience',
    title: 'Sin Experiencia en Logística Internacional',
    description: 'No tiene experiencia con operadores logísticos o agentes de carga.',
    currentStateByValue: {
      0: 'No sabe cómo funcionan',
      1: 'Sabe que existen pero nunca ha contactado',
    },
    targetState: 'Relaciones establecidas con operadores logísticos',
    severity: 'medium',
    effort: 'short_term',
  },
  // Documentación - Fichas técnicas
  {
    id: 'gap_doc_techsheets',
    questionId: 'doc_02',
    threshold: 1,
    gapType: 'no_tech_sheets',
    title: 'Sin Fichas Técnicas de Producto',
    description: 'No tiene documentación técnica completa de sus productos.',
    currentStateByValue: {
      0: 'No tiene documentación de producto',
      1: 'Información básica sin formato',
    },
    targetState: 'Fichas técnicas completas en español e inglés',
    severity: 'high',
    effort: 'short_term',
  },
  // Documentación - Código HS
  {
    id: 'gap_doc_hscode',
    questionId: 'doc_05',
    threshold: 1,
    gapType: 'no_hs_code',
    title: 'Desconoce Clasificación Arancelaria',
    description: 'No conoce la partida arancelaria (código HS) de sus productos.',
    currentStateByValue: {
      0: 'No sabe qué es el código HS',
      1: 'Ha escuchado del tema pero no lo conoce',
    },
    targetState: 'Código HS identificado y validado',
    severity: 'high',
    effort: 'quick_win',
  },
  // Documentación - Certificaciones
  {
    id: 'gap_doc_certifications',
    questionId: 'doc_03',
    threshold: 1,
    gapType: 'no_certifications',
    title: 'Sin Certificaciones Requeridas',
    description: 'No conoce o no tiene las certificaciones necesarias para exportar.',
    currentStateByValue: {
      0: 'No conoce los requisitos',
      1: 'Sabe que existen pero no cuáles aplican',
    },
    targetState: 'Certificaciones requeridas obtenidas (SENASA, DIGESA, etc.)',
    severity: 'high',
    effort: 'medium_term',
  },
  // Finanzas - Capital de trabajo
  {
    id: 'gap_fin_capital',
    questionId: 'fin_01',
    threshold: 1,
    gapType: 'no_working_capital',
    title: 'Capital de Trabajo Insuficiente',
    description: 'No tiene capital para financiar operaciones de exportación (90-120 días).',
    currentStateByValue: {
      0: 'Imposible actualmente',
      1: 'Muy difícil',
    },
    targetState: 'Capital de trabajo disponible o acceso a financiamiento',
    severity: 'critical',
    effort: 'medium_term',
  },
  // Finanzas - Costeo
  {
    id: 'gap_fin_costing',
    questionId: 'fin_03',
    threshold: 1,
    gapType: 'no_cost_control',
    title: 'Sin Control de Costos',
    description: 'No conoce sus costos reales de producción.',
    currentStateByValue: {
      0: 'No tiene control de costos',
      1: 'Solo conoce costos directos',
    },
    targetState: 'Costeo detallado que permita calcular precio de exportación',
    severity: 'high',
    effort: 'short_term',
  },
  // Finanzas - Medios de pago
  {
    id: 'gap_fin_payments',
    questionId: 'fin_04',
    threshold: 1,
    gapType: 'no_payment_knowledge',
    title: 'Desconoce Medios de Pago Internacionales',
    description: 'No conoce cómo funcionan las cartas de crédito o transferencias SWIFT.',
    currentStateByValue: {
      0: 'No sabe cómo funcionan',
      1: 'Solo ha escuchado de ellos',
    },
    targetState: 'Conocimiento funcional de medios de pago internacionales',
    severity: 'medium',
    effort: 'quick_win',
  },
  // Mercado - Objetivo
  {
    id: 'gap_mkt_target',
    questionId: 'mkt_01',
    threshold: 1,
    gapType: 'no_target_market',
    title: 'Sin Mercado Objetivo Definido',
    description: 'No ha identificado mercados objetivo para exportar.',
    currentStateByValue: {
      0: 'No ha pensado en mercados específicos',
      1: 'Exportaría a cualquier mercado que aparezca',
    },
    targetState: '2-3 mercados objetivo priorizados con análisis básico',
    severity: 'high',
    effort: 'short_term',
  },
  // Mercado - Competencia
  {
    id: 'gap_mkt_competition',
    questionId: 'mkt_02',
    threshold: 1,
    gapType: 'no_competition_knowledge',
    title: 'Desconoce la Competencia Internacional',
    description: 'No ha investigado a sus competidores en mercados internacionales.',
    currentStateByValue: {
      0: 'No ha investigado la competencia',
      1: 'Solo sabe que existe competencia',
    },
    targetState: 'Análisis básico de principales competidores',
    severity: 'medium',
    effort: 'short_term',
  },
  // Mercado - Contactos
  {
    id: 'gap_mkt_contacts',
    questionId: 'mkt_03',
    threshold: 1,
    gapType: 'no_contacts',
    title: 'Sin Contactos en Mercados Destino',
    description: 'No tiene contactos ni canales identificados en mercados objetivo.',
    currentStateByValue: {
      0: 'No tiene ningún contacto',
      1: 'Solo ideas generales',
    },
    targetState: 'Contactos iniciales o canales identificados',
    severity: 'medium',
    effort: 'medium_term',
  },
  // RRHH - Idiomas
  {
    id: 'gap_hr_languages',
    questionId: 'hr_02',
    threshold: 1,
    gapType: 'no_languages',
    title: 'Sin Capacidad en Idiomas Extranjeros',
    description: 'Nadie en el equipo maneja inglés u otro idioma extranjero.',
    currentStateByValue: {
      0: 'Solo español',
      1: 'Inglés muy limitado',
    },
    targetState: 'Al menos una persona con inglés funcional para negocios',
    severity: 'medium',
    effort: 'long_term',
  },
  // RRHH - Personal dedicado
  {
    id: 'gap_hr_staff',
    questionId: 'hr_03',
    threshold: 1,
    gapType: 'no_dedicated_staff',
    title: 'Sin Personal para Comercio Exterior',
    description: 'No puede asignar personal dedicado a comercio exterior.',
    currentStateByValue: {
      0: 'No hay capacidad para asignar recursos',
      1: 'El dueño tendría que hacerlo todo',
    },
    targetState: 'Al menos una persona responsable (puede ser tiempo parcial)',
    severity: 'medium',
    effort: 'short_term',
  },
];

export function analyzeGaps(answers: Answer[], categoryScores: CategoryScore[]): Gap[] {
  const gaps: Gap[] = [];

  // 1. Analizar gaps basados en respuestas individuales
  for (const template of GAP_TEMPLATES) {
    const answer = answers.find(a => a.questionId === template.questionId);

    if (answer && answer.value <= template.threshold) {
      const question = getQuestionById(template.questionId);
      if (!question) continue;

      const recommendations = getRecommendationsForGap(template.gapType);
      const resources = getResourcesForCategory(question.category);

      // Agregar recursos a las recomendaciones
      const enhancedRecommendations: Recommendation[] = recommendations.map((rec, idx) => ({
        ...rec,
        resources: idx === 0 ? resources : undefined, // Solo agregar recursos a la primera recomendación
      }));

      gaps.push({
        id: template.id,
        category: question.category,
        categoryName: getCategoryName(question.category),
        severity: template.severity,
        title: template.title,
        description: template.description,
        currentState: template.currentStateByValue[answer.value] || 'Estado actual no determinado',
        targetState: template.targetState,
        recommendations: enhancedRecommendations,
        estimatedEffort: template.effort,
      });
    }
  }

  // 2. Agregar gaps para categorías con score muy bajo que no tienen gaps específicos
  for (const catScore of categoryScores) {
    if (catScore.percentage < 40) {
      const existingGapsInCategory = gaps.filter(g => g.category === catScore.category);

      if (existingGapsInCategory.length === 0) {
        gaps.push({
          id: `gap_category_${catScore.category}`,
          category: catScore.category,
          categoryName: catScore.categoryName,
          severity: catScore.percentage < 25 ? 'critical' : 'high',
          title: `${catScore.categoryName} Requiere Atención`,
          description: `Tu puntuación en ${catScore.categoryName} es ${Math.round(catScore.percentage)}%, lo cual indica que esta área necesita desarrollo significativo.`,
          currentState: `Puntuación actual: ${Math.round(catScore.percentage)}%`,
          targetState: 'Alcanzar al menos 70% en esta categoría',
          recommendations: [
            {
              action: `Revisar todas las preguntas de ${catScore.categoryName} y trabajar en las áreas débiles`,
              priority: 1,
              timeframe: '1-2 meses',
              resources: getResourcesForCategory(catScore.category),
            },
          ],
          estimatedEffort: 'medium_term',
        });
      }
    }
  }

  // 3. Ordenar por severidad
  const severityOrder: Record<GapSeverity, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  return gaps.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

export function getEffortLabel(effort: EffortLevel): string {
  const labels: Record<EffortLevel, string> = {
    quick_win: 'Quick Win (1-2 semanas)',
    short_term: 'Corto Plazo (1-2 meses)',
    medium_term: 'Mediano Plazo (2-4 meses)',
    long_term: 'Largo Plazo (4+ meses)',
  };
  return labels[effort];
}

export function getSeverityLabel(severity: GapSeverity): string {
  const labels: Record<GapSeverity, string> = {
    critical: 'Crítico',
    high: 'Alto',
    medium: 'Medio',
    low: 'Bajo',
  };
  return labels[severity];
}

export function getSeverityColor(severity: GapSeverity): string {
  const colors: Record<GapSeverity, string> = {
    critical: '#ef4444', // red-500
    high: '#f97316',     // orange-500
    medium: '#eab308',   // yellow-500
    low: '#22c55e',      // green-500
  };
  return colors[severity];
}
