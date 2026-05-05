import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact Section",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Contact Text",
      type: "localeText",
      description: "The text displayed in the contact section.",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", title: "GitHub URL", type: "url" },
        { name: "linkedin", title: "LinkedIn URL", type: "url" },
      ],
    }),
  ],
  preview: {
    select: { subtitle: "email" },
    prepare({ subtitle }: { subtitle?: string }) {
      return { title: "Contact Section", subtitle };
    },
  },
});
