import { sanityFetch } from "../../sanity/lib/client";
import { Experience, CaseStudy } from "@/types";

const localeFilter = `(!defined(language) || language == $locale)`;

export async function getProfile(locale: string, preview = false) {
  const query = `*[_type == "profile" && ${localeFilter}][0] {
    name, title, tagline, skills
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getContact(locale: string, preview = false) {
  const query = `*[_type == "contact" && ${localeFilter}][0] {
    email, social, text
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getAbout(locale: string, preview = false) {
  const query = `*[_type == "about" && ${localeFilter}][0] {
    about, location, skills, resume, "resumeFile": resumeFile.asset->url
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getExperiences(
  locale: string,
  preview = false,
  limit?: number
) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "experience" && ${localeFilter}] | order(order asc) ${limitStr} {
    "id": _id,
    company,
    role,
    startDate,
    endDate,
    description,
    impact,
    technologies
  }`;
  return await sanityFetch<Experience[]>({ query, params: { locale }, preview });
}

export async function getProjects(locale: string, preview = false, limit?: number) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "project" && ${localeFilter}] ${limitStr} {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "coverImage": coverImage.asset->url,
    technologies,
    links
  }`;
  return await sanityFetch<CaseStudy[]>({ query, params: { locale }, preview });
}

export async function getProject(slug: string, locale: string, preview = false) {
  const query = `*[_type == "project" && slug.current == $slug && ${localeFilter}][0] {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "coverImage": coverImage.asset->url,
    technologies,
    links,
    content
  }`;
  return await sanityFetch<CaseStudy | null>({
    query,
    params: { slug, locale },
    preview,
  });
}
