import { ReactElement, useEffect, useState, Children, ElementType, ReactNode } from "react";
import clsx from "clsx";
import styles from "./wizard.module.css";
import { StepProps } from "./wizard.types";

type HeaderProps = {
  titles?: string[];
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  titleSize?: number;
  titleWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  stepIndicatorWeight?: 400 | 500 | 600 | 700 | 800 | 900;
  hasStepIndicator?: boolean;
};

const Header = ({
  titles,
  titleAs,
  step,
  titleSize,
  titleWeight,
  totalSteps,
  hasStepIndicator,
  stepIndicatorWeight,
}: HeaderProps & Omit<StepProps, "previousStep" | "nextStep" | "isFirstPage" | "isLastPage">) => {
  const Title = titleAs ?? "h2";
  return (
    <div className={styles.header}>
      {titles && (
        <Title
          className={styles.title}
          style={{ fontSize: `${titleSize ?? 1.5}rem`, fontWeight: titleWeight ?? 700 }}
        >
          {titles[step - 1]}
        </Title>
      )}
      {hasStepIndicator && (
        <span style={{ fontWeight: stepIndicatorWeight ?? 400 }}>
          {step}/{totalSteps}
        </span>
      )}
    </div>
  );
};

export type FooterButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

type FooterProps = {
  footerButton?: ElementType;
  footerButtonNextText?: string;
  footerButtonPreviousText?: string;
  footerJustifyContent?: "left" | "center" | "right";
  footerGap?: number;
};

const Footer = ({
  footerButton,
  footerButtonNextText,
  footerButtonPreviousText,
  isFirstPage,
  isLastPage,
  previousStep,
  nextStep,
  footerJustifyContent,
  footerGap,
}: FooterProps & Omit<StepProps, "step" | "totalSteps">) => {
  const WizardButton = footerButton ?? "button";
  return (
    <div
      className={styles.footer}
      style={{ justifyContent: footerJustifyContent ?? "center", gap: `${footerGap ?? 1}rem` }}
    >
      {!isFirstPage && (
        <WizardButton onClick={previousStep}>{footerButtonPreviousText ?? "Previous"}</WizardButton>
      )}
      {!isLastPage && (
        <WizardButton onClick={nextStep}>{footerButtonNextText ?? "Next"}</WizardButton>
      )}
    </div>
  );
};

export type WizardProps = HeaderProps &
  FooterProps & {
    children: ReactElement[];
    step?: number;
    renderHeader?: (props: StepProps) => ReactElement;
    renderFooter?: (props: StepProps) => ReactElement;
    gap?: number;
    className?: string;
  };

export const Wizard = ({
  className,
  children,
  step: stepProps = 1,
  renderHeader,
  renderFooter,
  titles,
  titleAs,
  titleSize,
  titleWeight,
  hasStepIndicator,
  stepIndicatorWeight,
  footerButton,
  footerGap,
  footerJustifyContent,
  footerButtonNextText,
  footerButtonPreviousText,
  gap,
}: WizardProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = Children.count(children);
  const isFirstPage = step === 1;
  const isLastPage = step === totalSteps;

  useEffect(() => {
    if (stepProps <= totalSteps) setStep(stepProps);
  }, [stepProps]);

  const currentPage: ReactElement = Children.toArray(children)[step - 1] as ReactElement;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className={clsx(styles.container, className)} style={{ gap: `${gap ?? 1}rem` }}>
      {renderHeader ? (
        renderHeader({ step, previousStep, nextStep, isFirstPage, isLastPage, totalSteps })
      ) : (
        <Header
          titles={titles}
          titleAs={titleAs}
          titleSize={titleSize}
          titleWeight={titleWeight}
          hasStepIndicator={hasStepIndicator}
          stepIndicatorWeight={stepIndicatorWeight}
          step={step}
          totalSteps={totalSteps}
        />
      )}

      {currentPage}

      {renderFooter ? (
        renderFooter({ step, previousStep, nextStep, isFirstPage, isLastPage, totalSteps })
      ) : (
        <Footer
          footerButton={footerButton}
          footerGap={footerGap}
          footerJustifyContent={footerJustifyContent}
          footerButtonNextText={footerButtonNextText}
          footerButtonPreviousText={footerButtonPreviousText}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}
    </div>
  );
};
