<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'

interface Props {
  open?: boolean
  delayDuration?: number
}

withDefaults(defineProps<Props>(), {
  open: undefined,
  delayDuration: 0,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot :open="open" @update:open="(value) => emit('update:open', value)">
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="z-50 w-fit max-w-xs rounded-md bg-neutral-900 px-3 py-1.5 text-base text-neutral-100"
          :side-offset="4"
        >
          <slot />
          <TooltipArrow class="fill-neutral-900" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
