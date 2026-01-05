export const skillCategories = {
  frontend: [
    "React",
    "TypeScript",
    "Next.js",
    "GraphQL",
    "React.js",
    "JavaScript",
    "W3C Accessibility",
  ],
  backend: ["Node.js", "Express", "Koa", "API Testing"],
  devops: [
    "AWS",
    "Azure",
    "Firebase",
    "CI/CD (Jenkins, Concourse, Octopus)",
    "Observability (Grafana, Kibana, Dynatrace)",
    "Jenkins",
    "Concourse",
    "Octopus",
    "Grafana",
    "Kibana",
    "Dynatrace",
  ],
  testing: ["Cypress", "Playwright", "WireMock", "JAWS"],
  tools: [
    "OpenCode CLI",
    "Google Gemini",
    "Technical Writing",
    "GitHub API",
    "Browser Extension",
  ],
};

// Pre-compute skill to category mapping for O(1) lookup
const skillToCategoryMap = new Map<string, string>();

Object.entries(skillCategories).forEach(([category, skills]) => {
  skills.forEach((skill) => {
    skillToCategoryMap.set(skill.toLowerCase(), category);
  });
});

export function getSkillBadgeClassName(skill: string) {
  const s = skill.toLowerCase();

  // Try exact match first (O(1))
  let category = skillToCategoryMap.get(s);

  // Fallback to partial match if no exact match found (O(N))
  // This handles cases like "React Native" matching "React"
  if (!category) {
    for (const [mappedSkill, mappedCategory] of skillToCategoryMap.entries()) {
      if (s.includes(mappedSkill) || mappedSkill.includes(s)) {
        category = mappedCategory;
        break;
      }
    }
  }

  switch (category) {
    case "frontend":
    case "backend":
    case "devops":
    case "testing":
    case "tools":
    default:
      return "bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--pill-border)] shadow-sm";
  }
}
