import { fetchWishlist, fetchWishlistByGenre, postAddWishlist, removeFromWishlist } from "@/apis/wishlist-api";
import { ClientWishlist } from "@/types/wishlist";
import { wishlistAdapter } from "@/types/wishlist/adapter/wishlist-adapter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WISHLIST_KEYS } from "../queries";

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
    mutationFn: (performId: string) => removeFromWishlist(performId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.all });
    },
  });
};
