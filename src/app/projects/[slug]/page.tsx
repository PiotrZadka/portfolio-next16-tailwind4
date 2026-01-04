import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Piotr Zadka`,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <Section className="pb-8 pt-24 bg-surface/30 border-b border-border/40">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {project.links.repo && (
              <Link
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Source
                </Button>
              </Link>
            )}
            {project.links.demo && (
              <Link
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-sm py-1 px-3"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.content.problem}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">The Approach</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.content.approach}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">The Results</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.content.results}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
