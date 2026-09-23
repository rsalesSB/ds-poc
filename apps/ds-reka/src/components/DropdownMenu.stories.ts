import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Button from './Button.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownMenuCheckboxItem from './DropdownMenuCheckboxItem.vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

const components = {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
}

const template = (open: boolean) => `
  <DropdownMenu :open="${open}">
    <template #trigger><Button size="sm">Open menu</Button></template>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem disabled>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem model-value="true">Show notifications</DropdownMenuCheckboxItem>
  </DropdownMenu>
`

export const Closed: Story = {
  render: () => ({ components, template: template(false) }),
}

export const Open: Story = {
  render: () => ({ components, template: template(true) }),
}
