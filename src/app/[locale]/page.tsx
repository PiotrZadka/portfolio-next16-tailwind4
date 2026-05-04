import { getTranslations } from "next-intl/server";
import { draftMode } from "next/headers";
import { HeroSection } from "@/components/layout/HeroSection";
import { ExperienceTimeline } from "@/components/layout/ExperienceTimeline";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { ContactSection } from "@/components/layout/ContactSection";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/types";
import {
  getProfile,
  getContact,
  getAbout,
  getExperiences,
  getProjects,
} from "@/lib/sanity";

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const t = await getTranslations({ locale, namespace: "homepage" });
  const heroT = await getTranslations({ locale, namespace: "hero" });
  const tc = await getTranslations({ locale, namespace: "contact" });

  const [profileData, contactData, aboutData, experience, projects] =
    await Promise.all([
      getProfile(locale, preview),
      getContact(locale, preview),
      getAbout(locale, preview),
      getExperiences(locale, preview),
      getProjects(locale, preview, 3),
    ]);

  return (
    <div className="flex flex-col gap-0">
      <HeroSection
        name={profileData?.name || heroT("fallbackName")}
        tagline={profileData?.tagline || ""}
        bio={profileData?.bio || ""}
        resume={aboutData?.resumeFile || aboutData?.resume}
        greeting={heroT("greeting")}
        viewProjects={heroT("viewProjects")}
        contactMe={heroT("contactMe")}
        viewCV={heroT("viewCV")}
      />

      <Section className="bg-muted/50 pt-8 md:pt-12 lg:pt-16">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {t("experienceHeading")}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {t("experienceDesc")}
              </p>
            </div>
            <Link href="/experience" className="hidden md:block">
              <Button variant="ghost" className="gap-2">
                {t("viewFullTimeline")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <ExperienceTimeline items={experience} defaultExpanded={false} initialLimit={2} />

          <div className="mt-8 md:hidden text-center">
            <Link href="/experience">
              <Button variant="outline" className="w-full">
                {t("viewFullTimeline")}
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
                {t("projectsHeading")}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {t("projectsDesc")}
              </p>
            </div>
            <Link href="/projects" className="hidden md:block">
              <Button variant="ghost" className="gap-2">
                {t("viewAllProjects")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: CaseStudy) => (
              <CaseStudyCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
            <Link href="/projects">
              <Button variant="outline" className="w-full">
                {t("viewAllProjects")}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      <ContactSection
        email={contactData?.email || ""}
        social={contactData?.social || { github: "", linkedin: "" }}
        text={contactData?.text}
        heading={tc("heading")}
        cta={tc("cta")}
        githubLabel={tc("github")}
        linkedinLabel={tc("linkedin")}
      />
    </div>
  );
}
