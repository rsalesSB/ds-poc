<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TabsList, TabsRoot } from 'reka-ui'
import { tabsListVariants } from './tabs.variants'

interface Props {
  modelValue?: string
  class?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <TabsRoot
    :model-value="props.modelValue"
    :class="cn('group/tabs flex flex-col gap-2', props.class)"
    @update:model-value="(value) => emit('update:modelValue', String(value))"
  >
    <TabsList :class="tabsListVariants()">
      <slot name="list" />
    </TabsList>
    <slot />
  </TabsRoot>
</template>
