import { within } from '@testing-library/dom'
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
