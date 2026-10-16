import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  SpeechRecognitionConstructor,
  SpeechRecognitionErrorCode,
  SpeechRecognitionInstance,
  SpeechRecognitionWindow,
} from "@/types/speech-recognition";

export type SpeechStatus = "idle" | "listening" | "stopped";

const ERROR_MESSAGES: Partial<Record<SpeechRecognitionErrorCode, string>> = {
  "not-allowed":
    "O acesso ao microfone foi negado. Libere o microfone nas permissões do navegador.",
  "service-not-allowed":
    "O acesso ao microfone foi negado. Libere o microfone nas permissões do navegador.",
  "audio-capture":
    "Não encontramos um microfone. Verifique se ele está conectado.",
  "no-speech": "Não ouvimos nada. Tente falar de novo.",
  network:
    "O reconhecimento de voz precisa de internet. Verifique sua conexão.",
  "language-not-supported":
    "Seu navegador não reconhece português por voz.",
};

const emptySubscribe = () => () => {};

function getRecognitionConstructor(): SpeechRecognitionConstructor | undefined {
  const speechWindow = window as unknown as SpeechRecognitionWindow;
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

interface UseSpeechRecognitionOptions {
  lang?: string;
  // Receives everything recognized so far in the current session, so each
  // call replaces the previous (interim) one.
  onTranscript: (transcript: string) => void;
  onError?: (message: string) => void;
}

export function useSpeechRecognition({
  lang = "pt-BR",
  onTranscript,
  onError,
}: UseSpeechRecognitionOptions) {
  // False on the server and during hydration, so markup never mismatches.
  const supported = useSyncExternalStore(
    emptySubscribe,
    () => getRecognitionConstructor() !== undefined,
    () => false,
  );
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Handlers registered once per session must still call the latest callbacks.
  const callbacksRef = useRef({ onTranscript, onError });
  useEffect(() => {
    callbacksRef.current = { onTranscript, onError };
  });

  const start = useCallback(() => {
    const Recognition = getRecognitionConstructor();
    if (!Recognition || recognitionRef.current) return;

    const recognition = new Recognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setStatus("listening");
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
        .trim();
      callbacksRef.current.onTranscript(transcript);
    };
    recognition.onerror = (event) => {
      const message = ERROR_MESSAGES[event.error];
      if (message) callbacksRef.current.onError?.(message);
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setStatus("stopped");
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
    }
  }, [lang]);

  // Lets the last words be recognized before ending.
  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  // Ends right away, discarding anything still pending.
  const abort = useCallback(() => {
    recognitionRef.current?.abort();
  }, []);

  useEffect(() => {
    return () => {
      const recognition = recognitionRef.current;
      if (!recognition) return;
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.abort();
    };
  }, []);

  return { supported, status, start, stop, abort };
}
