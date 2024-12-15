import Button from "@/components/commons/button";
import { MainLayout } from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

export default function notFound() {
  return (
    <MainLayout headerProps={{ showBackButton: true }} navigationBarVisible={false}>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-var(--header-height))]">
        <div className="animate-fade-in-up">
          <Image src="/img/logo-image.png" alt="logo" width={176.84} height={182.4} priority />
        </div>
        <h1 className="text-center text-2xl font-semibold text-primary">
          404 Error!! <br /> 페이지를 찾을 수 없어요.
        </h1>
        <h2 className="my-3 text-center text-sm font-medium text-gray-600">뒤로가거나 로그인 페이지로 이동해주세요.</h2>
        <Link href="/login">
          <Button variant="primary" size="md">
            로그인 페이지로 이동 →
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}
