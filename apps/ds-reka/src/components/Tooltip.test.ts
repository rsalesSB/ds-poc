import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Tooltip from './Tooltip.vue'

function renderTooltip() {
  return render(Tooltip, {
    props: { delayDuration: 0 },
    slots: {
      trigger: '<button>Hover me</button>',
      default: 'Helpful hint',
    },
  })
}

// reka-ui's tooltip content renders with aria-hidden="true" and is instead
// exposed to assistive tech via aria-describedby on the trigger (a valid
// WAI-ARIA tooltip pattern) — Testing Library's role queries exclude
// aria-hidden elements by default, so `{ hidden: true }` is needed to find it.
describe('Tooltip', () => {
  it('is closed by default (no content in the DOM)', () => {
    renderTooltip()
    expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument()
  })

  it('opens on trigger focus and links content via aria-describedby', async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.tab()
    const trigger = screen.getByRole('button', { name: 'Hover me' })
    expect(trigger).toHaveFocus()
    const tooltip = await screen.findByRole('tooltip', { hidden: true })
    expect(tooltip).toHaveTextContent('Helpful hint')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  it('closes on Escape and keeps focus on the trigger', async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.tab()
    await screen.findByRole('tooltip', { hidden: true })
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hover me' })).toHaveFocus()
  })

  it('opens on hover', async () => {
    const user = userEvent.setup()
    renderTooltip()
    await user.hover(screen.getByRole('button', { name: 'Hover me' }))
    expect(await screen.findByRole('tooltip', { hidden: true })).toHaveTextContent('Helpful hint')
  })

  it('has no obvious a11y violations while open', async () => {
    const user = userEvent.setup()
    const { container } = renderTooltip()
    await user.tab()
    await screen.findByRole('tooltip', { hidden: true })
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
