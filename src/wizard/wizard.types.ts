export type StepProps = {
  step: number;
  totalSteps: number;
  previousStep: () => void;
  nextStep: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
};
