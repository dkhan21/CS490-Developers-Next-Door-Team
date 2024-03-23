import { render } from '@redwoodjs/testing/web'

import UpdateProfilePage from './UpdateProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateProfilePage />)
    }).not.toThrow()
  })
})
