import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { Calendar } from '.'

// Fixed date (not "today") so the grid is deterministic across test runs.
// 2024-01-15 is a Monday.
const FIXED_DATE = new CalendarDate(2024, 1, 15)

// The actual interactive day cell is a role="button" div with a full-date
// aria-label (e.g. "Monday, January 15, 2024") nested inside a
// role="gridcell" <td> — clicking/focusing the <td> itself does nothing.
// Every scenario below targets the inner button by that label.
describe('Calendar', () => {
  it('renders the selected day as data-selected', () => {
    render(Calendar, { props: { modelValue: FIXED_DATE } })
    expect(screen.getByRole('button', { name: /January 15, 2024/ })).toHaveAttribute('data-selected', 'true')
  })

  it('selects a date on click', async () => {
    const user = userEvent.setup()
    const { emitted } = render(Calendar, { props: { modelValue: FIXED_DATE } })
    await user.click(screen.getByRole('button', { name: /January 20, 2024/ }))
    const emissions = emitted()['update:modelValue'] as CalendarDate[][]
    expect(emissions[0][0].day).toBe(20)
  })

  it('moves focus across the grid with arrow keys', async () => {
    const user = userEvent.setup()
    render(Calendar, { props: { modelValue: FIXED_DATE } })
    screen.getByRole('button', { name: /January 15, 2024/ }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('button', { name: /January 16, 2024/ })).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('button', { name: /January 23, 2024/ })).toHaveFocus()
  })

  it('navigates to the next month with the next button', async () => {
    const user = userEvent.setup()
    render(Calendar, { props: { modelValue: FIXED_DATE } })
    expect(screen.getByText('January 2024')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(screen.getByText('February 2024')).toBeInTheDocument()
  })

  it('has no obvious a11y violations', async () => {
    const { container } = render(Calendar, { props: { modelValue: FIXED_DATE } })
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
