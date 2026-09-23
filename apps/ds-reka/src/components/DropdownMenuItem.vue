<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'
import { dropdownMenuItemVariants } from './dropdown-menu.variants'

interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  select: [event: Event]
}>()
</script>

<template>
  <DropdownMenuItem :disabled="disabled" :class="dropdownMenuItemVariants()" @select="(event) => emit('select', event)">
    <slot />
  </DropdownMenuItem>
</template>
