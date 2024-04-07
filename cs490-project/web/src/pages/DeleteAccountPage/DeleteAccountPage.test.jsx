import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing/web'

import DeleteAccountPage from './DeleteAccountPage'
// src/setupTests.js
import { setupServer } from 'msw/node';
import { graphql } from 'msw';

const server = setupServer(
  graphql.mutation('DeleteUserMutation', (req, res, ctx) => {
    // Mock successful deletion response
    return res(
      ctx.data({
        deleteUser: {
          id: 1,
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('DeleteAccountPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteAccountPage />)
    }).not.toThrow()
  })

  it('displays confirmation dialog when delete button is clicked', () => {
    render(<DeleteAccountPage />);
    const deleteButton = screen.getByRole('button', { name: /delete my account/i });
    fireEvent.click(deleteButton);
    expect(screen.getByText(/are you sure you want to delete your account\?/i)).toBeInTheDocument();
  });


  it('cancels deletion when cancel button is clicked', async () => {
    render(<DeleteAccountPage />);
    
    const deleteButton = screen.getByRole('button', { name: /delete my account/i });
    fireEvent.click(deleteButton);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
  
    // Wait for the modal to disappear
    await waitFor(() => {
      expect(screen.queryByText(/are you sure you want to delete your account\?/i)).not.toBeInTheDocument();
    });
  });
  
  it('successfully deletes account when confirm button is clicked', async () => {
    render(<DeleteAccountPage />);
    
    const deleteButton = screen.getByRole('button', { name: /delete my account/i });
    fireEvent.click(deleteButton);
    
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    //lead to homepage 
    expect(window.location.pathname).toEqual('/');

  });
  
})
