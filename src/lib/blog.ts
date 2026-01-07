import { sanityFetch } from "../../sanity/lib/client";
import { BlogPost } from "@/types";

export async function getBlogPosts(preview = false): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    date,
    readTime,
    tags,
    externalUrl,
    linkedinHook,
    "socialImage": socialImage.asset->url,
    content
  }`;

  return await sanityFetch<BlogPost[]>({ query, preview });
}

export async function getBlogPost(
  slug: string,
  preview = false
): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    excerpt,
    date,
    readTime,
    tags,
    externalUrl,
    linkedinHook,
    "socialImage": socialImage.asset->url,
    content
  }`;

  return await sanityFetch<BlogPost | null>({
    query,
    params: { slug },
    preview,
  });
}
