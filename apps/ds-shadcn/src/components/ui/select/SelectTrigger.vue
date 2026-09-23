<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

// Dropped the sm/default size axis (no size token equivalent, and the DS's
// Select only needs one height, matching Input's h-10). data-placeholder: is
// real — reka-ui's SelectTrigger does set that boolean attribute, confirmed
// consistent with the data-disabled convention already seen elsewhere.
const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="forwardedProps"
    :class="cn(
      'border border-neutral-300 bg-neutral-100 data-placeholder:text-neutral-900/50 gap-1.5 rounded-md h-10 px-3 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 flex w-fit items-center justify-between whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDownIcon class="text-neutral-900/60 size-4 pointer-events-none" />
    </SelectIcon>
  </SelectTrigger>
</template>
