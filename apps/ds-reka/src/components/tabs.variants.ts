import { cva } from 'class-variance-authority'

export const tabsListVariants = cva(
  'inline-flex w-fit items-center justify-center rounded-lg bg-neutral-300/40 p-1 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
)

export const tabsTriggerVariants = cva(
  'relative inline-flex h-8 flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-base font-regular text-neutral-900/70 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm',
)
