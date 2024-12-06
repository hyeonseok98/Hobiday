import Image from "next/image";

type IconProps = {
  icon: string;
  alt: string;
  size?: number;
  onClick?: () => void;
};

export default function Icon({ icon, size = 24, alt = "icon", onClick }: IconProps) {
  return (
    <div className="flex justify-center items-center w-6 h-6" onClick={onClick}>
      <Image src={icon} width={size} height={size} alt={alt} />
    </div>
  );
}
