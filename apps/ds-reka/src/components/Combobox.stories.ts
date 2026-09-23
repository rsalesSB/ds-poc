import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Combobox from './Combobox.vue'
import ComboboxItem from './ComboboxItem.vue'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Combobox, ComboboxItem },
    template: `
      <Combobox placeholder="Search framework..." style="width: 260px;">
        <ComboboxItem value="vue">Vue</ComboboxItem>
        <ComboboxItem value="react">React</ComboboxItem>
        <ComboboxItem value="svelte">Svelte</ComboboxItem>
      </Combobox>
    `,
  }),
}
