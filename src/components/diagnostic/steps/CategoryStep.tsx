import { useNavigate } from 'react-router-dom';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { CATEGORIES } from '@/data/categories';
import { getQuestionsByCategory } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QuestionCard } from '../QuestionCard';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Package,
  Settings,
  FileText,
  DollarSign,
  Globe,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Map de íconos por categoría (evita importar todo lucide-react)
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Package,
  Settings,
  FileText,
  DollarSign,
  Globe,
  Users,
};

interface CategoryStepProps {
  categoryIndex: number;
}

export function CategoryStep({ categoryIndex }: CategoryStepProps) {
  const navigate = useNavigate();
  const {
    setAnswer,
    getAnswerValue,
    nextStep,
    prevStep,
    completeAndCalculate,
  } = useDiagnosticStore();

  const category = CATEGORIES[categoryIndex];
  const questions = getQuestionsByCategory(category.id);
  const isLastCategory = categoryIndex === CATEGORIES.length - 1;

  // Track which questions are answered
  const answeredQuestions = questions.filter(
    (q) => getAnswerValue(q.id) !== undefined
  );
  const allAnswered = answeredQuestions.length === questions.length;

  // Get the icon component from static map
  const IconComponent = CATEGORY_ICONS[category.icon] || HelpCircle;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswer({
      questionId,
      category: category.id,
      value,
    });
  };

  const handleNext = () => {
    if (isLastCategory) {
      completeAndCalculate();
      navigate('/results');
    } else {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Category header */}
      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {answeredQuestions.length} de {questions.length} preguntas respondidas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            selectedValue={getAnswerValue(question.id)}
            onAnswer={(value) => handleAnswer(question.id, value)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button
          onClick={handleNext}
          disabled={!allAnswered}
          className="gap-2"
        >
          {isLastCategory ? (
            <>
              Ver Resultados
              <CheckCircle className="h-4 w-4" />
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {!allAnswered && (
        <p className="text-center text-sm text-muted-foreground">
          Responde todas las preguntas para continuar
        </p>
      )}
    </div>
  );
}
