import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "about",
      title: "About",
      type: "text",
      rows: 4,
      description: "Longer bio for the about page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "skills",
      title: "Featured Skills",
      type: "array",
      description: "List of top skills to display in the Tech Stack section",
      of: [{ type: "string" }],
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
