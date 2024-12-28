"use client";

import Icon from "@/components/commons/icons";
import Toast from "@/components/commons/toast";
import useUploadTextStore from "@/stores/useUploadTextStore";
import Image from "next/image";
import { useState } from "react";
import PlusCircle from "src/assets/icons/plus-circle.svg";

export default function ImageUploader() {
  const { photos, setPhotos } = useUploadTextStore();
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (photos.length + selectedFiles.length > 3) {
        setToast({ type: "Error", message: "사진은 최대 3장까지 업로드 가능합니다." });
        return;
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...selectedFiles]);
      console.log(photos);
      console.log(setPhotos);
    }
  }

  function handleRemovePhoto(index: number) {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  }

  return (
    <div className="flex items-center m-4 gap-3">
      <label className="flex items-center justify-center w-[72px] h-[72px] bg-gray-400 cursor-pointer">
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
        <span className="text-gray-400">
          <Icon size={24}>
            <PlusCircle />
          </Icon>
        </span>
      </label>
      <div className="flex gap-3">
        {photos.map((photo, index) => (
          <div key={index} className="relative w-[72px] h-[72px]">
            <Image
              src={photo instanceof File ? URL.createObjectURL(photo) : photo}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover"
            />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-1 right-1 text-black w-5 h-5 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
