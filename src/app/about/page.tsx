import { AboutSection } from "@/components/layout/AboutSection";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { sanityFetch } from "../../../sanity/lib/client";
import { draftMode } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about my background, skills, and professional journey.",
  openGraph: {
    title: "About",
    description:
      "Learn more about my background, skills, and professional journey.",
  },
  twitter: {
    title: "About",
    description:
      "Learn more about my background, skills, and professional journey.",
  },
};

async function getProfileData(preview: boolean) {
  const query = `*[_type == "profile"][0] {
    name,
    title,
    about,
    location,
    email,
    social,
    resume,
    "resumeFile": resumeFile.asset->url
  }`;
  return await sanityFetch<any>({ query, preview });
}

export default async function AboutPage() {
  const { isEnabled: preview } = await draftMode();
  const profileData = await getProfileData(preview);
  const resumeUrl = profileData?.resumeFile || profileData?.resume;

  const mergedProfile = {
    ...profile,
    ...profileData,
    resume: resumeUrl,
  };

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

      <AboutSection profile={mergedProfile} />

      <ContactSection email={profile.email} social={profile.social} />
    </div>
  );
}
