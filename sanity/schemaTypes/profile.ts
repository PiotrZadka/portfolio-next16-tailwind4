import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "documentTitle",
      title: "Document Title",
      type: "string",
      description: "Internal name for this document in the Studio",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "localeString",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "localeString",
      description: "A short, catchy phrase for the hero section.",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    }),
  ],
  preview: {
    select: {
      title: "documentTitle",
      subtitle: "name",
    },
  },
});
