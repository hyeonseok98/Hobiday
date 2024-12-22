import Image from "next/image";

interface BackGroundPosterProps {
  posterUrl: string;
  name: string;
}

export default function BackGroundPoster({ posterUrl, name }: BackGroundPosterProps) {
  return (
    <div>
      <div className="relative w-full h-[170px]">
        <Image src={posterUrl} alt={name} fill className="object-cover" />
      </div>
      <div className="absolute inset-0 h-[170px] mt-header bg-black/40" />
      <div className="absolute pl-4" style={{ top: "calc(var(--header-height) + 72px)" }}>
        <Image src={posterUrl} alt={name} className="object-cover rounded-lg" width={144} height={205.76} />
      </div>
    </div>
  );
}
