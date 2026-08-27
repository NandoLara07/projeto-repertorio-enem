"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const FIXED_LAYOUT_ROUTES = new Set(["/", "/busca"]);

export default function ScrollbarGutterController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const isFixedLayoutRoute = FIXED_LAYOUT_ROUTES.has(pathname);
    document.documentElement.classList.toggle(
      "no-scrollbar-gutter",
      isFixedLayoutRoute,
    );
  }, [pathname]);

  return null;
}
