<script lang="ts" setup>
import type { CalendarPrevProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { ChevronLeftIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarPrev, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

// variant: 'outline' was removed from Button in Round 1 -> 'secondary'.
// `cn-rtl-flip` is a FIFTH instance of the cn-* broken-class family found
// this round (same as cn-font-heading/cn-menu-translucent) — dropped (RTL
// icon mirroring is out of scope, this DS has no --rtl story).
const props = defineProps<CalendarPrevProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarPrev
    data-slot="calendar-prev-button"
    :class="cn(
      buttonVariants({ variant: 'secondary' }),
      'pointer-events-auto size-7 p-0 opacity-70 hover:opacity-100',
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeftIcon class="size-4" />
    </slot>
  </CalendarPrev>
</template>
