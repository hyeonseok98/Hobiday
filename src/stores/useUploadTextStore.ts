import { create } from "zustand";

interface UploadTextState {
  performId: string;
  content: string;
  category: string;
  hashTags: string[];
  fileUrls: string[];
  photos: (File | string)[];
  feedId: number | null;
  // 선택한 공연의 데이터
  selectedPerformance: {
    performanceId: string;
    performanceName: string;
    startDate: string;
    endDate: string;
    genre: string;
    state: string;
    facility: string;
    isOpenRun: boolean;
    location: string;
    posterUrl: string;
    likes: number;
  } | null;
  setPerformId: (id: string) => void;
  setContent: (newContent: string) => void;
  setCategory: (newCategory: string) => void;
  setHashTags: (newHashtags: string[]) => void;
  setFileUrls: (newFileUrls: string[]) => void;
  setPhotos: (updateFn: (prevPhotos: (File | string)[]) => (File | string)[]) => void;
  setFeedId: (id: number | null) => void;
  setSelectedPerformance: (performance: UploadTextState["selectedPerformance"]) => void;
  reset: () => void;
}

const useUploadTextStore = create<UploadTextState>((set) => ({
  performId: "",
  content: "",
  category: "",
  hashTags: [],
  fileUrls: [],
  photos: [],
  feedId: null,
  selectedPerformance: null,
  setPerformId: (id) => set({ performId: id }),
  setContent: (newContent) => set({ content: newContent }),
  setCategory: (newCategory) => set({ category: newCategory }),
  setHashTags: (newHashTags) => set({ hashTags: newHashTags }),
  setFileUrls: (newFileUrls) => set({ fileUrls: newFileUrls }),
  setPhotos: (updateFn) => set((state) => ({ photos: updateFn(state.photos) })),
  setFeedId: (id) => set({ feedId: id }),
  setSelectedPerformance: (performance) => set({ selectedPerformance: performance }),
  reset: () =>
    set({
      performId: "",
      content: "",
      category: "",
      hashTags: [],
      fileUrls: [],
      photos: [],
      feedId: null,
      selectedPerformance: null,
    }),
}));

export default useUploadTextStore;
