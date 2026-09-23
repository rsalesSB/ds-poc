import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '.'

function renderAccordion(props: Record<string, unknown> = { type: 'single', collapsible: true }) {
  return render(Accordion, {
    props,
    slots: {
      default: `
        <AccordionItem value="a">
          <AccordionTrigger>Question A</AccordionTrigger>
          <AccordionContent>Answer A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Question B</AccordionTrigger>
          <AccordionContent>Answer B</AccordionContent>
        </AccordionItem>
      `,
    },
    global: {
      components: { AccordionItem, AccordionTrigger, AccordionContent },
    },
  })
}

describe('Accordion', () => {
  it('is closed by default', () => {
    renderAccordion()
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Answer A')).not.toBeInTheDocument()
  })

  it('expands an item on click', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.click(screen.getByRole('button', { name: 'Question A' }))
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Answer A')).toBeVisible()
  })

  it('collapses the previous item under type="single" (only one open at a time)', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.click(screen.getByRole('button', { name: 'Question A' }))
    await user.click(screen.getByRole('button', { name: 'Question B' }))
    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Question B' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('moves focus between triggers with arrow keys', async () => {
    const user = userEvent.setup()
    renderAccordion()
    screen.getByRole('button', { name: 'Question A' }).focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('button', { name: 'Question B' })).toHaveFocus()
  })

  it('has no obvious a11y violations', async () => {
    const { container } = renderAccordion()
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
