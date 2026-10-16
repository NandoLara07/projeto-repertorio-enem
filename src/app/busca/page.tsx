"use client";

import { ViewTransition } from "react";
import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/common/header";
import MicButton from "@/components/common/mic-button";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

export default function Busca() {
  const [EssayTheme, setEssayTheme] = useState("");
  // Text that was already in the field when the microphone was turned on;
  // what is spoken gets appended to it.
  const textBeforeSpeechRef = useRef("");

  const { supported, status, start, stop, abort } = useSpeechRecognition({
    onTranscript: (transcript) =>
      setEssayTheme(
        [textBeforeSpeechRef.current.trimEnd(), transcript]
          .filter(Boolean)
          .join(" "),
      ),
    onError: (message) => toast.error(message, { position: "bottom-left" }),
  });

  const handleMicClick = () => {
    if (status === "listening") {
      stop();
      return;
    }
    textBeforeSpeechRef.current = EssayTheme;
    start();
  };

  const handleSubmit = () => {
    abort();
    window.location.href = `/repertorios?tema=${encodeURIComponent(EssayTheme.trim())}`;
  };

  return (
    <div className="relative min-h-dvh bg-background">
      <Header />

      <main id="conteudo" tabIndex={-1} className="relative z-10 outline-none">

        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 py-(--header-height) text-center">
          <div className="text-center space-y-2 fade-in">
            <h1 className="text-3xl font-bold text-foreground">
              Qual é o tema da redação?
            </h1>
            <p className="text-base text-muted-foreground">
              Digite o tema e encontraremos os melhores repertórios
              socioculturais.
            </p>
          </div>
          <ViewTransition name="search-textarea">
            <div className="relative w-full max-w-2xl">
              <Textarea
                aria-label="Tema da redação"
                autoFocus
                value={EssayTheme}
                onChange={(e) => {
                  // Typing takes over from the microphone.
                  if (status === "listening") abort();
                  setEssayTheme(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && EssayTheme.trim()) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Informe o tema..."
                className="min-h-30 text-base resize-none rounded-xl pb-14 shadow-md"
              />
              {supported && (
                <MicButton
                  status={status}
                  onClick={handleMicClick}
                  className="absolute bottom-3 right-14"
                />
              )}
              <button
                type="button"
                disabled={!EssayTheme.trim()}
                onClick={handleSubmit}
                aria-label="Buscar repertório"
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-accent/50 rounded-xl p-4 mt-5 text-sm text-accent-foreground max-w-150">
              <strong>Dica:</strong> Quanto mais completo, melhores serão as
              recomendações. Tente incluir palavras-chave específicas.
            </div>
            <div>
              <div>
                <p className="text-sm text-muted-foreground mt-3">
                  Ou se quiser, clique aqui para ver todos os repertórios.
                </p>
              </div>
              <div>
                <Button
                  className="mt-3 pr-2 pl-2 pt-5 pb-5 text-xs shadow-md"
                  onClick={() =>
                    (window.location.href = "/repertorios?tema=@all")
                  }
                >
                  SELECIONAR TODOS
                </Button>
              </div>
            </div>
          </ViewTransition>
        </div>
      </main>
    </div>
  );
}
