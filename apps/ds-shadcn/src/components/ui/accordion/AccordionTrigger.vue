<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import {
  AccordionHeader,
  AccordionTrigger,
} from 'reka-ui'
import { cn } from '@/lib/utils'

// Retokenized: ring-ring/border-ring -> ring-brand-600, text-muted-foreground
// -> text-neutral-900/60, text-sm -> text-base. group-aria-expanded/...
// left as-is — aria-expanded is a real, standard attribute AccordionTrigger
// sets, not one of the dead data-* selectors found in the other components.
const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegatedProps"
      :class="
        cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 **:data-[slot=accordion-trigger-icon]:text-neutral-900/60 rounded-md py-4 text-left text-base font-regular hover:underline **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between transition-colors disabled:pointer-events-none disabled:opacity-50',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDownIcon data-slot="accordion-trigger-icon" class="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" class="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
