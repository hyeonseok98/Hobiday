"use client";

import Location from "@/assets/icons/location.svg";
import LikeGradientDefault from "@/assets/svgr-icons/LikeGradientDefault";
import Card from "@/components/card";
import Chip from "@/components/commons/chip";
import Icon from "@/components/commons/icons";
import LoadingSpinner from "@/components/commons/spinner";
import Toast from "@/components/commons/toast";
import { SectionLayout } from "@/components/layout";
import { TAB_CATEGORY } from "@/constants/category";
import { useAllWishlistQuery, useWishlistByGenreQuery } from "@/hooks/wishlist/use-wishlist-query";
import { useCallback, useMemo, useState } from "react";
import Tabs from "../../_components/tabs";

export default function WishlistPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  // "전체" 탭 데이터 가져오기
  const {
    data: allWishlist,
    isLoading: isAllWishlistLoading,
    isError: isAllWishlistError,
  } = useAllWishlistQuery("0", "20");

  // 장르별 데이터 가져오기
  const {
    data: wishlistByGenre,
    isLoading: isWishlistByGenreLoading,
    isError: isWishlistByGenreError,
  } = useWishlistByGenreQuery(TAB_CATEGORY[selectedTab]?.name);

  const wishlist = useMemo(
    () => (selectedTab === 0 ? allWishlist : wishlistByGenre),
    [selectedTab, allWishlist, wishlistByGenre],
  );
  const isLoading = selectedTab === 0 ? isAllWishlistLoading : isWishlistByGenreLoading;
  const isError = selectedTab === 0 ? isAllWishlistError : isWishlistByGenreError;

  const handleTabClick = useCallback((category: { id: number; name: string }) => {
    setSelectedTab(category.id);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-content">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex justify-center items-center h-content">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  return (
    <>
      <Tabs
        categories={TAB_CATEGORY}
        gap={12}
        className="h-11 py-[6px]"
        onTabClick={handleTabClick}
        activeTab={selectedTab}
      />
      {wishlist && wishlist.length > 0 ? (
        <SectionLayout className="flex flex-col py-4 gap-3">
          {wishlist.map((item) => (
            <Card key={item.wishListId} href={`/performance/${item.performanceId}`} className="w-full">
              <Card.Image src={item.posterUrl} alt={item.performanceName} size="sm" />
              <Card.Content>
                <Card.Category>
                  <Chip label={item.genreName} state="hashTag" />
                </Card.Category>
                <Card.Title>{item.performanceName}</Card.Title>
                <Card.Info svgr={<Location className="fill-gray-400" />} info={item.placeName} />
              </Card.Content>
            </Card>
          ))}
        </SectionLayout>
      ) : (
        <div
          className="flex flex-col justify-center items-center text-gray-600 text-center gap-4"
          style={{ height: "calc(var(--content-height) - 44px)" }}
        >
          <Icon size={40}>
            <LikeGradientDefault width={40} height={40} />
          </Icon>
          저장된 위시리스트가 없습니다.
        </div>
      )}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
