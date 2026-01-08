import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short bio for the hero section",
    }),
    defineField({
      name: "about",
      title: "About",
      type: "text",
      rows: 4,
      description: "Longer bio for the about page",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", title: "GitHub URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
        { name: "twitter", title: "Twitter/X URL", type: "url" },
      ],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      description: "List of featured skills to display on the about page",
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
  ],
});
