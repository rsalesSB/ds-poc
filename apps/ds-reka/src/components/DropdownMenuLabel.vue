<script setup lang="ts">
import { DropdownMenuLabel } from 'reka-ui'
import { dropdownMenuLabelVariants } from './dropdown-menu.variants'
</script>

<template>
  <DropdownMenuLabel :class="dropdownMenuLabelVariants()">
    <slot />
  </DropdownMenuLabel>
</template>
