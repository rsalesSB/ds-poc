// Decisão: mantido como o CLI gerou — os componentes ui/* seguem usando cn()
// para mesclar variant classes (CVA) com overrides via prop `class`.
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
