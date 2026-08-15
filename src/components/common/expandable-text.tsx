"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CLAMP_LENGTH_THRESHOLD = 280;

interface ExpandableTextProps {
  text: string;
  className?: string;
}

export function ExpandableText({ text, className }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > CLAMP_LENGTH_THRESHOLD;

  return (
    <div>
      <p
        className={cn(
          "whitespace-pre-line",
          !expanded && isLong && "line-clamp-4",
          className,
        )}
      >
        {text}
      </p>
      {isLong && (
        <Button
          variant="link"
          size="sm"
          className="px-0 h-auto mt-1"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Ver menos" : "Ver mais"}
        </Button>
      )}
    </div>
  );
}

export default ExpandableText;