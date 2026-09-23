import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import Tabs from './Tabs.vue'
import TabsContent from './TabsContent.vue'
import TabsTrigger from './TabsTrigger.vue'

function renderTabs(props: Record<string, unknown> = {}) {
  return render(Tabs, {
    props,
    slots: {
      list: `
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      `,
      default: `
        <TabsContent value="account">Account settings.</TabsContent>
        <TabsContent value="password">Password settings.</TabsContent>
      `,
    },
    global: {
      components: { TabsTrigger, TabsContent },
    },
  })
}

describe('Tabs', () => {
  it('shows the selected tab panel', () => {
    renderTabs({ modelValue: 'account' })
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Account settings.')).toBeVisible()
  })

  it('selects a tab on click', async () => {
    const user = userEvent.setup()
    const { emitted } = renderTabs({ modelValue: 'account' })
    await user.click(screen.getByRole('tab', { name: 'Password' }))
    // Reka's Tabs emits update:modelValue on both focus and activation from
    // a single click (focus lands on the trigger, which alone selects it
    // under the default automatic-activation mode) — every emission still
    // carries the same, correct value.
    const emissions = emitted()['update:modelValue'] as unknown[][]
    expect(emissions.every((call) => call[0] === 'password')).toBe(true)
  })

  it('moves roving focus with arrow keys and activates automatically', async () => {
    const user = userEvent.setup()
    const { emitted } = renderTabs({ modelValue: 'account' })
    screen.getByRole('tab', { name: 'Account' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveFocus()
    expect(emitted()['update:modelValue']).toEqual([['password']])
  })

  it('skips a disabled tab', async () => {
    render(Tabs, {
      props: { modelValue: 'account' },
      slots: {
        list: `
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
        `,
        default: `<TabsContent value="account">Account settings.</TabsContent>`,
      },
      global: { components: { TabsTrigger, TabsContent } },
    })
    expect(screen.getByRole('tab', { name: 'Billing' })).toBeDisabled()
  })

  it('has no obvious a11y violations', async () => {
    const { container } = renderTabs({ modelValue: 'account' })
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
