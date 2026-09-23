<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

// Bug found, not a token swap: `data-horizontal:flex-col` never matched
// anything — TabsRoot exposes orientation as a value attribute
// (data-orientation="horizontal"/"vertical"), not a boolean data-horizontal
// flag (confirmed by rendering it directly). Fixed to
// data-[orientation=vertical]:flex-col below.
const props = defineProps<TabsRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<TabsRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TabsRoot
    v-slot="slotProps"
    data-slot="tabs"
    :data-orientation="forwarded.orientation || 'horizontal'"
    v-bind="forwarded"
    :class="cn('gap-2 group/tabs flex data-[orientation=vertical]:flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </TabsRoot>
</template>
