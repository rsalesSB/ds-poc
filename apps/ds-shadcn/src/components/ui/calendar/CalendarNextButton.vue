<script lang="ts" setup>
import type { CalendarNextProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarNext, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

// Same fixes as CalendarPrevButton: 'outline' -> 'secondary', dropped the
// cn-rtl-flip broken class.
const props = defineProps<CalendarNextProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarNext
    data-slot="calendar-next-button"
    :class="cn(
      buttonVariants({ variant: 'secondary' }),
      'pointer-events-auto size-7 p-0 opacity-70 hover:opacity-100',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRightIcon class="size-4" />
    </slot>
  </CalendarNext>
</template>
