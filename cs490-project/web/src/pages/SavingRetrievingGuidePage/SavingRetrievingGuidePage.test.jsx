import { render } from '@redwoodjs/testing/web'

import SavingRetrievingGuidePage from './SavingRetrievingGuidePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SavingRetrievingGuidePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SavingRetrievingGuidePage />)
    }).not.toThrow()
  })
})
