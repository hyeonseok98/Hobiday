import axios from "axios";
import { useState } from "react";

const useFeedRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  const registerFeed = async (payload: {
    performId: string;
    content: string;
    topic: string;
    hashTags: string[];
    fileUrls: string[];
  }) => {
    setIsLoading(true);
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      console.log(payload);
      const { data } = await axios.post(
        "/api/feeds",
        {
          performId: payload.performId,
          content: payload.content,
          topic: payload.topic,
          fileUrls: payload.fileUrls,
          hashTags: payload.hashTags,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return data;
    } catch (err: any) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { registerFeed, isLoading, error };
};

export default useFeedRegistration;
