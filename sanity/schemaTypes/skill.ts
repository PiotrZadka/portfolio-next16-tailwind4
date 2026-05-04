import { defineField, defineType } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill / Technology",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Name of the skill or technology (e.g. React, Next.js)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "Optional icon for the skill",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Tools", value: "tools" },
          { title: "Other", value: "other" },
        ],
      },
    }),
  ],
});
