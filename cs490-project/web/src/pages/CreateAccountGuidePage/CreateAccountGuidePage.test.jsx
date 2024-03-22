import { render } from '@redwoodjs/testing/web'

import CreateAccountGuidePage from './CreateAccountGuidePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateAccountGuidePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateAccountGuidePage />)
    }).not.toThrow()
  })
})
