import { cva } from 'class-variance-authority'

export const accordionItemVariants = cva('not-last:border-b border-neutral-300')

export const accordionTriggerVariants = cva(
  'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md py-4 text-left text-base font-regular transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
)

export const accordionContentVariants = cva('overflow-hidden text-base')
