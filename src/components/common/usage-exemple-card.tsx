import { Repertorio } from "@/types/repertorio";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Lightbulb, PenLine } from "lucide-react";
import CopyButon from "./copy-button";

interface usageExempleCardProps {
  repertorio: Repertorio;
}

export default function UsageExempleCard({
  repertorio,
}: usageExempleCardProps) {
  const { usageTemplate } = repertorio;

  if (!usageTemplate) return null;

  return (
    <Card className="border-2 border-primary/30 bg-primary/5 py-4 px-2 dark:bg-[#0F161B]">
      <CardContent className="space-y-4">
        <Carousel>
          <CarouselDots className="mb-3" />
          <div className="flex items-center gap-2">
            {repertorio.usageExample && (
              <CarouselPrevious className="static hidden md:inline-flex" />
            )}
            <div className="min-w-0 flex-1">
              <CarouselContent>
                <CarouselItem className="p-6 flex items-center">
                  <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-lg mb-3">
                      <PenLine className="h-5 w-5" />
                      Exemplo de {repertorio.bestFor} coringa
                    </div>
                    <Card>
                      <CardContent>
                        <p className="text-foreground leading-relaxed text-sm whitespace-pre-line">
                          {usageTemplate.split(/(\[[^\]]+\])/).map((part, i) =>
                            /^\[.+\]$/.test(part) ? (
                              <span
                                key={i}
                                className="text-primary font-semibold bg-primary/10 rounded px-1"
                              >
                                {part}
                              </span>
                            ) : (
                              <span key={i}>{part}</span>
                            ),
                          )}
                        </p>
                      </CardContent>
                    </Card>
                    {repertorio.usagePlaceholders && (
                      <div className="space-y-2 mt-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Campos para adaptar:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {repertorio.usagePlaceholders.map((ph) => (
                            <span
                              key={ph}
                              className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium"
                            >
                              {ph}
                            </span>
                          ))}
                        </div>
                        {repertorio.usageTips && (
                          <div className="flex gap-2 p-3 bg-accent/50 rounded-lg">
                            <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {repertorio.usageTips}
                            </p>
                          </div>
                        )}
                        <div className="w-full mt-5">
                          <CopyButon textToCopy={usageTemplate} />
                        </div>
                      </div>
                    )}
                  </div>
                </CarouselItem>
                {repertorio.usageExample && (
                  <CarouselItem className="p-6">
                    <div>
                      <div className="flex items-center gap-2 text-primary font-bold text-lg mb-3">
                        <PenLine className="h-5 w-5" />
                        Exemplo de uso real
                      </div>
                      <div className="w-full flex justify-center font-bold mb-2">
                        {repertorio.usageExample[0]}
                      </div>
                      <Card>
                        <CardContent>
                          <p className="text-foreground leading-relaxed text-sm whitespace-pre-line">
                            {repertorio.usageExample[1]}
                          </p>
                        </CardContent>
                      </Card>
                      <div className="w-full mt-5">
                        <CopyButon textToCopy={repertorio.usageExample[1]} />
                      </div>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
            </div>
            {repertorio.usageExample && (
              <CarouselNext className="static hidden md:inline-flex" />
            )}
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
}
