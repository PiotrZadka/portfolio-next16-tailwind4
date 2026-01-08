import { HeroSection } from "@/components/layout/HeroSection";
import { ExperienceTimeline } from "@/components/layout/ExperienceTimeline";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  sanityFetch,
  client as publishedClient,
} from "../../sanity/lib/client";
import { draftMode } from "next/headers";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Experience, CaseStudy } from "@/types";
import { getSkillCategories, getSkillBadgeClasses } from "@/lib/skills";

export const dynamic = "force-dynamic";
async function getData(preview: boolean) {
  const profileQuery = `*[_type == "profile"][0] {
    name,
    tagline
  }`;

  const contactQuery = `*[_type == "contact"][0] {
    email,
    social
  }`;

  const aboutQuery = `*[_type == "about"][0] {
    resume,
    "resumeFile": resumeFile.asset->url
  }`;

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

  // Fetch profile data (hero)
  let profileData = await sanityFetch<any>({ query: profileQuery, preview });
  if (!profileData) {
    profileData = await publishedClient.fetch<any>(profileQuery);
  }

  // Fetch contact data
  let contactData = await sanityFetch<any>({ query: contactQuery, preview });
  if (!contactData) {
    contactData = await publishedClient.fetch<any>(contactQuery);
  }

  // Fetch about data for resume
  let aboutData = await sanityFetch<any>({ query: aboutQuery, preview });
  if (!aboutData) {
    aboutData = await publishedClient.fetch<any>(aboutQuery);
  }

  const [experience, projects] = await Promise.all([
    sanityFetch<Experience[]>({ query: experienceQuery, preview }),
    sanityFetch<CaseStudy[]>({ query: projectsQuery, preview }),
  ]);

  return { profileData, contactData, aboutData, experience, projects };
}

export default async function Home() {
  const { isEnabled: preview } = await draftMode();
  const { profileData, contactData, aboutData, experience, projects } =
    await getData(preview);

  const allTech = Array.from(
    new Set(experience.flatMap((exp) => exp.technologies))
  );
  const skillBadgeClasses = await getSkillBadgeClasses(allTech);
  const categories = await getSkillCategories();

  return (
    <div className="flex flex-col gap-0">
      <HeroSection
        name={profileData?.name || "Piotr Zadka"}
        tagline={profileData?.tagline || ""}
        resume={aboutData?.resumeFile || aboutData?.resume}
      />

      <Section className="bg-muted/50">
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

          <ExperienceTimeline
            items={experience}
            skillBadgeClasses={skillBadgeClasses}
          />

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
              <CaseStudyCard
                key={project.id}
                project={project}
                categories={categories}
              />
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

      <ContactSection
        email={contactData?.email || ""}
        social={contactData?.social || { github: "", linkedin: "" }}
      />
    </div>
  );
}
