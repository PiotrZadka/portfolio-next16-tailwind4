"use client";

import { useState } from "react";
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
import { ChevronDown, ChevronUp, Calendar, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  items: Experience[];
  skillBadgeClasses?: Record<string, string>;
}

export function ExperienceTimeline({
  items,
  skillBadgeClasses,
}: ExperienceTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    items[0]?.id || null
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative space-y-8 pl-6 md:pl-0">
      {/* Vertical Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        const isExpanded = expandedId === item.id;

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
                  {item.startDate} - {item.endDate}
                </span>
              </div>
            </div>

            {/* Content Card */}
            <div className="w-full md:w-1/2">
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:border-primary/50",
                  isExpanded ? "ring-1 ring-primary" : ""
                )}
                onClick={() => toggleExpand(item.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-primary">
                        {item.role}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium mt-1 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {item.company}
                      </CardDescription>
                      {/* Date (Mobile) */}
                      <div className="flex md:hidden items-center gap-2 text-muted-foreground mt-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>

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
                              Key Impact
                            </h4>
                            <ul className="list-disc list-outside ml-4 space-y-1 text-sm">
                              {item.impact.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="none"
                                  className={cn(
                                    "text-xs",
                                    skillBadgeClasses?.[tech] ||
                                      "bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] shadow-sm"
                                  )}
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
