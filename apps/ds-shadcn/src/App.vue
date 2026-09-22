<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Switch } from './components/ui/switch'

const enabled = ref(false)
</script>

<template>
  <main class="flex min-h-screen flex-col items-start gap-6 bg-neutral-100 p-8">
    <h1 class="text-heading font-bold text-neutral-900">ds-shadcn</h1>

    <div class="flex gap-3">
      <Button variant="primary" size="md">Primary</Button>
      <Button variant="secondary" size="md">Secondary</Button>
    </div>

    <Switch v-model="enabled" />

    <Dialog>
      <DialogTrigger as-child>
        <Button variant="primary" size="sm">Abrir dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Confirmar ação</DialogTitle>
        <DialogDescription>Esta é uma dialog de exemplo do ds-shadcn, gerada pelo shadcn-vue e retokenizada.</DialogDescription>
        <DialogClose as-child>
          <Button variant="secondary" size="sm">Fechar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  </main>
</template>
