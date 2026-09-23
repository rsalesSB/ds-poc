import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    template: `
      <Tabs default-value="account" style="width: 320px;">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings.</TabsContent>
        <TabsContent value="password">Password settings.</TabsContent>
      </Tabs>
    `,
  }),
}
