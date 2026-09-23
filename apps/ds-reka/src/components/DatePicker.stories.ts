import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { today, getLocalTimeZone } from '@internationalized/date'

import DatePicker from './DatePicker.vue'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { DatePicker },
    template: `<DatePicker />`,
  }),
}

export const WithSelectedDate: Story = {
  render: () => ({
    components: { DatePicker },
    setup: () => ({ selected: today(getLocalTimeZone()) }),
    template: `<DatePicker :model-value="selected" />`,
  }),
}
