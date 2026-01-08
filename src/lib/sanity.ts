import { sanityFetch } from "../../sanity/lib/client";
import { Experience, CaseStudy } from "@/types";

export async function getProfile(preview = false) {
  const query = `*[_type == "profile"][0] {
    name,
    tagline
  }`;
  return await sanityFetch<any>({ query, preview });
}

export async function getContact(preview = false) {
  const query = `*[_type == "contact"][0] {
    email,
    social,
    text
  }`;
  return await sanityFetch<any>({ query, preview });
}

export async function getAbout(preview = false) {
  const query = `*[_type == "about"][0] {
    resume,
    "resumeFile": resumeFile.asset->url
  }`;
  return await sanityFetch<any>({ query, preview });
}

export async function getExperiences(preview = false, limit?: number) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "experience"] | order(order asc) ${limitStr} {
    "id": _id,
    company,
    role,
    startDate,
    endDate,
    description,
    impact,
    technologies
  }`;
  return await sanityFetch<Experience[]>({ query, preview });
}

export async function getProjects(preview = false, limit?: number) {
  const limitStr = limit ? `[0...${limit}]` : "";
  const query = `*[_type == "project"] ${limitStr} {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    "coverImage": coverImage.asset->url,
    technologies,
    links
  }`;
  return await sanityFetch<CaseStudy[]>({ query, preview });
}

export async function getProject(slug: string, preview = false) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
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
    params: { slug },
    preview,
  });
}
