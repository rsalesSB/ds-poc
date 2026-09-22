import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Button } from '.'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', size: 'md' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Button</Button>`,
  }),
}

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Button</Button>`,
  }),
}

export const Small: Story = {
  args: { variant: 'primary', size: 'sm' },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">Button</Button>`,
  }),
}

/** All variant x size combinations side by side. */
export const Grid: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, max-content); gap: 12px; align-items: center;">
        <Button variant="primary" size="sm">Primary / sm</Button>
        <Button variant="primary" size="md">Primary / md</Button>
        <Button variant="secondary" size="sm">Secondary / sm</Button>
        <Button variant="secondary" size="md">Secondary / md</Button>
      </div>
    `,
  }),
}
