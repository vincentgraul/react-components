import { ReactElement, useState, Children, ElementType } from "react";
import clsx from "clsx";
import styles from "./wizard.module.css";
import { StepProps } from "./wizard.types";
import { FontWeight, JustifyContent, Title } from "../types";
import { toRem } from "../utils";

type HeaderProps = {
  titles?: string[];
  titleAs?: Title;
  titleFontSize?: number;
  titleFontWeight?: FontWeight;
  stepIndicatorFontWeight?: FontWeight;
  hasStepIndicator?: boolean;
};

const Header = ({
  titles,
  titleAs = "h2",
  step,
  titleFontSize = 1.5,
  titleFontWeight = 700,
  totalSteps,
  hasStepIndicator,
  stepIndicatorFontWeight = 400,
}: HeaderProps & Omit<StepProps, "previousStep" | "nextStep" | "isFirstStep" | "isLastStep">) => {
  const Title = titleAs;
  return (
    <div className={styles.header}>
      {titles && (
        <Title
          className={styles.title}
          style={{ fontSize: toRem(titleFontSize), fontWeight: titleFontWeight }}
        >
          {titles[step - 1]}
        </Title>
      )}
      {hasStepIndicator && (
        <span style={{ fontWeight: stepIndicatorFontWeight }}>
          {step}/{totalSteps}
        </span>
      )}
    </div>
  );
};

type FooterProps = {
  Button?: ElementType;
  nextButtonText?: string;
  previousButtonText?: string;
  finalizeButtonText?: string;
  onFinalize?: () => void;
  justifyContent?: JustifyContent;
  gap?: number;
};

const Footer = ({
  Button = "button",
  nextButtonText = "Next",
  previousButtonText = "Previous",
  finalizeButtonText = "Finalize",
  onFinalize,
  justifyContent = "center",
  gap = 1,
  isFirstStep,
  isLastStep,
  previousStep,
  nextStep,
}: FooterProps & Omit<StepProps, "step" | "totalSteps">) => (
  <div className={styles.footer} style={{ justifyContent, gap: toRem(gap) }}>
    {!isFirstStep && <Button onClick={previousStep}>{previousButtonText}</Button>}
    {!isLastStep && <Button onClick={nextStep}>{nextButtonText}</Button>}
    {isLastStep && onFinalize && <Button onClick={onFinalize}>{finalizeButtonText}</Button>}
  </div>
);

export type WizardProps = {
  className?: string;
  children: ReactElement[];
  step?: number;
  renderHeader?: (props: StepProps) => ReactElement;
  renderFooter?: (props: StepProps) => ReactElement;
  gap?: number;
  header?: HeaderProps;
  footer?: FooterProps;
};

export const Wizard = ({
  className,
  children,
  step = 1,
  renderHeader,
  renderFooter,
  gap = 1,
  header,
  footer,
}: WizardProps) => {
  const totalSteps = Children.count(children);
  const [currentStep, setCurrentStep] = useState(step <= totalSteps ? step : 1);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const currentPage: ReactElement = Children.toArray(children)[currentStep - 1] as ReactElement;

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className={clsx(styles.container, className)} style={{ gap: toRem(gap) }}>
      {renderHeader ? (
        renderHeader({
          step: currentStep,
          previousStep,
          nextStep,
          isFirstStep,
          isLastStep,
          totalSteps,
        })
      ) : (
        <Header step={currentStep} totalSteps={totalSteps} {...header} />
      )}

      {currentPage}

      {renderFooter ? (
        renderFooter({
          step: currentStep,
          previousStep,
          nextStep,
          isFirstStep,
          isLastStep,
          totalSteps,
        })
      ) : (
        <Footer
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          nextStep={nextStep}
          previousStep={previousStep}
          {...footer}
        />
      )}
    </div>
  );
};
