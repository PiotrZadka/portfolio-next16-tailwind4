import { ExperienceTimeline } from "@/components/layout/ExperienceTimeline";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { client } from "../../../sanity/lib/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Piotr Zadka",
  description: "My professional journey and career timeline.",
};

async function getExperience() {
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
  return await client.fetch(query);
}

export default async function ExperiencePage() {
  const experience = await getExperience();

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
