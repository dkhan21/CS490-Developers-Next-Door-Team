import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import { useAuth } from 'src/auth'

import SignupPage from './SignupPage'

//Mock the useAuth hook
jest.mock('src/auth')

describe('SignupPage', () => {
  it('handles successful registration', async () => {
    // Mock the signUp function to return a successful response
    useAuth.mockReturnValue({
      isAuthenticated: false,
      signUp: jest.fn().mockResolvedValue({ success: true }),
    })

    render(<SignupPage />)

    // Fill in the form fields
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')

    userEvent.type(emailInput, 'test@example.com')
    userEvent.type(passwordInput, 'ValidPassword123!')
    userEvent.type(confirmPasswordInput, 'ValidPassword123!')

    //Submit the form
    userEvent.click(screen.getByRole('button', { name: /Sign Up/i }))
  })

  it('handles failed registration attempt', async () => {
    //Mock the signUp function to return an error response
    useAuth.mockReturnValue({
      isAuthenticated: false,
      signUp: jest.fn().mockResolvedValue({ error: 'Registration failed' }),
    })

    render(<SignupPage />)

    //Fill in the form fields
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')

    userEvent.type(emailInput, 'test@example.com')
    userEvent.type(passwordInput, 'ValidPassword123!')
    userEvent.type(confirmPasswordInput, 'ValidPassword123!')

    //Submit the form
    userEvent.click(screen.getByRole('button', { name: /Sign Up/i }))
  })
})

describe('SignupPage', () => {
  it('renders successfully', async () => {
    render(<SignupPage />)

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
    render(<SignupPage />)

    const form = await screen.findByTestId('signup-form')
    const { getByLabelText } = within(form)

    //Simulate user input
    userEvent.type(getByLabelText('Email'), 'invalid-email')
    userEvent.type(getByLabelText('Password'), 'weakpassword')
    userEvent.type(getByLabelText('Confirm Password'), 'differentpassword')

    //Submit the form
    userEvent.click(screen.getByRole('button', { name: /Sign Up/i }))

    //Check for validation errors
    expect(
      await screen.findByText('Please enter a valid email')
    ).toBeInTheDocument()
    expect(await screen.findByText('Password is required')).toBeInTheDocument()
    expect(
      await screen.findByText('Password confirmation is required')
    ).toBeInTheDocument()
  })
})
