import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Button } from '../button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '.'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: { open: false },
  render: (args) => ({
    components: { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, Button },
    setup: () => ({ args }),
    template: `
      <Dialog v-bind="args">
        <DialogTrigger as-child><Button size="sm">Abrir dialog</Button></DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirmar ação</DialogTitle>
          <DialogDescription>Esta é uma dialog de exemplo do ds-shadcn, gerada pelo shadcn-vue e retokenizada.</DialogDescription>
          <DialogClose as-child><Button variant="secondary" size="sm">Fechar</Button></DialogClose>
        </DialogContent>
      </Dialog>
    `,
  }),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => ({
    components: { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, Button },
    setup: () => ({ args }),
    template: `
      <Dialog v-bind="args">
        <DialogTrigger as-child><Button size="sm">Abrir dialog</Button></DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirmar ação</DialogTitle>
          <DialogDescription>Esta é uma dialog de exemplo do ds-shadcn, gerada pelo shadcn-vue e retokenizada.</DialogDescription>
          <DialogClose as-child><Button variant="secondary" size="sm">Fechar</Button></DialogClose>
        </DialogContent>
      </Dialog>
    `,
  }),
}
