import { create } from "zustand";

export interface Profile {
  profileId: number;
  memberId: number;
  profileNickname: string;
  profileEmail: string;
  profileGenres: string[];
  profileIntroduction: string;
  profileImageUrl: string;
  totalFeedCount: number;
  followerCount: number;
  followingCount: number;
}

// 유저 정보 상태 관리
interface UserState {
  user: Profile | null;
  setUser: (user: Profile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
