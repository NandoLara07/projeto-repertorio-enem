import { RepertoriosData } from "@/db/repertorios";
import { typeLabels } from "@/components/ui/repertoriocard";
import Header from "@/components/common/header";
import BackButton from "@/components/common/back-button";
import ExpandableText from "@/components/common/expandable-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import UsageExempleCard from "@/components/common/usage-exemple-card";
import DownloadPdfButton from "@/components/common/download-pdf-button";
import { FileText, MessageSquareQuote, Tag, Target } from "lucide-react";

export async function generateStaticParams() {
  return RepertoriosData.map((r) => ({ id: r.id }));
}

export default async function RepertorioDetalhe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repertorio = RepertoriosData.find((r) => r.id === id);

  if (!repertorio) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-[9dvh]">
          <div className="text-center space-y-4">
            <p className="text-lg font-medium text-foreground">
              Repertório não encontrado
            </p>
            <BackButton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-8 pt-[calc(9dvh+2rem)]">
        <div className="max-w-3xl mx-auto space-y-8 fade-in">
          <div className="flex items-center justify-between">
            <BackButton />
            <DownloadPdfButton repertorio={repertorio} />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="font-medium">
                {typeLabels[repertorio.type]}
              </Badge>
              {repertorio.category
                .split("/")
                .map((c) => c.trim())
                .slice(0, 4)
                .map((c) => (
                  <Badge key={c} variant="secondary">
                    {c}
                  </Badge>
                ))}

              {repertorio.bestFor && (
                <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                  <Target className="h-3 w-3 mr-1" />
                  Melhor para {repertorio.bestFor}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">
              {repertorio.title}
            </h1>
          </div>

          <Card className="dark:bg-[#0F161B]">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <FileText className="h-5 w-5" />
                Explicação
              </div>
              <ExpandableText
                text={repertorio.explanation}
                className="text-foreground leading-relaxed dark:opacity-90"
              />
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-accent/30">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <MessageSquareQuote className="h-5 w-5" />
                Como usar na redação
              </div>
              <ExpandableText
                text={repertorio.essayUsage}
                className="text-foreground leading-relaxed dark:opacity-90"
              />
            </CardContent>
          </Card>

          {repertorio.usageTemplate && (
            <UsageExempleCard repertorio={repertorio} />
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Temas específicos
              </h2>
              <div className="flex flex-wrap gap-2">
                {repertorio.specificThemes.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Tag className="h-4 w-4 text-amber-500" />
                Eixo temático
              </h2>
              <div className="flex flex-wrap gap-2">
                {repertorio.eixoTematico.map((k) => (
                  <span
                    key={k}
                    className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
