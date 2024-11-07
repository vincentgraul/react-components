export type StepProps = {
  step: number;
  previousStep: () => void;
  nextStep: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
};
