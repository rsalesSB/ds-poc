import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

// Variants/sizes trimmed down from 6 variants x 8 sizes (default/outline/
// secondary/ghost/destructive/link, default/xs/sm/lg/icon/icon-xs/icon-sm/
// icon-lg) to primary/secondary x sm/md — the only combos the DS defines
// (shadcn color tokens like bg-destructive, text-primary/underline etc.
// don't exist in packages/tokens) — and classes swapped for --ds-* tokens.
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-regular transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-neutral-100 hover:bg-brand-700',
        secondary:
          'bg-neutral-100 text-neutral-900 border border-neutral-300 hover:bg-neutral-300',
      },
      size: {
        sm: 'h-8 px-3 text-base',
        md: 'h-10 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
