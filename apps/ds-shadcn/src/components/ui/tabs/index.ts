import { cva } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'

// Dropped the default/line variant axis: "line" (underlined, transparent
// background) has no equivalent in the DS's token set (no separate
// background-vs-underline treatment defined), so only one list style
// remains — same simplification as Button's variant trim.
// group-data-horizontal/tabs:h-9 / group-data-vertical/tabs:* were also
// dead selectors (same bug as Tabs.vue's data-horizontal:), fixed to
// group-data-[orientation=...]/tabs:.
export const tabsListVariants = cva(
  'rounded-lg p-0.75 bg-neutral-300/40 group-data-[orientation=horizontal]/tabs:h-9 group/tabs-list inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
)
