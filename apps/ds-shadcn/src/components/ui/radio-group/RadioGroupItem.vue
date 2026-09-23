<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { CircleIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from 'reka-ui'
import { cn } from '@/lib/utils'

// Retokenized to --ds-* + fixed the same dead-selector bug found in
// Checkbox: generated classes used `data-checked:`, but RadioGroupItem sets
// `data-state="checked"|"unchecked"` — using `data-[state=checked]:` here.
const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'border-neutral-300 data-[state=checked]:border-brand-600 flex size-4 rounded-full peer relative aspect-square shrink-0 border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="flex size-4 items-center justify-center"
    >
      <slot>
        <CircleIcon class="bg-brand-600 absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
