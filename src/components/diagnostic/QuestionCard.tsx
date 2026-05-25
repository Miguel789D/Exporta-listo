import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { HelpCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Question } from '@/types/diagnostic';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedValue?: number;
  onAnswer: (value: number) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedValue,
  onAnswer,
}: QuestionCardProps) {
  const isAnswered = selectedValue !== undefined;

  return (
    <Card
      className={cn(
        'transition-all duration-300',
        isAnswered && 'border-primary/30 bg-primary/[0.02]'
      )}
    >
      <CardContent className="p-6">
        <div className="space-y-5">
          {/* Question header */}
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition-all',
                isAnswered
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {isAnswered ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                questionNumber
              )}
            </div>

            <div className="flex-1 space-y-2">
              <p className="font-medium leading-relaxed text-foreground">
                {question.question}
              </p>

              {question.critical && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Pregunta crítica para exportar</span>
                </div>
              )}

              {question.helpText && (
                <div className="flex items-start gap-1.5 rounded-lg bg-muted/50 p-2.5 text-xs text-muted-foreground">
                  <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{question.helpText}</span>
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <RadioGroup
            value={selectedValue?.toString()}
            onValueChange={(value) => onAnswer(parseInt(value, 10))}
            className="space-y-2 pl-12"
          >
            {question.options.map((option) => {
              const isSelected = selectedValue === option.value;

              return (
                <div
                  key={option.value}
                  className={cn(
                    'group relative flex items-start rounded-xl border p-4 transition-all duration-200 cursor-pointer',
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-transparent bg-muted/30 hover:bg-muted/50 hover:border-muted'
                  )}
                  onClick={() => onAnswer(option.value)}
                >
                  {/* Selection indicator */}
                  <div className="relative mr-3 mt-0.5">
                    <RadioGroupItem
                      value={option.value.toString()}
                      id={`${question.id}-${option.value}`}
                      className={cn(
                        'h-5 w-5',
                        isSelected && 'border-primary text-primary'
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <Label
                      htmlFor={`${question.id}-${option.value}`}
                      className={cn(
                        'cursor-pointer text-sm leading-relaxed transition-colors',
                        isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'
                      )}
                    >
                      {option.label}
                    </Label>
                  </div>

                  {/* Option number indicator */}

                </div>
              );
            })}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
