"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = "Voltar" }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="border-gray-150"
      onClick={() => window.history.back()}
    >
      <ArrowLeft />
      {label}
    </Button>
  );
}

export default BackButton;