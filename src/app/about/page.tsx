import { AboutSection } from "@/components/layout/AboutSection";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  sanityFetch,
  client as publishedClient,
} from "../../../sanity/lib/client";
import { draftMode } from "next/headers";
import { Metadata } from "next";

import { DEFAULT_SKILLS, DEFAULT_SKILL_CATEGORIES } from "@/data/skills";

export const dynamic = "force-dynamic";

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

async function getAboutData(preview: boolean) {
  const aboutQuery = `*[_type == "about"][0] {
    about,
    location,
    skills,
    skillCategories,
    resume,
    "resumeFile": resumeFile.asset->url
  }`;

  try {
    let aboutData = await sanityFetch<any>({ query: aboutQuery, preview });

    if (!aboutData) {
      aboutData = await publishedClient.fetch<any>(aboutQuery);
    }

    return aboutData;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

async function getContactData(preview: boolean) {
  const contactQuery = `*[_type == "contact"][0] {
    email,
    social,
    text
  }`;

  try {
    let contactData = await sanityFetch<any>({ query: contactQuery, preview });

    if (!contactData) {
      contactData = await publishedClient.fetch<any>(contactQuery);
    }

    return contactData;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return null;
  }
}

export default async function AboutPage() {
  let preview = false;
  try {
    const draftModeResult = await draftMode();
    preview = draftModeResult.isEnabled;
  } catch {
    // draftMode() can fail during static generation
    preview = false;
  }

  const aboutData = await getAboutData(preview);
  const contactData = await getContactData(preview);

  if (!aboutData) {
    return null;
  }

  const about = {
    about: aboutData.about,
    location: aboutData.location,
    skills:
      aboutData.skills && aboutData.skills.length > 0
        ? aboutData.skills
        : DEFAULT_SKILLS,
    skillCategories:
      aboutData.skillCategories && aboutData.skillCategories.length > 0
        ? aboutData.skillCategories
        : DEFAULT_SKILL_CATEGORIES,
    resume: aboutData.resumeFile || aboutData.resume,
  };

  const contact = {
    email: contactData?.email,
    social: contactData?.social,
    text: contactData?.text,
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

      <AboutSection profile={about} />

      <ContactSection
        email={contact.email}
        social={contact.social}
        text={contact.text}
      />
    </div>
  );
}
