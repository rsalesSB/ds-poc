<script setup lang="ts">
import { AccordionRoot } from 'reka-ui'

interface Props {
  type?: 'single' | 'multiple'
  modelValue?: string | string[]
  collapsible?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  collapsible: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()
</script>

<template>
  <AccordionRoot
    :type="props.type as 'single'"
    :model-value="props.modelValue as string"
    :collapsible="props.collapsible"
    :class="['flex w-full flex-col', props.class]"
    @update:model-value="(value) => emit('update:modelValue', value as string | string[])"
  >
    <slot />
  </AccordionRoot>
</template>
