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
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Piotr Zadka",
  description:
    "Technical guides, thoughts, and insights on software development.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="flex flex-col">
      <Section className="pb-8 pt-24">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Technical guides, thoughts, and insights on software development,
            React, Next.js, and more.
          </p>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group h-full"
              >
                <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {post.date}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {post.readTime}
                      </span>
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
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
