<script setup lang="ts">
import { cn } from '@/lib/utils'
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui'
import { radioGroupIndicatorVariants, radioGroupItemVariants } from './radio-group.variants'

interface Props {
  value: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>

<template>
  <RadioGroupItem
    :value="props.value"
    :disabled="props.disabled"
    :class="cn(radioGroupItemVariants(), props.class)"
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <div :class="radioGroupIndicatorVariants()" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
