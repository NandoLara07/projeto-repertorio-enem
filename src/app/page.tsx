"use client";

import { useState } from "react";
import { ViewTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/common/header";
import Typewriter from "typewriter-effect";
import { asset } from "@/lib/paths";
import { useTheme } from "next-themes";
import { useIsClient } from "@/hooks/use-is-client";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { resolvedTheme } = useTheme();
  const isClient = useIsClient();

  const goToSearch = () => {
    router.push("/busca", { transitionTypes: ["nav-forward"] });
  };

  const isDark = isClient && resolvedTheme === "dark";

  const backgroundWebm = isDark
    ? asset("/background/dark/background-dark.webm")
    : asset("/background/light/background-light.webm");

  const backgroundMp4 = isDark
    ? asset("/background/dark/background-dark.mp4")
    : asset("/background/light/background-light.mp4");

  const backgroundPoster = isDark
    ? asset("/background/dark/background-dark-poster.png")
    : asset("/background/light/background-light-poster.png");

  return (
    <div className="fixed inset-0 overflow-hidden">
      <ViewTransition exit="fade-out" default="none">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <video
            key={isDark ? "dark" : "light"}
            className="h-full w-full object-cover object-bottom"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            preload="auto"
            poster={backgroundPoster}
          >
            <source src={backgroundWebm} type="video/webm" />
            <source src={backgroundMp4} type="video/mp4" />
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
            <div>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed fade-in">
                Encontre o repertório ideal para sua redação do ENEM
              </p>
            </div>
          </ViewTransition>

          <ViewTransition name="search-textarea">
            <div className="w-full max-w-2xl relative text-left">
              {!value && (
                <span className="absolute left-3 top-3 pointer-events-none text-gray-500">
                  <Typewriter
                    component="div"
                    options={{
                      strings: [
                        "Digite um assunto, tema ou proposta de redação...",
                        "Ex: Desafios para a valorização da herança africana no Brasil",
                        "Ex: Educação",
                        "Ex: Violência",
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
                className="min-h-20 md:text-base resize-none rounded-xl shadow-lg"
              />
            </div>
          </ViewTransition>
        </div>
      </main>
    </div>
  );
}
