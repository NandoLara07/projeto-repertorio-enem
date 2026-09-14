"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { typeLabels } from "../ui/repertoriocard";
import { Repertorio } from "@/types/repertorio";

const MARGIN = 15;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const PRIMARY_COLOR: [number, number, number] = [22, 101, 52];
const BODY_COLOR: [number, number, number] = [30, 30, 30];
const MUTED_COLOR: [number, number, number] = [100, 100, 100];

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function DownloadPdfButton({
  repertorio,
}: {
  repertorio: Repertorio;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = MARGIN;

      const ensureSpace = (needed: number) => {
        if (y + needed > pageHeight - MARGIN) {
          doc.addPage();
          y = MARGIN;
        }
      };

      const addHeading = (text: string) => {
        y += 4;
        ensureSpace(10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(...PRIMARY_COLOR);
        doc.text(text, MARGIN, y);
        y += 7;
      };

      const addParagraph = (
        text: string,
        opts?: { fontSize?: number; muted?: boolean; bold?: boolean },
      ) => {
        const fontSize = opts?.fontSize ?? 11;
        const lineHeight = fontSize * 0.5;
        doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
        doc.setFontSize(fontSize);
        doc.setTextColor(...(opts?.muted ? MUTED_COLOR : BODY_COLOR));
        const lines: string[] = doc.splitTextToSize(text, CONTENT_WIDTH);
        for (const line of lines) {
          ensureSpace(lineHeight);
          doc.text(line, MARGIN, y);
          y += lineHeight;
        }
      };

      const addTemplateParagraph = (text: string) => {
        const fontSize = 11;
        const lineHeight = fontSize * 0.5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(fontSize);
        const spaceWidth = doc.getTextWidth(" ");

        type Token = { text: string; placeholder: boolean } | { break: true };
        const tokens: Token[] = [];
        for (const part of text.split(/(\[[^\]]+\]|\n)/)) {
          if (!part) continue;
          if (part === "\n") {
            tokens.push({ break: true });
          } else if (/^\[.+\]$/.test(part)) {
            tokens.push({ text: part, placeholder: true });
          } else {
            for (const word of part.split(/\s+/).filter(Boolean)) {
              tokens.push({ text: word, placeholder: false });
            }
          }
        }

        let line: { text: string; placeholder: boolean }[] = [];
        let lineWidth = 0;

        const flushLine = () => {
          ensureSpace(lineHeight);
          let x = MARGIN;
          for (const token of line) {
            doc.setFont("helvetica", token.placeholder ? "bold" : "normal");
            doc.setTextColor(
              ...(token.placeholder ? PRIMARY_COLOR : BODY_COLOR),
            );
            doc.text(token.text, x, y);
            x += doc.getTextWidth(token.text) + spaceWidth;
          }
          y += lineHeight;
          line = [];
          lineWidth = 0;
        };

        for (const token of tokens) {
          if ("break" in token) {
            if (line.length > 0) flushLine();
            else y += lineHeight;
            continue;
          }
          doc.setFont("helvetica", token.placeholder ? "bold" : "normal");
          const width = doc.getTextWidth(token.text);
          if (lineWidth + width > CONTENT_WIDTH && line.length > 0) {
            flushLine();
          }
          line.push(token);
          lineWidth += width + spaceWidth;
        }
        if (line.length > 0) flushLine();
      };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(...PRIMARY_COLOR);
      const titleLines: string[] = doc.splitTextToSize(
        repertorio.title,
        CONTENT_WIDTH,
      );
      doc.text(titleLines, MARGIN, y);
      y += titleLines.length * 7.5 + 2;

      const tags = [typeLabels[repertorio.type], repertorio.category];
      if (repertorio.bestFor) tags.push(`Melhor para ${repertorio.bestFor}`);
      addParagraph(tags.join("   •   "), { fontSize: 10, muted: true });
      y += 4;

      addHeading("Explicação");
      addParagraph(repertorio.explanation);

      addHeading("Como usar na redação");
      addParagraph(repertorio.essayUsage);

      if (repertorio.usageTemplate) {
        addHeading(`Exemplo de ${repertorio.bestFor ?? "introdução"} coringa`);
        addTemplateParagraph(repertorio.usageTemplate);

        if (
          repertorio.usagePlaceholders &&
          repertorio.usagePlaceholders.length > 0
        ) {
          y += 2;
          addParagraph(
            `Campos para adaptar: ${repertorio.usagePlaceholders.join(", ")}`,
            { fontSize: 10, muted: true },
          );
        }

        if (repertorio.usageTips) {
          y += 2;
          addParagraph(`Dica: ${repertorio.usageTips}`, {
            fontSize: 10,
            muted: true,
          });
        }
      }

      if (repertorio.usageExample) {
        addHeading("Exemplo com tema real");
        addParagraph(repertorio.usageExample[0], {
          fontSize: 11.5,
          bold: true,
        });
        y += 2;
        addParagraph(repertorio.usageExample[1]);
      }

      addHeading("Temas específicos");
      addParagraph(repertorio.specificThemes.join(", "));

      addHeading("Palavras-chave");
      addParagraph(repertorio.keywords.join(", "));

      doc.save(`${slugify(repertorio.title)}.pdf`);
    } catch {
      toast.error("Não foi possível gerar o PDF. Tente novamente.", {
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      disabled={loading}
      className="text-red-500 hover:text-red-600 hover:bg-red-500/10 bg-red-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      {loading ? "Gerando PDF..." : "Baixar em PDF"}
    </Button>
  );
}
