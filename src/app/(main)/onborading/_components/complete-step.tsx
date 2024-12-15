"use client";

import Button from "@/components/commons/button";
import Image from "next/image";
import Link from "next/link";

export default function CompleteStep() {
  // const { nickname, categories, resetOnboarding } = useOnboardingStore();
  // const [isRegistered, setIsRegistered] = useState<"success" | "error" | "loading">("loading");

  // const { mutate } = useProfileRegistration();

  // useEffect(() => {
  //   if (nickname && categories.length > 0) {
  //     mutate(
  //       { profileNickname: nickname, profileGenres: categories },
  //       {
  //         onSuccess: () => {
  //           console.log("프로필 등록 성공!");
  //           setIsRegistered("success");
  //           resetOnboarding();
  //         },
  //         onError: (error) => {
  //           console.error("프로필 등록 실패:", error);
  //           setIsRegistered("error");
  //         },
  //       },
  //     );
  //   }
  // }, [mutate, nickname, categories, resetOnboarding]);

  return (
    <section className="relative flex flex-col justify-center items-center h-[calc(100vh-var(--header-height))] overflow-hidden">
      <div
        className="absolute w-[350px] h-[350px] top-[40px] left-[-50px] rounded-full opacity-90 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(177,249,243,0.9) 0%, rgba(177,249,243,0) 100%)",
        }}
      />
      <div
        className="absolute w-[630px] h-[630px] left-[10px] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(94,80,244,0.8) 0%, rgba(94,80,244,0) 100%)",
        }}
      />
      <div
        className="absolute w-[320px] h-[320px] right-[5px] rounded-full opacity-80 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(94,80,244,0.85) 0%, rgba(94,80,244,0) 100%)",
        }}
      />

      {/* {isRegistered === "loading" && <p className="text-white text-lg animate-pulse z-10">등록 중입니다...</p>} */}

      {/* 성공 화면 */}
      {/* {isRegistered === "success" && ( */}
      <>
        <div className="animate-fade-in-up z-10">
          <Image src="/img/logo-image.png" alt="가입 성공" width={176.84} height={182.4} priority />
        </div>
        <h1 className="mt-6 text-center text-[32px] font-semibold leading-snug text-white animate-fade-in-up z-10">
          {/* <span className="text-primary">{nickname}</span>님, */}
          <span className="text-primary">Hobiday</span>님,
          <br />
          가입을 축하합니다!
        </h1>
        <div className="absolute bottom-[50px] w-full px-[23px] animate-fade-in-up">
          <Link href="/" className="block">
            <Button variant="primary" size="lg" fullWidth>
              Hobiday 둘러보기
            </Button>
          </Link>
        </div>
      </>
      {/* )} */}

      {/* 프로필 등록 실패 화면 */}
      {/* {isRegistered === "error" && (
        <>
          <h1 className="text-center text-[32px] font-semibold leading-snug text-red-500 animate-fade-in-up z-10">
            등록에 실패했습니다.
          </h1>
          <p className="text-gray-400 mt-2 z-10">다시 시도하거나 로그인 페이지로 돌아가세요.</p>
          <div className="absolute bottom-[50px] w-full px-[23px] animate-fade-in-up">
            <Link href="/login" className="block">
              <Button variant="primary" size="lg" fullWidth>
                로그인으로 돌아가기
              </Button>
            </Link>
          </div>
        </>
      )} */}
    </section>
  );
}
