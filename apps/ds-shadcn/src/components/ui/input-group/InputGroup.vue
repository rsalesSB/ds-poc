<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="input-group"
    role="group"
    :class="cn(
      'border-neutral-300 has-[[data-slot=input-group-control]:focus-visible]:border-brand-600 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-brand-600 h-10 rounded-md border transition-colors group/input-group relative flex w-full min-w-0 items-center px-3 outline-none',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
