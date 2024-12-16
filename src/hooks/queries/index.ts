export const PERFORMANCE_KEYS = {
  all: ["performances"] as const,
  byGenre: (genre: string, rowStart: string, rowEnd: string) =>
    [...PERFORMANCE_KEYS.all, "genre", genre, rowStart, rowEnd] as const,
  details: (id: string) => [...PERFORMANCE_KEYS.all, "details", id] as const,
  detailAll: (id: string) => [...PERFORMANCE_KEYS.all, "detail-all", id] as const,
  search: (keyword: string) => [...PERFORMANCE_KEYS.all, "search", keyword],
};

export const USER_KEYS = {
  CHECK_NICKNAME: "check-nickname",
};

export const PROFILE_KEYS = {
  PROFILE_REGISTRATION: "profile-registration",
};
