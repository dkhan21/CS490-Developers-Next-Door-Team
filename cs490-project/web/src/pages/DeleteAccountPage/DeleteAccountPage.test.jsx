import { render } from '@redwoodjs/testing/web'

import DeleteAccountPage from './DeleteAccountPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DeleteAccountPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteAccountPage />)
    }).not.toThrow()
  })
})
