<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

// Retokenized: dropped the animate-in/out classes (depended on tw-animate-css,
// already removed from the project) and the has-data-[slot=kbd]/**:data-[slot=kbd]
// keyboard-shortcut-hint styling (out of scope — no Kbd component in this DS).
// bg-foreground/text-background (shadcn's inverted-theme tokens) -> neutral-900/
// neutral-100, since the DS has no foreground/background semantic tokens.
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(), {
  sideOffset: 0,
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn('inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-3 py-1.5 text-base text-neutral-100 z-50 w-fit max-w-xs', props.class)"
    >
      <slot />

      <TooltipArrow class="size-2.5 rotate-45 rounded-xs bg-neutral-900 fill-neutral-900 z-50" />
    </TooltipContent>
  </TooltipPortal>
</template>
