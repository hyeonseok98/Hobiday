"use client";

import cn from "@/lib/tailwind-cn";
import Icon from "@/components/commons/icons";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import { useRouter } from "next/navigation";
import EditProfileImage from "./_components/edit-image";
import EditProfileName from "./_components/edit-name";
import EditProfileIntroduction from "./_components/edit-introduction";
import EditProfileGenres from "./_components/edit-genres";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "@/components/commons/spinner";
import { useState } from "react";
import useProfileImageUpload from "@/hooks/user/use-profile-image-upload";
import { updateMyProfile } from "@/apis/user-api";

export default function ProfileEditPage() {
  const { user, setUser } = useUserStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { uploadImage, isLoading: isUploading } = useProfileImageUpload();
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  if (!user) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  async function handleUpload() {
    if (!selectedImage) {
      alert("사진을 업로드해주세요.");
      return;
    }

    try {
      const uploadedUrl = await uploadImage(selectedImage);
      console.log("업로드 성공");
      console.log("uploadedUrl: ", uploadedUrl);
      const currentUser = useUserStore.getState().user;
      if (!currentUser) {
        console.error("User is null. Cannot update profileImageUrl.");
        return;
      }

      setUser({
        ...currentUser,
        profileImageUrl: uploadedUrl,
      });

      await updateMyProfile({ profileImageFilePath: uploadedUrl });

      alert("업로드 성공");
      router.push("/my");
    } catch (err) {
      console.error("업로드 실패", err);
    }
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="bg-flat min-h-screen flex flex-col">
        <header
          className={cn(
            "relative flex items-center justify-between w-full h-header px-4 py-2 bg-white border-b border-b-gray-100",
          )}
        >
          <div className="flex items-center justify-start space-x-2">
            <Icon onClick={handleGoBack} size={24} className="cursor-pointer">
              <ArrowBack />
            </Icon>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-center">
            <h2>프로필 관리</h2>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button type="submit" onClick={handleUpload} className="text-primary font-semibold text-sm cursor-pointer">
              저장
            </button>
          </div>
        </header>
        <div className="w-full mb-1">
          <EditProfileImage
            profileImageUrl={user.profileImageUrl}
            onImageSelect={(file: File) => setSelectedImage(file)}
            profileNickname={user.profileNickname}
          />
          <EditProfileName profileNickname={user.profileNickname} />
          <EditProfileIntroduction profileIntroduction={user.profileIntroduction} />
          <EditProfileGenres profileGenres={user.profileGenres} />
        </div>
      </div>
    </div>
  );
}
