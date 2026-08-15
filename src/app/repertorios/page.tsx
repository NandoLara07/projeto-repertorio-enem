"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/header";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RepertoriosData } from "@/db/repertorios";
import { RepertorioCard } from "@/components/ui/repertoriocard";

function RepertoriosContent() {
  const searchParams = useSearchParams();
  const tema = searchParams.get("tema");

  return (
    <div className="">
      <p className="text-sm text-muted-foreground mb-1">Tema pesquisado:</p>
      <h1 className="text-xl font-bold text-foreground">&quot;{tema}&quot;</h1>
    </div>
  );
}

export default function Repertorios() {
  // mudar dps quando tiver o mecanismo de busca funcionando
  const recommendedIds = RepertoriosData.map((r) => r.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-8 pt-[calc(9dvh+2rem)]">
        <div className="max-w-5xl mx-auto space-y-6 fade-in">
          <div>
            <Button
              variant="ghost"
              size="lg"
              className="border-gray-150"
              onClick={() => window.history.back()}
            >
              <ArrowLeft />
              Voltar
            </Button>
          </div>
          <div>
            <Suspense
              fallback={
                <div className="space-y-2">
                  <Skeleton className="h-8 w-64 mx-auto" />
                  <Skeleton className="h-4 w-40 mx-auto" />
                </div>
              }
            >
              <RepertoriosContent />
            </Suspense>
            <p className="text-sm text-muted-foreground mt-2">
              {recommendedIds.length} Repertórios encontrados
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recommendedIds.map((id, index) => {
              const repertorio = RepertoriosData.find((r) => r.id === id);
              if (!repertorio) return null;

              return (
                <RepertorioCard
                  key={repertorio.id}
                  repertorio={repertorio}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

{
  /* <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
                <Suspense
                  fallback={
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-64 mx-auto" />
                      <Skeleton className="h-4 w-40 mx-auto" />
                    </div>
                  }
                >
                  <RepertoriosContent />
                </Suspense>
              </div> */
}
