import { CommentData, CommentDataResponse } from "@/types/comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { COMMENT_KEYS } from "../queries";
import { createComment, deleteComment, fetchComment, updateComment } from "@/apis/comment-api";

// 해당 피드의 모든 댓글 조회
export const useAllCommentQuery = (feedId: number) => {
  return useQuery<CommentDataResponse[]>({
    queryKey: [...COMMENT_KEYS.all, feedId],
    queryFn: async () => {
      const data = await fetchComment(feedId);
      return data;
    },
    select: (data) => data || [],
  });
};

// 댓글 추가
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedId, data }: { feedId: number; data: CommentData }) => createComment({ feedId, data }),
    onMutate: async ({ feedId, data }) => {
      // 기존 쿼리 취소 → 낙관적 업데이트 충돌 방지
      await queryClient.cancelQueries({ queryKey: [...COMMENT_KEYS.all, feedId] });

      // 이전 데이터 백업
      const prevCommentData = queryClient.getQueryData<CommentData[]>([...COMMENT_KEYS.all, feedId]);

      // 낙관적 업데이트
      if (prevCommentData) {
        queryClient.setQueryData<CommentData[]>([...COMMENT_KEYS.all, feedId], [...prevCommentData, { ...data }]);
      }

      return { prevCommentData };
    },

    // 에러 발생 시 롤백
    onError: (error, { feedId }, context) => {
      if (context?.prevCommentData) {
        queryClient.setQueryData<CommentData[]>([...COMMENT_KEYS.all, feedId], context.prevCommentData);
      }
    },

    onSettled: (data, error, { feedId }) => {
      queryClient.invalidateQueries({ queryKey: [...COMMENT_KEYS.all, feedId] });
    },
  });
};

// 댓글 수정
export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (parms: { commentId: number; data: CommentData }) => {
      const response = await updateComment(parms);
      return response;
    },
    onMutate: async ({ commentId, data }) => {
      // 기존 쿼리 취소 → 낙관적 업데이트 충돌 방지
      await queryClient.cancelQueries({ queryKey: [...COMMENT_KEYS.all] });

      // 이전 데이터 백업
      const prevCommentData = queryClient.getQueryData<CommentData[]>([...COMMENT_KEYS.all]);

      // 낙관적 업데이트
      if (prevCommentData) {
        queryClient.setQueryData<CommentData[]>([...COMMENT_KEYS.all], (prevCommentData) =>
          prevCommentData?.map((comment) => (commentId === commentId ? { ...comment, ...data } : comment)),
        );
      }

      return { prevCommentData };
    },

    // 에러 발생 시 롤백
    onError: (error, { commentId }, context) => {
      if (context?.prevCommentData) {
        queryClient.setQueryData<CommentData[]>([...COMMENT_KEYS.all], context.prevCommentData);
      }
    },

    onSettled: (data, error, { commentId }) => {
      queryClient.invalidateQueries({ queryKey: [...COMMENT_KEYS.all] });
    },
  });
};

// 댓글 삭제
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_KEYS.all });
    },
  });
};
