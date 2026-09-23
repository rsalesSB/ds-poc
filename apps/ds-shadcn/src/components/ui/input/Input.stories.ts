import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Input } from '.'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Input },
    template: `<Input placeholder="you@example.com" />`,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    template: `<Input placeholder="you@example.com" disabled />`,
  }),
}
