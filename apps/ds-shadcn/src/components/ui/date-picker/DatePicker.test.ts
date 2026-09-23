import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { DatePicker } from '.'

const FIXED_DATE = new CalendarDate(2024, 1, 15)

// This component's UX genuinely diverges from ds-reka's: it's a button
// showing the formatted date, not a segmented text field, following the
// community "compose Popover + Calendar" recipe (see DatePicker.vue's own
// comment on why there's no registry item to add here). Scenarios are
// adapted accordingly instead of force-mirroring ds-reka's spinbutton
// queries.
describe('DatePicker', () => {
  it('shows the placeholder when no date is selected', () => {
    render(DatePicker)
    expect(screen.getByRole('button')).toHaveTextContent('Pick a date')
  })

  it('shows the formatted date when one is selected', () => {
    render(DatePicker, { props: { modelValue: FIXED_DATE } })
    expect(screen.getByRole('button')).toHaveTextContent('January 15, 2024')
  })

  it('is closed by default (no calendar in the DOM)', () => {
    render(DatePicker)
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument()
  })

  it('opens the calendar on trigger click and selects a date', async () => {
    const user = userEvent.setup()
    const { emitted } = render(DatePicker, { props: { modelValue: FIXED_DATE } })
    await user.click(screen.getByRole('button', { name: /January 15, 2024/ }))
    await user.click(await screen.findByRole('button', { name: /January 20, 2024/ }))
    const emissions = emitted()['update:modelValue'] as CalendarDate[][]
    expect(emissions[0][0].day).toBe(20)
  })

  it('has no obvious a11y violations while open', async () => {
    const user = userEvent.setup()
    const { container } = render(DatePicker)
    await user.click(screen.getByRole('button', { name: 'Pick a date' }))
    await screen.findByRole('button', { name: 'Next page' })
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
