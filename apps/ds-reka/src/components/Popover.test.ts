import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Popover from './Popover.vue'

function renderPopover() {
  return render(Popover, {
    props: { title: 'Dimensions', description: 'Set the dimensions for the layer.' },
    slots: {
      trigger: '<button>Open popover</button>',
      default: 'Popover body content.',
    },
  })
}

describe('Popover', () => {
  it('is closed by default (no content in the DOM)', () => {
    renderPopover()
    expect(screen.queryByText('Popover body content.')).not.toBeInTheDocument()
  })

  it('opens on trigger click', async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole('button', { name: 'Open popover' }))
    expect(await screen.findByText('Popover body content.')).toBeInTheDocument()
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    renderPopover()
    const trigger = screen.getByRole('button', { name: 'Open popover' })
    await user.click(trigger)
    await screen.findByText('Popover body content.')
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Popover body content.')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('closes when clicking outside', async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole('button', { name: 'Open popover' }))
    await screen.findByText('Popover body content.')
    await user.click(document.body)
    expect(screen.queryByText('Popover body content.')).not.toBeInTheDocument()
  })

  it('has no obvious a11y violations while open', async () => {
    const user = userEvent.setup()
    const { container } = renderPopover()
    await user.click(screen.getByRole('button', { name: 'Open popover' }))
    await screen.findByText('Popover body content.')
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
