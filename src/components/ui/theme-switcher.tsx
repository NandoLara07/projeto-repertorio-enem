"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { useIsClient } from "@/hooks/use-is-client";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  const isLight = isClient && theme === "light";
  const nextTheme = theme === "light" ? "dark" : "light";
  const label = !isClient
    ? "Trocar tema do site"
    : nextTheme === "dark"
      ? "Mudar para o tema escuro"
      : "Mudar para o tema claro";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(nextTheme)}
      className="rounded-full"
    >
      {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
