import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Accordion from './Accordion.vue'
import AccordionContent from './AccordionContent.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionTrigger from './AccordionTrigger.vue'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
    template: `
      <Accordion type="single" style="width: 320px;">
        <AccordionItem value="a">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes, it follows the WAI-ARIA accordion pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes, with the shared design system tokens.</AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const MultipleOpen: Story = {
  render: () => ({
    components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
    template: `
      <Accordion type="multiple" :model-value="['a', 'b']" style="width: 320px;">
        <AccordionItem value="a">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes, it follows the WAI-ARIA accordion pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes, with the shared design system tokens.</AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
}
