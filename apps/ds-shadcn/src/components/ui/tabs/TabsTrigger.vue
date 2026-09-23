<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    :class="cn(
      'rounded-md px-3 py-1.5 text-base font-regular relative inline-flex h-[calc(100%-6px)] flex-1 items-center justify-center whitespace-nowrap text-neutral-900/70 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-neutral-100 data-active:text-neutral-900 data-active:shadow-sm',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </TabsTrigger>
</template>
