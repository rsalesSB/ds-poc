import { cva } from 'class-variance-authority'

export const checkboxRootVariants = cva(
  'peer relative flex size-4 shrink-0 items-center justify-center rounded-sm border border-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-brand-600 data-[state=checked]:bg-brand-600',
)

export const checkboxIndicatorVariants = cva('grid place-content-center text-neutral-100')
