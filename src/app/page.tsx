import { HeroSection } from "@/components/layout/HeroSection";
import { ExperienceTimeline } from "@/components/layout/ExperienceTimeline";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getData() {
  const experienceQuery = `*[_type == "experience"] | order(order asc) [0...2] {
    "id": _id,
    company,
    role,
    startDate,
    endDate,
    description,
    impact,
    technologies
  }`;

  const projectsQuery = `*[_type == "project"] [0...3] {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "coverImage": coverImage.asset->url,
    technologies,
    links
  }`;

  const [experience, projects] = await Promise.all([
    client.fetch(experienceQuery),
    client.fetch(projectsQuery),
  ]);

  return { experience, projects };
}

export default async function Home() {
  const { experience, projects } = await getData();

  return (
    <div className="flex flex-col gap-0">
      <HeroSection name={profile.name} tagline={profile.tagline} />

      <Section className="bg-surface/30">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Latest Experience
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                My professional journey in software engineering.
              </p>
            </div>
            <Link href="/experience" className="hidden md:block">
              <Button variant="ghost" className="gap-2">
                View Full Timeline <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <ExperienceTimeline items={experience} />

          <div className="mt-8 md:hidden text-center">
            <Link href="/experience">
              <Button variant="outline" className="w-full">
                View Full Timeline
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                A selection of projects that demonstrate my technical expertise.
              </p>
            </div>
            <Link href="/projects" className="hidden md:block">
              <Button variant="ghost" className="gap-2">
                View All Projects <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <CaseStudyCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
            <Link href="/projects">
              <Button variant="outline" className="w-full">
                View All Projects
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <ContactSection email={profile.email} social={profile.social} />
    </div>
  );
}
