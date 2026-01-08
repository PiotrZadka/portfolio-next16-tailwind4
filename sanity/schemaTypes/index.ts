import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { project } from "./project";
import { experience } from "./experience";
import { profile } from "./profile";
import { about } from "./about";
import { contact } from "./contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, experience, profile, about, contact],
};
