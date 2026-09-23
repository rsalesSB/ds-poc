<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'

interface Props {
  modelValue?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <RadioGroupRoot
    :model-value="props.modelValue"
    :disabled="props.disabled"
    :class="['grid gap-3', props.class]"
    @update:model-value="(value) => emit('update:modelValue', String(value))"
  >
    <slot />
  </RadioGroupRoot>
</template>
