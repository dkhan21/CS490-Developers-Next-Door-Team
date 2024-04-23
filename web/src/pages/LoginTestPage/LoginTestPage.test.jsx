import { render } from '@redwoodjs/testing/web'

import LoginTestPage from './LoginTestPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoginTestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginTestPage />)
    }).not.toThrow()
  })
})
