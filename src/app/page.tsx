"use client";

import { useState } from "react";
import { ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/common/header";
import Typewriter from "typewriter-effect";
import { asset } from "@/lib/paths";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");

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
            poster={asset("/background/background-poster.png")}
          >
            <source
              src={asset("/background/background-loop.webm")}
              type="video/webm"
            />
            <source
              src={asset("/background/background-loop.mp4")}
              type="video/mp4"
            />
          </video>
        </div>
      </ViewTransition>

      <main className="relative z-10 h-full overflow-hidden">
        <Header />

        <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
          <ViewTransition exit="fade-out" default="none">
            <div className="max-w-2xl text-center space-y-8 fade-in">
              <h1 className="text-6xl lg:text-7xl font-extrabold text-foreground leading-tight tracking-tight">
                Repertór.<span className="text-primary">io</span>
              </h1>
            </div>
          </ViewTransition>

          <ViewTransition exit="fade-out" default="none">
            <div>
              <p className="text-xl md:text-lg max-w-lg mx-auto leading-relaxed fade-in">
                Encontre o repertório ideal para sua redação do ENEM
              </p>
            </div>
          </ViewTransition>

          <ViewTransition name="search-textarea">
            <div className="w-full max-w-2xl relative">
              {!value && (
                <span className="text-2xl md:text-base absolute left-3 top-3 pointer-events-none text-gray-500">
                  <Typewriter
                    component="div"
                    options={{
                      strings: [
                        "Digite um tema de redação...",
                        "Ex: Desafios para a valorização da herança africana no Brasil",
                        "Ou informe algumas palavras-chave...",
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 15,
                      delay: 100,
                    }}
                  />
                </span>
              )}

              <Textarea
                onFocus={goToSearch}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                // placeholder="Digite o tema..."
                className="min-h-40 text-lg md:min-h-20 md:text-base resize-none rounded-xl shadow-lg"
              />
            </div>
          </ViewTransition>
        </div>
      </main>
    </div>
  );
}
