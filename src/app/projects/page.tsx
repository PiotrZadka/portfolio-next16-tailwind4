import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getProjects } from "@/lib/sanity";
import { draftMode } from "next/headers";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of my technical projects and case studies.",
  openGraph: {
    title: "Projects",
    description: "A showcase of my technical projects and case studies.",
  },
  twitter: {
    title: "Projects",
    description: "A showcase of my technical projects and case studies.",
  },
};

export default async function ProjectsPage() {
  const { isEnabled: preview } = await draftMode();
  const projects = await getProjects(preview);

  return (
    <div className="flex flex-col">
      <Section className="pb-8 pt-24">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A collection of projects that showcase my technical skills,
            problem-solving abilities, and passion for building high-quality
            software.
          </p>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <CaseStudyCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
