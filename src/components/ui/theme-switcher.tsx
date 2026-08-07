"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { useIsClient } from "@/hooks/use-is-client";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  const isLight = isClient && theme === "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Trocar tema do site"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
    >
      {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
