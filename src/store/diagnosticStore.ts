import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Answer, CompanyInfo, DiagnosticResult } from '@/types/diagnostic';
import type { CategoryId } from '@/types/diagnostic';
import { CATEGORIES } from '@/data/categories';
import { getQuestionsByCategory } from '@/data/questions';
import { calculateDiagnosticResult } from '@/lib/scoring';

interface DiagnosticState {
  // Estado del wizard
  currentStep: number;
  companyInfo: CompanyInfo | null;
  answers: Answer[];
  isCompleted: boolean;
  result: DiagnosticResult | null;

  // Acciones
  setCompanyInfo: (info: CompanyInfo) => void;
  setAnswer: (answer: Answer) => void;
  getAnswerValue: (questionId: string) => number | undefined;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeAndCalculate: () => void;
  reset: () => void;

  // Helpers
  getTotalSteps: () => number;
  getCurrentCategoryId: () => CategoryId | null;
  getProgressPercentage: () => number;
  canProceed: () => boolean;
}

const TOTAL_STEPS = CATEGORIES.length + 1; // +1 para info de empresa

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentStep: 0,
      companyInfo: null,
      answers: [],
      isCompleted: false,
      result: null,

      // Acciones
      setCompanyInfo: (info) => {
        set({ companyInfo: info });
      },

      setAnswer: (answer) => {
        set((state) => {
          const existingIndex = state.answers.findIndex(
            (a) => a.questionId === answer.questionId
          );

          if (existingIndex >= 0) {
            // Actualizar respuesta existente
            const newAnswers = [...state.answers];
            newAnswers[existingIndex] = answer;
            return { answers: newAnswers };
          } else {
            // Agregar nueva respuesta
            return { answers: [...state.answers, answer] };
          }
        });
      },

      getAnswerValue: (questionId) => {
        const answer = get().answers.find((a) => a.questionId === questionId);
        return answer?.value;
      },

      nextStep: () => {
        set((state) => {
          const nextStep = state.currentStep + 1;
          if (nextStep < TOTAL_STEPS) {
            return { currentStep: nextStep };
          }
          return state;
        });
      },

      prevStep: () => {
        set((state) => {
          const prevStep = state.currentStep - 1;
          if (prevStep >= 0) {
            return { currentStep: prevStep };
          }
          return state;
        });
      },

      goToStep: (step) => {
        if (step >= 0 && step < TOTAL_STEPS) {
          set({ currentStep: step });
        }
      },

      completeAndCalculate: () => {
        const { answers, companyInfo } = get();

        if (!companyInfo) {
          console.error('No company info available');
          return;
        }

        const result = calculateDiagnosticResult(answers, companyInfo);

        set({
          isCompleted: true,
          result,
        });
      },

      reset: () => {
        set({
          currentStep: 0,
          companyInfo: null,
          answers: [],
          isCompleted: false,
          result: null,
        });
      },

      // Helpers
      getTotalSteps: () => TOTAL_STEPS,

      getCurrentCategoryId: () => {
        const { currentStep } = get();
        if (currentStep === 0) return null; // Paso de info de empresa
        const categoryIndex = currentStep - 1;
        return CATEGORIES[categoryIndex]?.id ?? null;
      },

      getProgressPercentage: () => {
        const { currentStep } = get();
        return Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);
      },

      canProceed: () => {
        const { currentStep, companyInfo, answers } = get();

        // Paso 0: Info de empresa
        if (currentStep === 0) {
          return companyInfo !== null &&
                 companyInfo.sector !== '' &&
                 companyInfo.size !== undefined;
        }

        // Pasos de categorías: verificar que todas las preguntas de la categoría estén respondidas
        const categoryIndex = currentStep - 1;
        const category = CATEGORIES[categoryIndex];

        if (!category) return false;

        const categoryQuestions = getQuestionsByCategory(category.id);
        const categoryAnswers = answers.filter((a) => a.category === category.id);

        return categoryAnswers.length === categoryQuestions.length;
      },
    }),
    {
      name: 'exportalisto-diagnostic',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        companyInfo: state.companyInfo,
        answers: state.answers,
        isCompleted: state.isCompleted,
        result: state.result,
      }),
    }
  )
);
