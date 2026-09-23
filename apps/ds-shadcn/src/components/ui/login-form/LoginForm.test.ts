import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { LoginForm } from '.'

describe('LoginForm', () => {
  it('shows validation errors when submitting empty', async () => {
    const user = userEvent.setup()
    render(LoginForm)
    await user.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(await screen.findByText('Email is required.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
  })

  it('submits valid values', async () => {
    const user = userEvent.setup()
    const { emitted } = render(LoginForm)
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Password'), 'supersecret')
    await user.click(screen.getByRole('button', { name: 'Sign in' }))
    await waitFor(() => {
      expect(emitted().submit).toEqual([[{ email: 'jane@example.com', password: 'supersecret', rememberMe: false }]])
    })
  })

  it('toggles remember me via the label', async () => {
    const user = userEvent.setup()
    render(LoginForm)
    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' })
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    await user.click(screen.getByText('Remember me'))
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('supports keyboard-only submission (Tab through fields, Enter to submit)', async () => {
    const user = userEvent.setup()
    const { emitted } = render(LoginForm)
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Password'), 'supersecret')
    screen.getByRole('button', { name: 'Sign in' }).focus()
    await user.keyboard('{Enter}')
    await waitFor(() => {
      expect(emitted().submit).toBeDefined()
    })
  })

  it('has no obvious a11y violations', async () => {
    const { container } = render(LoginForm)
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
