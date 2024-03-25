import { render } from '@redwoodjs/testing/web'

import ReportingBugsPage from './ReportingBugsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ReportingBugsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportingBugsPage />)
    }).not.toThrow()
  })
})
