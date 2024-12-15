import { useState } from "react";

export const useFunnel = <TStep extends string, TState>(steps: TStep[], initialState: TState) => {
  const [currentStep, setCurrentStep] = useState<TStep>(steps[0]);
  const [state, setState] = useState<TState>(initialState);

  const nextStep = (step: TStep, newState?: Partial<TState>) => {
    setCurrentStep(step);
    setState((prev) => ({ ...prev, ...newState }));
  };

  return { currentStep, state, nextStep };
};
