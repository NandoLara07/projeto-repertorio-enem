"use client";

import { ViewTransition } from "react";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/common/header";

export default function Busca() {
  const [theme, setTheme] = useState("");

  const handleSubmit = () => {
    window.location.href = "/repertorios";
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <main className="relative z-10 h-full overflow-hidden">
        <Header />

        <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="text-center space-y-2 fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Qual é o tema da redação?
            </h1>
            <p className="text-muted-foreground">
              Digite o tema e encontraremos os melhores repertórios
              socioculturais.
            </p>
          </div>
          <ViewTransition name="search-textarea">
            <div className="relative w-full max-w-2xl">
              <Textarea
                autoFocus
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && theme.trim()) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Informe o tema..."
                className="min-h-40 text-base resize-none rounded-xl pb-14"
              />
              <button
                type="button"
                disabled={!theme.trim()}
                onClick={handleSubmit}
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </ViewTransition>
        </div>
      </main>
    </div>
  );
}
