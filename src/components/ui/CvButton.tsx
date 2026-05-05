"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CvButtonProps {
  /** URL for the primary (current locale) CV */
  primaryUrl: string;
  /** URL for the alternative locale CV */
  alternativeUrl?: string;
  /** Label for the main button */
  label: string;
  /** Label shown in the dropdown for the alternative CV */
  alternativeLabel: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CvButton({
  primaryUrl,
  alternativeUrl,
  label,
  alternativeLabel,
  variant = "outline",
  size = "lg",
  className,
}: CvButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 text-lg",
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-muted shadow-sm",
    outline:
      "border border-border bg-transparent hover:bg-surface text-foreground",
  };

  const baseBtn = cn(
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
    variants[variant]
  );

  // For the split chevron button, use a slightly darker border on outline, or a slightly muted bg on primary
  const splitDivider =
    variant === "primary"
      ? "border-l border-white/30"
      : "border-l border-border/50";

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      {/* Primary CV button */}
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          baseBtn,
          sizes[size],
          "gap-2 px-5 rounded-l-md",
          alternativeUrl ? "rounded-r-none border-r-0" : "rounded-md"
        )}
      >
        <FileText className="h-5 w-5 shrink-0" />
        {label}
      </a>

      {/* Dropdown toggle — only shown when there's an alternative */}
      {alternativeUrl && (
        <>
          <button
            aria-label="Show alternative CV language"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              baseBtn,
              "rounded-l-none rounded-r-md px-2.5",
              splitDivider
            )}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown panel */}
          {open && (
            <div
              className={cn(
                "absolute top-full mt-1.5 right-0 z-50 min-w-max",
                "rounded-md border border-border bg-surface shadow-lg",
                "animate-in fade-in-0 zoom-in-95 duration-150"
              )}
            >
              <a
                href={alternativeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-border/50 rounded-md transition-colors whitespace-nowrap"
              >
                <FileText className="h-4 w-4 shrink-0 text-primary" />
                {alternativeLabel}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
