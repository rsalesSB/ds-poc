<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { accordionTriggerVariants } from './accordion.variants'
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger :class="accordionTriggerVariants()">
      <slot />
      <svg
        viewBox="0 0 16 16"
        fill="none"
        class="ml-auto size-4 shrink-0 text-neutral-900/60 transition-transform group-aria-expanded/accordion-trigger:rotate-180"
        aria-hidden="true"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </AccordionTrigger>
  </AccordionHeader>
</template>
