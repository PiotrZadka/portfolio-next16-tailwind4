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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Featured Skills",
      type: "array",
      description: "List of featured skills to display on the about page",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "skillCategories",
      title: "Skill Categories",
      type: "array",
      description: "Categories of skills with their associated technologies",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "category",
              title: "Category Name",
              type: "string",
              options: {
                list: [
                  { title: "Frontend", value: "frontend" },
                  { title: "Backend", value: "backend" },
                  { title: "DevOps", value: "devops" },
                  { title: "Testing", value: "testing" },
                  { title: "Tools & AI", value: "tools" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "skills",
              title: "Skills",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: "category",
              subtitle: "skills",
            },
            prepare(selection: any) {
              return {
                title: selection.title,
                subtitle: selection.subtitle?.join(", ") || "No skills",
              };
            },
          },
        },
      ],
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
