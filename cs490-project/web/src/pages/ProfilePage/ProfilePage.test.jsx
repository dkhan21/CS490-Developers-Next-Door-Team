import { render, screen, waitFor } from '@redwoodjs/testing/web'
import { MockedProvider } from '@apollo/client/testing';
// import { Router} from 'react-router-dom';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { graphql } from 'msw';
// import userEvent from '@testing-library/user-event';
import { gql } from '@apollo/client';
import { USER_QUERY, UPDATE_USER_MUTATION } from './ProfilePage';
// import { useAuth } from 'src/auth'
import ProfilePage from './ProfilePage'

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: { id: 1 },
    reauthenticate: jest.fn(),
  }),
}));

let originalLocation;

beforeAll(() => {
  originalLocation = window.location;
  delete window.location;
  window.location = { href: 'http://test.com' };
});

afterAll(() => {
  window.location = originalLocation;
});


const mocks = [
  {
    request: {
      query: USER_QUERY,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'John Doe',
          preferredProgrammingLanguage: 'JavaScript',
          preferredIDE: 'Visual Studio Code',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_USER_MUTATION,
      variables: {
        input: {
          id: 1,
          email: 'test@example.com',
          name: 'John Doe',
          preferredProgrammingLanguage: 'JavaScript',
          preferredIDE: 'Visual Studio Code',
        },
      },
    },
    result: {
      data: {
        updateUser: {
          id: 1,
          email: 'test@example.com',
          name: 'John Doe',
        },
      },
    },
  },
]


describe('ProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilePage />)
    }).not.toThrow()
  })

  it('renders the profile page', () => {
    const { getByText, getByLabelText } = render(<ProfilePage />);
    
    // Test rendering of elements
    expect(screen.getByRole('heading', { name: /profile/i })).toBeInTheDocument();
    expect(getByLabelText('Email*')).toBeInTheDocument();
    expect(getByText('Preferences')).toBeInTheDocument();
    expect(getByLabelText('Preferred Programming Language')).toBeInTheDocument();
    expect(getByLabelText('Preferred IDE')).toBeInTheDocument();
    expect(getByText('Update Profile')).toBeInTheDocument();
  });

  it('shows error when name is too long', async () => {
    const { getByLabelText, getByText, findAllByText, getByRole, queryByText } = render(<ProfilePage />)
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
    const { getByLabelText, getByRole, queryByText } = render(<ProfilePage />);
    const nameInput = getByLabelText('Name');
  
    fireEvent.change(nameInput, { target: { value: '1' } });
    fireEvent.click(getByRole('button', { name: /Update Profile/i }));
  
    // Wait for the error message to appear
    await waitFor(() => {
      expect(queryByText('Name contains invalid characters. Please enter a name that only contains letters, spaces, and hyphens.')).toBeInTheDocument();
    });
  });

  it('does not update the profile when invalid data is entered', async () => {
    const { getByLabelText, getByRole, queryByText } = render(<ProfilePage />);
    const nameInput = getByLabelText('Name');
  
    // Enter invalid data
    fireEvent.change(nameInput, { target: { value: '1' } });
  
    // Click the update button
    fireEvent.click(getByRole('button', { name: /Update Profile/i }));
  
    // Wait for the error message to appear
    await waitFor(() => {
      expect(queryByText('Name contains invalid characters. Please enter a name that only contains letters, spaces, and hyphens.')).toBeInTheDocument();
    });
  });

  // it('updates profile successfully', async () => {
  //   const { getByLabelText, getByRole } = render(<ProfilePage />);
  //   const nameInput = getByLabelText('Name');
  
  //   // Enter valid data
  //   fireEvent.change(nameInput, { target: { value: 'John' } });
  
  //   // Click the update button
  //   fireEvent.click(getByRole('button', { name: /Update Profile/i }));
  
  //   // Wait for the update to complete
  //   expect(nameInput.value).toBe('John');
  //   // await waitFor(() => {
  //   //   // Check that the name stayed in the input box
  //   //   expect(nameInput.value).toBe('John');
  //   // });
  // });

  it('renders user data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProfilePage />
      </MockedProvider>
    )});

    it('updates profile successfully', async () => {
      const { getByLabelText, getByRole } = render(<ProfilePage />);
      const nameInput = getByLabelText('Name');
    
      // Enter valid data
      fireEvent.change(nameInput, { target: { value: 'John' } });
    
      // Click the update button
      fireEvent.click(getByRole('button', { name: /Update Profile/i }));
    
        // Check that the name stayed in the input box
      expect(nameInput.value).toBe('John');
    
    });
    


  

})
