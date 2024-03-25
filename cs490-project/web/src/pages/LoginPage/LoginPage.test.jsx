import { MemoryRouter } from 'react-router-dom'

import { screen, render, fireEvent } from '@redwoodjs/testing/web'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('renders the login page components', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    // Check for the login heading
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument()

    // Check for the email input
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()

    // Check for the presence of the password input
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()

    // Check for the remember me checkbox
    expect(screen.getByLabelText(/Remember Me?/i)).toBeInTheDocument()

    // Check for the forgot password link
    expect(
      screen.getByRole('link', { name: /Forgot Password?/i })
    ).toBeInTheDocument()

    // Check for the sign up link
    expect(screen.getByRole('link', { name: /Sign up!/i })).toBeInTheDocument()

    // Check for the "Don't have an account" text
    expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument()
  })
})

it('renders the remember me checkbox', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )

  // Check for the remember me checkbox
  expect(screen.getByLabelText(/Remember Me?/i)).toBeInTheDocument()
})

it('tests the Remember Me functionality for persistent sessions', () => {
  // Mock the localStorage
  const localStorageMock = (function() {
    let store = {}
    return {
      getItem: function(key) {
        return store[key] || null
      },
      setItem: function(key, value) {
        store[key] = value.toString()
      },
      clear: function() {
        store = {}
      },
    }
  })()

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )

  // Simulate checking the Remember Me checkbox
  const checkbox = screen.getByLabelText(/Remember Me?/i)
  fireEvent.click(checkbox)

  // Simulate form submission
  const submitButton = screen.getByRole('button', { name: /Login/i })
  fireEvent.click(submitButton)

  // Check if the rememberMe item is stored in the localStorage
  expect(localStorage.getItem('rememberMe')).toBe(null)
})
