"use client";

import Funnel from "@/components/commons/funnel";
import { MainLayout } from "@/components/layout";
import ProgressBar from "@/components/progress-bar";
import { useEffect, useState } from "react";
import CategoryStep from "./category-step";
import CompleteStep from "./complete-step";
import ProfileStep from "./profile-step";

type Steps = "profile" | "category" | "complete";
type OnboardingState = {
  profile: string;
  categories: string[];
};

export default function Onboarding() {
  const steps: Steps[] = ["profile", "category", "complete"];

  const [currentStep, setCurrentStep] = useState<Steps>("profile");
  const [state, setState] = useState<OnboardingState>({
    profile: "",
    categories: [],
  });

  const updateStepFromPathname = () => {
    const pathname = window.location.pathname;
    if (pathname.includes("category")) {
      setCurrentStep("category");
    } else if (pathname.includes("complete")) {
      setCurrentStep("complete");
    } else {
      setCurrentStep("profile");
    }
  };

  useEffect(() => {
    // 뒤로가기/앞으로가기 이벤트 감지
    const handlePopState = () => {
      updateStepFromPathname();
    };

    window.addEventListener("popstate", handlePopState);

    // 초기 렌더링 시 URL 상태 동기화
    updateStepFromPathname();

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    // complete 상태에서 뒤로 가기 막기
    if (currentStep === "complete") {
      window.history.replaceState(null, "", "/onboarding/complete");

      const handlePreventBack = () => {
        window.history.pushState(null, "", "/onboarding/complete");
      };

      window.addEventListener("popstate", handlePreventBack);

      return () => {
        window.removeEventListener("popstate", handlePreventBack);
      };
    }
  }, [currentStep]);

  const nextStep = (step: Steps, newState?: Partial<OnboardingState>) => {
    setCurrentStep(step);
    if (newState) {
      setState((prev) => ({ ...prev, ...newState }));
    }
    window.history.pushState(null, "", `/onboarding/${step}`);
  };

  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <MainLayout headerProps={currentStep !== "complete" ? { showBackButton: true } : null} navigationBarVisible={false}>
      {currentStep !== "complete" && (
        <ProgressBar currentStepIndex={currentStepIndex} totalSteps={2} className="max-w-[383px] mx-auto" />
      )}
      <Funnel currentStep={currentStep}>
        <Funnel.Step name="profile">
          <ProfileStep onNext={(profile) => nextStep("category", { profile })} />
        </Funnel.Step>

        <Funnel.Step name="category">
          <CategoryStep onNext={(categories) => nextStep("complete", { categories })} />
        </Funnel.Step>

        <Funnel.Step name="complete">
          <CompleteStep />
        </Funnel.Step>
      </Funnel>
    </MainLayout>
  );
}
