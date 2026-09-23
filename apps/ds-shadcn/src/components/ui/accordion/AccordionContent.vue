<script setup lang="ts">
import type { AccordionContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent } from 'reka-ui'
import { cn } from '@/lib/utils'

// data-open:animate-accordion-down/data-closed:animate-accordion-up
// referenced two custom keyframes (animate-accordion-down/up) that only
// exist when registered in a Tailwind config extension — we have no
// tailwind.config.js (Tailwind v4 CSS-first, no @keyframes added to
// @theme), so these were undefined utility classes, dropped. text-foreground
// (no equivalent) -> text-neutral-900.
const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="text-base overflow-hidden"
  >
    <div
      :class="cn(
        'pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-neutral-900 [&_p:not(:last-child)]:mb-4',
        props.class,
      )"
    >
      <slot />
    </div>
  </AccordionContent>
</template>
