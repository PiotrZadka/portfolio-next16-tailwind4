import { sanityFetch } from "../../sanity/lib/client";
import { BlogPost } from "@/types";

export async function getBlogPosts(
  locale: string,
  preview = false
): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    "title": coalesce(title[$locale], title.en),
    "excerpt": coalesce(excerpt[$locale], excerpt.en),
    date,
    readTime,
    tags,
    externalUrl,
    "content": coalesce(content[$locale], content.en)
  }`;

  return await sanityFetch<BlogPost[]>({ query, params: { locale }, preview });
}

export async function getBlogPost(
  slug: string,
  locale: string,
  preview = false
): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    "title": coalesce(title[$locale], title.en),
    "excerpt": coalesce(excerpt[$locale], excerpt.en),
    date,
    readTime,
    tags,
    externalUrl,
    "content": coalesce(content[$locale], content.en)
  }`;

  return await sanityFetch<BlogPost | null>({
    query,
    params: { slug, locale },
    preview,
  });
}
