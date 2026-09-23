<script setup lang="ts">
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from 'reka-ui'
import { dropdownMenuIndicatorItemVariants } from './dropdown-menu.variants'

interface Props {
  modelValue?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <DropdownMenuCheckboxItem
    :model-value="modelValue"
    :class="dropdownMenuIndicatorItemVariants()"
    @update:model-value="(value) => emit('update:modelValue', value)"
  >
    <span class="pointer-events-none absolute right-2 flex items-center justify-center">
      <DropdownMenuItemIndicator>✓</DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
