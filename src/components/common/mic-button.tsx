import { Mic, Square } from "lucide-react";
import type { SpeechStatus } from "@/hooks/use-speech-recognition";
import { cn } from "@/lib/utils";

const STATUS_MESSAGES: Record<SpeechStatus, string> = {
  idle: "",
  listening: "Ouvindo. Fale o tema da redação.",
  stopped: "Microfone desligado.",
};

interface MicButtonProps {
  status: SpeechStatus;
  onClick: () => void;
  className?: string;
}

export function MicButton({ status, onClick, className }: MicButtonProps) {
  const listening = status === "listening";

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={listening ? "Parar de ouvir" : "Falar o tema"}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          listening
            ? "border-transparent bg-destructive text-white"
            : "border-input bg-background text-foreground hover:bg-muted",
          className,
        )}
      >
        {listening && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-destructive/40 motion-safe:animate-ping"
          />
        )}
        {listening ? (
          <Square className="relative h-4 w-4 fill-current" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </button>
      <span role="status" className="sr-only">
        {STATUS_MESSAGES[status]}
      </span>
    </>
  );
}

export default MicButton;
