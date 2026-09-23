import { cva } from 'class-variance-authority'

export const radioGroupItemVariants = cva(
  'peer relative flex aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-brand-600',
)

export const radioGroupIndicatorVariants = cva(
  'size-2 rounded-full bg-brand-600',
)
