type HashTagsProps = {
  hashTag: string[];
};

export default function FeedHashTags({ hashTag }: HashTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 mx-4 mt-1 mb-4 text-sm text-blue-500">
      {hashTag.map((tag, index) => (
        <span key={index}>#{tag}</span>
      ))}
    </div>
  );
}
