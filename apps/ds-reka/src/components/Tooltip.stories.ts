import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Button from './Button.vue'
import Tooltip from './Tooltip.vue'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: { open: false },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <Tooltip v-bind="args">
        <template #trigger><Button size="sm">Hover me</Button></template>
        Helpful hint
      </Tooltip>
    `,
  }),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <Tooltip v-bind="args">
        <template #trigger><Button size="sm">Hover me</Button></template>
        Helpful hint
      </Tooltip>
    `,
  }),
}
