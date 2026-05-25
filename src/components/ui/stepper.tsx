'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepperProps {
  currentStep: number;
  steps: Array<{
    label: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
}

export function Stepper({ currentStep, steps, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300',
                    isCompleted && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary bg-primary/10 text-primary',
                    !isCompleted && !isCurrent && 'border-muted-foreground/30 bg-muted/50 text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 animate-in zoom-in duration-200" />
                  ) : (
                    <span>{index + 1}</span>
                  )}

                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                  )}
                </div>

                {/* Step label - only show on larger screens */}
                <span
                  className={cn(
                    'mt-2 hidden text-xs font-medium transition-colors sm:block',
                    isCompleted && 'text-primary',
                    isCurrent && 'text-primary',
                    !isCompleted && !isCurrent && 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Separator line */}
              {!isLast && (
                <div className="flex-1 px-2">
                  <div
                    className={cn(
                      'h-0.5 w-full rounded-full transition-all duration-500',
                      isCompleted ? 'bg-primary' : 'bg-muted-foreground/20'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// Simple step indicator with just numbers
interface SimpleStepperProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function SimpleStepper({ currentStep, totalSteps, className }: SimpleStepperProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div
            key={i}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              isCompleted && 'w-8 bg-primary',
              isCurrent && 'w-8 bg-primary',
              !isCompleted && !isCurrent && 'w-2 bg-muted-foreground/20'
            )}
          />
        );
      })}
    </div>
  );
}
