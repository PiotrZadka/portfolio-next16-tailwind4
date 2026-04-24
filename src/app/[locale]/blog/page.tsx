import { getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";
import { cn, calculateReadingTime } from "@/lib/utils";
import { getBadgeClassName } from "@/lib/skills";
import { draftMode } from "next/headers";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { isEnabled: preview } = await draftMode();
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getBlogPosts(preview);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => {
              const href = post.externalUrl || `/blog/${post.slug}`;
              const isExternal = !!post.externalUrl;
              const readTime =
                post.readTime ||
                `${calculateReadingTime(post.content)} ${t("minRead")}`;

              return (
                <Link
                  key={post.id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="block group h-full"
                >
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                          {post.date}
                        </span>
                        <div className="flex items-center gap-2">
                          {isExternal && (
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm text-muted-foreground">
                            {readTime}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <div className="flex flex-wrap gap-2">
                        {(post.tags || []).map((tag) => {
                          return (
                            <Badge
                              key={tag}
                              variant="none"
                              className={cn("text-xs", getBadgeClassName())}
                            >
                              {tag}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
