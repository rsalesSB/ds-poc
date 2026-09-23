<script setup lang="ts">
import { DropdownMenuSeparator } from 'reka-ui'
import { dropdownMenuSeparatorVariants } from './dropdown-menu.variants'
</script>

<template>
  <DropdownMenuSeparator :class="dropdownMenuSeparatorVariants()" />
</template>
