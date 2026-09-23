import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Button } from '../button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '.'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

const components = {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
}

const template = (open: boolean) => `
  <DropdownMenu :open="${open}">
    <DropdownMenuTrigger as-child><Button size="sm">Open menu</Button></DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem disabled>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem model-value="true">Show notifications</DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
`

export const Closed: Story = {
  render: () => ({ components, template: template(false) }),
}

export const Open: Story = {
  render: () => ({ components, template: template(true) }),
}
