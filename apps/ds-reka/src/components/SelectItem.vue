<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui'
import { selectItemVariants } from './select.variants'

interface Props {
  value: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>

<template>
  <SelectItem :value="value" :disabled="disabled" :class="selectItemVariants()">
    <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      <SelectItemIndicator>✓</SelectItemIndicator>
    </span>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
