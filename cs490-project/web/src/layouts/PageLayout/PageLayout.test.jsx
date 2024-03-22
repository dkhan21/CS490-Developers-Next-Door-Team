import { render } from '@redwoodjs/testing/web'

import PageLayout from './PageLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageLayout />)
    }).not.toThrow()
  })
})
