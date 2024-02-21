import { render } from '@redwoodjs/testing/web'

import TranslatePage from './TranslatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TranslatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TranslatePage />)
    }).not.toThrow()
  })
})
