import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Checkbox from './Checkbox.vue'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    modelValue: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { modelValue: false },
}

export const Checked: Story = {
  args: { modelValue: true },
}

export const Disabled: Story = {
  args: { modelValue: false, disabled: true },
}
