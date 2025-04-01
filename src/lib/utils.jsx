// eslint-disable-next-line import/no-extraneous-dependencies
import {clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
