<script setup lang="ts">
import { cn } from '@/lib/utils'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { switchRootVariants, switchThumbVariants } from './switch.variants'

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
  <SwitchRoot
    :model-value="props.modelValue"
    :disabled="props.disabled"
    :class="cn(switchRootVariants(), props.class)"
    @update:model-value="(value) => emit('update:modelValue', value)"
  >
    <SwitchThumb :class="switchThumbVariants()" />
  </SwitchRoot>
</template>
