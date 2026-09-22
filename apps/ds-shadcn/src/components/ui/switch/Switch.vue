<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  SwitchRoot,
  SwitchThumb,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

// `size` prop (sm/default) removed: it used data-[size=...] tied to shadcn
// theme dimensions (h-[18.4px]/w-8 vs h-3.5/w-6) with no equivalent in the
// DS tokens. The DS doesn't define a small switch, so a single size is
// kept — same as the ds-reka Switch.
const props = defineProps<SwitchRootProps & {
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    data-slot="switch"
    v-bind="forwarded"
    :class="cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-lg border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-neutral-300',
      props.class,
    )"
  >
    <SwitchThumb
      data-slot="switch-thumb"
      class="pointer-events-none block h-5 w-5 rounded-md bg-neutral-100 shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
    />
  </SwitchRoot>
</template>
