import { render, fireEvent, waitFor, screen } from '@redwoodjs/testing/web'
import '@testing-library/jest-dom/extend-expect'; // For better assertion messages

import FeedbackForm from './FeedbackForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

jest.mock('src/auth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    currentUser: { id: 123, name: 'Test User' }, // Mocking a dummy user object
    logOut: jest.fn(), // Mocking the logOut function
  }),
}));


describe('FeedbackForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackForm />)
    }).not.toThrow()
  })
  it("Handle Inappropiate words", async () => {

    render(<FeedbackForm />);
    const nameInput = 'John Bitch';
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: nameInput } });

    // Simulate user input for rating
    const ratingStar = screen.getAllByLabelText('rating')[0]; // Assuming you want to interact with the first star
    fireEvent.click(ratingStar);
    // Mocking a profanity word
    const profanityText = 'Go fuck yourself, you piece of shit';
    fireEvent.change(screen.getByLabelText('Feedback'), { target: { value: profanityText } });

    fireEvent.click(screen.getByText('Submit'));
    const res = 'Profanity Found! 😡';
    // Check if profanity error message is displayed
    await waitFor(() => {
      expect(screen.queryAllByText(res)).toHaveLength(2);
    });
  });
})
