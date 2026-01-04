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

export function getSkillBadgeClassName(skill: string) {
  const s = skill.toLowerCase();

  const isFrontend = skillCategories.frontend.some((c) =>
    s.includes(c.toLowerCase())
  );
  const isBackend = skillCategories.backend.some((c) =>
    s.includes(c.toLowerCase())
  );
  const isDevops = skillCategories.devops.some((c) =>
    s.includes(c.toLowerCase())
  );
  const isTesting = skillCategories.testing.some((c) =>
    s.includes(c.toLowerCase())
  );
  const isTools = skillCategories.tools.some((c) =>
    s.includes(c.toLowerCase())
  );

  if (isFrontend)
    return "bg-blue-500/10 text-blue-500 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400";
  if (isBackend)
    return "bg-green-500/10 text-green-500 border-green-500/20 dark:bg-green-500/20 dark:text-green-400";
  if (isDevops)
    return "bg-purple-500/10 text-purple-500 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400";
  if (isTesting)
    return "bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400";
  if (isTools)
    return "bg-teal-500/10 text-teal-500 border-teal-500/20 dark:bg-teal-500/20 dark:text-teal-400";

  return "bg-surface text-muted-foreground border-border";
}
