import {
  sanityFetch,
  client as publishedClient,
} from "../../sanity/lib/client";
import { DEFAULT_SKILL_CATEGORIES } from "@/data/skills";

export async function getSkillCategories() {
  const query = `*[_type == "about"][0] {
    skillCategories
  }`;

  let result = await sanityFetch<{
    skillCategories: Array<{ category: string; skills: string[] }>;
  }>({
    query,
  });

  // Fallback to published if no data in draft
  if (!result?.skillCategories) {
    result = await publishedClient.fetch<{
      skillCategories: Array<{ category: string; skills: string[] }>;
    }>(query);
  }

  // Fallback to local data if Sanity has no data
  if (!result?.skillCategories || result.skillCategories.length === 0) {
    return DEFAULT_SKILL_CATEGORIES;
  }

  return result?.skillCategories || [];
}

export function resolveSkillCategory(
  skill: string,
  categories: Array<{ category: string; skills: string[] }>
) {
  const skillToCategoryMap = new Map<string, string>();

  categories.forEach(({ category, skills }) => {
    skills.forEach((s: string) => {
      skillToCategoryMap.set(s.toLowerCase(), category);
    });
  });

  const s = skill.toLowerCase();

  // Try exact match first (O(1))
  let category = skillToCategoryMap.get(s);

  // Fallback to partial match if no exact match found (O(N))
  if (!category) {
    for (const [mappedSkill, mappedCategory] of skillToCategoryMap.entries()) {
      if (s.includes(mappedSkill) || mappedSkill.includes(s)) {
        category = mappedCategory;
        break;
      }
    }
  }

  return category;
}

export function getBadgeClassName() {
  // For now, all categories return the same style as per the original code
  return "bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] shadow-sm";
}

export async function getSkillBadgeClassName(skill: string) {
  const categories = await getSkillCategories();
  resolveSkillCategory(skill, categories);
  return getBadgeClassName();
}

export async function getSkillBadgeClasses(skills: string[]) {
  const categories = await getSkillCategories();
  const classes: Record<string, string> = {};
  for (const skill of skills) {
    resolveSkillCategory(skill, categories);
    classes[skill] = getBadgeClassName();
  }
  return classes;
}
