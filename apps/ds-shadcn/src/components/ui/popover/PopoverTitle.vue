<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// `cn-font-heading` is the same broken/undefined class already found and
// fixed on Dialog's title in Round 1 — not a valid Tailwind utility (leftover
// from the "vega" style preset pointing at a font token that doesn't exist).
const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="popover-title"
    :class="cn('text-heading font-bold text-neutral-900', props.class)"
  >
    <slot />
  </div>
</template>
