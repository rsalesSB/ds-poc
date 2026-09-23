<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

// Dropped the default/destructive variant axis — no destructive token in
// packages/tokens, same simplification as Button's variant trim in Round 1.
const props = withDefaults(defineProps<DropdownMenuItemProps & {
  class?: HTMLAttributes['class']
  inset?: boolean
}>(), {})

const delegatedProps = reactiveOmit(props, 'inset', 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    v-bind="forwardedProps"
    :class="cn('focus:bg-neutral-300 gap-2 rounded-sm px-2 py-1.5 text-base data-inset:pl-8 group/dropdown-menu-item relative flex cursor-default items-center outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50', props.class)"
  >
    <slot />
  </DropdownMenuItem>
</template>
