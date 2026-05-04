import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { project } from "./project";
import { experience } from "./experience";
import { profile } from "./profile";
import { about } from "./about";
import { contact } from "./contact";
import { localeString } from "./localeString";
import { localeText } from "./localeText";
import { skill } from "./skill";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    localeString,
    localeText,
    skill,
    post,
    project,
    experience,
    profile,
    about,
    contact,
  ],
};
