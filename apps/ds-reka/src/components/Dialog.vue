<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

interface Props {
  open?: boolean
  title: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogRoot :open="props.open" @update:open="(value) => emit('update:open', value)">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-neutral-900/50" />
      <DialogContent
        class="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-100 p-6 shadow-lg focus:outline-none"
      >
        <DialogTitle class="text-heading font-bold text-neutral-900">
          {{ props.title }}
        </DialogTitle>
        <DialogDescription v-if="props.description" class="mt-2 text-base text-neutral-900/70">
          {{ props.description }}
        </DialogDescription>

        <div class="mt-4">
          <slot />
        </div>

        <DialogClose
          class="absolute top-4 right-4 rounded-md text-base text-neutral-900/60 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          aria-label="Fechar"
        >
          ✕
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
