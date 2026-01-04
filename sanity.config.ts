import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schema } from "./sanity/schemaTypes";
import { projectId, dataset } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool(), media()],
  schema,
});
