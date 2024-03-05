import { render } from '@redwoodjs/testing/web'

import FeedbackForm from './FeedbackForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FeedbackForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackForm />)
    }).not.toThrow()
  })
})
