import { render } from '@redwoodjs/testing/web'

import LoggingInOutGuidePage from './LoggingInOutGuidePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoggingInOutGuidePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoggingInOutGuidePage />)
    }).not.toThrow()
  })
})
