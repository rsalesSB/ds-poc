import { cva } from 'class-variance-authority'

export const comboboxAnchorVariants = cva(
  'flex h-10 w-full items-center gap-2 rounded-md border border-neutral-300 bg-neutral-100 px-3 transition-colors has-[input:focus-visible]:border-brand-600 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-brand-600',
)

export const comboboxInputVariants = cva(
  'flex-1 bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-900/50 disabled:cursor-not-allowed disabled:opacity-50',
)

export const comboboxContentVariants = cva(
  'z-50 max-h-72 min-w-36 overflow-hidden rounded-md border border-neutral-300 bg-neutral-100 text-neutral-900 shadow-md',
)

export const comboboxItemVariants = cva(
  'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-base outline-none select-none data-highlighted:bg-neutral-300 data-disabled:pointer-events-none data-disabled:opacity-50',
)

export const comboboxEmptyVariants = cva(
  'hidden w-full justify-center py-2 text-center text-base text-neutral-900/60 group-data-empty/combobox-content:flex',
)
