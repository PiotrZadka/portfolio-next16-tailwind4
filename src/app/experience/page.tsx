import { ExperienceTimeline } from "@/components/layout/ExperienceTimeline";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getExperiences } from "@/lib/sanity";
import { draftMode } from "next/headers";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional journey and career timeline.",
  openGraph: {
    title: "Experience",
    description: "My professional journey and career timeline.",
  },
  twitter: {
    title: "Experience",
    description: "My professional journey and career timeline.",
  },
};

export default async function ExperiencePage() {
  const { isEnabled: preview } = await draftMode();
  const experience = await getExperiences(preview);

  return (
    <div className="flex flex-col">
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A detailed timeline of my professional career, key roles, and the
              impact I've delivered across various organizations.
            </p>
          </div>
          <ExperienceTimeline items={experience} />
        </Container>
      </Section>
    </div>
  );
}
