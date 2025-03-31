import Gap from "@/components/commons/gap";
import "swiper/css";
import "swiper/css/pagination";
import { KakaoInitializer, LoginButton, OnboardingSwiper, Policies } from "./_component";

export default function LoginPage() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-dvh text-white overflow-hidden">
      {/* Kakao SDK 초기화 */}
      <KakaoInitializer />
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-[#FFFFFF] to-[#FFFFFF]"></div>
      {/* 맨 아래 회색 레이어 */}
      <div className="absolute bottom-[-10px] w-[120%] h-[7%] bg-[#a5bcdc] blur-[28px] opacity-75"></div>
      {/* 왼쪽 상단 블러 처리된 원 */}
      <div className="absolute top-[10px] left-[-100px] w-[350px] h-[350px] bg-primary rounded-full blur-[120px] opacity-90 z-10"></div>
      <div className="absolute top-[50px] left-[-15px] w-[600px] h-[600px] bg-primary rounded-full blur-[170px] opacity-50 z-5"></div>

      <Gap vertical size={72} />
      <OnboardingSwiper />
      <LoginButton />
      <Policies />
    </div>
  );
}
