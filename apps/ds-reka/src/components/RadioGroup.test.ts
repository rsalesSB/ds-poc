import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import RadioGroup from './RadioGroup.vue'
import RadioGroupItem from './RadioGroupItem.vue'

function renderGroup(props: Record<string, unknown> = {}) {
  return render(RadioGroup, {
    props,
    attrs: { 'aria-label': 'Plan' },
    slots: {
      default: `
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      `,
    },
    global: {
      components: { RadioGroupItem },
    },
  })
}

describe('RadioGroup', () => {
  it('renders two radio items with one selected', () => {
    renderGroup({ modelValue: 'a' })
    const options = screen.getAllByRole('radio')
    expect(options).toHaveLength(2)
    expect(options[0]).toHaveAttribute('aria-checked', 'true')
    expect(options[1]).toHaveAttribute('aria-checked', 'false')
  })

  it('selects a value on click', async () => {
    const user = userEvent.setup()
    const { emitted } = renderGroup({ modelValue: 'a' })
    await user.click(screen.getByRole('radio', { name: 'Option B' }))
    expect(emitted()['update:modelValue']).toEqual([['b']])
  })

  it('moves roving focus with arrow keys and selects with Space', async () => {
    const user = userEvent.setup()
    const { emitted } = renderGroup({ modelValue: 'a' })
    const optionA = screen.getByRole('radio', { name: 'Option A' })
    const optionB = screen.getByRole('radio', { name: 'Option B' })
    optionA.focus()
    await user.keyboard('{ArrowDown}')
    expect(optionB).toHaveFocus()
    // Reka's radio group only moves the roving-tabindex focus on arrow keys
    // (confirmed by probing it directly) — it doesn't auto-select the item
    // like some radiogroup implementations do, so Space is still required.
    await user.keyboard(' ')
    expect(emitted()['update:modelValue']).toEqual([['b']])
  })

  it('does not emit when disabled', async () => {
    const user = userEvent.setup()
    const { emitted } = renderGroup({ modelValue: 'a', disabled: true })
    await user.click(screen.getByRole('radio', { name: 'Option B' }))
    expect(emitted()['update:modelValue']).toBeUndefined()
  })

  it('has no obvious a11y violations', async () => {
    const { container } = renderGroup({ modelValue: 'a' })
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
