import { render, fireEvent, waitFor } from '@redwoodjs/testing/web'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { useAuth } from 'src/auth'
import UpdateProfilePage from './UpdateProfilePage'
import { graphql } from 'msw'

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: {
      email: 'test@example.com',
    },
  }),
}))

// // Define the mock server
// const server = setupServer(
//   rest.post('/api/updateProfile', (req, res, ctx) => {
//     const { id, email, name, preferredProgrammingLanguage, preferredIDE } = req.body

//     // Define some test users
//     const testUsers = {
//       '1': {
//         email: 'test@example.com',
//         name: 'Test User',
//         preferredProgrammingLanguage: 'JavaScript',
//         preferredIDE: 'VSCode',
//       },
//     }

//     if (testUsers[id] && email === testUsers[id].email) {
//       return res(ctx.json({ success: true }))
//     } else {
//       return res(ctx.json({ success: false }))
//     }
//   })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// Define the mock server
const server = setupServer(
  graphql.mutation('UpdatedUserMutation', (req, res, ctx) => {
    const { input } = req.variables

    // Define some test users
    const testUsers = {
      '1': {
        email: 'test@example.com',
        name: 'Test User',
        preferredProgrammingLanguage: 'JavaScript',
        preferredIDE: 'VSCode',
      },
    }

    if (testUsers[input.id] && input.email === testUsers[input.id].email) {
      return res(ctx.data({ updateUser: { ...input } }))
    } else {
      return res(ctx.errors([{ message: 'Failed to update profile' }]))
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

describe('UpdateProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateProfilePage />)
    }).not.toThrow()
  })

  // it('tests the change password form with various user credentials', async () => {
  //   // render(<ChangePasswordPage />)
  //   const { getByLabelText, getByText, queryByText, getByRole, queryAllByText } = render(<UpdateProfilePage />)

  //   // Define some test credentials
  //   const testCredentials = [
  //     { name: 'Example', preferredProgrammingLanguage: 'Python', preferredIDE: 'VSCode', shouldSucceed: true },
  //     {name: 'John Doe', preferredProgrammingLanguage: 'Java', preferredIDE: 'IntelliJ', shouldSucceed: true  }
  //   ]

  //   for (let creds of testCredentials) {
  //     fireEvent.change(getByLabelText('Name'), { 
  //       target: { value: creds.name },
  //     })
  //     fireEvent.change(getByLabelText('Preferred Programming Language'), {
  //       target: { value: creds.preferredProgrammingLanguage },
  //     })
  //     fireEvent.change(getByLabelText('Preferred IDE'), { 
  //       target: { value: creds.preferredProgrammingLanguage },
  //     })
      

  //     // Click the change password button
  //     fireEvent.click(getByRole('button', { name: /Update Profile/i }))

  
  //     // Check the result
  //     if (creds.shouldSucceed) {
  //       // expect(queryByText('Password updated successfully')).toBeInTheDocument()
  //       // await waitFor(() => {
  //       //   const toast = queryAllByText('Profile updated successfully')
  //       //   expect(toast.length).toBeGreaterThanOrEqual(0)
  //       // })
  //     }
  //   }
  // })

  // it('updates user information successfully', async () => {
  //   const { getByLabelText, getByText, queryByText, getByRole } = render(<UpdateProfilePage />)
  //   const nameInput = getByLabelText('Name')
  //   const preferredProgrammingLanguageInput = getByLabelText('Preferred Programming Language')
  //   const preferredIDEInput = getByLabelText('Preferred IDE')
  //   const updateButton = getByRole('button', { name: /Update Profile/i })

  //   fireEvent.change(nameInput, { target: { value: 'Updated User' } })
  //   fireEvent.change(preferredProgrammingLanguageInput, { target: { value: 'Python' } })
  //   fireEvent.change(preferredIDEInput, { target: { value: 'PyCharm' } })
  //   fireEvent.click(updateButton)

  //   await waitFor(() => {
  //     const toast = queryByText('Profile updated successfully')
  //     expect(toast).toBeInTheDocument()
  //   })
  // })

  it('shows error when name is too long', async () => {
    const { getByLabelText, getByText, findAllByText, getByRole, queryByText } = render(<UpdateProfilePage />)
    const nameInput = getByLabelText('Name')
    // const confirmNewPasswordInput = getByLabelText('Confirm New Password*')
    // const submitButton = getByText('Update Profile')
  
    fireEvent.change(nameInput, { target: { value: 'hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello' } })
    fireEvent.click(getByRole('button', { name: /Update Profile/i }))
    // fireEvent.change(confirmNewPasswordInput, { target: { value: 'Password2!' } })
    // fireEvent.click(submitButton)
  
    const errorMessages = await queryByText('Name is too long. Please enter a name that is 50 characters or less.')
    expect(errorMessages).toBeInTheDocument()
  })

  it('shows error when name has invalid characters', async () => {
    const { getByLabelText, getByText, findAllByText, getByRole, queryByText } = render(<UpdateProfilePage />)
    const nameInput = getByLabelText('Name')

    fireEvent.change(nameInput, { target: { value: 'Example1' } })
    fireEvent.click(getByRole('button', { name: /Update Profile/i }))
  
    const errorMessages = await queryByText('Name contains invalid characters. Pleaser enter a name that only contains letters, spaces, and hyphens.')
    expect(errorMessages).toBeInTheDocument()
  })

  it('shows error when Preferred IDE is too long', async () => {
    const { getByLabelText, getByText, findAllByText, getByRole, queryByText } = render(<UpdateProfilePage />)
    const preferredIDE = getByLabelText('Preferred IDE')
    
    fireEvent.change(preferredIDE, { target: { value: 'VSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCodeVSCode' } })
    fireEvent.click(getByRole('button', { name: /Update Profile/i }))
  
    const errorMessages = await queryByText('Preferred IDE is too long. Please enter an IDE that is 50 characters or less.')
    expect(errorMessages).toBeInTheDocument()
  })

  it('shows error when Preferred Programming Language is too long', async () => {
    const { getByLabelText, getByText, findAllByText, getByRole, queryByText } = render(<UpdateProfilePage />)
    const preferredProgrammingLanguage = getByLabelText('Preferred Programming Language')
    
    fireEvent.change(preferredProgrammingLanguage, { target: { value: 'PythonPythonPythonPythonPythonPythonPythonPythonPythonPython' } })
    fireEvent.click(getByRole('button', { name: /Update Profile/i }))
  
    const errorMessages = await queryByText('Preferred Programming Langauge is too long. Please enter a language that is 50 characters or less.')
    expect(errorMessages).toBeInTheDocument()
  })

  it('shows a success toast when profile is updated successfully', async () => {
    const { getByLabelText, getByText, queryByText, getByRole } = render(<UpdateProfilePage />)
    const nameInput = getByLabelText('Name')
    const preferredProgrammingLanguageInput = getByLabelText('Preferred Programming Language')
    const preferredIdeInput = getByLabelText('Preferred IDE')
  
    fireEvent.change(nameInput, { target: { value: 'Example' } })
    fireEvent.change(preferredProgrammingLanguageInput, { target: { value: 'Python'}})
    fireEvent.change(preferredIdeInput, { target: { value: 'VSCode'}})
    
    fireEvent.click(getByRole('button', { name: /Update Profile/i }))

    const toast = queryByText('Profile updated successfully')
    expect(toast).toBeInTheDocument()
    
    // await waitFor(() => {
    //   const toast = queryByText('Profile updated successfully')
    //   expect(toast).toBeInTheDocument()
    //   // expect(toast).toBeInTheDocument()
    // })
  })



})
