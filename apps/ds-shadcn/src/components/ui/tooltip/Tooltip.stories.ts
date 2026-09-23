import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Button } from '../button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: { open: false },
  render: (args) => ({
    components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button },
    setup: () => ({ args }),
    template: `
      <TooltipProvider :delay-duration="0">
        <Tooltip v-bind="args">
          <TooltipTrigger as-child><Button size="sm">Hover me</Button></TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    `,
  }),
}

export const Open: Story = {
  args: { open: true },
  render: (args) => ({
    components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button },
    setup: () => ({ args }),
    template: `
      <TooltipProvider :delay-duration="0">
        <Tooltip v-bind="args">
          <TooltipTrigger as-child><Button size="sm">Hover me</Button></TooltipTrigger>
          <TooltipContent>Helpful hint</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    `,
  }),
}
