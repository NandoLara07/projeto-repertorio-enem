"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/header";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Funnel, X } from "lucide-react";
import { RepertoriosData } from "@/db/repertorios";
import {
  RepertorioCard,
  typeLabels,
  typeIcons,
} from "@/components/ui/repertoriocard";
import { Repertorio } from "@/types/repertorio";
import { buscarRepertorios } from "@/lib/busca-repertorios";

const allTypes = Object.keys(typeLabels) as Repertorio["type"][];

const selectItems: Record<Repertorio["type"] | "todos", string> = {
  todos: "Todos os tipos",
  ...typeLabels,
};

function RepertoriosContent() {
  const searchParams = useSearchParams();
  const tema = searchParams.get("tema") ?? "";

  const recommended = useMemo(() => buscarRepertorios(tema), [tema]);

  const [selectedType, setSelectedType] = useState<
    Repertorio["type"] | "todos"
  >("todos");

  const filtered =
    selectedType === "todos"
      ? recommended
      : recommended.filter(
          (item) =>
            RepertoriosData.find((r) => r.id === item.id)?.type ===
            selectedType,
        );

  const hasFilters = selectedType !== "todos";

  return (
    <div>
      <div>
        {tema !== "@all" ? (
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Tema pesquisado:
            </p>
            <h1 className="text-xl font-bold text-foreground">
              &quot;{tema}&quot;
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Todos os repertórios
            </h1>
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          {filtered.length == 1
            ? `${filtered.length} Repertório encontrado`
            : `${filtered.length} Repertórios encontrados`}
        </p>

        {recommended.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Funnel className="h-4 w-4 text-muted-foreground" />
            <Select
              items={selectItems}
              value={selectedType}
              onValueChange={(value) =>
                setSelectedType(value as Repertorio["type"] | "todos")
              }
            >
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                {allTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {typeIcons[type]} {typeLabels[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedType("todos")}
              >
                <X /> Limpar
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6 theme-transition-off">
        {recommended.length === 0 ? (
          <div className="col-span-full text-center py-12 space-y-2">
            <p className="text-foreground font-medium">
              Nenhum repertório recomendado encontrado.
            </p>
            <p className="text-sm text-muted-foreground">
              Tente pesquisar por outro tema.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 space-y-3">
            <p className="text-foreground font-medium">
              Nenhum repertório desse tipo entre os recomendados.
            </p>
            <p className="text-sm text-muted-foreground">
              Tente mudar o filtro ou removê-lo.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedType("todos")}
            >
              <X /> Remover filtro
            </Button>
          </div>
        ) : (
          filtered.map((item, index) => {
            const repertorio = RepertoriosData.find((r) => r.id === item.id);
            if (!repertorio) return null;

            return (
              <RepertorioCard
                key={repertorio.id}
                repertorio={repertorio}
                index={index}
                relevance={item.relevance}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default function Repertorios() {
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
