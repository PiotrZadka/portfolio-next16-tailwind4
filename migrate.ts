import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function migrate() {
  console.log("Starting full data migration...");

  // 1. Fetch all documents
  const documents = await client.fetch(`*[_type in ["about", "profile", "contact", "experience", "project", "post"]]`);
  
  console.log(`Found ${documents.length} documents to migrate.`);

  // --- PART A: MIGRATE SKILLS TO REFERENCES ---
  const uniqueSkills = new Set<string>();
  for (const doc of documents) {
    const list = doc.skills || doc.technologies || [];
    for (const item of list) {
      if (typeof item === "string") uniqueSkills.add(item);
    }
  }

  const skillIdMap = new Map<string, string>();
  const existingSkills = await client.fetch(`*[_type == "skill"]`);
  for (const skill of existingSkills) {
    if (skill.title) skillIdMap.set(skill.title.toLowerCase(), skill._id);
  }

  for (const skillName of uniqueSkills) {
    const lowerName = skillName.toLowerCase();
    if (!skillIdMap.has(lowerName)) {
      console.log(`Creating skill: ${skillName}`);
      const newSkill = await client.create({ _type: "skill", title: skillName });
      skillIdMap.set(lowerName, newSkill._id);
    }
  }

  // --- PART B: MIGRATE STRINGS TO LOCALE OBJECTS ---
  const migrateString = (val: any) => typeof val === "string" ? { _type: "localeString", en: val } : undefined;
  const migrateText = (val: any) => typeof val === "string" ? { _type: "localeText", en: val } : undefined;

  for (const doc of documents) {
    let patches: any = {};

    // 1. Handle singletons & general string fields
    if (doc._type === "about") {
      if (typeof doc.about === "string") patches.about = migrateText(doc.about);
      if (typeof doc.location === "string") patches.location = migrateString(doc.location);
    }
    if (doc._type === "profile") {
      if (typeof doc.title === "string") patches.title = migrateString(doc.title);
      if (typeof doc.tagline === "string") patches.tagline = migrateString(doc.tagline);
    }
    if (doc._type === "contact") {
      if (typeof doc.text === "string") patches.text = migrateText(doc.text);
    }
    if (doc._type === "experience") {
      if (typeof doc.role === "string") patches.role = migrateString(doc.role);
      if (typeof doc.startDate === "string") patches.startDate = migrateString(doc.startDate);
      if (typeof doc.endDate === "string") patches.endDate = migrateString(doc.endDate);
      if (typeof doc.description === "string") patches.description = migrateText(doc.description);
      if (Array.isArray(doc.impact) && doc.impact.length > 0 && typeof doc.impact[0] === "string") {
        patches.impact = { en: doc.impact };
      }
    }
    if (doc._type === "project") {
      if (typeof doc.title === "string") patches.title = migrateString(doc.title);
      if (typeof doc.summary === "string") patches.summary = migrateText(doc.summary);
      
      if (doc.content && typeof doc.content.problem === "string") {
        patches.content = {
          ...doc.content,
          problem: migrateText(doc.content.problem),
          approach: migrateText(doc.content.approach),
          results: migrateText(doc.content.results),
        };
      }
    }
    if (doc._type === "post") {
      if (typeof doc.title === "string") patches.title = migrateString(doc.title);
      if (typeof doc.excerpt === "string") patches.excerpt = migrateText(doc.excerpt);
      if (typeof doc.linkedinHook === "string") patches.linkedinHook = migrateText(doc.linkedinHook);
      if (Array.isArray(doc.content)) {
        patches.content = { en: doc.content };
      }
    }

    // 2. Handle skills/technologies references
    const list = doc.skills || doc.technologies;
    if (list && Array.isArray(list) && list.some((item: any) => typeof item === "string")) {
      const fieldToUpdate = (doc._type === "experience" || doc._type === "project") ? "technologies" : "skills";
      patches[fieldToUpdate] = list.map((item: any) => {
        if (typeof item === "string") {
          const refId = skillIdMap.get(item.toLowerCase());
          return refId ? { _type: "reference", _key: Math.random().toString(36).substring(7), _ref: refId } : null;
        }
        return item;
      }).filter(Boolean);
    }

    // Commit patches if any exist
    if (Object.keys(patches).length > 0) {
      console.log(`Patching ${doc._type} (${doc._id}) to prevent data loss...`);
      await client.patch(doc._id).set(patches).commit();
    }
  }

  console.log("Migration completely finished! Your text is now safe in the 'en' fields.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
