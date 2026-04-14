export type StepProps = {
	step: number;
	totalSteps: number;
	onPreviousStep: () => void;
	onNextStep: () => void;
	isFirstStep: boolean;
	isLastStep: boolean;
};
