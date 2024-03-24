import { render } from '@redwoodjs/testing/web'

import RequestingFeaturesPage from './RequestingFeaturesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RequestingFeaturesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RequestingFeaturesPage />)
    }).not.toThrow()
  })
})
