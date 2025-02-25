type AdBannerProps = {
  banners: { src: string; alt: string }[];
};

export const AD_BANNERS: AdBannerProps["banners"] = [
  { src: "/banner/snowFlake.webp", alt: "눈꽃 콘서트" },
  { src: "/banner/pirate.webp", alt: "뮤지컬 해적" },
  { src: "/banner/caravaggio.webp", alt: "카라바조 전시회" },
  { src: "/banner/cyrano.webp", alt: "뮤지컬 시라노" },
  { src: "/banner/shearMadness.webp", alt: "연극 셰어 매드니스" },
  { src: "/banner/gwangHwaMun.webp", alt: "광화문 야경 투어" },
];
