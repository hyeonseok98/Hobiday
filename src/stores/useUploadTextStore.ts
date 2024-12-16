import { create } from "zustand";

interface UploadTextState {
  performId: string;
  content: string;
  category: string;
  hashTags: string[];
  fileUrls: string[];
  photos: File[];
  setPerformId: (id: string) => void;
  setContent: (newContent: string) => void;
  setCategory: (newCategory: string) => void;
  setHashTags: (newHashtags: string[]) => void;
  setFileUrls: (newFileUrls: string[]) => void;
  setPhotos: (updateFn: (prevPhotos: File[]) => File[]) => void;
}

const useUploadTextStore = create<UploadTextState>((set) => ({
  performId: "",
  content: "",
  category: "",
  hashTags: [],
  fileUrls: [],
  photos: [],
  setPerformId: (id) => set({ performId: id }),
  setContent: (newContent) => set({ content: newContent }),
  setCategory: (newCategory) => set({ category: newCategory }),
  setHashTags: (newHashTags) => set({ hashTags: newHashTags }),
  setFileUrls: (newFileUrls) => set({ fileUrls: newFileUrls }),
  setPhotos: (updateFn) => set((state) => ({ photos: updateFn(state.photos) })),
}));

export default useUploadTextStore;
