import { defineType, defineField } from "sanity";

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "pl",
      title: "Polish",
      type: "text",
      rows: 4,
    }),
  ],
});
