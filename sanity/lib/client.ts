import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

if (process.env.NODE_ENV === "development") {
  // This is a workaround for local SSL certificate issues
  // It should NOT be used in production
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Base client for production (published content only, uses CDN)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN in development for consistency
  perspective: "published",
});

// Preview client for drafts (no CDN, includes draft content)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "drafts",
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Helper to get the appropriate client based on preview mode
 * In development, always show drafts for convenience
 * In production, only show drafts when preview mode is enabled
 */
export function getClient(preview?: boolean) {
  const isDev = process.env.NODE_ENV === "development";
  if (preview || isDev) {
    return previewClient;
  }
  return client;
}

/**
 * Helper for fetching data with automatic draft/published handling
 */
export async function sanityFetch<T>({
  query,
  params = {},
  preview = false,
}: {
  query: string;
  params?: QueryParams;
  preview?: boolean;
}): Promise<T> {
  const isDev = process.env.NODE_ENV === "development";
  const activeClient = getClient(preview || isDev);
  return activeClient.fetch<T>(query, params);
}
