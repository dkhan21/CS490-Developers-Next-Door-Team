import { render } from '@redwoodjs/testing/web'

import UnderstandingOutputGuidePage from './UnderstandingOutputGuidePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UnderstandingOutputGuidePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UnderstandingOutputGuidePage />)
    }).not.toThrow()
  })
})
