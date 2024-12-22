import SvgPlusCircle from "@/assets/svgr-icons/PlusCircle";
import { useState } from "react";

interface ProfileImageProps {
  profileImageUrl: string;
  onImageSelect: (file: File) => void;
  profileNickname: string;
}

export default function EditProfileImage({ profileImageUrl, onImageSelect, profileNickname }: ProfileImageProps) {
  const [preview, setPreview] = useState<string>(profileImageUrl);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
      setPreview(URL.createObjectURL(file));

      onImageSelect(file);
    }
  }

  return (
    <>
      {/* 프로필 이미지 */}
      <div className="w-full bg-white px-4 py-6 mb-1">
        <div className="flex mb-8">
          <label className="w-20 h-20 flex items-center justify-center relative cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <img
              src={profileImageUrl || preview}
              alt="프로필 이미지"
              className="w-full h-full object-cover rounded-full"
            />
            <span className="absolute right-0 bottom-0 bg-white rounded-full p-1">
              <SvgPlusCircle />
            </span>
          </label>
        </div>
        {/* 닉네임*/}
        <div>
          <h2 className="font-semibold">{profileNickname}</h2>
        </div>
      </div>
    </>
  );
}
