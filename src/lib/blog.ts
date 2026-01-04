import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        id: file.replace(".mdx", ""),
        slug: file.replace(".mdx", ""),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        readTime: data.readTime,
        tags: data.tags || [],
        content: content,
      } as BlogPost;
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    id: slug,
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    readTime: data.readTime,
    tags: data.tags || [],
    content: content,
  } as BlogPost;
}
