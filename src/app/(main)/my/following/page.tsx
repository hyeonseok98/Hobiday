import { MainLayout } from "@/components/layout";
import React from "react";
import FollowingList from "./_components";

export default function FollowingPage() {
  const headerProps = {
    showBackButton: true,
    title: "팔로잉",
  };

  return (
    <MainLayout headerProps={headerProps}>
      <FollowingList />
    </MainLayout>
  );
}
