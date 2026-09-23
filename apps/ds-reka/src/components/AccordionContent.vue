<script setup lang="ts">
import { AccordionContent } from 'reka-ui'
import { accordionContentVariants } from './accordion.variants'
</script>

<template>
  <AccordionContent :class="accordionContentVariants()">
    <div class="pb-4 text-neutral-900/80">
      <slot />
    </div>
  </AccordionContent>
</template>
