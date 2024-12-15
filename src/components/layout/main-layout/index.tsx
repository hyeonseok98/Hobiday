import Header, { HeaderProps } from "@/components/header";
import NavigationBar from "@/components/navigation-bar";
import { PropsWithChildren } from "react";

type MainLayoutProps = PropsWithChildren<{
  headerProps: HeaderProps | null;
  navigationBarVisible?: boolean;
}>;

export default function MainLayout({ children, headerProps, navigationBarVisible = true }: MainLayoutProps) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header {...headerProps} className="sticky top-0 w-full z-header" />
      <main className="flex-1 overflow-y-auto hide-scrollbar mobile-smooth-touch-scrolling bg-white">{children}</main>
      {navigationBarVisible && <NavigationBar className="sticky bottom-0 w-full z-navbar" />}
    </div>
  );
}
