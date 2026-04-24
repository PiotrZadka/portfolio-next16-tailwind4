import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PortableText } from "@portabletext/react";
import { cn, calculateReadingTime } from "@/lib/utils";
import { getBadgeClassName } from "@/lib/skills";
import { draftMode } from "next/headers";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = await getBlogPost(slug, false);

  if (!post) {
    return {
      title: t("postNotFound"),
    };
  }

  return {
    title: {
      absolute: post.title,
    },
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Piotr Zadka"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const t = await getTranslations({ locale, namespace: "blog" });
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug, preview),
    getBlogPosts(preview),
  ]);

  if (!post) {
    notFound();
  }

  const postUrl = `https://piotrzadka.dev/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress />
      <article className="flex flex-col">
        <Section className="pb-0 md:pb-0 lg:pb-0 pt-12 md:pt-24 bg-muted/50 border-b border-border/40">
          <Container className="max-w-3xl pb-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToBlog")}
            </Link>

            <div className="flex gap-4 items-center text-sm text-muted-foreground mb-6">
              <time dateTime={post.date}>{post.date}</time>
              <span>&bull;</span>
              <span>
                {post.readTime ||
                  `${calculateReadingTime(post.content)} ${t("minRead")}`}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag) => {
                return (
                  <Badge
                    key={tag}
                    variant="none"
                    className={cn("text-sm py-1 px-3", getBadgeClassName())}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section>
          <Container className="max-w-3xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <PortableText value={post.content as any} />
            </div>

            <div className="mt-12">
              <ShareButtons url={postUrl} />
            </div>

            <RelatedPosts posts={allPosts} currentSlug={post.slug} />
          </Container>
        </Section>
      </article>
    </>
  );
}
