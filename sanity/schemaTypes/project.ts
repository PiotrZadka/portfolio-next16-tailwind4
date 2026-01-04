import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
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
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
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
        { name: "problem", title: "The Problem", type: "text", rows: 5 },
        { name: "approach", title: "The Approach", type: "text", rows: 5 },
        { name: "results", title: "The Results", type: "text", rows: 5 },
      ],
    }),
  ],
});
