import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Select from './Select.vue'
import SelectItem from './SelectItem.vue'

function renderSelect(props: Record<string, unknown> = {}) {
  return render(Select, {
    props: { placeholder: 'Select a fruit', ...props },
    slots: {
      default: `
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      `,
    },
    global: {
      components: { SelectItem },
    },
  })
}

describe('Select', () => {
  it('shows the placeholder when no value is selected', () => {
    renderSelect()
    expect(screen.getByRole('combobox')).toHaveTextContent('Select a fruit')
  })

  it('opens the listbox on trigger click', async () => {
    const user = userEvent.setup()
    renderSelect()
    await user.click(screen.getByRole('combobox'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })

  it('selects a value on click', async () => {
    const user = userEvent.setup()
    const { emitted } = renderSelect()
    await user.click(screen.getByRole('combobox'))
    await user.click(await screen.findByRole('option', { name: 'Banana' }))
    expect(emitted()['update:modelValue']).toEqual([['banana']])
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    renderSelect({ disabled: true })
    await user.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('has no obvious a11y violations while open', async () => {
    const user = userEvent.setup()
    const { container } = renderSelect()
    await user.click(screen.getByRole('combobox'))
    await screen.findByRole('listbox')
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
