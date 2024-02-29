import { render, screen } from '@redwoodjs/testing/web'
import Feedback from './Feedback'

describe('Feedback', () => {
  it('renders successfully', () => {
    const feedback = {
      name: 'John Doe',
      rating: 3,
      body: 'This is my comment',
      createdAt: '2020-01-02T12:34:56Z',
    }
    render(<Feedback feedback={feedback} />)

    expect(screen.getByText(feedback.name)).toBeInTheDocument()
    expect(screen.getByText(feedback.body)).toBeInTheDocument()

    // Check for the star icons based on the rating
    const starIcons = screen.getAllByText('⭐')
    expect(starIcons.length).toBe(feedback.rating)

    // Check for the date
const formattedDate = new Date(feedback.createdAt).toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
const dateExpect = screen.getByText(formattedDate);
expect(dateExpect).toBeInTheDocument();
expect(dateExpect.nodeName).toEqual('TIME');
expect(dateExpect).toHaveAttribute('datetime', feedback.createdAt);

  })
})
