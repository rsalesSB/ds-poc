import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Button from './Button.vue'
import Dialog from './Dialog.vue'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  args: {
    title: 'Confirm action',
    description: 'This is an example dialog from ds-reka, built on top of reka-ui.',
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
        <template #trigger><Button size="sm">Open dialog</Button></template>
        <Button variant="secondary" size="sm">Close</Button>
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
        <template #trigger><Button size="sm">Open dialog</Button></template>
        <Button variant="secondary" size="sm">Close</Button>
      </Dialog>
    `,
  }),
}
