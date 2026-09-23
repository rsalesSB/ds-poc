import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '.'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Select, SelectTrigger, SelectValue, SelectContent, SelectItem },
    template: `
      <Select>
        <SelectTrigger><SelectValue placeholder="Select a fruit" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry" disabled>Cherry</SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Select, SelectTrigger, SelectValue, SelectContent, SelectItem },
    template: `
      <Select disabled>
        <SelectTrigger><SelectValue placeholder="Select a fruit" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    `,
  }),
}
