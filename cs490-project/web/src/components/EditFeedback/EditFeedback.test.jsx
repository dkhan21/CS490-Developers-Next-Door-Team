import { render } from '@redwoodjs/testing/web'

import EditFeedback from './EditFeedback'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditFeedback', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditFeedback />)
    }).not.toThrow()
  })
})
