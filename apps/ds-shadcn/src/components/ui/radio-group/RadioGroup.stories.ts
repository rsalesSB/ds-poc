import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { RadioGroup, RadioGroupItem } from '.'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { RadioGroup, RadioGroupItem },
    template: `
      <RadioGroup model-value="a" aria-label="Plan">
        <label style="display: flex; align-items: center; gap: 8px;"><RadioGroupItem value="a" /> Option A</label>
        <label style="display: flex; align-items: center; gap: 8px;"><RadioGroupItem value="b" /> Option B</label>
      </RadioGroup>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { RadioGroup, RadioGroupItem },
    template: `
      <RadioGroup model-value="a" disabled aria-label="Plan">
        <label style="display: flex; align-items: center; gap: 8px;"><RadioGroupItem value="a" /> Option A</label>
        <label style="display: flex; align-items: center; gap: 8px;"><RadioGroupItem value="b" /> Option B</label>
      </RadioGroup>
    `,
  }),
}
