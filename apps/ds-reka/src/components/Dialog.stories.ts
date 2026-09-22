import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Button from './Button.vue'
import Dialog from './Dialog.vue'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    title: 'Confirmar ação',
    description: 'Esta é uma dialog de exemplo do ds-reka, construída sobre reka-ui.',
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: { open: false },
  render: (args) => ({
    components: { Dialog, Button },
    setup: () => ({ args }),
    template: `
      <Dialog v-bind="args">
        <template #trigger><Button size="sm">Abrir dialog</Button></template>
        <Button variant="secondary" size="sm">Fechar</Button>
      </Dialog>
    `,
  }),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => ({
    components: { Dialog, Button },
    setup: () => ({ args }),
    template: `
      <Dialog v-bind="args">
        <template #trigger><Button size="sm">Abrir dialog</Button></template>
        <Button variant="secondary" size="sm">Fechar</Button>
      </Dialog>
    `,
  }),
}
