"use client";

import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/common/header";
import { useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("");

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          className="h-full w-full object-cover object-bottom"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
          poster="/background/background-poster.png"
        >
          <source src="/background/background-loop.webm" type="video/webm" />
          <source src="/background/background-loop.mp4" type="video/mp4" />
        </video>
      </div>

      <main className="relative z-10 h-full overflow-hidden">
        <Header />

        <div className="fade-in flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
          <div className="max-w-2xl text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              Repertór.<span className="text-primary">io</span>
            </h1>
          </div>
          <p className="text-lg max-w-lg mx-auto leading-relaxed">
            Encontre o repertório ideal para sua redação do ENEM
          </p>
          <div className="w-full max-w-2xl">
            <Textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Digite o tema..."
              className="min-h-20 text-base resize-none rounded-xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
