<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'reka-ui'

interface Props {
  open?: boolean
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  open: undefined,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <PopoverRoot :open="open" @update:open="(value) => emit('update:open', value)">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :side-offset="4"
        class="z-50 w-72 rounded-md border border-neutral-300 bg-neutral-100 p-4 text-base text-neutral-900 shadow-md outline-none"
      >
        <div v-if="title || description" class="mb-2 flex flex-col gap-1">
          <p v-if="title" class="text-heading font-bold text-neutral-900">{{ title }}</p>
          <p v-if="description" class="text-base text-neutral-900/70">{{ description }}</p>
        </div>
        <slot />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
