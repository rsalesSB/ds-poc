import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Checkbox from './Checkbox.vue'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(Checkbox)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
  })

  it('selects a value on click', async () => {
    const user = userEvent.setup()
    const { emitted } = render(Checkbox, { props: { modelValue: false } })
    await user.click(screen.getByRole('checkbox'))
    expect(emitted()['update:modelValue']).toEqual([[true]])
  })

  it('toggles via keyboard (Tab then Space)', async () => {
    const user = userEvent.setup()
    const { emitted } = render(Checkbox, { props: { modelValue: false } })
    await user.tab()
    expect(screen.getByRole('checkbox')).toHaveFocus()
    await user.keyboard(' ')
    expect(emitted()['update:modelValue']).toEqual([[true]])
  })

  it('does not emit when disabled', async () => {
    const user = userEvent.setup()
    const { emitted } = render(Checkbox, { props: { modelValue: false, disabled: true } })
    await user.click(screen.getByRole('checkbox'))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })

  it('has no obvious a11y violations', async () => {
    // A checkbox needs an accessible name to be used in isolation — provided
    // here the same way a consumer would (aria-label), since that's a
    // requirement on the caller, not something the component can supply.
    const { container } = render(Checkbox, { attrs: { 'aria-label': 'Accept terms' } })
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
