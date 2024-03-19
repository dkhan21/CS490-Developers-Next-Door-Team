import { render } from '@redwoodjs/testing/web'

import ChangePasswordPage from './ChangePasswordPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ChangePasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChangePasswordPage />)
    }).not.toThrow()
  })
})
