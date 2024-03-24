import { render } from '@redwoodjs/testing/web'

import ResourcesPage from './ResourcesPage'

describe('ResourcesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResourcesPage />)
    }).not.toThrow()
  })

  it('renders all resource links', () => {
    const { getByText } = render(<ResourcesPage />)
    
    // Check that all resource links are rendered
    expect(getByText('Java')).toBeInTheDocument()
    expect(getByText('Python')).toBeInTheDocument()
    expect(getByText('C')).toBeInTheDocument()
    expect(getByText('C++')).toBeInTheDocument()
    expect(getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders the page title', () => {
    const { getByText } = render(<ResourcesPage />)
    expect(getByText('Resources')).toBeInTheDocument()
  })

  it('renders links with correct href', () => {
    
    // Check that all links have the correct href
    const { getByText, getAllByText } = render(<ResourcesPage />)
  
  // Check that all links have the correct href
  const hereLinks = getAllByText('here')
  hereLinks.forEach((link, index) => {
    if (index === 0) {
      expect(link.closest('a')).toHaveAttribute('href', 'https://platform.openai.com/docs/api-reference/gpt-3')
    } else if (index === 1) {
      expect(link.closest('a')).toHaveAttribute('href', 'https://platform.openai.com/docs/engines/gpt-3')
    }
  })

    expect(getByText('Java').closest('a')).toHaveAttribute('href', 'https://docs.oracle.com/en/java/')
    expect(getByText('Python').closest('a')).toHaveAttribute('href', 'https://docs.python.org/3/')
    expect(getByText('C').closest('a')).toHaveAttribute('href', 'https://devdocs.io/c/')
    expect(getByText('C++').closest('a')).toHaveAttribute('href', 'http://www.cplusplus.com/doc/tutorial/')
    expect(getByText('JavaScript').closest('a')).toHaveAttribute('href', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide')
  })

  
})
