"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  textToCopy: string;
  // Distinguishes this button from other "Copiar" buttons on the same page.
  label?: string;
}

export default function CopyButton({ textToCopy, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Texto copiado para a área de transferência!", {
        position: "bottom-left",
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (

    <Button
      className="w-full"
      aria-label={copied ? undefined : label}
      onClick={handleCopy}
      disabled={copied}
    >
      {copied ? (
        <>
          <Check />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" />
          Copiar
        </>
      )}
    </Button>
  );
}
