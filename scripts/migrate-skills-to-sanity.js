#!/usr/bin/env node
require("dotenv").config({ path: ".env.local" });

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

// Use v1 API instead of the future API version
const API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1`;

const SKILL_CATEGORIES = {
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

const FEATURED_SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "AWS",
  "Cypress",
  "OpenCode CLI",
  "Google Gemini",
];

async function main() {
  console.log("🚀 Starting Skills Migration to Sanity\n");
  console.log(`Project: ${SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${SANITY_DATASET}\n`);

  try {
    // Get profile ID using POST endpoint
    console.log("📍 Fetching profile document...");
    const queryResponse = await fetch(
      `${API_URL}/data/query/${SANITY_DATASET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SANITY_WRITE_TOKEN}`,
        },
        body: JSON.stringify({ query: '*[_type == "profile"][0]._id' }),
      }
    );
    
    const queryData = await queryResponse.json();
    const profileId = queryData.result;
    
    if (!profileId) {
      throw new Error(`Failed to fetch profile: ${JSON.stringify(queryData)}`);
    }
    
    console.log(`✓ Found profile ID: ${profileId}\n`);
    console.log("🔄 Preparing skill categories for Sanity...");

    const skillCategories = Object.entries(SKILL_CATEGORIES).map(([key, skills]) => ({
      _key: key,
      category: key,
      skills,
    }));

    const updateData = {
      mutations: [{
        patch: {
          id: profileId,
          set: {
            skills: FEATURED_SKILLS,
            skillCategories,
          },
        },
      }],
    };

    console.log("📤 Uploading skills to Sanity...");
    const mutateResponse = await fetch(
      `${API_URL}/data/mutate/${SANITY_DATASET}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SANITY_WRITE_TOKEN}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    const result = await mutateResponse.json();
    
    if (!mutateResponse.ok || result.error) {
      throw new Error(`Sanity mutation failed: ${result.message || mutateResponse.statusText}`);
    }

    if (result.results && result.results.length > 0) {
      console.log("\n✅ Migration Successful!\n");
      console.log(`Document: ${result.results[0].id}`);
      console.log(`Skills added: ${FEATURED_SKILLS.length} featured skills`);
      console.log(`Categories added: ${Object.keys(SKILL_CATEGORIES).length} categories`);
      console.log("\n📋 Featured Skills:");
      FEATURED_SKILLS.forEach(skill => console.log(`   • ${skill}`));
    }
  } catch (error) {
    console.error("\n❌ Migration Failed!");
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
