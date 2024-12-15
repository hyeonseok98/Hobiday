"use client";

import Icon from "@/components/commons/icon";
import Image from "next/image";
import { useState } from "react";
import PlusCircle from "src/assets/icons/plus-circle.svg";

export default function ImageUploader() {
  const [photos, setPhotos] = useState<File[]>([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (photos.length + selectedFiles.length > 3) {
        alert("사진은 최대 3장까지 업로드 가능합니다.");
        return;
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...selectedFiles]);
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
            <Image src={URL.createObjectURL(photo)} alt={`Preview ${index + 1}`} fill className="object-cover" />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-1 right-1 text-black w-5 h-5 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
