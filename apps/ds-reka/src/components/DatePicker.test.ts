import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { CalendarDate } from '@internationalized/date'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import DatePicker from './DatePicker.vue'

const FIXED_DATE = new CalendarDate(2024, 1, 15)

// Building this against reka-ui directly surfaced that DatePickerPortal
// doesn't exist (every other DatePicker* name does) — confirmed by checking
// reka-ui's actual runtime exports. DatePickerContent handles its own
// positioning without a separate portal wrapper, unlike Popover/Dialog/
// Tooltip. See DatePicker.vue's own comment for the same note.

describe('DatePicker', () => {
  it('renders the segmented field with placeholders when empty', () => {
    render(DatePicker)
    expect(screen.getByRole('spinbutton', { name: /month/ })).toHaveTextContent('mm')
    expect(screen.getByRole('spinbutton', { name: /day/ })).toHaveTextContent('dd')
    expect(screen.getByRole('spinbutton', { name: /year/ })).toHaveTextContent('yyyy')
  })

  it('is closed by default (no calendar in the DOM)', () => {
    render(DatePicker)
    expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument()
  })

  it('opens the calendar on trigger click', async () => {
    const user = userEvent.setup()
    render(DatePicker)
    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(await screen.findByRole('button', { name: 'Next page' })).toBeInTheDocument()
  })

  it('selects a date from the calendar and fills the field segments', async () => {
    const user = userEvent.setup()
    const { emitted } = render(DatePicker, { props: { modelValue: FIXED_DATE } })
    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    await user.click(await screen.findByRole('button', { name: /January 20, 2024/ }))
    const emissions = emitted()['update:modelValue'] as CalendarDate[][]
    expect(emissions[0][0].day).toBe(20)
  })

  it('has no obvious a11y violations while open', async () => {
    const user = userEvent.setup()
    const { container } = render(DatePicker)
    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    await screen.findByRole('button', { name: 'Next page' })
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
