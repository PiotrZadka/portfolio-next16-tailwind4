import { sanityFetch } from "../../sanity/lib/client";
import { Experience, CaseStudy } from "@/types";

export async function getProfile(locale: string, preview = false) {
  const query = `*[_type == "profile"][0] {
    name, 
    "title": title[$locale], 
    "tagline": tagline[$locale], 
    "skills": skills[]->title
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getContact(locale: string, preview = false) {
  const query = `*[_type == "contact"][0] {
    email, social, 
    "text": text[$locale]
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getAbout(locale: string, preview = false) {
  const query = `*[_type == "about"][0] {
    "about": about[$locale], 
    "location": location[$locale], 
    "skills": skills[]->title, 
    resume, 
    "resumeFile": resumeFile.asset->url
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getExperiences(
  locale: string,
  preview = false,
  limit?: number
) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "experience"] | order(order asc) ${limitStr} {
    "id": _id,
    company,
    "role": role[$locale],
    "startDate": startDate[$locale],
    "endDate": endDate[$locale],
    "description": description[$locale],
    "impact": impact[$locale],
    "technologies": technologies[]->title
  }`;
  return await sanityFetch<Experience[]>({
    query,
    params: { locale },
    preview,
  });
}

export async function getProjects(
  locale: string,
  preview = false,
  limit?: number
) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "project"] ${limitStr} {
    "id": _id,
    "title": title[$locale],
    "slug": slug.current,
    "summary": summary[$locale],
    "coverImage": coverImage.asset->url,
    "technologies": technologies[]->title,
    links
  }`;
  return await sanityFetch<CaseStudy[]>({ query, params: { locale }, preview });
}

export async function getProject(
  slug: string,
  locale: string,
  preview = false
) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    "id": _id,
    "title": title[$locale],
    "slug": slug.current,
    "summary": summary[$locale],
    "coverImage": coverImage.asset->url,
    "technologies": technologies[]->title,
    links,
    "content": {
      "problem": content.problem[$locale],
      "approach": content.approach[$locale],
      "results": content.results[$locale]
    }
  }`;
  return await sanityFetch<CaseStudy | null>({
    query,
    params: { slug, locale },
    preview,
  });
}
