export type StepProps = {
  step: number;
  totalSteps: number;
  previousStep: () => void;
  nextStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};
