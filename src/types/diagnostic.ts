// Tipos principales para el diagnóstico de Export Readiness

export type CategoryId =
  | 'product'
  | 'operations'
  | 'documentation'
  | 'finance'
  | 'market'
  | 'human_resources';

export type ExportReadinessLevel =
  | 'not_ready'      // 0-25
  | 'early_stage'    // 26-50
  | 'developing'     // 51-70
  | 'ready'          // 71-85
  | 'export_pro';    // 86-100

export type GapSeverity = 'critical' | 'high' | 'medium' | 'low';

export type EffortLevel = 'quick_win' | 'short_term' | 'medium_term' | 'long_term';

export interface QuestionOption {
  value: number;  // 0-4
  label: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  question: string;
  options: QuestionOption[];
  weight: number;
  helpText?: string;
  critical?: boolean;  // Si es crítica, alerta especial si score bajo
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  weight: number;  // Peso en el score total (suma = 1.0)
  icon: string;    // Nombre del icono de Lucide
}

export interface Answer {
  questionId: string;
  category: CategoryId;
  value: number;
}

export interface CompanyInfo {
  name?: string;
  sector: string;
  size: 'micro' | 'small' | 'medium';
  country: string;
}

export interface CategoryScore {
  category: CategoryId;
  categoryName: string;
  rawScore: number;
  maxPossible: number;
  percentage: number;
  weight: number;
  weightedScore: number;
  level: 'critical' | 'needs_work' | 'developing' | 'ready' | 'excellent';
}

export interface Recommendation {
  action: string;
  priority: number;
  timeframe: string;
  resources?: Resource[];
}

export interface Resource {
  name: string;
  url: string;
  description?: string;
}

export interface Gap {
  id: string;
  category: CategoryId;
  categoryName: string;
  severity: GapSeverity;
  title: string;
  description: string;
  currentState: string;
  targetState: string;
  recommendations: Recommendation[];
  estimatedEffort: EffortLevel;
}

export interface DiagnosticResult {
  totalScore: number;
  level: ExportReadinessLevel;
  levelLabel: string;
  levelDescription: string;
  categoryScores: CategoryScore[];
  gaps: Gap[];
  completedAt: string;
  companyInfo: CompanyInfo;
}

export interface DiagnosticState {
  // Estado del wizard
  currentStep: number;
  companyInfo: CompanyInfo | null;
  answers: Answer[];
  isCompleted: boolean;
  result: DiagnosticResult | null;

  // Acciones
  setCompanyInfo: (info: CompanyInfo) => void;
  setAnswer: (answer: Answer) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeAndCalculate: () => void;
  reset: () => void;
}
