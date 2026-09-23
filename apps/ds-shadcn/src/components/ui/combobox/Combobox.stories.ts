import type { Meta, StoryObj } from '@storybook/vue3-vite'

import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from '.'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Combobox, ComboboxAnchor, ComboboxInput, ComboboxList, ComboboxViewport, ComboboxEmpty, ComboboxItem },
    template: `
      <Combobox style="width: 260px;">
        <ComboboxAnchor>
          <ComboboxInput placeholder="Search framework..." />
        </ComboboxAnchor>
        <ComboboxList>
          <ComboboxViewport>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxItem value="vue">Vue</ComboboxItem>
            <ComboboxItem value="react">React</ComboboxItem>
            <ComboboxItem value="svelte">Svelte</ComboboxItem>
          </ComboboxViewport>
        </ComboboxList>
      </Combobox>
    `,
  }),
}
