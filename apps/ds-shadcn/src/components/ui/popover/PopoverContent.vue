<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  PopoverContent,
  PopoverPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

// Retokenized: dropped the tw-animate-css-dependent animate-in/out classes
// (same as Round 1's Dialog), bg-popover/text-popover-foreground/
// ring-foreground -> bg-neutral-100/text-neutral-900/border-neutral-300.
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    align: 'center',
    sideOffset: 4,
  },
)
const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'bg-neutral-100 text-neutral-900 border border-neutral-300 flex flex-col gap-4 rounded-md p-4 text-base shadow-md z-50 w-72 max-w-(--reka-popover-content-available-width) outline-none',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
