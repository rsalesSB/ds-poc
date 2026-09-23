import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { today, getLocalTimeZone } from '@internationalized/date'

import Calendar from './Calendar.vue'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Calendar },
    template: `<Calendar />`,
  }),
}

export const WithSelectedDate: Story = {
  render: () => ({
    components: { Calendar },
    setup: () => ({ selected: today(getLocalTimeZone()) }),
    template: `<Calendar :model-value="selected" />`,
  }),
}
