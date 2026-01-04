import { CaseStudy } from "@/types";

export const projects: CaseStudy[] = [
  {
    id: "nextjs-ai-sandbox",
    title: "Next.js & AI Agent Sandbox",
    slug: "nextjs-ai-sandbox",
    summary:
      "Personal project dedicated to mastering Next.js 16 and React 19 by configuring OpenCode CLI agents.",
    coverImage: "/images/projects/ai-sandbox.jpg", // Placeholder
    technologies: ["Next.js 16", "React 19", "OpenCode CLI", "AI Agents"],
    links: {
      repo: "https://github.com/PiotrZadka/next-js-opencode-practice",
    },
    content: {
      problem:
        "Needed a playground to master the latest Next.js features and explore the capabilities of AI agents in automating development workflows.",
      approach:
        "Configured OpenCode CLI agents to automate complex tasks and optimize architectural productivity while building with Next.js 16 and React 19.",
      results:
        "Established a robust environment for testing AI-driven development workflows and deepening knowledge of modern React patterns.",
    },
  },
  {
    id: "git-deps-notifier",
    title: "Git Deps Notifier",
    slug: "git-deps-notifier",
    summary:
      "Browser extension to monitor GitHub project dependencies with real-time tracking.",
    coverImage: "/images/projects/git-deps.jpg", // Placeholder
    technologies: ["Browser Extension", "JavaScript", "GitHub API"],
    links: {
      repo: "https://github.com/PiotrZadka/git-deps-notifier",
    },
    content: {
      problem:
        "Keeping track of dependency updates across multiple GitHub projects can be tedious and easily overlooked.",
      approach:
        "Developed a browser extension that interfaces with the GitHub API to monitor dependencies and provide real-time notifications.",
      results:
        "Published a useful tool for developers to stay on top of their project dependencies, automating the tracking process.",
    },
  },
  {
    id: "wiremock-article",
    title: "Wiremock Publication",
    slug: "wiremock-article",
    summary:
      "Technical guide on implementing WireMock to simulate API responses.",
    coverImage: "/images/projects/wiremock.jpg", // Placeholder
    technologies: ["WireMock", "Node.js", "API Testing", "Technical Writing"],
    links: {
      demo: "https://medium.com/@piotr.zadka/using-wiremock-to-substitute-weather-api-response-in-sample-node-js-project",
    },
    content: {
      problem:
        "External API dependencies can slow down local development and make testing flaky.",
      approach:
        "Authored a comprehensive technical guide on using WireMock to simulate API responses, eliminating the need for live external services during development.",
      results:
        "Enabled faster, isolated local development environments and shared knowledge with the wider developer community through a Medium article.",
    },
  },
];
