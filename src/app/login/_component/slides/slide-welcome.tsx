import Gap from "@/components/commons/gap";
import Logo from "../logo";

export default function SlideWelcome() {
  return (
    <div className="w-full px-[28px]">
      <h1 className="font-semibold text-[32px] leading-snug">
        하비데이에 오신걸
        <br /> 환영합니다 :{">"}
      </h1>
      <p className="text-lg font-medium mt-4">3초 가입으로 바로 시작해보세요.</p>
      <Gap vertical size={150} />
      <div className="flex justify-center items-center w-full">
        <Logo />
      </div>
    </div>
  );
}
