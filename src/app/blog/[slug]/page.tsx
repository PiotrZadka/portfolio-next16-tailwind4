import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { PortableText } from "@portabletext/react";
import { cn, calculateReadingTime } from "@/lib/utils";
import {
  getBadgeClassName,
  getSkillCategories,
  resolveSkillCategory,
} from "@/lib/skills";
import { draftMode } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug, false);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const metadata: Metadata = {
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

  // Use custom social image if available
  if (post.socialImage) {
    if (metadata.openGraph) {
      metadata.openGraph.images = [
        { url: post.socialImage, width: 1200, height: 630 },
      ];
    }
    if (metadata.twitter) {
      metadata.twitter.images = [post.socialImage];
    }
  }

  return metadata;
}

/*
export async function generateStaticParams() {
  const posts = await getBlogPosts(false);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
*/

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { isEnabled: preview } = await draftMode();
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug, preview),
    getBlogPosts(preview),
  ]);

  if (!post) {
    notFound();
  }

  const categories = await getSkillCategories();
  const postUrl = `https://piotrzadka.dev/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress />
      <article className="flex flex-col">
        <Section className="pb-8 pt-24 bg-muted/50 border-b border-border/40">
          <Container className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <div className="flex gap-4 items-center text-sm text-muted-foreground mb-6">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>
                {post.readTime ||
                  `${calculateReadingTime(post.content)} min read`}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag) => {
                resolveSkillCategory(tag, categories);
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

            {/* Share buttons */}
            <div className="mt-12">
              <ShareButtons url={postUrl} />
            </div>

            {/* Related posts */}
            <RelatedPosts posts={allPosts} currentSlug={post.slug} />
          </Container>
        </Section>
      </article>
    </>
  );
}
