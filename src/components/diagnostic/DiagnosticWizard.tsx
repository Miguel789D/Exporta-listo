import { useDiagnosticStore } from '@/store/diagnosticStore';
import { CATEGORIES } from '@/data/categories';
import { Stepper } from '@/components/ui/stepper';
import { CompanyInfoStep } from './steps/CompanyInfoStep';
import { CategoryStep } from './steps/CategoryStep';
import { Building2 } from 'lucide-react';

export function DiagnosticWizard() {
  const { currentStep, getProgressPercentage } = useDiagnosticStore();

  const progress = getProgressPercentage();

  // Build steps array for the stepper
  const steps = [
    { label: 'Empresa', icon: <Building2 className="h-4 w-4" /> },
    ...CATEGORIES.map((cat) => ({ label: cat.name.split(' ')[0] })),
  ];

  const getCurrentStepName = () => {
    if (currentStep === 0) {
      return 'Información de la Empresa';
    }
    const category = CATEGORIES[currentStep - 1];
    return category?.name ?? '';
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper header */}
      <div className="mb-8">
        {/* Visual stepper */}
        <Stepper
          currentStep={currentStep}
          steps={steps}
          className="mb-6"
        />

        {/* Progress info */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {getCurrentStepName()}
          </span>
          <span className="text-muted-foreground">
            {progress}% completado
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[400px]">
        {currentStep === 0 ? (
          <CompanyInfoStep />
        ) : (
          <CategoryStep categoryIndex={currentStep - 1} />
        )}
      </div>
    </div>
  );
}
