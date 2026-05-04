import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "about",
      title: "About",
      type: "localeText",
      description: "Longer bio for the about page",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
    }),
    defineField({
      name: "skills",
      title: "Featured Skills",
      type: "array",
      description: "List of top skills to display in the Technologies section",
      of: [{ type: "reference", to: { type: "skill" } }],
    }),
    defineField({
      name: "resume",
      title: "Resume URL",
      type: "url",
      description:
        "URL to your CV/Resume (e.g. Google Drive, Dropbox, or Sanity file)",
    }),
    defineField({
      name: "resumeFile",
      title: "Resume File",
      type: "file",
      description: "Upload your CV/Resume directly to Sanity",
    }),
  ],
});
