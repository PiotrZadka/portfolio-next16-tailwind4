#!/usr/bin/env node
require("dotenv").config({ path: ".env.local" });

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

const API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1`;

async function main() {
  console.log("🚀 Starting Section Migration\n");
  console.log(`Project: ${SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${SANITY_DATASET}\n`);

  try {
    // Fetch the existing profile document
    console.log("📍 Fetching profile document...");
    const profileQuery = await fetch(
      `${API_URL}/data/query/${SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
        },
        body: JSON.stringify({
          query:
            '*[_type == "profile"][0] { _id, title, tagline, about, location, skills, skillCategories, resume, resumeFile }',
        }),
      }
    );

    const profileData = await profileQuery.json();
    const profile = profileData.result;

    if (!profile) {
      throw new Error("Profile document not found");
    }

    console.log(`✓ Found profile\n`);

    // Prepare mutations for creating hero, about, and contact sections
    const mutations = [];

    // Create or update hero section
    console.log("🔄 Preparing hero section...");
    mutations.push({
      createOrReplace: {
        _type: "hero",
        _id: "hero",
        title: profile.title || "Full-stack Developer",
        tagline: profile.tagline || "",
      },
    });

    // Create or update about section
    console.log("🔄 Preparing about section...");
    mutations.push({
      createOrReplace: {
        _type: "about",
        _id: "about",
        about: profile.about || "",
        location: profile.location || "",
        skills: profile.skills || [],
        skillCategories: profile.skillCategories || [],
        resume: profile.resume || null,
        resumeFile: profile.resumeFile || null,
      },
    });

    // Create or update contact section
    console.log("🔄 Preparing contact section...");
    mutations.push({
      createOrReplace: {
        _type: "contact",
        _id: "contact",
        email: profile.email || "",
        social: profile.social || {},
      },
    });

    // Send all mutations
    console.log("📤 Uploading sections to Sanity...\n");
    const mutateResponse = await fetch(
      `${API_URL}/data/mutate/${SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      }
    );

    const result = await mutateResponse.json();

    if (!mutateResponse.ok || result.error) {
      throw new Error(
        `Sanity mutation failed: ${result.message || mutateResponse.statusText}`
      );
    }

    if (result.results && result.results.length > 0) {
      console.log("✅ Migration Successful!\n");
      console.log("📋 Created sections:");
      console.log("   ✓ Hero section (with title and tagline)");
      console.log("   ✓ About section (with bio, location, skills)");
      console.log("   ✓ Contact section (with email and social links)\n");
      console.log(
        "💡 Tip: Your Profile document now only contains name, email, and social links."
      );
      console.log(
        "   All page-specific content is now in separate section documents."
      );
    }
  } catch (error) {
    console.error("\n❌ Migration Failed!");
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
