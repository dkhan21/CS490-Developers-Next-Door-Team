import { render } from '@redwoodjs/testing/web'

import CommonErrorsPage from './CommonErrorsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CommonErrorsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommonErrorsPage />)
    }).not.toThrow()
  })
})
