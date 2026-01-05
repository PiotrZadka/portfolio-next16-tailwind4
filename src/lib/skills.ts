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
      return "bg-blue-500/10 text-blue-500 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400";
    case "backend":
      return "bg-green-500/10 text-green-500 border-green-500/20 dark:bg-green-500/20 dark:text-green-400";
    case "devops":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400";
    case "testing":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400";
    case "tools":
      return "bg-teal-500/10 text-teal-500 border-teal-500/20 dark:bg-teal-500/20 dark:text-teal-400";
    default:
      return "bg-surface text-muted-foreground border-border";
  }
}
