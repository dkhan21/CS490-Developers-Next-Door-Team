import { render } from '@redwoodjs/testing/web'

import NavigatingInterfaceGuidePage from './NavigatingInterfaceGuidePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NavigatingInterfaceGuidePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavigatingInterfaceGuidePage />)
    }).not.toThrow()
  })
})
