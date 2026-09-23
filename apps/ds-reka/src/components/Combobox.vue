<script setup lang="ts">
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxViewport,
} from 'reka-ui'
import {
  comboboxAnchorVariants,
  comboboxContentVariants,
  comboboxEmptyVariants,
  comboboxInputVariants,
} from './combobox.variants'

interface Props {
  modelValue?: string
  placeholder?: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <ComboboxRoot
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', String(value))"
  >
    <ComboboxAnchor :class="comboboxAnchorVariants()">
      <ComboboxInput :placeholder="placeholder" :class="comboboxInputVariants()" />
    </ComboboxAnchor>
    <ComboboxPortal>
      <ComboboxContent :class="[comboboxContentVariants(), 'group/combobox-content']">
        <ComboboxViewport class="p-1">
          <ComboboxEmpty :class="comboboxEmptyVariants()">
            <slot name="empty">No results found.</slot>
          </ComboboxEmpty>
          <slot />
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
