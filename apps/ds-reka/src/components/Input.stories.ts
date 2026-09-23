import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Input from './Input.vue'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'you@example.com',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: 'you@example.com' },
}

export const Disabled: Story = {
  args: { placeholder: 'you@example.com', disabled: true },
}
