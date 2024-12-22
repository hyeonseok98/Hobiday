import { create } from "zustand";
import { handleApiError } from "@/utils/api-error/error-handler";
import { apiClient } from ".";
import { ENDPOINTS } from "./end-points";

/**
 * @param feedId - 피드 ID
 * @returns 댓글 목록
 */
export const fetchComment = async (feedId: string) => {
  try {
    const response = await apiClient.get(ENDPOINTS.COMMENT.GET(feedId));
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

interface PostCommentData {
  contents: string;
}

/**
 * @param params.feedId - 피드 ID
 * @param params.data - 댓글 데이터
 * @returns 댓글 정보
 */
export const createComment = async (params: { feedId: number; data: PostCommentData }) => {
  try {
    const response = await apiClient.post(ENDPOINTS.COMMENT.CREATE(params.feedId), params.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

interface PutCommentData {
  contents: string;
}

/**
 * @param commentId - 댓글 ID
 * @param data - 댓글 데이터
 * @returns 댓글 정보
 */
export const updateComment = async (params: { commentId: number; data: PutCommentData }) => {
  try {
    const response = await apiClient.put(ENDPOINTS.COMMENT.UPDATE(params.commentId), params.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param commentId - 댓글 ID
 * @returns
 */
export const deleteComment = async (commentId: number) => {
  try {
    const response = await apiClient.delete(ENDPOINTS.COMMENT.DELETE(commentId));
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
