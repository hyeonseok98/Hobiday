type AdBannerProps = {
  banners: { src: string; alt: string }[];
};

export const AD_BANNERS: AdBannerProps["banners"] = [
  { src: "/banner/snowFlake.svg", alt: "눈꽃 콘서트" },
  { src: "/banner/pirate.svg", alt: "뮤지컬 해적" },
  { src: "/banner/caravaggio.svg", alt: "카라바조 전시회" },
  { src: "/banner/cyrano.svg", alt: "뮤지컬 시라노" },
  { src: "/banner/shearMadness.svg", alt: "연극 셰어 매드니스" },
  { src: "/banner/gwangHwaMun.svg", alt: "광화문 야경 투어" },
];
