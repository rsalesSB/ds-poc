import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Checkbox } from '.'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Checkbox },
    template: `<Checkbox />`,
  }),
}

export const Checked: Story = {
  render: () => ({
    components: { Checkbox },
    template: `<Checkbox :default-value="true" />`,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Checkbox },
    template: `<Checkbox disabled />`,
  }),
}
