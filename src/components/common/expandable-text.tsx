"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
  text: string;
  className?: string;
}

export function ExpandableText({ text, className }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;

    const checkClamp = () => {
      setIsClamped(el.scrollHeight > el.clientHeight + 1);
    };

    checkClamp();
    const observer = new ResizeObserver(checkClamp);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, expanded]);

  return (
    <div>
      <p
        ref={textRef}
        className={cn(
          "whitespace-pre-line",
          !expanded && "line-clamp-4",
          className,
        )}
      >
        {text}
      </p>
      {(isClamped || expanded) && (
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
