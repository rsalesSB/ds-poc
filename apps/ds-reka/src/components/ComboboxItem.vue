<script setup lang="ts">
import { ComboboxItem } from 'reka-ui'
import { comboboxItemVariants } from './combobox.variants'

interface Props {
  value: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>

<template>
  <ComboboxItem :value="value" :disabled="disabled" :class="comboboxItemVariants()">
    <slot />
  </ComboboxItem>
</template>
