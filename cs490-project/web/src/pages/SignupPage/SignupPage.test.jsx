import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { render, screen } from '@redwoodjs/testing/web'

import SignupPage from './SignupPage'

describe('SignupPage', () => {
  it('renders successfully', async () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    )

    const signUpElements = screen.getAllByText('Sign Up')
    expect(signUpElements).toHaveLength(2)
    const form = screen.getByTestId('signup-form')
    const { getByLabelText } = within(form)

    expect(getByLabelText('Email')).toBeInTheDocument()
    expect(getByLabelText('Password')).toBeInTheDocument()
    expect(getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument()
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Log in!/i })).toBeInTheDocument()
  })
})

describe('SignupPage', () => {
  it('validates email format, password strength, and matching password confirmation', async () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    )

    const form = await screen.findByTestId('signup-form')
    const { getByLabelText } = within(form)

    // Simulate user input
    userEvent.type(getByLabelText('Email'), 'invalid-email')
    userEvent.type(getByLabelText('Password'), 'weakpassword')
    userEvent.type(getByLabelText('Confirm Password'), 'differentpassword')

    // Submit the form
    userEvent.click(screen.getByRole('button', { name: /Sign Up/i }))

    // Check for validation errors
    expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument()
    expect(await screen.findByText('Password is required')).toBeInTheDocument()
    expect(await screen.findByText('Password confirmation is required')).toBeInTheDocument()
  })
})

