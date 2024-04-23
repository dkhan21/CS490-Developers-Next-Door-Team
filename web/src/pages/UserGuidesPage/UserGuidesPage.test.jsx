import { render } from '@redwoodjs/testing/web'

import UserGuidesPage from './UserGuidesPage'


describe('UserGuidesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserGuidesPage />)
    }).not.toThrow()
  })

  it('renders all guide links', () => {
    const { getByText } = render(<UserGuidesPage />)
    
    // Check that all guide links are rendered
    expect(getByText('Creating an Account')).toBeInTheDocument()
    expect(getByText('Logging In and Out')).toBeInTheDocument()
    expect(getByText('Navigating the Interface')).toBeInTheDocument()
    expect(getByText('Basic Code Translation')).toBeInTheDocument()
    expect(getByText('Understanding the Output')).toBeInTheDocument()
    expect(getByText('Troubleshooting the Translation')).toBeInTheDocument()
    expect(getByText('Saving and Retrieving Past Translations')).toBeInTheDocument()
    expect(getByText('Common Errors')).toBeInTheDocument()
    expect(getByText('Reporting Bugs')).toBeInTheDocument()
    expect(getByText('Requesting Features')).toBeInTheDocument()
  })

  it('guide links lead to the correct paths', () => {
    const { getByText } = render(<UserGuidesPage />)
    
    // Check that all guide links lead to the correct paths
    expect(getByText('Creating an Account').closest('a')).toHaveAttribute('href', '/create-account-guide')
    expect(getByText('Logging In and Out').closest('a')).toHaveAttribute('href', '/logging-in-out-guide')
    expect(getByText('Navigating the Interface').closest('a')).toHaveAttribute('href', '/navigating-interface-guide')
    expect(getByText('Basic Code Translation').closest('a')).toHaveAttribute('href', '/basic-code-translation-guide')
    expect(getByText('Understanding the Output').closest('a')).toHaveAttribute('href', '/understanding-output-guide')
    expect(getByText('Troubleshooting the Translation').closest('a')).toHaveAttribute('href', '/troubleshooting-translation-guide')
    expect(getByText('Saving and Retrieving Past Translations').closest('a')).toHaveAttribute('href', '/saving-retrieving-guide')
    expect(getByText('Common Errors').closest('a')).toHaveAttribute('href', '/common-errors')
    expect(getByText('Reporting Bugs').closest('a')).toHaveAttribute('href', '/reporting-bugs')
    expect(getByText('Requesting Features').closest('a')).toHaveAttribute('href', '/requesting-features')
  })

  it('renders focusable interactive elements', () => {
    const { getByText } = render(<UserGuidesPage />)
    
    // Focus on the elements and check if they are the active element
    getByText('Creating an Account').focus()
    expect(getByText('Creating an Account')).toBe(document.activeElement)
  
    getByText('Logging In and Out').focus()
    expect(getByText('Logging In and Out')).toBe(document.activeElement)
  
  getByText('Navigating the Interface').focus()
    expect(getByText('Navigating the Interface')).toBe(document.activeElement)
    getByText('Basic Code Translation').focus()
    expect(getByText('Basic Code Translation')).toBe(document.activeElement)
    getByText('Understanding the Output').focus()
    expect(getByText('Understanding the Output')).toBe(document.activeElement)
    getByText('Troubleshooting the Translation').focus()
    expect(getByText('Troubleshooting the Translation')).toBe(document.activeElement)
    getByText('Saving and Retrieving Past Translations').focus()
    expect(getByText('Saving and Retrieving Past Translations')).toBe(document.activeElement)
    getByText('Common Errors').focus()
    expect(getByText('Common Errors')).toBe(document.activeElement)
    getByText('Reporting Bugs').focus()
    expect(getByText('Reporting Bugs')).toBe(document.activeElement)
    getByText('Requesting Features').focus()
    expect(getByText('Requesting Features')).toBe(document.activeElement)
  })
  
})
