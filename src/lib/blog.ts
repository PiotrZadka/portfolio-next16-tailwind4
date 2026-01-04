import { client } from "../../sanity/lib/client";
import { BlogPost } from "@/types";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    date,
    readTime,
    tags,
    externalUrl,
    content
  }`;

  return await client.fetch(query);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    date,
    readTime,
    tags,
    externalUrl,
    content
  }`;

  return await client.fetch(query, { slug });
}
