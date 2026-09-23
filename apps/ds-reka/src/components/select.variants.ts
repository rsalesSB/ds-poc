import { cva } from 'class-variance-authority'

export const selectTriggerVariants = cva(
  'flex h-10 w-fit items-center justify-between gap-1.5 whitespace-nowrap rounded-md border border-neutral-300 bg-neutral-100 px-3 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-neutral-900/50',
)

export const selectContentVariants = cva(
  'relative z-50 min-w-36 overflow-hidden rounded-md border border-neutral-300 bg-neutral-100 text-neutral-900 shadow-md',
)

export const selectItemVariants = cva(
  'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-base outline-none select-none focus:bg-neutral-300 data-disabled:pointer-events-none data-disabled:opacity-50',
)
