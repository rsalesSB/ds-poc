<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { CheckIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

// Retokenized to --ds-* (border-input/bg-primary/etc. -> border-neutral-300/
// bg-brand-600/etc.), dropped dark mode + aria-invalid/destructive styling
// (no destructive token in packages/tokens). Also fixed a real bug found
// while doing this: the CLI-generated classes used `data-checked:`/
// `data-unchecked:` selectors, but CheckboxRoot actually sets
// `data-state="checked"|"unchecked"` (confirmed by rendering it) — the
// generated checked-state styling never matched anything and was silently
// dead. Using `data-[state=checked]:` here, not a token-only swap.
const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="cn('border-neutral-300 data-[state=checked]:bg-brand-600 data-[state=checked]:text-neutral-100 data-[state=checked]:border-brand-600 flex size-4 items-center justify-center rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 peer relative shrink-0 disabled:cursor-not-allowed disabled:opacity-50', props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="[&>svg]:size-3.5 grid place-content-center text-current transition-none"
    >
      <slot v-bind="slotProps">
        <CheckIcon />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
