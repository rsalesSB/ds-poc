<script lang="ts" setup>
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

// 'ghost' Button variant was removed in Round 1 with no direct replacement
// for a borderless/transparent-until-hover day cell, so this no longer
// routes through buttonVariants() at all — a calendar day isn't really a
// themed Button in this DS's vocabulary, it needs its own hover/today/
// selected states. destructive-foreground/muted-foreground (no destructive
// token) -> neutral-900/40 for the "unavailable" state.
const props = withDefaults(defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'button',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    data-slot="calendar-cell-trigger"
    :class="cn(
      'inline-flex size-8 items-center justify-center rounded-md p-0 text-base font-regular transition-colors cursor-default hover:bg-neutral-300',
      '[&[data-today]:not([data-selected])]:bg-neutral-300',
      // Selected
      'data-[selected]:bg-brand-600 data-[selected]:text-neutral-100 data-[selected]:hover:bg-brand-600',
      // Disabled
      'data-[disabled]:text-neutral-900/40 data-[disabled]:opacity-50',
      // Unavailable
      'data-[unavailable]:text-neutral-900/40 data-[unavailable]:line-through',
      // Outside months
      'data-[outside-view]:text-neutral-900/40',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
