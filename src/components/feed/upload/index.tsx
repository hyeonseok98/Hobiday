"use client";

import ImageUploader from "@/app/(main)/feed/upload/_component/image-uploader";
import TextInput from "@/app/(main)/feed/upload/_component/text-input";
import AddInfo from "@/app/(main)/feed/upload/_component/add-info";
import HashtagInput from "@/app/(main)/feed/upload/_component/hashtag-input";
import SelectCategory from "@/app/(main)/feed/upload/_component/category";
import useUploadTextStore from "@/stores/useUploadTextStore";

export default function UploadPage() {
  const { performId, content, category, hashTags, fileUrls, setCategory, setHashTags, setFileUrls } =
    useUploadTextStore();

  function handleAddHashTags(tags: string[]) {
    setHashTags([...hashTags, ...tags]);
  }

  function handleRemoveHashTag(tag: string) {
    setHashTags(hashTags.filter((t) => t !== tag));
  }

  // 피드 작성 API 호출

  return (
    <div className="bg-white">
      <SelectCategory />
      <ImageUploader />
      <TextInput />
      <HashtagInput onAddHashTags={handleAddHashTags} onRemoveHashTag={handleRemoveHashTag} />
      <AddInfo />
    </div>
  );
}
