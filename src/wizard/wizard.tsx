import React, { ReactElement, useEffect, useState } from "react";
import { StepProps } from "./wizard.types";

type Props = {
  children: ReactElement[];
  step?: number;
  renderHeader?: (props: StepProps) => ReactElement;
  renderFooter?: (props: StepProps) => ReactElement;
};

export const Wizard = (props: Props) => {
  const { children, renderHeader, renderFooter } = props;
  const [step, setStep] = useState(1);
  const totalSteps = React.Children.count(children);
  const [isFirstPage, setFirstPage] = useState(false);
  const [isLastPage, setLastPage] = useState(false);

  useEffect(() => {
    if (props.step <= totalSteps) setStep(props.step);
  }, [props.step]);

  useEffect(() => {
    setFirstPage(step === 1);
    setLastPage(step === totalSteps);
  }, [step]);

  const currentPage: ReactElement = React.Children.toArray(children)[step - 1] as ReactElement;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
      {renderHeader({ step, previousStep, nextStep, isFirstPage, isLastPage })}
      {React.cloneElement(currentPage)}
      {renderFooter({ step, previousStep, nextStep, isFirstPage, isLastPage })}
    </div>
  );
};
