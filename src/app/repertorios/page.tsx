"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/header";
import { Skeleton } from "@/components/ui/skeleton";

function RepertoriosContent() {
  const searchParams = useSearchParams();
  const tema = searchParams.get("tema");

  return (
    <div className="text-center space-y-2 fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        Lista dos Repertórios
      </h1>
      <p className="text-muted-foreground">vc digitou: {tema}</p>
    </div>
  );
}

export default function Repertorios() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <main className="relative z-10 h-full overflow-hidden">
        <Header />
        <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
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
        </div>
      </main>
    </div>
  );
}
