import { Search } from "@/assets/svgr-icons";
import { MainLayout } from "@/components/layout";
import TextLogo from "public/img/logo-text.svg";
import Wishlist from "./_components/wishlist";

export default function WishlistPage() {
  const headerProps = {
    leftIcons: [{ icon: <TextLogo />, path: "/" }],
    rightIcons: [{ icon: <Search />, path: "/search", size: 24 }],
  };

  return (
    <MainLayout headerProps={headerProps}>
      <Wishlist />
    </MainLayout>
  );
}
