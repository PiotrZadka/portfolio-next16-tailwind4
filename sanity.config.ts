import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schema } from "./sanity/schemaTypes";
import { projectId, dataset } from "./sanity/env";
import type { StructureResolver } from "sanity/structure";

// Singletons = documents where only ONE should ever exist (no delete, no create new)
const singletonTypes = new Set(["about", "contact"]);

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // --- Singletons (no delete button) ---
      S.listItem()
        .title("About Section")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Contact")
        .id("contact")
        .child(S.document().schemaType("contact").documentId("contact")),

      S.divider(),

      // --- Regular list documents (delete button available) ---
      S.documentTypeListItem("profile").title("Profile"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("post").title("Blog Posts"),

      S.divider(),

      S.documentTypeListItem("skill").title("Skills / Technologies"),
    ]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
  ],
  schema,
  document: {
    // Hide new-document action for singleton types
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((item) => !singletonTypes.has(item.templateId));
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        // Singletons: remove Delete and Duplicate
        return prev.filter(
          ({ action }) => action !== "delete" && action !== "duplicate"
        );
      }
      return prev;
    },
  },
});

