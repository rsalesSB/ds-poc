import { cva } from 'class-variance-authority'

export const dropdownMenuContentVariants = cva(
  'z-50 min-w-32 rounded-md border border-neutral-300 bg-neutral-100 p-1 text-neutral-900 shadow-md',
)

export const dropdownMenuItemVariants = cva(
  'group/dropdown-menu-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-base outline-none select-none focus:bg-neutral-300 data-disabled:pointer-events-none data-disabled:opacity-50',
)

export const dropdownMenuIndicatorItemVariants = cva(
  'relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-base outline-none select-none focus:bg-neutral-300 data-disabled:pointer-events-none data-disabled:opacity-50',
)

export const dropdownMenuLabelVariants = cva('px-2 py-1.5 text-base font-regular text-neutral-900/60')

export const dropdownMenuSeparatorVariants = cva('-mx-1 my-1 h-px bg-neutral-300')
