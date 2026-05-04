import { sanityFetch } from "../../sanity/lib/client";
import { Experience, CaseStudy } from "@/types";

// Coalesce for regular localeString/localeText fields
const loc = (field: string) => `coalesce(${field}[$locale], ${field}.en)`;

// Coalesce per-item for reference arrays (skills/technologies)
// Must be done inside the projection so fallback applies per-document, not per-array
const refTitles = (field: string) =>
  `${field}[]->{"t": coalesce(title[$locale], title.en)}.t`;

export async function getProfile(locale: string, preview = false) {
  const query = `*[_type == "profile"][0] {
    name, 
    "tagline": ${loc("tagline")}
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getContact(locale: string, preview = false) {
  const query = `*[_type == "contact"][0] {
    email, social, 
    "text": ${loc("text")}
  }`;
  return await sanityFetch<any>({ query, params: { locale }, preview });
}

export async function getAbout(locale: string, preview = false) {
  const query = `*[_type == "about"][0] {
    "about": ${loc("about")}, 
    "location": ${loc("location")}, 
    "skills": ${refTitles("skills")},
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
    "role": ${loc("role")},
    "startDate": ${loc("startDate")},
    "endDate": ${loc("endDate")},
    "description": ${loc("description")},
    "impact": coalesce(impact[$locale], impact.en),
    "technologies": ${refTitles("technologies")}
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
    "title": ${loc("title")},
    "slug": slug.current,
    "summary": ${loc("summary")},
    "coverImage": coverImage.asset->url,
    "technologies": ${refTitles("technologies")},
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
    "title": ${loc("title")},
    "slug": slug.current,
    "summary": ${loc("summary")},
    "coverImage": coverImage.asset->url,
    "technologies": ${refTitles("technologies")},
    links,
    "content": {
      "problem": ${loc("content.problem")},
      "approach": ${loc("content.approach")},
      "results": ${loc("content.results")}
    }
  }`;
  return await sanityFetch<CaseStudy | null>({
    query,
    params: { slug, locale },
    preview,
  });
}
