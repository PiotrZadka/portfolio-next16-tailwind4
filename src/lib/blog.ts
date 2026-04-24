import { sanityFetch } from "../../sanity/lib/client";
import { BlogPost } from "@/types";

const localeFilter = `(!defined(language) || language == $locale)`;

export async function getBlogPosts(
  locale: string,
  preview = false
): Promise<BlogPost[]> {
  const query = `*[_type == "post" && ${localeFilter}] | order(date desc) {
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

  return await sanityFetch<BlogPost[]>({ query, params: { locale }, preview });
}

export async function getBlogPost(
  slug: string,
  locale: string,
  preview = false
): Promise<BlogPost | null> {
  const query = `*[_type == "post" && slug.current == $slug && ${localeFilter}][0] {
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
    params: { slug, locale },
    preview,
  });
}
