"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useAccessibility } from "@/hooks/use-accessibility";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { enabled: accessibility } = useAccessibility();

  return (
    <NextThemesProvider
      {...props}
      // The accessibility mode is styled on top of the light base, so no `dark:`
      // utility leaks into it. forcedTheme doesn't overwrite the saved choice,
      // which is what the site returns to when the mode is turned off.
      forcedTheme={accessibility ? "light" : props.forcedTheme}
    >
      {children}
    </NextThemesProvider>
  );
}
