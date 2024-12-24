import axios from "axios";
import { useState } from "react";

interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<string>; // 서버에 저장된 파일 URL 반환
  isLoading: boolean;
  error: string | null;
}

const useProfileImageUpload = (): UseImageUploadReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);

      const accessToken = getAccessToken();

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // 1. Presigned URL 요청
      const { data } = await axios.post(
        "/api/profiles/image",
        {
          prefix: file.type,
          fileName: file.name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const { url: presignedUrl, filePath: fileUrl } = data.result;

      if (!presignedUrl) {
        console.error("Presigned URL is undefined");
        throw new Error("Failed to retrieve presigned URL from server.");
      }

      // 2. Presigned URL로 파일 업로드
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // 3. 파일 업로드 성공 시 서버에 저장된 파일 URL 반환
      return fileUrl;
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    isLoading,
    error,
  };
};

export default useProfileImageUpload;
