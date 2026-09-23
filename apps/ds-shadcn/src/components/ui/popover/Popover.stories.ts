import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Button } from '../button'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '.'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: { open: false },
  render: (args) => ({
    components: { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, Button },
    setup: () => ({ args }),
    template: `
      <Popover v-bind="args">
        <PopoverTrigger as-child><Button size="sm">Open popover</Button></PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
          Popover body content.
        </PopoverContent>
      </Popover>
    `,
  }),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => ({
    components: { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, Button },
    setup: () => ({ args }),
    template: `
      <Popover v-bind="args">
        <PopoverTrigger as-child><Button size="sm">Open popover</Button></PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
          Popover body content.
        </PopoverContent>
      </Popover>
    `,
  }),
}
