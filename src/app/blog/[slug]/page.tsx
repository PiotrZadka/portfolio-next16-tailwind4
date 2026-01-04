import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Piotr Zadka`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col">
      <Section className="pb-8 pt-24 bg-surface/30 border-b border-border/40">
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
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </Container>
      </Section>
    </article>
  );
}
