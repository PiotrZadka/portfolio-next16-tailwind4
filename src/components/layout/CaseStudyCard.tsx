import Link from "next/link";
import { CaseStudy } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSkillBadgeClassName } from "@/lib/skills";

interface CaseStudyCardProps {
  project: CaseStudy;
}

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {/* Placeholder for image if not available, or use Next/Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-surface flex items-center justify-center text-muted-foreground">
          {/* In a real app, use project.coverImage with Next/Image */}
          <span className="text-4xl font-bold opacity-20">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">
          <Link
            href={`/projects/${project.slug}`}
            className="focus:outline-none"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className={cn("text-xs", getSkillBadgeClassName(tech))}
            >
              {tech}
            </Badge>
          ))}
          {project.technologies?.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-border/50 pt-4 relative z-10 bg-surface">
        <div className="flex gap-2">
          {project.links.repo && (
            <Link
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          )}
          {project.links.demo && (
            <Link
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Live Demo</span>
              </Button>
            </Link>
          )}
        </div>

        <Link href={`/projects/${project.slug}`}>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-primary hover:text-primary-muted"
          >
            Read Case Study <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
