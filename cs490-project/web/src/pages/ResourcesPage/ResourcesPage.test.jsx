import { render } from '@redwoodjs/testing/web'

import ResourcesPage from './ResourcesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ResourcesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResourcesPage />)
    }).not.toThrow()
  })
})
