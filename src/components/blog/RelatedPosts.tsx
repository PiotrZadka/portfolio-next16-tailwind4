import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn, calculateReadingTime } from "@/lib/utils";
import {
  getBadgeClassName,
  getSkillCategories,
  resolveSkillCategory,
} from "@/lib/skills";
import { BlogPost } from "@/types";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentSlug: string;
}

export async function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  const categories = await getSkillCategories();

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl font-bold mb-8">You might also like</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex flex-col h-full">
                <div className="flex gap-2 items-center text-xs text-muted-foreground mb-3">
                  <time dateTime={post.date}>{post.date}</time>
                  {(post.readTime || post.content) && (
                    <>
                      <span>•</span>
                      <span>
                        {post.readTime ||
                          `${calculateReadingTime(post.content)} min read`}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {post.tags.slice(0, 2).map((tag) => {
                      resolveSkillCategory(tag, categories);
                      return (
                        <Badge
                          key={tag}
                          variant="none"
                          className={cn(
                            "text-xs py-0.5 px-2",
                            getBadgeClassName()
                          )}
                        >
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
