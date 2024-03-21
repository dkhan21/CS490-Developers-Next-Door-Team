import { render } from '@redwoodjs/testing/web'

import UserGuidesPage from './UserGuidesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserGuidesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserGuidesPage />)
    }).not.toThrow()
  })
})
