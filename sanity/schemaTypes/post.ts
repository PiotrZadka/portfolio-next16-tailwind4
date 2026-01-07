import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: "e.g. 5 min read",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      description: "If this post is hosted elsewhere (e.g. Medium)",
    }),
    defineField({
      name: "linkedinHook",
      title: "LinkedIn Hook",
      type: "text",
      rows: 2,
      description:
        "2-line hook for LinkedIn post (150 chars max). Stops the scroll!",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "socialImage",
      title: "Social Preview Image",
      type: "image",
      description:
        "Custom image for social sharing (1200x630). If not set, auto-generated OG image will be used.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
    },
  },
});
