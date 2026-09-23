import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Tabs from './Tabs.vue'
import TabsContent from './TabsContent.vue'
import TabsTrigger from './TabsTrigger.vue'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Tabs, TabsTrigger, TabsContent },
    template: `
      <Tabs model-value="account" style="width: 320px;">
        <template #list>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </template>
        <TabsContent value="account">Account settings.</TabsContent>
        <TabsContent value="password">Password settings.</TabsContent>
      </Tabs>
    `,
  }),
}
