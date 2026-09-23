<script setup lang="ts">
import {
  SelectContent,
  SelectIcon,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { selectContentVariants, selectTriggerVariants } from './select.variants'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <SelectRoot
    :model-value="modelValue"
    :disabled="disabled"
    @update:model-value="(value) => emit('update:modelValue', String(value))"
  >
    <SelectTrigger :class="selectTriggerVariants()">
      <SelectValue :placeholder="placeholder" />
      <SelectIcon as-child>
        <svg viewBox="0 0 16 16" fill="none" class="size-4 shrink-0 text-neutral-900/60" aria-hidden="true">
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </SelectIcon>
    </SelectTrigger>
    <SelectPortal>
      <SelectContent :class="selectContentVariants()">
        <SelectViewport class="p-1">
          <slot />
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
