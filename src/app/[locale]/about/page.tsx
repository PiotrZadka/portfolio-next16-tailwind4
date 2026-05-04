import { getTranslations } from "next-intl/server";
import { AboutSection } from "@/components/layout/AboutSection";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getAbout, getContact } from "@/lib/sanity";
import { draftMode } from "next/headers";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let preview = false;
  try {
    const draftModeResult = await draftMode();
    preview = draftModeResult.isEnabled;
  } catch {
    preview = false;
  }
  const t = await getTranslations({ locale, namespace: "about" });
  const tc = await getTranslations({ locale, namespace: "contact" });

  const aboutData = await getAbout(locale, preview);
  const contactData = await getContact(locale, preview);

  if (!aboutData) {
    return null;
  }

  const about = {
    about: aboutData.about,
    location: aboutData.location,
    skills: aboutData.skills || [],
    resume: aboutData.resumeFile || aboutData.resume,
  };

  const contact = {
    email: contactData?.email,
    social: contactData?.social,
    text: contactData?.text,
  };

  return (
    <div className="flex flex-col">
      <Section className="pb-0 md:pb-0 lg:pb-0 pt-12 md:pt-24">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {t("heading")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t("subtitle")}
          </p>
        </Container>
      </Section>

      <AboutSection profile={about} viewCV={t("viewCV")} technologies={t("technologies")} />

      <ContactSection
        email={contact.email ?? ""}
        social={contact.social ?? { github: "", linkedin: "" }}
        text={contact.text}
        heading={tc("heading")}
        cta={tc("cta")}
        githubLabel={tc("github")}
        linkedinLabel={tc("linkedin")}
      />
    </div>
  );
}
