import { defineField, defineType } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill / Technology",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      description:
        "Name of the skill or technology. Polish is optional — falls back to English if not set.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
});
