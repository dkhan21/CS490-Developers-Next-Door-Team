import { render } from '@redwoodjs/testing/web'

import TroubleshootingTranslationGuidePage from './TroubleshootingTranslationGuidePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TroubleshootingTranslationGuidePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TroubleshootingTranslationGuidePage />)
    }).not.toThrow()
  })
})
