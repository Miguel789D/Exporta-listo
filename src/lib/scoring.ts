import type {
  Answer,
  CategoryId,
  CategoryScore,
  ExportReadinessLevel,
  DiagnosticResult,
  CompanyInfo,
} from '@/types/diagnostic';
import { CATEGORIES, getCategoryById } from '@/data/categories';
import { getQuestionsByCategory } from '@/data/questions';
import { analyzeGaps } from './gapAnalysis';

export const LEVEL_CONFIG: Record<ExportReadinessLevel, { label: string; description: string; minScore: number }> = {
  not_ready: {
    label: 'No Listo para Exportar',
    description: 'Tu empresa necesita desarrollar capacidades fundamentales antes de iniciar el proceso de exportación. Enfócate en cerrar las brechas críticas identificadas.',
    minScore: 0,
  },
  early_stage: {
    label: 'Etapa Inicial',
    description: 'Tienes algunos elementos básicos pero necesitas fortalecer varias áreas clave. Con trabajo enfocado en los próximos 3-6 meses podrías avanzar significativamente.',
    minScore: 26,
  },
  developing: {
    label: 'En Desarrollo',
    description: 'Estás en buen camino. Tienes capacidades importantes pero aún hay áreas por mejorar. Con ajustes específicos podrías estar listo en 2-4 meses.',
    minScore: 51,
  },
  ready: {
    label: 'Listo para Exportar',
    description: '¡Felicidades! Tu empresa tiene las capacidades básicas para iniciar exportaciones. Enfócate en optimizar las áreas de mejora identificadas mientras buscas tu primer cliente.',
    minScore: 71,
  },
  export_pro: {
    label: 'Export Pro',
    description: '¡Excelente! Tu empresa está muy bien preparada para el comercio internacional. Tienes las capacidades para competir en mercados globales.',
    minScore: 86,
  },
};

export function calculateCategoryScore(
  categoryId: CategoryId,
  answers: Answer[]
): CategoryScore {
  const category = getCategoryById(categoryId);
  if (!category) {
    throw new Error(`Category not found: ${categoryId}`);
  }

  const categoryAnswers = answers.filter(a => a.category === categoryId);
  const categoryQuestions = getQuestionsByCategory(categoryId);

  let rawScore = 0;
  let maxPossible = 0;

  for (const question of categoryQuestions) {
    const answer = categoryAnswers.find(a => a.questionId === question.id);
    const value = answer?.value ?? 0;

    rawScore += value * question.weight;
    maxPossible += 4 * question.weight; // 4 es el máximo por pregunta
  }

  const percentage = maxPossible > 0 ? (rawScore / maxPossible) * 100 : 0;
  const weightedScore = percentage * category.weight;

  return {
    category: categoryId,
    categoryName: category.name,
    rawScore,
    maxPossible,
    percentage,
    weight: category.weight,
    weightedScore,
    level: getCategoryLevel(percentage),
  };
}

function getCategoryLevel(percentage: number): CategoryScore['level'] {
  if (percentage < 25) return 'critical';
  if (percentage < 50) return 'needs_work';
  if (percentage < 70) return 'developing';
  if (percentage < 85) return 'ready';
  return 'excellent';
}

export function getOverallLevel(score: number): ExportReadinessLevel {
  if (score >= 86) return 'export_pro';
  if (score >= 71) return 'ready';
  if (score >= 51) return 'developing';
  if (score >= 26) return 'early_stage';
  return 'not_ready';
}

export function calculateDiagnosticResult(
  answers: Answer[],
  companyInfo: CompanyInfo
): DiagnosticResult {
  // Calcular scores por categoría
  const categoryScores: CategoryScore[] = CATEGORIES.map(category =>
    calculateCategoryScore(category.id, answers)
  );

  // Calcular score total (suma de scores ponderados)
  const totalScore = categoryScores.reduce(
    (sum, cat) => sum + cat.weightedScore,
    0
  );

  // Determinar nivel general
  const level = getOverallLevel(totalScore);
  const levelConfig = LEVEL_CONFIG[level];

  // Analizar brechas
  const gaps = analyzeGaps(answers, categoryScores);

  return {
    totalScore: Math.round(totalScore * 10) / 10, // Redondear a 1 decimal
    level,
    levelLabel: levelConfig.label,
    levelDescription: levelConfig.description,
    categoryScores,
    gaps,
    completedAt: new Date().toISOString(),
    companyInfo,
  };
}

export function getLevelColor(level: ExportReadinessLevel): string {
  const colors: Record<ExportReadinessLevel, string> = {
    not_ready: '#ef4444',      // red-500
    early_stage: '#f97316',    // orange-500
    developing: '#eab308',     // yellow-500
    ready: '#22c55e',          // green-500
    export_pro: '#3b82f6',     // blue-500
  };
  return colors[level];
}

export function getCategoryLevelColor(level: CategoryScore['level']): string {
  const colors: Record<CategoryScore['level'], string> = {
    critical: '#ef4444',       // red-500
    needs_work: '#f97316',     // orange-500
    developing: '#eab308',     // yellow-500
    ready: '#22c55e',          // green-500
    excellent: '#3b82f6',      // blue-500
  };
  return colors[level];
}
