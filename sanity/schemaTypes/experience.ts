import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localeString",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "string",
      description: "e.g. Oct 2021",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "string",
      description: "e.g. Present or Dec 2023",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "impact",
      title: "Key Impact",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "pl",
          title: "Polish",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
      description: "Bullet points of achievements",
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Sort order. Higher number = shown first. Increment for each new role.",
    }),
    defineField({
      name: "parentId",
      title: "Parent Experience",
      type: "reference",
      to: [{ type: "experience" }],
      description: "If this role was a placement/contract under another employer, link it here. It will be nested inside the parent entry.",
    }),
  ],
  preview: {
    select: {
      title: "role.en",
      subtitle: "company.en",
    },
  },
});
