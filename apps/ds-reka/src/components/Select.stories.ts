import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Select from './Select.vue'
import SelectItem from './SelectItem.vue'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Select, SelectItem },
    template: `
      <Select placeholder="Select a fruit">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry" disabled>Cherry</SelectItem>
      </Select>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Select, SelectItem },
    template: `
      <Select placeholder="Select a fruit" disabled>
        <SelectItem value="apple">Apple</SelectItem>
      </Select>
    `,
  }),
}
