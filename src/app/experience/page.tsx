import { ExperienceTimeline } from "@/components/layout/ExperienceTimeline";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { sanityFetch } from "../../../sanity/lib/client";
import { draftMode } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Piotr Zadka",
  description: "My professional journey and career timeline.",
};

async function getExperience(preview: boolean) {
  const query = `*[_type == "experience"] | order(order asc) {
    "id": _id,
    company,
    role,
    startDate,
    endDate,
    description,
    impact,
    technologies
  }`;
  return await sanityFetch<any[]>({ query, preview });
}

export default async function ExperiencePage() {
  const { isEnabled: preview } = await draftMode();
  const experience = await getExperience(preview);

  return (
    <div className="flex flex-col">
      <Section className="pb-8 pt-24">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A detailed timeline of my professional career, key roles, and the
            impact I've delivered across various organizations.
          </p>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container>
          <ExperienceTimeline items={experience} />
        </Container>
      </Section>
    </div>
  );
}
