// Decision: kept as the CLI generated it — the ui/* components keep using
// cn() to merge variant classes (CVA) with overrides via the `class` prop.
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
