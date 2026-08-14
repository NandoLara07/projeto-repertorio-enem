import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Scale,
  BarChart3,
  BookMarked,
  Layers,
  Users,
  Film,
  Tv,
  Video,
  PenLine,
  UserRound,
  Target,
} from "lucide-react";
import { Repertorio } from "@/types/repertorio";

const typeLabels: Record<Repertorio["type"], string> = {
  lei: "Lei",
  filme: "Filme",
  documentario: "Documentário",
  serie: "Série",
  evento: "Evento Histórico",
  dado: "Dado",
  livro: "Livro",
  conceito: "Conceito",
  movimento: "Movimento",
  citação: "Citação",
  pessoa: "Pessoa",
};

const typeIcons: Record<Repertorio["type"], React.ReactNode> = {
  lei: <Scale className="h-4 w-4" />,
  filme: <Film className="h-4 w-4" />,
  documentario: <Video className="h-4 w-4" />,
  serie: <Tv className="h-4 w-4" />,
  evento: <BookOpen className="h-4 w-4" />,
  dado: <BarChart3 className="h-4 w-4" />,
  livro: <BookMarked className="h-4 w-4" />,
  conceito: <Layers className="h-4 w-4" />,
  movimento: <Users className="h-4 w-4" />,
  citação: <PenLine className="h-4 w-4" />,
  pessoa: <UserRound className="h-4 w-4" />,
};

interface RepertorioCardProps {
  repertorio: Repertorio;
  index?: number;
}

export const RepertorioCard = ({
  repertorio,
  index = 0,
}: RepertorioCardProps) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-400 hover:-translate-y-1 card-in border-border/60"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => {
        console.log(`Clicked on repertorio: ${repertorio.title}`);
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-primary">{typeIcons[repertorio.type]}</span>
            <h3 className="font-semibold text-card-foreground leading-tight">
              {repertorio.title}
            </h3>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          <Badge variant="outline" className="text-xs font-medium">
            {typeLabels[repertorio.type]}
          </Badge>
          <Badge variant="secondary" className="text-xs font-medium">
            {repertorio.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {repertorio.explanation}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {repertorio.specificThemes.slice(0, 3).map((theme) => (
            <span
              key={theme}
              className="text-xs text-accent-foreground bg-accent px-2 py-0.5 rounded-full"
            >
              {theme}
            </span>
          ))}
        </div>
        {repertorio.bestFor && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border/40">
            {repertorio.bestFor && (
              <span
                className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{ textTransform: "capitalize" }}
              >
                <Target className="h-3 w-3" />
                {repertorio.bestFor}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RepertorioCard;
