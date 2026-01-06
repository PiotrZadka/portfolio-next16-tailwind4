import { notFound } from "next/navigation";
import { client, sanityFetch } from "../../../../sanity/lib/client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSkillBadgeClassName } from "@/lib/skills";
import { draftMode } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { CaseStudy } from "@/types";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProject(slug: string, preview: boolean) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "coverImage": coverImage.asset->url,
    technologies,
    links,
    content
  }`;
  return await sanityFetch<CaseStudy>({ query, params: { slug }, preview });
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug, false);

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
  const query = `*[_type == "project"] { "slug": slug.current }`;
  const projects = await client.fetch(query);
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { isEnabled: preview } = await draftMode();
  const { slug } = await params;
  const project = await getProject(slug, preview);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <Section className="pb-8 pt-24 bg-muted/50 border-b border-border/40">
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
            {project.links?.repo && (
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
            {project.links?.demo && (
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
            {project.technologies?.map((tech: string) => (
              <Badge
                key={tech}
                variant="none"
                className={cn(
                  "text-sm py-1 px-3",
                  getSkillBadgeClassName(tech)
                )}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          {project.coverImage && (
            <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden border border-border/50 shadow-sm">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="space-y-12">
            {project.content?.problem && (
              <div>
                <h2 className="text-2xl font-bold mb-4">The Problem</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.content.problem}
                </p>
              </div>
            )}

            {project.content?.approach && (
              <div>
                <h2 className="text-2xl font-bold mb-4">The Approach</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.content.approach}
                </p>
              </div>
            )}

            {project.content?.results && (
              <div>
                <h2 className="text-2xl font-bold mb-4">The Results</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.content.results}
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
