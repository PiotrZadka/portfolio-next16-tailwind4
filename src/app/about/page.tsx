import { AboutSection } from "@/components/layout/AboutSection";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Piotr Zadka",
  description:
    "Learn more about my background, skills, and professional journey.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <Section className="pb-8 pt-24">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Learn more about my background, skills, and professional journey.
          </p>
        </Container>
      </Section>

      <AboutSection profile={profile} />

      <ContactSection email={profile.email} social={profile.social} />
    </div>
  );
}
