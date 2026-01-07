import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the estimated reading time for a given content string or Sanity Portable Text.
 * Average reading speed: 225 words per minute.
 */
export function calculateReadingTime(content: any): number {
  if (!content) return 0;

  let text = "";

  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    // Handle Sanity Portable Text (array of blocks)
    text = content
      .map((block) => {
        if (block._type !== "block" || !block.children) return "";
        return block.children.map((child: any) => child.text).join(" ");
      })
      .join(" ");
  }

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 225);

  return minutes;
}
