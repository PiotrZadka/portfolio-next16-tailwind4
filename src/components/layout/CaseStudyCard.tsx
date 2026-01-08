import Link from "next/link";
import Image from "next/image";
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
import {
  getBadgeClassName,
  getSkillCategories,
  resolveSkillCategory,
} from "@/lib/skills";

interface CaseStudyCardProps {
  project: CaseStudy;
  categories?: Array<{ category: string; skills: string[] }>;
}

export async function CaseStudyCard({
  project,
  categories: providedCategories,
}: CaseStudyCardProps) {
  const categories = providedCategories || (await getSkillCategories());

  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-surface flex items-center justify-center text-muted-foreground">
            <span className="text-4xl font-bold opacity-20">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
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
          {(project.technologies?.slice(0, 4) || []).map((tech) => {
            resolveSkillCategory(tech, categories);
            return (
              <Badge
                key={tech}
                variant="none"
                className={cn("text-xs", getBadgeClassName())}
              >
                {tech}
              </Badge>
            );
          })}
          {project.technologies?.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-border/50 pt-4 relative z-10">
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
