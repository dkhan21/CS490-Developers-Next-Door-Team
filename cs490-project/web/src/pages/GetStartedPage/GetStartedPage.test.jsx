import { render } from '@redwoodjs/testing/web'

import GetStartedPage from './GetStartedPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GetStartedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GetStartedPage />)
    }).not.toThrow()
  })
})
