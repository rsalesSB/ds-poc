import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Switch } from '.'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    modelValue: false,
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { modelValue: false },
}

export const Checked: Story = {
  args: { modelValue: true },
}
