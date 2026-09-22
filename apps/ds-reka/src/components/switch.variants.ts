import { cva } from 'class-variance-authority'

export const switchRootVariants = cva(
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-lg border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-neutral-300',
)

export const switchThumbVariants = cva(
  'pointer-events-none block h-5 w-5 rounded-md bg-neutral-100 shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5',
)
