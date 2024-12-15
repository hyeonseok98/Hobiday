export const PERFORMANCE_KEYS = {
  all: ["performances"] as const,
  byGenre: (genre: string, rowStart: string, rowEnd: string) =>
    [...PERFORMANCE_KEYS.all, "genre", genre, rowStart, rowEnd] as const,
  details: (id: string) => [...PERFORMANCE_KEYS.all, "details", id] as const,
};

export const USER_KEYS = {
  CHECK_NICKNAME: "check-nickname",
};

export const PROFILE_KEYS = {
  PROFILE_REGISTRATION: "profile-registration",
};
