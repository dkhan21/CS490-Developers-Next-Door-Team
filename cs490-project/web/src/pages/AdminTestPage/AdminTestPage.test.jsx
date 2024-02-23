import { render } from '@redwoodjs/testing/web'

import AdminTestPage from './AdminTestPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminTestPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminTestPage />)
    }).not.toThrow()
  })
})
