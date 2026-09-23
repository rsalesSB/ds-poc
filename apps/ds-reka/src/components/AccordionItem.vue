<script setup lang="ts">
import { AccordionItem } from 'reka-ui'
import { accordionItemVariants } from './accordion.variants'

interface Props {
  value: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>

<template>
  <AccordionItem :value="value" :disabled="disabled" :class="accordionItemVariants()">
    <slot />
  </AccordionItem>
</template>
