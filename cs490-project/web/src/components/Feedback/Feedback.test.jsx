import { render, screen } from '@redwoodjs/testing/web'

import Feedback from './Feedback'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

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
    expect(screen.getByText(feedback.rating)).toBeInTheDocument()
    const dateExpect = screen.getByText('2 January 2020')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', comment.createdAt)
  })
})
