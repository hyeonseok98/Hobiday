import { deleteFromWishlist, fetchWishlist, fetchWishlistByGenre, postAddWishlist } from "@/apis/wishlist-api";
import { ClientWishlist } from "@/types/wishlist";
import { wishlistAdapter } from "@/types/wishlist/adapter/wishlist-adapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PERFORMANCE_KEYS, WISHLIST_KEYS } from "../queries";

// 전체 위시리스트 데이터 조회
export const useAllWishlistQuery = (rowStart: string, rowEnd: string) => {
  return useQuery<ClientWishlist[]>({
    queryKey: [...WISHLIST_KEYS.all, rowStart, rowEnd],
    queryFn: async () => {
      const serverData = await fetchWishlist(rowStart, rowEnd);
      return wishlistAdapter(serverData);
    },
    select: (data) => data || [],
  });
};

// 장르별 위시리스트 데이터 조회
export const useWishlistByGenreQuery = (genre: string) => {
  return useQuery<ClientWishlist[]>({
    queryKey: WISHLIST_KEYS.byGenre(genre),
    queryFn: async () => {
      const serverData = await fetchWishlistByGenre(genre);
      return wishlistAdapter(serverData);
    },
    enabled: !!genre,
    select: (data) => data || [],
  });
};

// 위시리스트 추가
export const useAddWishlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (performId: string) => postAddWishlist(performId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.all });
    },
  });
};

// 위시리스트 삭제
export const useRemoveWishlistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (performId: string) => deleteFromWishlist(performId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.all });
    },
  });
};

// 공연 정보 '위시' 낙관적 업데이트 쿼리
export function useToggleWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (props: { performanceId: string; isCurrentlyLiked: boolean }) => {
      const { performanceId, isCurrentlyLiked } = props;
      return isCurrentlyLiked ? deleteFromWishlist(performanceId) : postAddWishlist(performanceId);
    },

    // 낙관적 업데이트
    onMutate: async ({ performanceId, isCurrentlyLiked }) => {
      // 캐시 무효화 취소(or 대기) → 낙관적 업데이트 간 경쟁 방지
      await queryClient.cancelQueries({ queryKey: [WISHLIST_KEYS.all, performanceId] });

      // 이전 데이터 백업
      const prevWishlistData = queryClient.getQueryData([WISHLIST_KEYS.all, performanceId]);
      const prevPerformanceData = queryClient.getQueryData([...PERFORMANCE_KEYS.all, "detail-all", performanceId]);

      // 위시리스트 캐시 수정
      queryClient.setQueryData([WISHLIST_KEYS.all, performanceId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          isLiked: !oldData.isLiked,
          likeCounts: oldData.likeCounts + (oldData.isLiked ? -1 : 1),
        };
      });

      // 공연 상세 정보 캐시 수정
      queryClient.setQueryData([...PERFORMANCE_KEYS.all, "detail-all", performanceId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          isLiked: !isCurrentlyLiked,
          likeCounts: oldData.likeCounts + (isCurrentlyLiked ? -1 : 1),
        };
      });

      return { prevWishlistData, prevPerformanceData };
    },

    // 에러시 이전 데이터로 롤백
    onError: (error, props, context) => {
      // 위시리스트 데이터 롤백
      if (context?.prevWishlistData) {
        queryClient.setQueryData([WISHLIST_KEYS.all, props.performanceId], context.prevWishlistData);
      }

      // 공연 상세 정보 데이터 롤백
      if (context?.prevPerformanceData) {
        queryClient.setQueryData(
          [...PERFORMANCE_KEYS.all, "detail-all", props.performanceId],
          context.prevPerformanceData,
        );
      }
    },

    // 성공/실패 상관없이 최종 무효화를 통해 서버와 동기화
    onSettled: (data, error, props) => {
      // 특정 공연의 상세 데이터 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [WISHLIST_KEYS.all, props.performanceId] });

      // “전체 위시리스트”도 최신화(wishlist 탭 바로 이동할 경우 대비)
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.all });

      // 공연 정보 최신화
      queryClient.invalidateQueries({ queryKey: [...PERFORMANCE_KEYS.all, "detail-all", props.performanceId] });
    },
  });
}
