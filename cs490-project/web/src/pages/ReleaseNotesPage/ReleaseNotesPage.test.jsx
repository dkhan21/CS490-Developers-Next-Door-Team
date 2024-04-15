import { render } from '@redwoodjs/testing/web'

import ReleaseNotesPage from './ReleaseNotesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ReleaseNotesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReleaseNotesPage />)
    }).not.toThrow()
  })
})
