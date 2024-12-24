import Image from "next/image";
import Link from "next/link";

export default function NoFeedSection() {
  return (
    <div className="w-full max-w-md p-6 mt-6">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <Image src="/img/pencil-3d.png" alt="pencil-3d" width={80} height={80} />
        </div>
        <h2 className="font-semibold text-center mb-2">당신의 문화생활에 대해 알려주세요!</h2>
        <p className="text-sm text-center mb-4">당신의 문화생활을 기록하고 당신의 취향을 확인해보세요.</p>
        <Link
          href="/feed/upload"
          className="px-3 py-2 w-28 text-center bg-blue-500 text-white text-sm rounded-lg shadow-lg bg-gradient-to-br from-secondary to-primary to-80%"
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
}
