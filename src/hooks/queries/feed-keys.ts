export const feedKeys = {
  all: ["feeds"] as const,
  latest: () => [...feedKeys.all, "latest"] as const,
  popular: () => [...feedKeys.all, "popular"] as const,
};
