"use client";

import { Accessibility, PersonStanding, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  disableAccessibility,
  enableAccessibility,
  setZoom,
  useAccessibility,
} from "@/hooks/use-accessibility";
import { ZOOM_STEPS } from "@/lib/accessibility";

export default function AccessibilityControls() {
  const { enabled, zoom } = useAccessibility();
  const index = ZOOM_STEPS.indexOf(zoom);
  const isMin = index === 0;
  const isMax = index === ZOOM_STEPS.length - 1;

  return (
    <div className="flex items-center gap-1">
      {enabled && (
        <div
          role="group"
          aria-label="Tamanho do texto"
          className="flex items-center gap-1"
        >
          {/* focusableWhenDisabled: reaching a limit must not drop keyboard focus. */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Diminuir o texto"
            disabled={isMin}
            focusableWhenDisabled
            onClick={() => setZoom(ZOOM_STEPS[index - 1])}
          >
            <ZoomOut className="h-5 w-5" />
          </Button>
          <span
            aria-live="polite"
            className="sr-only text-center text-sm font-medium tabular-nums sm:not-sr-only sm:min-w-12"
          >
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Aumentar o texto"
            disabled={isMax}
            focusableWhenDisabled
            onClick={() => setZoom(ZOOM_STEPS[index + 1])}
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Modo de acessibilidade"
        aria-pressed={enabled}
        onClick={enabled ? disableAccessibility : enableAccessibility}
      >
        <PersonStanding className="h-5 w-5" />
      </Button>
    </div>
  );
}
