import { cva } from 'class-variance-authority'

export const calendarNavButtonVariants = cva(
  'inline-flex size-7 items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 p-0 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
)

export const calendarCellTriggerVariants = cva(
  'inline-flex size-8 items-center justify-center rounded-md p-0 text-base font-regular transition-colors cursor-default hover:bg-neutral-300 [&[data-today]:not([data-selected])]:bg-neutral-300 data-[selected]:bg-brand-600 data-[selected]:text-neutral-100 data-[selected]:hover:bg-brand-600 data-[disabled]:text-neutral-900/40 data-[disabled]:opacity-50 data-[unavailable]:text-neutral-900/40 data-[unavailable]:line-through data-[outside-view]:text-neutral-900/40',
)
