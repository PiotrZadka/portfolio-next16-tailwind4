import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { project } from "./project";
import { experience } from "./experience";
import { profile } from "./profile";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, experience, profile],
};
