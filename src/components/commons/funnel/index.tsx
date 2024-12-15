import { Children, ReactElement, ReactNode } from "react";

type FunnelProps<TStep> = {
  currentStep: TStep;
  children: ReactNode;
};

export default function Funnel<TStep extends string>({ currentStep, children }: FunnelProps<TStep>) {
  const steps = Children.toArray(children) as ReactElement[];

  return <>{steps.find((step) => step.props.name === currentStep)}</>;
}

type FunnelStepProps = {
  name: string;
  children: ReactNode;
};

function FunnelStep({ name, children }: FunnelStepProps) {
  return <>{children}</>;
}

Funnel.Step = FunnelStep;
