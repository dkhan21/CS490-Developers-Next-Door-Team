import { render } from '@redwoodjs/testing/web'

import EditFeedback from './EditFeedback'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditFeedback', () => {
  it('renders successfully', () => {
    const feedback = {
      name: 'John Doe',
      rating: 3,
      body: 'This is my comment',
      createdAt: '2020-01-02T12:34:56Z',
    }
    
    expect(() => {
      render(<EditFeedback feedback={feedback} />)
    }).not.toThrow()
  })
})
