import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom'

import { screen, render, fireEvent, waitFor } from '@redwoodjs/testing/web'

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
describe('LoginPage', () => {
  it('renders the remember me checkbox', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    // Check for the remember me checkbox
    expect(screen.getByLabelText(/Remember Me?/i)).toBeInTheDocument()
  })
})
describe('LoginPage', () => {
  it('tests the Remember Me functionality for persistent sessions', () => {
    // Mock the localStorage
    const localStorageMock = (function () {
      let store = {}
      return {
        getItem: function (key) {
          return store[key] || null
        },
        setItem: function (key, value) {
          store[key] = value.toString()
        },
        clear: function () {
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
})
// Define the mock server
const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    const { username, password } = req.body

    // Define some test users
    const testUsers = {
      testuser1: 'password1',
      testuser2: 'password2',
    }

    if (testUsers[username] === password) {
      return res(ctx.json({ authenticated: true }))
    } else {
      return res(ctx.json({ authenticated: false }))
    }
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
describe('LoginPage', () => {
  it('tests the login form with various user credentials', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    // Define some test credentials
    const testCredentials = [
      { username: 'testuser1', password: 'password1', shouldSucceed: true },
      {
        username: 'testuser2',
        password: 'wrongpassword',
        shouldSucceed: false,
      },
      {
        username: 'nonexistentuser',
        password: 'password1',
        shouldSucceed: false,
      },
    ]

    for (let creds of testCredentials) {
      // Fill in the username and password
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: creds.email },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: creds.password },
      })

      // Click the login button
      fireEvent.click(screen.getByRole('button', { name: /Login/i }))

      // Wait for the request to complete
      await waitFor(() =>
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
      )
    }
  })
})
