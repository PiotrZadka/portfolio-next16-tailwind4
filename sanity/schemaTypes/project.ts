import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localeText",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        { name: "demo", title: "Demo URL", type: "url" },
        { name: "repo", title: "Repo URL", type: "url" },
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "object",
      fields: [
        { name: "problem", title: "The Problem", type: "localeText" },
        { name: "approach", title: "The Approach", type: "localeText" },
        { name: "results", title: "The Results", type: "localeText" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "coverImage",
    },
  },
});
