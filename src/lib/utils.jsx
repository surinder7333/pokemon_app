import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally.
 * Uses clsx for conditional merging and tailwind-merge to remove conflicting classes.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
