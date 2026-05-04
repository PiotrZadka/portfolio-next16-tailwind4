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
      name: "tagline",
      title: "Tagline",
      type: "localeString",
      description: "A short, catchy phrase for the hero section.",
    }),
  ],
  preview: {
    select: {
      title: "documentTitle",
      subtitle: "name",
    },
  },
});

