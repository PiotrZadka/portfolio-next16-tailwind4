import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

if (process.env.NODE_ENV === "development") {
  // This is a workaround for local SSL certificate issues
  // It should NOT be used in production
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
