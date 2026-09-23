import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Combobox from './Combobox.vue'
import ComboboxItem from './ComboboxItem.vue'

function renderCombobox() {
  return render(Combobox, {
    props: { placeholder: 'Search framework...' },
    slots: {
      default: `
        <ComboboxItem value="vue">Vue</ComboboxItem>
        <ComboboxItem value="react">React</ComboboxItem>
        <ComboboxItem value="svelte">Svelte</ComboboxItem>
      `,
    },
    global: {
      components: { ComboboxItem },
    },
  })
}

// Confirmed by probing reka-ui directly: the listbox opens on typing, not on
// a bare click/focus of the input (a real, non-obvious behavior worth
// documenting rather than assuming Select-like open-on-click semantics).
describe('Combobox', () => {
  it('is closed by default (no listbox in the DOM)', () => {
    renderCombobox()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens the listbox on typing', async () => {
    const user = userEvent.setup()
    renderCombobox()
    await user.type(screen.getByRole('combobox'), 'v')
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
  })

  it('filters the list by typing', async () => {
    const user = userEvent.setup()
    renderCombobox()
    await user.type(screen.getByRole('combobox'), 'vue')
    await screen.findByRole('listbox')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
  })

  it('selects a value on click', async () => {
    const user = userEvent.setup()
    const { emitted } = renderCombobox()
    await user.type(screen.getByRole('combobox'), 'r')
    await user.click(await screen.findByRole('option', { name: 'React' }))
    expect(emitted()['update:modelValue']).toEqual([['react']])
  })

  it('has no obvious a11y violations while open', async () => {
    const user = userEvent.setup()
    const { container } = renderCombobox()
    await user.type(screen.getByRole('combobox'), 'v')
    await screen.findByRole('listbox')
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
