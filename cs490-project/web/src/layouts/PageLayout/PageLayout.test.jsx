import { render } from '@redwoodjs/testing/web'

import PageLayout from './PageLayout'

describe('PageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageLayout />)
    }).not.toThrow()
  })

  it('Back button leads to the correct path', () => {
    const { getByText } = render(<PageLayout title="Test Title" subtitle="Test Subtitle" />)
    
    // Check that the Back button leads to the correct path
    expect(getByText('Back').closest('a')).toHaveAttribute('href', '/user-guides')
  })

  it('renders focusable interactive elements', () => {
    const { getByText } = render(<PageLayout title="Test Title" subtitle="Test Subtitle" />)
    
    // Focus on the elements and check if they are the active element
    getByText('Back').focus()
    expect(getByText('Back')).toBe(document.activeElement)
  })
  
  it('renders elements with accessible names', () => {
    const { getByText } = render(<PageLayout title="Test Title" subtitle="Test Subtitle" />)
    
    expect(getByText('Back')).toBeInTheDocument()
    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('Test Subtitle')).toBeInTheDocument()
  })
  
})
