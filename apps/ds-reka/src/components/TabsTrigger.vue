<script setup lang="ts">
import { TabsTrigger } from 'reka-ui'
import { tabsTriggerVariants } from './tabs.variants'

interface Props {
  value: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>

<template>
  <TabsTrigger :value="value" :disabled="disabled" :class="tabsTriggerVariants()">
    <slot />
  </TabsTrigger>
</template>
