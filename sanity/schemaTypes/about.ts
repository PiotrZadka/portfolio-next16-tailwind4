import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "about",
      title: "About",
      type: "localeText",
      description: "Longer bio for the about page",
    }),
    defineField({
      name: "locationBio",
      title: "Location Sentence",
      type: "localeText",
      description: "Full sentence about your location & specialisation, e.g. 'Based in Leeds, UK, I specialize in...' — translatable.",
    }),
    defineField({
      name: "skills",
      title: "Featured Skills",
      type: "array",
      description: "List of top skills to display in the Technologies section",
      of: [{ type: "reference", to: { type: "skill" } }],
    }),
    defineField({
      name: "resumeEn",
      title: "Resume (English) — URL",
      type: "url",
      description:
        "URL to your English CV/Resume (Google Drive, Dropbox, etc.)",
    }),
    defineField({
      name: "resumeFileEn",
      title: "Resume (English) — File Upload",
      type: "file",
      description: "Upload your English CV/Resume directly to Sanity",
    }),
    defineField({
      name: "resumePl",
      title: "Resume (Polish) — URL",
      type: "url",
      description:
        "URL to your Polish CV/Resume (Google Drive, Dropbox, etc.)",
    }),
    defineField({
      name: "resumeFilePl",
      title: "Resume (Polish) — File Upload",
      type: "file",
      description: "Upload your Polish CV/Resume directly to Sanity",
    }),
  ],
  preview: {
    select: {
      subtitle: "location.en",
    },
    prepare() {
      return {
        title: "About Section",
      };
    },
  },
});
