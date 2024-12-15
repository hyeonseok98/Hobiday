import NavigationBar from "@/components/navigation-bar";
import SearchBar from "@/components/search-bar";
import { PropsWithChildren } from "react";

export default function SearchLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <SearchBar className="sticky top-0 w-full z-header" />
      <main className="flex-1 overflow-y-auto hide-scrollbar mobile-smooth-touch-scrolling bg-white">{children}</main>
      <NavigationBar className="sticky bottom-0 w-full z-navbar" />
    </div>
  );
}
