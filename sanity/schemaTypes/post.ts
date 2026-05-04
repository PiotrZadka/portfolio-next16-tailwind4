import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
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
      name: "excerpt",
      title: "Excerpt",
      type: "localeText",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (Override)",
      type: "string",
      description:
        "Optional: Manually set reading time (e.g. '5 min read'). If empty, it will be calculated automatically.",
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
      type: "localeText",
      description:
        "2-line hook for LinkedIn post (150 chars max). Stops the scroll!",
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
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
        },
        {
          name: "pl",
          title: "Polish",
          type: "array",
          of: [{ type: "block" }, { type: "image" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "date",
    },
  },
});
