<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxItem
    data-slot="combobox-item"
    v-bind="forwarded"
    :class="cn('data-highlighted:bg-neutral-300 gap-2 rounded-sm py-1.5 pr-8 pl-2 text-base relative flex w-full cursor-default items-center outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50', props.class)"
  >
    <slot />
  </ComboboxItem>
</template>
