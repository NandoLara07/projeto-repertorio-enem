"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { useIsClient } from "@/hooks/use-is-client";
import {
  disableAccessibility,
  useAccessibility,
} from "@/hooks/use-accessibility";

export default function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { enabled: accessibility } = useAccessibility();
  const isClient = useIsClient();

  const isLight = isClient && theme === "light";
  const nextTheme = theme === "light" ? "dark" : "light";

  // In accessibility mode this button leaves the mode and returns to the
  // saved theme instead of switching it
  const savedIsDark = resolvedTheme === "dark";
  let label = "Trocar tema do site";
  if (isClient && accessibility) {
    label = `Sair do modo de acessibilidade e voltar ao tema ${savedIsDark ? "escuro" : "claro"}`;
  } else if (isClient) {
    label =
      nextTheme === "dark"
        ? "Mudar para o tema escuro"
        : "Mudar para o tema claro";
  }

  // The icon shows where a click leads
  const showMoon = accessibility ? savedIsDark : isLight;

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() =>
        accessibility ? disableAccessibility() : setTheme(nextTheme)
      }
      className="rounded-full"
    >
      {showMoon ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
