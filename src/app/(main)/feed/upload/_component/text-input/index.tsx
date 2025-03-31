import useUploadTextStore from "@/stores/use-upload-text.store";
import { useRef } from "react";

export default function TextInput() {
  const { content, setContent } = useUploadTextStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      let scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight + 110} px`;
    }
  }

  return (
    <div className="border-b border-b-gray-100">
      <textarea
        placeholder={`오늘 공연은 어땠나요? 공연에 대한 생각을 알려주세요.\n(사진은 최대 3장까지, 내용은 10자 ~ 2,200자까지 작성 가능합니다.)`}
        value={content}
        maxLength={2200}
        onChange={handleContentChange}
        className="w-full min-h-24 text-xs px-4 border-none placeholder-gray-500 focus:outline-none resize-none"
      />

      <div className="flex justify-end">
        <span className="text-right text-gray-500 text-xs">{content.length} / 2200</span>
      </div>
    </div>
  );
}
