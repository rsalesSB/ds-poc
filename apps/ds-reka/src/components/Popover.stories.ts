import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Button from './Button.vue'
import Popover from './Popover.vue'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    title: 'Dimensions',
    description: 'Set the dimensions for the layer.',
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: { open: false },
  render: (args) => ({
    components: { Popover, Button },
    setup: () => ({ args }),
    template: `
      <Popover v-bind="args">
        <template #trigger><Button size="sm">Open popover</Button></template>
        Popover body content.
      </Popover>
    `,
  }),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => ({
    components: { Popover, Button },
    setup: () => ({ args }),
    template: `
      <Popover v-bind="args">
        <template #trigger><Button size="sm">Open popover</Button></template>
        Popover body content.
      </Popover>
    `,
  }),
}
