import { getTranslations } from "next-intl/server";
import { CaseStudyCard } from "@/components/layout/CaseStudyCard";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getProjects } from "@/lib/sanity";
import { draftMode } from "next/headers";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

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

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const t = await getTranslations({ locale, namespace: "projects" });
  const projects = await getProjects(locale, preview);

  return (
    <div className="flex flex-col">
      <Section className="pt-12 md:pt-24 pb-16">
        <Container>
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {t("heading")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {t("subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <CaseStudyCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
