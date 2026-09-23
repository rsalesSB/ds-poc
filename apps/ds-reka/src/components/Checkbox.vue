<script setup lang="ts">
import { cn } from '@/lib/utils'
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { checkboxIndicatorVariants, checkboxRootVariants } from './checkbox.variants'

interface Props {
  modelValue?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <CheckboxRoot
    :model-value="props.modelValue"
    :disabled="props.disabled"
    :class="cn(checkboxRootVariants(), props.class)"
    @update:model-value="(value) => emit('update:modelValue', value === true)"
  >
    <CheckboxIndicator :class="checkboxIndicatorVariants()">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        class="size-3.5"
        aria-hidden="true"
      >
        <path
          d="M13.5 4.5L6 12L2.5 8.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
