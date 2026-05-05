"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, ChevronUp, Calendar, Briefcase, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBadgeClassName } from "@/lib/skills";

interface ExperienceTimelineProps {
  items: Experience[];
  defaultExpanded?: boolean;
  initialLimit?: number;
}

function ExperienceCard({
  item,
  isExpanded,
  onToggle,
  isChild = false,
  t,
}: {
  item: Experience;
  isExpanded: boolean;
  onToggle: () => void;
  isChild?: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const endDateDisplay =
    item.endDate?.toLowerCase() === "present" ? t("present") : item.endDate;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-primary/50",
        isExpanded ? "ring-1 ring-primary" : "",
        isChild
          ? "border-l-2 border-l-primary/40 bg-muted/30"
          : ""
      )}
      onClick={onToggle}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className={cn("text-primary", isChild ? "text-lg" : "text-xl")}>
              {item.role}
            </CardTitle>
            <CardDescription className="text-base font-medium mt-1 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {item.company}
            </CardDescription>
            <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
              <Calendar className="h-3 w-3" />
              <span>{item.startDate} – {endDateDisplay}</span>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground mt-1">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{item.description}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-2 border-t border-border">
                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                    {t("keyImpact")}
                  </h4>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm">
                    {item.impact &&
                      Array.isArray(item.impact) &&
                      item.impact.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                    {t("technologies")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies &&
                      Array.isArray(item.technologies) &&
                      item.technologies.filter(Boolean).map((tech, i) => (
                        <Badge
                          key={`${tech}-${i}`}
                          variant="none"
                          className={cn("text-xs", getBadgeClassName())}
                        >
                          {tech}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function ExperienceTimeline({ items, defaultExpanded = true, initialLimit }: ExperienceTimelineProps) {
  const t = useTranslations("experience");
  const topLevel = items.filter((item) => !item.parentId);
  const [showAll, setShowAll] = useState(false);
  const visibleItems = initialLimit && !showAll ? topLevel.slice(0, initialLimit) : topLevel;

  const allIds = [
    ...topLevel.map((i) => i.id),
    ...topLevel.flatMap((i) => (i.children ?? []).map((c) => c.id)),
  ];

  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpanded ? allIds : [])
  );

  const handleShowMore = () => {
    setShowAll(true);
    // Expand all when revealing more
    setExpandedIds(new Set(allIds));
  };

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="relative space-y-8 pl-6 md:pl-0">
      {/* Vertical Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

      {visibleItems.map((item, index) => {
        const isEven = index % 2 === 0;
        const isExpanded = expandedIds.has(item.id);
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div
            key={item.id}
            className={cn(
              "relative flex flex-col md:flex-row gap-8",
              isEven ? "md:flex-row-reverse" : ""
            )}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-24px] top-6 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2 md:top-6 z-10" />

            {/* Date (Desktop) */}
            <div
              className={cn(
                "hidden md:flex md:w-1/2 items-start pt-6",
                isEven ? "justify-start pl-8" : "justify-end pr-8"
              )}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {item.startDate} –{" "}
                  {item.endDate?.toLowerCase() === "present"
                    ? t("present")
                    : item.endDate}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-3">
              <ExperienceCard
                item={item}
                isExpanded={isExpanded}
                onToggle={() => toggle(item.id)}
                t={t}
              />

              {/* Nested child placements */}
              {hasChildren && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3 pl-4 border-l-2 border-primary/30"
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider pt-1">
                        <Building2 className="h-3 w-3" />
                        {t("clientPlacements")}
                      </div>
                      {item.children!.map((child) => (
                        <ExperienceCard
                          key={child.id}
                          item={child}
                          isExpanded={expandedIds.has(child.id)}
                          onToggle={() => toggle(child.id)}
                          isChild
                          t={t}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        );
      })}

      {/* Show more / less */}
      {initialLimit && topLevel.length > initialLimit && (
        <div className="flex justify-center pt-2">
          <button
            onClick={showAll ? () => setShowAll(false) : handleShowMore}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            {showAll ? (
              <><ChevronUp className="h-4 w-4" /> {t("showLess")}</>
            ) : (
              <><ChevronDown className="h-4 w-4" /> {t("showMore")}</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
