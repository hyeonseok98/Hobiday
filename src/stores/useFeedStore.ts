import { create } from "zustand";

interface FeedStore {
  filter: string;
  setFilter: (filter: string) => void;
}

const useFeedStore = create<FeedStore>(function (set) {
  return {
    filter: "",
    setFilter: function (filter) {
      set({ filter });
    },
  };
});

export default useFeedStore;
