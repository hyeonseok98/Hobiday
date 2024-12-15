"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Action = () => void;

export const useShallowRouting = (pathnames: string[], actions: Action[]) => {
  const currentPathname = usePathname();

  useEffect(() => {
    const index = pathnames.findIndex((pathname) => new RegExp(pathname).test(currentPathname));

    if (index !== -1) {
      actions[index]();
    }
  }, [currentPathname, pathnames, actions]);
};
