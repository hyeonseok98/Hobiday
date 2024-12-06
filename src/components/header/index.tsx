import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  return <header className="w-full h-[56px] border border-transparent border-b-gray-100">{children}</header>;
}
