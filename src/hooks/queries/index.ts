export const PERFORMANCE_KEYS = {
  all: ["performances"] as const,
  byGenre: (genre: string, rowStart: string, rowEnd: string) =>
    [...PERFORMANCE_KEYS.all, "genre", genre, rowStart, rowEnd] as const,
  details: (id: string) => [...PERFORMANCE_KEYS.all, "details", id] as const,
  detailAll: (id: string) => [...PERFORMANCE_KEYS.all, "detail-all", id] as const,
  search: (keyword: string) => ["search", keyword],
  recommendSearchWord: ["recommandSearch"] as const,
  facility: ["facility"] as const,
};

export const USER_KEYS = {
  CHECK_NICKNAME: "check-nickname",
};

export const PROFILE_KEYS = {
  PROFILE_REGISTRATION: "profile-registration",
};

export const WISHLIST_KEYS = {
  all: ["wishlist"] as const,
  byGenre: (genre: string) => [...WISHLIST_KEYS.all, "genre", genre] as const,
};
