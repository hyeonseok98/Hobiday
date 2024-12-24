"use client";

import { updateMyProfile } from "@/apis/user-api";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import Icon from "@/components/commons/icons";
import LoadingSpinner from "@/components/commons/spinner";
import useProfileImageUpload from "@/hooks/user/use-profile-image-upload";
import cn from "@/lib/tailwind-cn";
import { Profile, useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditProfileGenres from "./_components/edit-genres";
import EditProfileImage from "./_components/edit-image";
import EditProfileIntroduction from "./_components/edit-introduction";
import EditProfileName from "./_components/edit-name";
import { useUpdateProfileMutation } from "@/hooks/user/use-profile-update";
import { useQueryClient } from "@tanstack/react-query";
import { PROFILE_KEYS } from "@/hooks/queries";

export default function ProfileEditPage() {
  const { user, setUser } = useUserStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { uploadImage, isLoading: isUploading } = useProfileImageUpload();
  const { mutate: updateProfile } = useUpdateProfileMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  function handleGoBack() {
    router.push("/my");
  }

  if (!user) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  function handleImageSelect(file: File) {
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!selectedImage) {
      alert("사진을 업로드해주세요.");
      return;
    }

    try {
      const uploadedImageUrl = await uploadImage(selectedImage);

      updateProfile(
        { profileImageFilePath: uploadedImageUrl },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.myProfile] });

            alert("업로드 성공");
          },
          onError: () => {
            alert("업로드 실패");
          },
          onSettled: () => {
            // setPreviewUrl(null);
          },
        },
      );
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
            profileImageUrl={previewUrl || user.profileImageUrl}
            onImageSelect={handleImageSelect}
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
