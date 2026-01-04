import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "string",
      description: "e.g. Oct 2021",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "string",
      description: "e.g. Present or Dec 2023",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "impact",
      title: "Key Impact",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points of achievements",
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
      name: "order",
      title: "Order",
      type: "number",
      description: "Used to sort experience (higher numbers first)",
    }),
  ],
  preview: {
    select: {
      title: "role",
      subtitle: "company",
    },
  },
});
