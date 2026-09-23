<script setup lang="ts">
import type { ComboboxGroupProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxGroup, ComboboxLabel } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxGroupProps & {
  class?: HTMLAttributes['class']
  heading?: string
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxGroup
    data-slot="combobox-group"
    v-bind="delegatedProps"
    :class="cn('overflow-hidden text-neutral-900', props.class)"
  >
    <ComboboxLabel v-if="heading" class="text-neutral-900/60 px-2 py-1.5 text-base">
      {{ heading }}
    </ComboboxLabel>
    <slot />
  </ComboboxGroup>
</template>
