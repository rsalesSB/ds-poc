<script setup lang="ts">
import { TabsContent } from 'reka-ui'

interface Props {
  value: string
}

defineProps<Props>()
</script>

<template>
  <TabsContent :value="value" class="flex-1 text-base outline-none">
    <slot />
  </TabsContent>
</template>
