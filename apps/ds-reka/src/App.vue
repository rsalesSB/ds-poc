<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button.vue'
import Dialog from './components/Dialog.vue'
import Switch from './components/Switch.vue'

const enabled = ref(false)
</script>

<template>
  <main class="flex min-h-screen flex-col items-start gap-6 bg-neutral-100 p-8">
    <h1 class="text-heading font-bold text-neutral-900">ds-reka</h1>

    <div class="flex gap-3">
      <Button variant="primary" size="md">Primary</Button>
      <Button variant="secondary" size="md">Secondary</Button>
    </div>

    <Switch v-model="enabled" />

    <Dialog title="Confirm action" description="This is an example dialog from ds-reka.">
      <template #trigger>
        <Button variant="primary" size="sm">Open dialog</Button>
      </template>
      <Button variant="secondary" size="sm">Close</Button>
    </Dialog>
  </main>
</template>
