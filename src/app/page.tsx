"use client";

import { ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/common/header";

export default function Home() {
  const router = useRouter();

  const goToSearch = () => {
    router.push("/busca", { transitionTypes: ["nav-forward"] });
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <ViewTransition exit="fade-out" default="none">
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
      </ViewTransition>

      <main className="relative z-10 h-full overflow-hidden">
        <Header />

        <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
          <ViewTransition exit="fade-out" default="none">
            <div className="max-w-2xl text-center space-y-8 fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
                Repertór.<span className="text-primary">io</span>
              </h1>
            </div>
          </ViewTransition>

          <ViewTransition exit="fade-out" default="none">
            <p className="text-lg max-w-lg mx-auto leading-relaxed fade-in">
              Encontre o repertório ideal para sua redação do ENEM
            </p>
          </ViewTransition>

          <ViewTransition name="search-textarea">
            <div className="w-full max-w-2xl">
              <Textarea
                onFocus={goToSearch}
                placeholder="Digite o tema..."
                className="min-h-20 text-base resize-none rounded-xl"
              />
            </div>
          </ViewTransition>
        </div>
      </main>
    </div>
  );
}
