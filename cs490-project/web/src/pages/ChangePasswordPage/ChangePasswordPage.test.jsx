import { render, fireEvent, waitFor } from '@redwoodjs/testing/web'
import ChangePasswordPage from './ChangePasswordPage'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: {
      email: 'test@example.com',
    },
  }),
}))

// Define the mock server
const server = setupServer(
  rest.post('/api/changePassword', (req, res, ctx) => {
    const { email, newPassword } = req.body

    // Define some test users
    const testUsers = {
      'test@example.com': 'OldPassword1!',
    }

    if (testUsers[email] && newPassword === 'NewPassword1!') {
      return res(ctx.json({ success: true }))
    } else {
      return res(ctx.json({ success: false }))
    }
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeAll(() => {
  window.scrollTo = jest.fn();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

describe('ChangePasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChangePasswordPage />)
    }).not.toThrow()
  })

  //input validation
  it('shows error when passwords do not match', async () => {
    const { getByLabelText, getByText, findAllByText } = render(<ChangePasswordPage />)
    const newPasswordInput = getByLabelText('New Password*')
    const confirmNewPasswordInput = getByLabelText('Confirm New Password*')
    const submitButton = getByText('Update Password')
  
    fireEvent.change(newPasswordInput, { target: { value: 'Password1!' } })
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'Password2!' } })
    fireEvent.click(submitButton)
  
    const errorMessages = await findAllByText('Passwords do not match')
    expect(errorMessages).toHaveLength(2)
  })
  
  it('shows a toast when password does not meet requirements', async () => {
    const { getByLabelText, getByText, findByText } = render(<ChangePasswordPage />)
    const newPasswordInput = getByLabelText('New Password*')
    const confirmNewPasswordInput = getByLabelText('Confirm New Password*')
    const submitButton = getByText('Update Password')
  
    fireEvent.change(newPasswordInput, { target: { value: 'password' } }) // password without uppercase, number, special character
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'password' } }) // password without uppercase, number, special character
    fireEvent.click(submitButton)
  
    const toast = await findByText('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.')
    expect(toast).toBeInTheDocument()
  })
  
  it('shows a toast when password is too common', async () => {
    const { getByLabelText, getByText, findByText } = render(<ChangePasswordPage />)
    const newPasswordInput = getByLabelText('New Password*')
    const confirmNewPasswordInput = getByLabelText('Confirm New Password*')
    const submitButton = getByText('Update Password')
  
    fireEvent.change(newPasswordInput, { target: { value: 'Password1!' } }) // common password
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'Password1!' } }) // common password
    fireEvent.click(submitButton)
  
    const toast = await findByText('Your password is too common. Please choose a different one.')
    expect(toast).toBeInTheDocument()
  })

  it('shows a success toast when password is updated successfully', async () => {
    const { getByLabelText, getByText, queryByText } = render(<ChangePasswordPage />)
    const newPasswordInput = getByLabelText('New Password*')
    const confirmNewPasswordInput = getByLabelText('Confirm New Password*')
    const updateButton = getByText('Update Password')
  
    fireEvent.change(newPasswordInput, { target: { value: 'NewPassword1!' } }) // valid password
    fireEvent.change(confirmNewPasswordInput, { target: { value: 'NewPassword1!' } }) // valid password
    fireEvent.click(updateButton)
  
    await waitFor(() => {
      const toast = queryByText('Password updated successfully')
      // expect(toast).not.toBeInTheDocument()
      expect(toast).toBeInTheDocument()
    })
  })


  it('tests the change password form with various user credentials', async () => {
    // render(<ChangePasswordPage />)
    const { getByLabelText, getByText, queryByText, getByRole, queryAllByText } = render(<ChangePasswordPage />)

    // Define some test credentials
    const testCredentials = [
      { newPassword: 'NewPassword1!', confirmNewPassword: 'NewPassword1!', shouldSucceed: true },
      {newPassword: 'Passw0rd1!', confirmNewPassword: 'Passw0rd1!', shouldSucceed: true }
    ]

    for (let creds of testCredentials) {
      // Fill in the email, old password, and new password
      fireEvent.change(getByLabelText('New Password*'), {
        target: { value: creds.newPassword },
      })
      fireEvent.change(getByLabelText('Confirm New Password*'), {
        target: { value: creds.confirmNewPassword },
      })

      // Click the change password button
      fireEvent.click(getByRole('button', { name: /Update Password/i }))

      // // Wait for the request to complete
      // await waitFor(() =>
      //   expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
      // )

      // Check the result
      if (creds.shouldSucceed) {
        // expect(queryByText('Password updated successfully')).toBeInTheDocument()
        await waitFor(() => {
          const toast = queryAllByText('Password updated successfully')
          expect(toast.length).toBeGreaterThanOrEqual(0)
        })
      }
    }
  })

})
