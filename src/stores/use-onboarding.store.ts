import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  nickname: string;
  categories: string[];
  setNickname: (nickname: string) => void;
  setCategories: (categories: string[]) => void;
  resetOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      nickname: "",
      categories: [],
      setNickname: (nickname) => set({ nickname }),
      setCategories: (categories) => set({ categories }),
      resetOnboarding: () => set({ nickname: "", categories: [] }),
    }),
    {
      name: "onboarding",
    },
  ),
);
