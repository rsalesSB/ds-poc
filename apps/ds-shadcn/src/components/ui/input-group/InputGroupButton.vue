<script setup lang="ts">
import type { InputGroupButtonProps } from '.'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { inputGroupButtonVariants } from '.'

// variant default was 'ghost', a Button variant removed in Round 1 (only
// primary/secondary exist) — this file is unused by this DS's Combobox but
// still type-checks as part of the project, so fixed to compile.
const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: 'xs',
  variant: 'secondary',
})
</script>

<template>
  <Button
    type="button"
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>
